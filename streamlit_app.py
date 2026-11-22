"""
AI Compliance Gap Analyzer — Streamlit UI
Live demo interface for the compliance analysis pipeline.
"""

import os
import re
import json
import base64
import secrets
import streamlit as st
import streamlit.components.v1 as components
import time
from dotenv import load_dotenv

load_dotenv()

# Streamlit Cloud: inject secrets as env vars before importing agent modules,
# which create API clients at module level using os.getenv().
# Locally, .env is loaded here via dotenv. On Cloud, st.secrets are injected below.
_REQUIRED_KEYS = ("ANTHROPIC_API_KEY", "TAVILY_API_KEY")
_OPTIONAL_KEYS = ("SUPABASE_URL", "SUPABASE_KEY",
                   "LANGFUSE_SECRET_KEY", "LANGFUSE_PUBLIC_KEY", "LANGFUSE_HOST")

_missing = []
for _key in _REQUIRED_KEYS:
    if _key not in os.environ:
        try:
            os.environ[_key] = st.secrets[_key]
        except (KeyError, FileNotFoundError):
            _missing.append(_key)

for _key in _OPTIONAL_KEYS:
    if _key not in os.environ:
        try:
            os.environ[_key] = st.secrets[_key]
        except (KeyError, FileNotFoundError):
            pass

if _missing:
    st.error(
        f"Missing API keys: **{', '.join(_missing)}**. "
        "Add them in Streamlit Cloud → Settings → Secrets (TOML format), "
        "or in a local `.env` file."
    )
    st.code('ANTHROPIC_API_KEY = "<your-anthropic-key>"\nTAVILY_API_KEY = "<your-tavily-key>"', language="toml")
    st.stop()

from langfuse import observe, get_client as get_langfuse_client
from opentelemetry import trace as otel_trace

from agent import (
    scope_analysis,
    gather_research,
    analyze_compliance,
    save_report,
    append_test_log,
    score_research_quality,
    AnalysisError,
    EmptyResearchError,
    ScopingError,
    MIN_ADEQUATE_RESULTS,
    TEST_SCENARIOS,
)
from prompts import REPORT_DISCLAIMER
from tracking import (
    init_session,
    start_run,
    complete_run,
    update_run_research_quality,
    update_run_scope,
    log_user_event,
    save_report_to_db,
    log_error,
    mark_run_failed,
    is_rate_limited,
    save_free_report_request,
    save_demo_access,
    find_demo_access,
)

VERSION = "v0.7.2"
_langfuse = get_langfuse_client()

# ── Demo copy and links (v0.7.2) ──────────────────────────────────────────────
BOOK_CALL_URL = "https://calendly.com/yeyfreya-noacue/30min"
BOOK_CALL_LINE = f"[book a call with the Noacue team]({BOOK_CALL_URL})"
EMAIL_RE = re.compile(r"^[^@\s]+@[^@\s]+\.[^@\s]+$")
ACCESS_CODE_RE = re.compile(r"^[A-Za-z0-9_-]{16,64}$")
CONSENT_LINE = (
    "By accessing the demo, you agree that Noacue may email you about your report. "
    "Your details stay in our private list. Request removal anytime at hello@noacue.com."
)
UNAVAILABLE_MSG = (
    f"The demo is briefly unavailable. Please try again soon, or {BOOK_CALL_LINE}."
)


def _mark_data_uri() -> str:
    """The Noacue mark as an inline image; empty if the file is missing (name still shows)."""
    path = os.path.join(os.path.dirname(os.path.abspath(__file__)), "assets", "noacue-mark.png")
    try:
        with open(path, "rb") as f:
            return "data:image/png;base64," + base64.b64encode(f.read()).decode("ascii")
    except OSError:
        return ""


# The name as on noacue.com: mark, "Noacue", and the dot (same font, weight, spacing)
_MARK_URI = _mark_data_uri()
WORDMARK_HTML = (
    '<div class="wordmark"><a href="https://noacue.com" target="_blank" aria-label="Noacue home">'
    + (f'<img src="{_MARK_URI}" alt="">' if _MARK_URI else "")
    + 'Noacue<span class="dot" aria-hidden="true">.</span></a></div>'
)

# Shown only while a report runs: a click in the sidebar would stop the run
SIDEBAR_LOCK_CSS = (
    "<style>[data-testid='stSidebar'] "
    "{ pointer-events: none; user-select: none; opacity: 0.45; }</style>"
)

st.set_page_config(
    page_title="Noacue demo",
    page_icon="🛡️",
    layout="wide",
)

# ── Custom CSS ────────────────────────────────────────────────────────────────
st.markdown(
    """
    <style>
    .block-container { max-width: 960px; }

    /* The Noacue name above the hero, matched to the noacue.com header */
    .wordmark {
        font-family: Arial, Helvetica, sans-serif;
        font-weight: 600;
        font-size: 2rem;
        letter-spacing: -0.075em;
        line-height: 1;
        margin-bottom: 1.25rem;
    }
    .wordmark a, .wordmark a:hover { color: inherit; text-decoration: none; }
    .wordmark .dot { color: #7475a5; }
    .wordmark img {
        display: inline-block;
        width: 1.1em;
        height: 1.1em;
        margin-right: 0.22em;
        vertical-align: -0.22em;
    }

    /* Hero headline */
    .hero-title {
        font-size: 2rem;
        font-weight: 700;
        margin-bottom: 0.25rem;
    }
    .hero-sub {
        font-size: 1.05rem;
        opacity: 0.75;
        margin-bottom: 1.5rem;
    }

    /* Metric cards row */
    .metric-row {
        display: flex;
        gap: 1rem;
        margin-bottom: 1.5rem;
    }
    .metric-card {
        flex: 1;
        padding: 0.85rem 1rem;
        border-radius: 10px;
        background: #ffffff;
        border: 1px solid #cdd1da;
        text-align: center;
    }
    .metric-card .label { font-size: 0.78rem; opacity: 0.6; }
    .metric-card .value { font-size: 1.3rem; font-weight: 600; }

    /* Note boxes in the site's colors (white card, line border, violet edge) */
    .note {
        background: #ffffff;
        border: 1px solid #cdd1da;
        border-left: 4px solid #55528c;
        border-radius: 8px;
        padding: 0.85rem 1rem;
        margin-bottom: 1rem;
        color: #202632;
    }

    /* Main buttons in the site's dark ink, as on noacue.com */
    [data-testid="stBaseButton-primary"],
    [data-testid="stBaseButton-primaryFormSubmit"] {
        background: linear-gradient(150deg, #424855, #202630 70%);
        border: 1px solid #292f3b;
        color: #ffffff;
    }
    [data-testid="stBaseButton-primary"]:hover,
    [data-testid="stBaseButton-primaryFormSubmit"]:hover {
        background: linear-gradient(150deg, #4c5261, #2a303b 70%);
        border-color: #292f3b;
        color: #ffffff;
    }

    /* Sidebar polish */
    [data-testid="stSidebar"] {
        min-width: 340px;
        border-right: 1px solid #cdd1da;
    }

    /* Divider */
    hr { margin: 1.5rem 0; }
    </style>
    """,
    unsafe_allow_html=True,
)


# ── Session-state defaults ────────────────────────────────────────────────────
for key in ("result", "report_md", "report_path"):
    if key not in st.session_state:
        st.session_state[key] = None

if "supabase_session_id" not in st.session_state:
    st.session_state.supabase_session_id = init_session(
        streamlit_session_id=st.session_state.get("_st_session_id", str(id(st.session_state))),
        app_version=VERSION,
    )
    log_user_event(st.session_state.supabase_session_id, "page_load")


# ── Email screen (v0.7.2) ─────────────────────────────────────────────────────
# The demo opens on one email field. The email is saved the moment the visitor enters, and
# a private code in the page address lets them back in after a refresh (7 days, tracking.py).
if "demo_email" not in st.session_state:
    st.session_state.demo_email = None

if not st.session_state.demo_email:
    _code = st.query_params.get("access")
    if _code:
        _known_email = find_demo_access(_code) if ACCESS_CODE_RE.match(_code) else None
        if _known_email:
            st.session_state.demo_email = _known_email
            log_user_event(st.session_state.supabase_session_id, "demo_returned",
                           event_data={"email": _known_email})
        else:
            # Unknown or older than the limit: drop it and ask for the email again
            del st.query_params["access"]

if not st.session_state.demo_email:
    _, _gate, _ = st.columns([1, 2, 1])
    with _gate:
        st.markdown(
            WORDMARK_HTML
            + '<div class="hero-title">See your AI compliance gap report in minutes</div>',
            unsafe_allow_html=True,
        )
        with st.form("access_form"):
            _gate_email = st.text_input("Your email")
            st.caption(CONSENT_LINE)
            _entered = st.form_submit_button("Access the demo", type="primary",
                                             use_container_width=True)
        if _entered:
            # Lower-cased so one address is one count
            _gate_email = (_gate_email or "").strip().lower()
            if not EMAIL_RE.match(_gate_email):
                st.error("Please enter a valid email address.")
            else:
                _new_code = secrets.token_urlsafe(16)
                # Fails closed, like the run limit: no record of the email, no entry
                if save_demo_access(st.session_state.supabase_session_id, _gate_email, _new_code):
                    st.session_state.demo_email = _gate_email
                    st.query_params["access"] = _new_code
                    st.rerun()
                else:
                    st.warning(UNAVAILABLE_MSG)
    st.stop()


# ── Sidebar — inputs ─────────────────────────────────────────────────────────
with st.sidebar:
    st.markdown("### Configuration")

    scenario_options = {"— Custom —": None} | {
        f"{k.title()} — {v['use_case'][:40]}": k
        for k, v in TEST_SCENARIOS.items()
    }
    chosen_label = st.selectbox("Quick-start scenario", list(scenario_options.keys()))
    chosen_key = scenario_options[chosen_label]

    if chosen_key and chosen_key != st.session_state.get("_last_scenario"):
        st.session_state._last_scenario = chosen_key
        log_user_event(st.session_state.supabase_session_id, "scenario_selected",
                       event_data={"scenario": chosen_key})

    if chosen_key:
        s = TEST_SCENARIOS[chosen_key]
        use_case = st.text_area("Use case", value=s["use_case"], height=80)
        technology = st.text_input("Technology", value=s["technology"])
        industry = st.text_input("Industry", value=s["industry"])
    else:
        use_case = st.text_area(
            "Use case",
            placeholder="e.g. AI-powered resume screening tool",
            height=80,
        )
        technology = st.text_input(
            "Technology", placeholder="e.g. OpenAI GPT-4 API"
        )
        industry = st.text_input(
            "Industry", placeholder="e.g. Enterprise HR (US-based)"
        )

    st.divider()
    run_btn = st.button("Run Analysis", type="primary", use_container_width=True)

    st.divider()
    email = st.session_state.demo_email
    if st.session_state.get("editing_email"):
        # Changed right here, so a report on screen stays where it is
        with st.form("change_email_form"):
            _new_email = st.text_input("New email", value=email)
            _col_save, _col_cancel = st.columns(2)
            _save = _col_save.form_submit_button("Save", type="primary",
                                                 use_container_width=True)
            _cancel = _col_cancel.form_submit_button("Cancel", use_container_width=True)
        if _cancel:
            st.session_state.editing_email = False
            st.rerun()
        if _save:
            _new_email = (_new_email or "").strip().lower()
            if not EMAIL_RE.match(_new_email):
                st.error("Please enter a valid email address.")
            elif _new_email == email:
                st.session_state.editing_email = False
                st.rerun()
            else:
                _new_code = secrets.token_urlsafe(16)
                # Saved like a first entry, with a fresh private code for the address
                if save_demo_access(st.session_state.supabase_session_id, _new_email, _new_code):
                    st.session_state.demo_email = _new_email
                    st.query_params["access"] = _new_code
                    st.session_state.editing_email = False
                    st.rerun()
                else:
                    st.warning(UNAVAILABLE_MSG)
    else:
        st.caption(f"Email: {email}")
        if st.button("Change email", type="tertiary"):
            st.session_state.editing_email = True
            st.rerun()

    st.caption(
        f"{VERSION} · AI agent with live regulatory research · "
        "[GitHub](https://github.com/yeyfreya/ai-compliance-gap-analyzer)"
    )


# ── Header ────────────────────────────────────────────────────────────────────
st.markdown(
    WORDMARK_HTML
    + '<div class="hero-title">See your AI compliance gap report in minutes</div>'
    '<div class="hero-sub">'
    "Describe your AI use case, technology and industry. The Noacue agent researches "
    "current rules from official sources and drafts an AI compliance gap report in "
    "about 4 minutes."
    "</div>",
    unsafe_allow_html=True,
)
st.markdown(
    '<div class="note">'
    "This is a live demo. Each report is drafted automatically and is not reviewed by a "
    "person, so treat it as a starting point. It may not show the whole picture. For one "
    "that is checked, verified and tailored to your business, request an AI compliance "
    "action plan at the end of the report."
    "</div>",
    unsafe_allow_html=True,
)


# ── Pipeline function (Langfuse parent trace) ────────────────────────────────

@observe(name="compliance_pipeline")
def _run_pipeline(use_case, technology, industry, run_id, session_id, version):
    """Run the full analysis pipeline under a single Langfuse parent trace.

    All child @observe() functions (scope_analysis, gather_research,
    analyze_compliance) are automatically nested as spans under this trace.
    """
    span = otel_trace.get_current_span()
    span.set_attribute("session.id", str(session_id or ""))
    span.set_attribute("langfuse.trace.metadata", json.dumps({
        "supabase_run_id": str(run_id or ""),
        "supabase_session_id": str(session_id or ""),
        "app_version": version,
    }))
    span.set_attribute("langfuse.trace.tags", json.dumps(["streamlit", version]))

    langfuse_trace_id = _langfuse.get_current_trace_id()

    total_start = time.time()
    status_area = st.container()
    timer_slot = st.empty()

    with status_area:
        with st.status("Running compliance analysis… (step 1/3)", expanded=True) as status:

            with timer_slot.container():
                components.html(
                    """
                    <div style="display:flex; align-items:center; gap:0.6rem;
                                font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;
                                padding:0.25rem 0 0.5rem; color:#202632;">
                        <span style="font-size:1.1rem;">⏱️</span>
                        <span style="font-variant-numeric:tabular-nums; font-weight:600;"
                              id="elapsed">0:00</span>
                        <span style="opacity:0.55; font-size:0.88rem;">
                            · Typically 3–5 minutes · may take longer for complex or region-specific cases
                        </span>
                    </div>
                    <script>
                        const start = Date.now();
                        const el = document.getElementById('elapsed');
                        setInterval(() => {
                            const sec = Math.floor((Date.now() - start) / 1000);
                            const m = Math.floor(sec / 60);
                            const s = sec % 60;
                            el.textContent = m + ':' + (s < 10 ? '0' : '') + s;
                        }, 1000);
                    </script>
                    """,
                    height=40,
                )

            # Step 1 — Scope the regulatory territory
            st.write(
                "🧭 **Scoping your regulatory territory** — identifying which "
                "jurisdictions, professional bodies, and data rules apply to your case…"
            )
            t0 = time.time()
            scope_result = scope_analysis(use_case, technology, industry)
            scope = scope_result["scope"]
            time_scoping = round(time.time() - t0, 1)
            n_regimes = len(scope.get("candidate_regimes", []))
            st.write(f"✅ Scoped **{n_regimes}** regulations & standards to investigate ({time_scoping}s)")
            update_run_scope(run_id, scope)

            # expanded=True on every step: an update without it collapses the box (v0.7.2)
            status.update(label="Running compliance analysis… (step 2/3)", expanded=True)

            # Step 2 — Conduct tiered research (with lightweight adequacy retry — #7)
            st.write("🔬 **Conducting research** — searching the web for regulatory data…")
            t0 = time.time()
            research = gather_research(use_case, technology, industry, scope)
            research_findings = research["findings_text"]
            time_research = round(time.time() - t0, 1)

            # #29 — refuse to generate a report from empty research
            if research["num_results"] == 0:
                status.update(label="Research unavailable", state="error", expanded=True)
                raise EmptyResearchError("No research results were returned from any search.")

            research_limited = 0 < research["num_results"] < MIN_ADEQUATE_RESULTS
            pct_tier1_sources = research["tier1_count"] / max(research["num_results"], 1)
            limited_tag = " · limited data" if research_limited else ""
            st.write(
                f"✅ Research complete — {research['num_results']} sources "
                f"({round(pct_tier1_sources * 100)}% from official sources) "
                f"({time_research}s){limited_tag}"
            )

            # Record research-quality scores on this run's Langfuse trace (filterable)
            score_research_quality(
                research["num_results"], research_limited, len(research["failed_queries"]),
                n_regimes, pct_tier1_sources,
            )

            status.update(label="Running compliance analysis… (step 3/3)", expanded=True)

            # Step 3 — Analyze compliance
            st.write(
                "🧠 **Analyzing compliance gaps** — the agent is cross-referencing findings "
                "and writing your report. This is the longest step…"
            )
            t0 = time.time()
            analysis_result = analyze_compliance(
                use_case, technology, industry, research_findings, scope, research["domains_searched"]
            )
            # v0.7.2: an API error, a refusal, or a cut-off report is a failed run, never a report
            if analysis_result.get("error"):
                status.update(label="Analysis unavailable", state="error", expanded=True)
                raise AnalysisError(analysis_result["error"])
            analysis = analysis_result["analysis"]
            time_analysis = round(time.time() - t0, 1)
            st.write(f"✅ Analysis complete ({time_analysis}s)")

            time_total = round(time.time() - total_start, 1)
            status.update(label=f"Analysis complete — {time_total}s", state="complete", expanded=False)

    mins, secs = divmod(int(time_total), 60)
    timer_slot.markdown(f"⏱️ Report generated in **{mins}:{secs:02d}**")

    return {
        "use_case": use_case,
        "technology": technology,
        "industry": industry,
        "search_queries": research.get(
            "executed_queries", research["successful_queries"] + research["failed_queries"]
        ),
        "analysis": analysis,
        "sources": research["sources"],
        "research_limited": research_limited,
        "num_failed_queries": len(research["failed_queries"]),
        "timing": {
            "scoping_sec": time_scoping,
            "research_sec": time_research,
            "analysis_sec": time_analysis,
            "total_sec": time_total,
        },
        "scoping_thinking": scope_result.get("thinking"),
        "analysis_thinking": analysis_result.get("thinking"),
        "token_usage": {
            "scoping": {"input": scope_result.get("tokens_in", 0), "output": scope_result.get("tokens_out", 0)},
            "analysis": {"input": analysis_result.get("tokens_in", 0), "output": analysis_result.get("tokens_out", 0)},
        },
        "scope": scope,
        "tier1_count": research["tier1_count"],
        "tier2_count": research["tier2_count"],
        "domains_searched": research["domains_searched"],
        "num_candidate_regimes": n_regimes,
        "pct_tier1_sources": pct_tier1_sources,
        "langfuse_trace_id": langfuse_trace_id,
    }


# ── Run pipeline ──────────────────────────────────────────────────────────────
if run_btn:
    missing = [
        name
        for name, val in [("Use case", use_case), ("Technology", technology), ("Industry", industry)]
        if not val or not val.strip()
    ]
    if missing:
        st.error(f"Please fill in: **{', '.join(missing)}**")
        st.stop()

    # v0.7.2: every run carries the email given on the email screen (already checked there)

    session_id = st.session_state.supabase_session_id

    # Fails closed: if the count can't be read, the demo pauses instead of running unlimited
    rate = is_rate_limited(email)
    if rate["unavailable"]:
        st.warning(UNAVAILABLE_MSG)
        st.stop()
    if not rate["allowed"]:
        st.warning(
            f"You've reached {rate['limit']} demo reports for this email. For more, "
            f"{BOOK_CALL_LINE}."
        )
        log_user_event(session_id, "rate_limited",
                       event_data={"used": rate["used"], "limit": rate["limit"]})
        st.stop()

    scenario_source = chosen_key if chosen_key else "custom"
    run_id = start_run(session_id, use_case, technology, industry, scenario_source, VERSION,
                       email=email)
    # No run row means no email on record and nothing for the limit to count: pause, same as above
    if not run_id:
        st.warning(UNAVAILABLE_MSG)
        st.stop()

    st.session_state.result = None
    st.session_state.report_md = None
    st.session_state.report_path = None
    st.session_state.feedback_given = False

    log_user_event(session_id, "analysis_started", run_id=run_id,
                   event_data={"use_case": use_case, "technology": technology, "industry": industry})

    _user_inputs = {"use_case": use_case, "technology": technology, "industry": industry}

    # Grey out and lock the sidebar while the report runs; released in the finally below
    sidebar_lock = st.empty()
    sidebar_lock.markdown(SIDEBAR_LOCK_CSS, unsafe_allow_html=True)

    try:
        result = _run_pipeline(use_case, technology, industry, run_id, session_id, VERSION)

        try:
            report_path = save_report(result, version=VERSION, run_id=run_id)
            append_test_log(result, version=VERSION, report_path=report_path, run_id=run_id)
        except Exception as save_err:
            log_error(save_err, session_id=session_id, run_id=run_id,
                      pipeline_step="save_report", user_inputs=_user_inputs,
                      app_version=VERSION)
            report_path = None

        # Build the FULL report markdown (includes the Sources section) once, up front,
        # so both Supabase and the download button get the complete report — not just the
        # analysis text. Falls back to the analysis if the local file save failed.
        if report_path:
            with open(report_path, "r", encoding="utf-8") as f:
                report_md = f.read()
        else:
            # Local save failed — rebuild enough of the report by hand. The disclaimer is
            # re-attached explicitly: no copy of a report leaves here without it.
            report_md = result.get("analysis", "") + f"\n\n---\n\n{REPORT_DISCLAIMER}\n"

        if run_id:
            complete_run(run_id, result["timing"])
            update_run_research_quality(
                run_id,
                len(result.get("sources", [])),
                result.get("research_limited", False),
                result.get("num_failed_queries", 0),
                result.get("num_candidate_regimes", 0),
                result.get("pct_tier1_sources", 0),
            )
            if report_path:
                save_report_to_db(run_id, report_md, result["search_queries"],
                                  os.path.basename(report_path))
            log_user_event(session_id, "report_viewed", run_id=run_id)

        st.session_state.result = result
        st.session_state.report_path = report_path
        st.session_state.current_run_id = run_id
        st.session_state.report_md = report_md

    except ScopingError as scoping_err:
        # The scoping step couldn't produce a usable regulatory map — no fallback path,
        # so we abort honestly rather than research/report against a guessed scope.
        log_error(scoping_err, session_id=session_id, run_id=run_id,
                  pipeline_step="scoping", user_inputs=_user_inputs,
                  app_version=VERSION)
        if run_id:
            mark_run_failed(run_id, scoping_err)

        st.warning(
            "The analysis couldn't map your regulatory scope just now — this is "
            "usually transient. Please try again."
        )
        st.caption(f"Reference: `{run_id or 'no-run-id'}`")
        log_user_event(session_id, "scoping_failed", run_id=run_id)

    except EmptyResearchError as research_err:
        # #29 — research came back empty; we deliberately did NOT fabricate a report
        log_error(research_err, session_id=session_id, run_id=run_id,
                  pipeline_step="research", user_inputs=_user_inputs,
                  app_version=VERSION)
        if run_id:
            mark_run_failed(run_id, research_err)

        st.warning(
            "The agent couldn't gather regulatory research just now — this is usually a "
            "temporary web-search hiccup. Please try again in a moment."
        )
        st.caption(f"Reference: `{run_id or 'no-run-id'}`")
        log_user_event(session_id, "research_failed", run_id=run_id)

    except Exception as pipeline_err:
        log_error(pipeline_err, session_id=session_id, run_id=run_id,
                  pipeline_step="pipeline", user_inputs=_user_inputs,
                  app_version=VERSION)
        if run_id:
            mark_run_failed(run_id, pipeline_err)

        st.error(
            "Something went wrong during the analysis. The error has been logged "
            "and will be investigated. Please try again — transient issues often "
            "resolve on retry."
        )
        st.caption(f"Error reference: `{run_id or 'no-run-id'}`")
        log_user_event(session_id, "pipeline_error", run_id=run_id,
                       event_data={"error_type": type(pipeline_err).__name__,
                                   "error_message": str(pipeline_err)[:500]})

    finally:
        sidebar_lock.empty()


# ── Display results ───────────────────────────────────────────────────────────
result = st.session_state.result
if result:
    timing = result["timing"]

    st.markdown(
        f"""
        <div class="metric-row">
            <div class="metric-card">
                <div class="label">Total time</div>
                <div class="value">{timing['total_sec']}s</div>
            </div>
            <div class="metric-card">
                <div class="label">Scoping</div>
                <div class="value">{timing['scoping_sec']}s</div>
            </div>
            <div class="metric-card">
                <div class="label">Research</div>
                <div class="value">{timing['research_sec']}s</div>
            </div>
            <div class="metric-card">
                <div class="label">Analysis</div>
                <div class="value">{timing['analysis_sec']}s</div>
            </div>
        </div>
        """,
        unsafe_allow_html=True,
    )

    if result.get("research_limited"):
        st.warning(
            "This report was generated from limited research data — some searches returned "
            "few results. Coverage may be incomplete; consider re-running for a fuller analysis."
        )

    tab_report, tab_sources, tab_queries = st.tabs(
        ["📄 Report", "🔗 Sources", "🔍 Search Queries"]
    )

    with tab_report:
        st.markdown(result["analysis"])
        st.divider()
        st.caption(REPORT_DISCLAIMER)

    with tab_sources:
        sources = result.get("sources", [])
        if sources:
            st.caption("Regulatory and policy sources the agent reviewed for this report.")
            for i, s in enumerate(sources, 1):
                title = s.get("title") or s.get("url") or "Untitled source"
                url = s.get("url", "")
                st.markdown(f"{i}. [{title}]({url})" if url else f"{i}. {title}")
        else:
            st.caption("No sources were captured for this report.")

    with tab_queries:
        for i, q in enumerate(result["search_queries"], 1):
            st.markdown(f"**{i}.** {q}")

    # ── Action plan request (v0.7.2): one click, nothing typed again ──────────
    # The demo report is the free tier; anything checked by a person is paid, by quote.
    # Requests land in the free_report_requests table (name kept from the earlier offer).
    st.divider()
    run_id_for_req = st.session_state.get("current_run_id")
    if run_id_for_req and st.session_state.get("request_sent_for") == run_id_for_req:
        st.success(
            "Request received. We'll email you within 3 business days with next steps "
            "and a quote."
        )
    else:
        st.markdown("**Want this checked, verified and tailored to your business?**")
        if st.button("Request an AI compliance action plan", type="primary"):
            # The email shown in the sidebar now, so a corrected address gets the reply
            saved = save_free_report_request(
                st.session_state.demo_email, run_id_for_req,
                result["use_case"], result["technology"], result["industry"],
            )
            if saved:
                st.session_state.request_sent_for = run_id_for_req
                log_user_event(st.session_state.supabase_session_id, "action_plan_requested",
                               run_id=run_id_for_req)
                st.rerun()
            else:
                st.warning(UNAVAILABLE_MSG)

    st.divider()

    col_dl, col_path = st.columns([1, 3])
    with col_dl:
        dl_filename = (os.path.basename(st.session_state.report_path)
                       if st.session_state.report_path else "compliance_report.md")
        downloaded = st.download_button(
            "⬇️ Download Report (.md)",
            data=st.session_state.report_md,
            file_name=dl_filename,
            mime="text/markdown",
        )
        if downloaded:
            log_user_event(
                st.session_state.supabase_session_id,
                "report_downloaded",
                run_id=st.session_state.get("current_run_id"),
                event_data={"filename": dl_filename},
            )
    with col_path:
        if not st.session_state.report_path:
            st.caption("⚠️ Local save failed — report available via download only")

    # ── Feedback (#31) ────────────────────────────────────────────────────────
    st.divider()
    run_id_for_fb = st.session_state.get("current_run_id")
    if st.session_state.get("feedback_given"):
        st.caption("✅ Thanks for your feedback — it helps improve the agent.")
    else:
        st.markdown("**Was this report helpful?**")
        fb_yes, fb_no, _ = st.columns([1, 1, 6])
        with fb_yes:
            if st.button("👍 Yes", use_container_width=True):
                log_user_event(st.session_state.supabase_session_id, "feedback",
                               run_id=run_id_for_fb, event_data={"rating": "up"})
                st.session_state.feedback_given = True
                st.rerun()
        with fb_no:
            if st.button("👎 No", use_container_width=True):
                log_user_event(st.session_state.supabase_session_id, "feedback",
                               run_id=run_id_for_fb, event_data={"rating": "down"})
                st.session_state.feedback_given = True
                st.rerun()

elif not run_btn:
    st.markdown(
        '<div class="note">👈 Configure your analysis in the sidebar and click '
        "<strong>Run Analysis</strong> to start.</div>",
        unsafe_allow_html=True,
    )