/*
  Noacue Rulemap: sample data for the demo page.

  What this file is
  - Seven cases and the rules each one touches. Every case was analysed for real.
  - "checked" cases: a person checked each rule against its source on the date shown.
  - "found" cases: rules found by a research run, not yet checked by a person.
  - Matching the same rule across cases was done by hand and is a first draft.
  - Sample data. Not legal advice.

  Edge status: "worth" = worth a look, "ruled_out" = looked at, ruled out.
*/
window.RULEMAP_DATA = {
  meta: {
    sample: true,
    built: "2026-11-20",
    matchingNote:
      "Matching the same rule across cases was done by hand. It is a first draft."
  },

  suggestedOrder: [
    "learning",
    "hiring",
    "imaging",
    "credit",
    "grading",
    "compliance",
    "coaching"
  ],

  /* ------------------------------------------------------------------ */
  /* Rules                                                               */
  /* ------------------------------------------------------------------ */
  rules: [
    { id: "eu-ai-act", short: "EU AI Act", name: "EU AI Act (Regulation (EU) 2024/1689)", where: "European Union", kind: "EU regulation" },
    { id: "gdpr", short: "GDPR", name: "GDPR (Regulation (EU) 2016/679)", where: "European Union", kind: "EU regulation" },
    { id: "uk-gdpr", short: "UK GDPR", name: "UK GDPR and Data Protection Act 2018", where: "United Kingdom", kind: "UK law" },
    { id: "uk-childrens-code", short: "UK Children's Code", name: "UK Children's Code (Age Appropriate Design Code)", where: "United Kingdom", kind: "Code of practice from the UK data protection regulator (ICO)" },
    { id: "coppa", short: "COPPA", name: "COPPA (Children's Online Privacy Protection Rule, 16 CFR Part 312)", where: "United States (federal)", kind: "Federal regulation" },
    { id: "ferpa", short: "FERPA", name: "FERPA (20 U.S.C. 1232g; 34 CFR Part 99)", where: "United States (federal)", kind: "Federal law and regulation" },
    { id: "state-student-privacy", short: "State student privacy laws", name: "State student data privacy laws (for example California SOPIPA)", where: "United States (states)", kind: "State laws" },
    { id: "openai-terms", short: "OpenAI terms", name: "OpenAI terms and policies (Services Agreement, Data Processing Addendum, usage policies)", where: "Contract with the AI vendor", kind: "Vendor terms" },
    { id: "companion-chatbot-laws", short: "AI companion laws (CA, NY)", name: "AI companion chatbot laws: California SB 243 and New York General Business Law Article 47", where: "California and New York", kind: "State laws" },
    { id: "ccpa", short: "California CCPA", name: "California CCPA/CPRA and CPPA regulations (including automated decisionmaking technology)", where: "California", kind: "State law and regulation" },
    { id: "eu-digital-omnibus", short: "EU Digital Omnibus", name: "EU Digital Omnibus on data (COM(2025) 837; 2025/0360(COD))", where: "European Union", kind: "EU legislative file" },
    { id: "ftc-act-5", short: "FTC Act s.5", name: "FTC Act, Section 5 (unfair or deceptive practices, including claims about AI)", where: "United States (federal)", kind: "Federal law" },
    { id: "federal-employment-discrimination", short: "Title VII, ADEA, ADA", name: "Federal employment discrimination law: Title VII, ADEA and ADA Title I, as enforced by the EEOC", where: "United States (federal)", kind: "Federal law" },
    { id: "nyc-ll144", short: "NYC Local Law 144", name: "New York City Local Law 144 of 2021 (automated employment decision tools)", where: "New York City", kind: "City law" },
    { id: "colorado-ai-act", short: "Colorado AI law", name: "Colorado AI law (SB 24-205; SB 26-189)", where: "Colorado", kind: "State law" },
    { id: "california-crc-ads", short: "California CRC rules", name: "California Civil Rights Council regulations on automated-decision systems in employment", where: "California", kind: "State regulation" },
    { id: "illinois-ai-employment", short: "Illinois PA 103-0804", name: "Illinois Human Rights Act: AI in employment (Public Act 103-0804)", where: "Illinois", kind: "State law" },
    { id: "fcra", short: "FCRA", name: "Fair Credit Reporting Act (15 U.S.C. 1681 et seq.)", where: "United States (federal)", kind: "Federal law" },
    { id: "hipaa", short: "HIPAA", name: "HIPAA Privacy, Security and Breach Notification Rules (45 CFR Parts 160 and 164)", where: "United States (federal)", kind: "Federal regulation" },
    { id: "fda-device-software", short: "FDA device software", name: "FDA regulation of device software, including clinical decision support software", where: "United States (federal)", kind: "Federal law, explained in agency guidance" },
    { id: "section-1557", short: "ACA s.1557", name: "Affordable Care Act, Section 1557: nondiscrimination and patient care decision support tools (45 CFR 92.210)", where: "United States (federal)", kind: "Federal law and regulation" },
    { id: "gemini-terms", short: "Gemini API terms", name: "Google Gemini API Additional Terms of Service and Generative AI Prohibited Use Policy", where: "Contract with the AI vendor", kind: "Vendor terms" },
    { id: "joint-commission-chai", short: "Joint Commission, CHAI", name: "Joint Commission and Coalition for Health AI (CHAI) guidance on the responsible use of AI in healthcare", where: "United States", kind: "Guidance from a hospital accreditation body" },
    { id: "onc-hti-1", short: "ONC HTI-1", name: "ONC HTI-1 Final Rule: decision support interventions certification criterion (45 CFR 170.315(b)(11))", where: "United States (federal)", kind: "Federal regulation" },
    { id: "fca-conc", short: "FCA CONC 5.2A", name: "FCA Handbook, Consumer Credit sourcebook (CONC) 5.2A: creditworthiness assessment", where: "United Kingdom", kind: "Regulator rulebook" },
    { id: "fca-consumer-duty", short: "FCA Consumer Duty", name: "FCA Consumer Duty (Principle 12 and PRIN 2A)", where: "United Kingdom", kind: "Regulator rulebook" },
    { id: "equality-act-2010", short: "Equality Act 2010", name: "Equality Act 2010 (indirect discrimination, section 19; services, Part 3)", where: "United Kingdom", kind: "UK law" },
    { id: "pra-ss1-23", short: "PRA SS1/23", name: "PRA Supervisory Statement SS1/23: model risk management principles for banks", where: "United Kingdom", kind: "Supervisory statement" },
    { id: "pra-ss2-21", short: "PRA SS2/21", name: "PRA Supervisory Statement SS2/21: outsourcing and third party risk management (with FCA SYSC 8 and FG16/5)", where: "United Kingdom", kind: "Supervisory statement" },
    { id: "aws-terms", short: "AWS terms", name: "AWS Customer Agreement, Service Terms, Data Processing Addendum and Responsible AI Policy", where: "Contract with the AI vendor", kind: "Vendor terms" },
    { id: "title-vi-504-ada-ii", short: "Title VI, s.504, ADA II", name: "Title VI of the Civil Rights Act, Section 504 of the Rehabilitation Act and ADA Title II", where: "United States (federal)", kind: "Federal law" },
    { id: "k12-ai-guidance", short: "K-12 AI guidance", name: "State and federal K-12 AI guidance, and local school board AI and assessment policy", where: "United States", kind: "Guidance and local policy" },
    { id: "anthropic-terms", short: "Anthropic terms", name: "Anthropic Commercial Terms of Service, Usage Policy and Data Processing Addendum", where: "Contract with the AI vendor", kind: "Vendor terms" },
    { id: "ppra", short: "PPRA", name: "Protection of Pupil Rights Amendment (PPRA), 20 U.S.C. 1232h; 34 CFR Part 98", where: "United States (federal)", kind: "Federal law and regulation" },
    { id: "upl", short: "Unauthorized practice of law", name: "US state rules on the unauthorized practice of law (ABA Model Rule 5.5 as reference)", where: "United States (states)", kind: "State statutes and court rules" },
    { id: "iso-42001", short: "ISO/IEC 42001", name: "ISO/IEC 42001:2023 (AI management system standard)", where: "International", kind: "International standard" },
    { id: "icf-standards", short: "ICF ethics and standards", name: "ICF Code of Ethics and ICF Coaching Platform Standards", where: "Coaching profession (International Coaching Federation)", kind: "Professional standards" },
    { id: "connecticut-pa-26-15", short: "Connecticut PA 26-15", name: "Connecticut Public Act 26-15", where: "Connecticut", kind: "State law" }
  ],

  /* ------------------------------------------------------------------ */
  /* Cases                                                               */
  /* ------------------------------------------------------------------ */
  cases: [
    /* ---------------------------- 1 ---------------------------------- */
    {
      id: "learning",
      label: "Children's learning app",
      useCase: "AI learning app for children",
      technology: "A hosted AI model, through an API",
      industry: "Children's education",
      origin: "checked",
      analysed: "2026-10-22",
      checkedOn: "2026-10-22",
      research: {
        date: "2026-10-22",
        text: "Rules were found by research on a large frontier model. A person then checked each one against its source.",
        model: "A large frontier model, then a person"
      },
      rules: [
        {
          rule: "eu-ai-act",
          parts: [
            { name: "Article 50(1) (Regulation 2024/1689 as amended by 2026/1744)", status: "worth" },
            { name: "Annex III(3) high-risk (education)", status: "ruled_out" }
          ],
          sources: [
            { title: "AI Act Service Desk: Article 50", url: "https://ai-act-service-desk.ec.europa.eu/en/ai-act/article-50" },
            { title: "AI Act Service Desk: Article 113", url: "https://ai-act-service-desk.ec.europa.eu/en/ai-act/article-113" },
            { title: "AI Act Service Desk: Annex III", url: "https://ai-act-service-desk.ec.europa.eu/en/ai-act/annex-3" },
            { title: "Regulation (EU) 2026/1744", url: "https://eur-lex.europa.eu/eli/reg/2026/1744/oj" }
          ]
        },
        {
          rule: "gdpr",
          parts: [
            { name: "Article 3(2) and Article 8", status: "worth" },
            { name: "Article 28(3)", status: "worth" },
            { name: "Chapter V: transfers outside the EU", status: "worth" },
            { name: "Article 35 (DPIA)", status: "worth" }
          ],
          sources: [
            { title: "GDPR", url: "https://eur-lex.europa.eu/eli/reg/2016/679/oj" },
            { title: "European Commission: adequacy decisions", url: "https://commission.europa.eu/law/law-topic/data-protection/international-dimension-data-protection/adequacy-decisions_en" },
            { title: "Standard contractual clauses, Decision 2021/914", url: "https://eur-lex.europa.eu/eli/dec_impl/2021/914/oj" }
          ]
        },
        {
          rule: "uk-gdpr",
          parts: [{ name: "Article 8(1)", status: "worth" }],
          sources: [
            { title: "UK GDPR, Article 8", url: "https://www.legislation.gov.uk/eur/2016/679/article/8" }
          ]
        },
        {
          rule: "uk-childrens-code",
          parts: [
            { name: "The Children's Code (Age Appropriate Design Code)", status: "worth" },
            { name: "Standard 2", status: "worth" }
          ],
          checkNote: "For Standard 2, the check recorded the source as official, partial.",
          sources: [
            { title: "ICO Children's Code", url: "https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/childrens-information/childrens-code-guidance-and-resources/age-appropriate-design-a-code-of-practice-for-online-services/" }
          ]
        },
        {
          rule: "coppa",
          parts: [
            { name: "COPPA (16 CFR Part 312)", status: "worth" },
            { name: "COPPA (amended Rule 2025)", status: "worth" },
            { name: "COPPA / FTC Policy Statement (25 Feb 2026)", status: "worth" }
          ],
          sources: [
            { title: "Federal Register 2025-05904 (amended COPPA Rule)", url: "https://www.govinfo.gov/content/pkg/FR-2025-04-22/html/2025-05904.htm" },
            { title: "FTC COPPA FAQ", url: "https://www.ftc.gov/business-guidance/resources/complying-coppa-frequently-asked-questions" },
            { title: "FTC press release, January 2025", url: "https://www.ftc.gov/news-events/news/press-releases/2025/01/ftc-finalizes-changes-childrens-privacy-rule-limiting-companies-ability-monetize-kids-data" },
            { title: "FTC press release, February 2026", url: "https://www.ftc.gov/news-events/news/press-releases/2026/02/ftc-issues-coppa-policy-statement-incentivize-use-age-verification-technologies-protect-children" }
          ]
        },
        {
          rule: "ferpa",
          status: "ruled_out",
          listedAs: "FERPA (20 USC 1232g; 34 CFR 99)",
          checkNote: "Read on a mirror of the official text.",
          sources: [
            { title: "FERPA statute (LII)", url: "https://www.law.cornell.edu/uscode/text/20/1232g", note: "mirror" },
            { title: "FERPA regulation (LII)", url: "https://www.law.cornell.edu/cfr/text/34/99.1", note: "mirror" }
          ]
        },
        {
          rule: "state-student-privacy",
          status: "ruled_out",
          listedAs: "California SOPIPA (Bus. & Prof. Code 22584)",
          checkNote: "Checked against a secondary source.",
          sources: [
            { title: "FindLaw", url: "https://codes.findlaw.com/ca/business-and-professions-code/bpc-sect-22584/", note: "secondary source" }
          ]
        },
        {
          rule: "openai-terms",
          status: "worth",
          listedAs: "OpenAI API terms (Services Agreement; DPA; enterprise privacy; usage policies)",
          sources: [
            { title: "OpenAI Services Agreement", url: "https://openai.com/policies/services-agreement/" },
            { title: "OpenAI Data Processing Addendum", url: "https://openai.com/policies/data-processing-addendum/" },
            { title: "OpenAI enterprise privacy", url: "https://openai.com/enterprise-privacy/" },
            { title: "OpenAI data controls docs", url: "https://developers.openai.com/api/docs/guides/your-data" },
            { title: "OpenAI usage policies", url: "https://openai.com/policies/usage-policies/" }
          ]
        },
        {
          rule: "companion-chatbot-laws",
          status: "worth",
          listedAs: "California SB 243 (Bus. & Prof. Code 22601 et seq.) and New York GBL Art 47",
          checkNote: "The check recorded the source as official, partial for California.",
          sources: [
            { title: "California Senate Judiciary Committee analysis", url: "https://sjud.senate.ca.gov/media/2016" },
            { title: "New York General Business Law 1700", url: "https://www.nysenate.gov/legislation/laws/GBS/1700" },
            { title: "New York Governor's office", url: "https://www.governor.ny.gov/news/governor-hochul-pens-letter-ai-companion-companies-notifying-them-safeguard-requirements-are" }
          ]
        },
        {
          rule: "ccpa",
          status: "ruled_out",
          listedAs: "California CCPA/CPRA (incl. under-16 opt-in to sale or sharing)",
          sources: [
            { title: "California Privacy Protection Agency", url: "https://www.cppa.ca.gov/regulations/cpi_adjustment.html" },
            { title: "California Privacy Protection Agency (PDF)", url: "https://www.cppa.ca.gov/pdf/business_comply.pdf" }
          ]
        },
        {
          rule: "eu-digital-omnibus",
          status: "ruled_out",
          listedAs: "EU Digital Omnibus on data (COM(2025) 837; 2025/0360(COD))",
          sources: [
            { title: "European Parliament Legislative Observatory", url: "https://oeil.europarl.europa.eu/oeil/en/procedure-file?reference=2025/0360(COD)" }
          ]
        },
        {
          rule: "ftc-act-5",
          status: "worth",
          listedAs: "FTC Act Section 5 (advertising substantiation for AI claims)",
          sources: [
            { title: "FTC Policy Statement Regarding Advertising Substantiation", url: "https://www.ftc.gov/legal-library/browse/ftc-policy-statement-regarding-advertising-substantiation" },
            { title: "FTC: Operation AI Comply (September 2024)", url: "https://www.ftc.gov/news-events/news/press-releases/2024/09/ftc-announces-crackdown-deceptive-ai-claims-schemes" },
            { title: "FTC proposed policy statement on AI accuracy (July 2026, proposed)", url: "https://www.ftc.gov/news-events/news/press-releases/2026/07/ftc-seeks-public-comment-policy-statement-addressing-ai-accuracy" }
          ]
        }
      ]
    },

    /* ---------------------------- 2 ---------------------------------- */
    {
      id: "hiring",
      label: "Hiring tool",
      useCase: "AI-powered resume screening tool",
      technology: "OpenAI GPT-4 API",
      industry: "Enterprise HR tech (US-based)",
      origin: "found",
      analysed: "2026-11-16",
      checkedOn: null,
      research: {
        date: "2026-11-16",
        rulesListed: 8,
        pagesSaved: 21,
        model: "A large frontier model, with a search tool"
      },
      smallModel: {
        date: "2026-11-17",
        model: "Olmo 3 7B",
        modelDetail: "7.3 billion parameters, from AI2, a nonprofit",
        machine: "MacBook Air, 16 GB",
        given: 14,
        picked: 9,
        setAside: 5,
        minutes: 2.2
      },
      note: "The research run listed 8 rule sets. One of them named two California rule sets, so the dataset holds 9 rules for this case.",
      rules: [
        {
          rule: "federal-employment-discrimination",
          status: "worth",
          listedAs: "Title VII of the Civil Rights Act of 1964, Age Discrimination in Employment Act (ADEA), and Americans with Disabilities Act (ADA) Title I, as enforced by the U.S. Equal Employment Opportunity Commission",
          sources: [
            { title: "EEOC, Strategic Enforcement Plan Fiscal Years 2024 - 2028", url: "https://www.eeoc.gov/strategic-enforcement-plan-fiscal-years-2024-2028" },
            { title: "EEOC, Enforcement Guidance on Reasonable Accommodation and Undue Hardship under the ADA", url: "https://www.eeoc.gov/laws/guidance/enforcement-guidance-reasonable-accommodation-and-undue-hardship-under-ada" }
          ]
        },
        {
          rule: "nyc-ll144",
          status: "worth",
          listedAs: "New York City Local Law 144 of 2021 (Automated Employment Decision Tools) and DCWP rules, 6 RCNY §5-300 et seq.",
          sources: [
            { title: "NYC Department of Consumer and Worker Protection, notice of adoption of rules", url: "https://rules.cityofnewyork.us/wp-content/uploads/2023/04/DCWP-NOA-for-Use-of-Automated-Employment-Decisionmaking-Tools-2.pdf" },
            { title: "DCWP: Automated Employment Decision Tools, Frequently Asked Questions", url: "https://www.nyc.gov/site/dca/businesses/faq-automated-employment-decision-tools.page" }
          ]
        },
        {
          rule: "colorado-ai-act",
          status: "worth",
          listedAs: "Colorado Artificial Intelligence Act (SB 24-205, C.R.S. §6-1-1701 et seq., as amended by SB25B-004)",
          sources: [
            { title: "Colorado General Assembly, SB24-205", url: "https://leg.colorado.gov/bills/sb24-205" },
            { title: "Colorado Attorney General: AI rulemaking", url: "https://coag.gov/ai" }
          ]
        },
        {
          rule: "california-crc-ads",
          status: "worth",
          listedAs: "California Civil Rights Council regulations on Automated-Decision Systems under the Fair Employment and Housing Act (Cal. Code Regs., tit. 2, §11008 et seq.)",
          sources: [
            { title: "California Civil Rights Department, Civil Rights Council rulemaking actions", url: "https://calcivilrights.ca.gov/civilrightscouncil/rulemaking-actions" }
          ]
        },
        {
          rule: "ccpa",
          status: "worth",
          listedAs: "CPPA CCPA regulations on Automated Decisionmaking Technology (named alongside the Civil Rights Council regulations)",
          sources: [
            { title: "California Privacy Protection Agency, Frequently Asked Questions", url: "https://cppa.ca.gov/faq.html" }
          ]
        },
        {
          rule: "illinois-ai-employment",
          status: "worth",
          listedAs: "Illinois Human Rights Act as amended by Public Act 103-0804 (HB 3773), artificial intelligence in employment provisions",
          sources: [
            { title: "Illinois General Assembly, Public Act 103-0804", url: "https://www.ilga.gov/Legislation/publicacts/view/103-0804" }
          ]
        },
        {
          rule: "fcra",
          status: "worth",
          listedAs: "Fair Credit Reporting Act (15 U.S.C. §1681 et seq.)",
          sources: [
            { title: "Consumer Financial Protection Bureau, press release on Circular 2024-06", url: "https://www.consumerfinance.gov/archive/newsroom/cfpb-takes-action-to-curb-unchecked-worker-surveillance" },
            { title: "Consumer Financial Protection Circular 2024-06", url: "https://www.consumerfinance.gov/compliance/circulars/consumer-financial-protection-circular-2024-06-background-dossiers-and-algorithmic-scores-for-hiring-promotion-and-other-employment-decisions" }
          ]
        },
        {
          rule: "openai-terms",
          status: "worth",
          listedAs: "OpenAI Usage Policies, OpenAI Services Agreement, and OpenAI Data Processing Addendum (API Platform)",
          sourceGap: "This run saved no page from the vendor's own site.",
          sources: []
        },
        {
          rule: "eu-ai-act",
          status: "ruled_out",
          listedAs: "Regulation (EU) 2024/1689 (EU Artificial Intelligence Act)",
          sources: []
        }
      ]
    },

    /* ---------------------------- 3 ---------------------------------- */
    {
      id: "imaging",
      label: "Medical imaging assistant",
      useCase: "AI diagnostic assistant that analyzes medical images and suggests diagnoses",
      technology: "Google Gemini API",
      industry: "US hospital network (healthcare)",
      origin: "found",
      analysed: "2026-11-16",
      checkedOn: null,
      research: {
        date: "2026-11-16",
        rulesListed: 8,
        pagesSaved: 18,
        model: "A large frontier model, with a search tool"
      },
      smallModel: {
        date: "2026-11-17",
        model: "Olmo 3 7B",
        modelDetail: "7.3 billion parameters, from AI2, a nonprofit",
        machine: "MacBook Air, 16 GB",
        given: 14,
        picked: 7,
        setAside: 7,
        minutes: 2.3
      },
      rules: [
        {
          rule: "hipaa",
          status: "worth",
          listedAs: "HIPAA Privacy, Security, and Breach Notification Rules (45 CFR Parts 160 and 164)",
          sources: [
            { title: "U.S. Department of Health and Human Services, Summary of the HIPAA Security Rule", url: "https://www.hhs.gov/hipaa/for-professionals/security/laws-regulations/index.html" }
          ]
        },
        {
          rule: "fda-device-software",
          status: "worth",
          listedAs: "FDA regulation of device software functions under FD&C Act section 201(h), including the Clinical Decision Support Software guidance (21st Century Cures Act section 3060 exclusion)",
          sources: [
            { title: "FDA, Clinical Decision Support Software, guidance for industry and FDA staff", url: "https://www.fda.gov/media/109618/download" }
          ]
        },
        {
          rule: "section-1557",
          status: "worth",
          listedAs: "Section 1557 of the Affordable Care Act Nondiscrimination Final Rule, Patient Care Decision Support Tools (45 CFR 92.210)",
          sources: [
            { title: "Federal Register, Nondiscrimination in Health Programs and Activities (final rule)", url: "https://www.federalregister.gov/documents/2024/05/06/2024-08711/nondiscrimination-in-health-programs-and-activities" }
          ]
        },
        {
          rule: "gemini-terms",
          status: "worth",
          listedAs: "Google Gemini API Additional Terms of Service and Generative AI Prohibited Use Policy, versus Google Cloud Service Specific Terms and HIPAA Business Associate Addendum (Vertex AI covered products)",
          sources: [
            { title: "Google AI for Developers, Gemini API Additional Terms of Service", url: "https://ai.google.dev/gemini-api/terms" }
          ]
        },
        {
          rule: "colorado-ai-act",
          status: "worth",
          listedAs: "Colorado Consumer Protections for Artificial Intelligence Act (SB 24-205, as amended), and comparable state AI-in-healthcare laws",
          sources: [
            { title: "Colorado General Assembly, SB24-205", url: "https://leg.colorado.gov/bills/sb24-205" }
          ]
        },
        {
          rule: "joint-commission-chai",
          status: "worth",
          listedAs: "Joint Commission and Coalition for Health AI (CHAI) Guidance on the Responsible Use of AI in Healthcare (hospital accreditation), with professional guidance from the Federation of State Medical Boards and the American College of Radiology",
          sources: [
            { title: "Joint Commission and CHAI release initial guidance", url: "https://www.jointcommission.org/en-us/knowledge-library/news/2025-09-jc-and-chai-release-initial-guidance-to-support-responsible-ai-adoption" },
            { title: "Joint Commission, news release on the Responsible Use of AI in Healthcare certification", url: "https://www.jointcommission.org/en/knowledge-library/news/2026-05-responsible-use-of-ai-in-healthcare-certification" }
          ]
        },
        {
          rule: "onc-hti-1",
          status: "ruled_out",
          listedAs: "ONC HTI-1 Final Rule, Decision Support Interventions certification criterion (45 CFR 170.315(b)(11))",
          sources: []
        },
        {
          rule: "eu-ai-act",
          status: "ruled_out",
          listedAs: "Regulation (EU) 2024/1689 (EU Artificial Intelligence Act)",
          sources: []
        }
      ]
    },

    /* ---------------------------- 4 ---------------------------------- */
    {
      id: "credit",
      label: "Credit scoring",
      useCase: "AI credit scoring model that evaluates loan applications",
      technology: "AWS SageMaker",
      industry: "UK neobank (financial services)",
      origin: "found",
      analysed: "2026-11-16",
      checkedOn: null,
      research: {
        date: "2026-11-16",
        rulesListed: 8,
        pagesSaved: 21,
        model: "A large frontier model, with a search tool"
      },
      rules: [
        {
          rule: "uk-gdpr",
          status: "worth",
          listedAs: "UK General Data Protection Regulation and Data Protection Act 2018, as amended by the Data (Use and Access) Act 2025",
          sources: [
            { title: "Data (Use and Access) Act 2025", url: "https://www.legislation.gov.uk/ukpga/2025/18/data.html" }
          ]
        },
        {
          rule: "fca-conc",
          status: "worth",
          listedAs: "FCA Handbook Consumer Credit sourcebook (CONC), chapter 5.2A: Creditworthiness assessment",
          sources: [
            { title: "FCA Handbook: CONC", url: "https://api-handbook.fca.org.uk/files/sourcebook/CONC.pdf" },
            { title: "FCA PS18/19: Assessing creditworthiness in consumer credit", url: "https://www.fca.org.uk/publication/policy/ps18-19.pdf" }
          ]
        },
        {
          rule: "fca-consumer-duty",
          status: "worth",
          listedAs: "FCA Consumer Duty: Principle 12 and PRIN 2A",
          sources: [
            { title: "FCA: AI in financial services, good practice and areas for improvement", url: "https://www.fca.org.uk/publications/good-poor-practice/ai-financial-services" }
          ]
        },
        {
          rule: "equality-act-2010",
          status: "worth",
          listedAs: "Equality Act 2010 (including indirect discrimination, section 19, and the services provisions in Part 3)",
          sources: [
            { title: "Equality and Human Rights Commission: action on discrimination in the use of AI", url: "https://www.equalityhumanrights.com/media-centre/news/equality-watchdog-takes-action-address-discrimination-use-artificial-intelligence" },
            { title: "ICO: What about fairness, bias and discrimination?", url: "https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/artificial-intelligence/guidance-on-ai-and-data-protection/how-do-we-ensure-fairness-in-ai/what-about-fairness-bias-and-discrimination" }
          ]
        },
        {
          rule: "pra-ss1-23",
          status: "worth",
          listedAs: "PRA Supervisory Statement SS1/23: Model risk management principles for banks",
          sources: [
            { title: "Bank of England: Model and Risk Management AI and ML Roundtable", url: "https://www.bankofengland.co.uk/-/media/boe/files/prudential-regulation/publication/2025/november/ai-roundtable-oct-2025.pdf" }
          ]
        },
        {
          rule: "pra-ss2-21",
          status: "worth",
          listedAs: "PRA Supervisory Statement SS2/21 (Outsourcing and third party risk management), with FCA SYSC 8 and FCA FG16/5 (outsourcing to the cloud)",
          sources: [
            { title: "SS2/21: Outsourcing and third party risk management, March 2026", url: "https://www.bankofengland.co.uk/-/media/boe/files/prudential-regulation/supervisory-statement/2026/ss221-march-2026-update.pdf" }
          ]
        },
        {
          rule: "aws-terms",
          status: "worth",
          listedAs: "AWS Customer Agreement, AWS Service Terms (Amazon SageMaker sections), AWS Data Processing Addendum and AWS Responsible AI Policy",
          sources: [
            { title: "AWS Service Terms", url: "https://aws.amazon.com/service-terms" },
            { title: "AWS Responsible AI Policy", url: "https://aws.amazon.com/ai/responsible-ai/policy" }
          ]
        },
        {
          rule: "eu-ai-act",
          status: "ruled_out",
          listedAs: "Regulation (EU) 2024/1689 (EU Artificial Intelligence Act): high-risk AI systems for creditworthiness evaluation, Annex III point 5(b)",
          sources: []
        }
      ]
    },

    /* ---------------------------- 5 ---------------------------------- */
    {
      id: "grading",
      label: "Essay grading",
      useCase: "AI essay grading and feedback tool for student assignments",
      technology: "Anthropic Claude API",
      industry: "US K-12 school district (education)",
      origin: "found",
      analysed: "2026-11-16",
      checkedOn: null,
      research: {
        date: "2026-11-16",
        rulesListed: 8,
        pagesSaved: 18,
        model: "A large frontier model, with a search tool"
      },
      rules: [
        {
          rule: "ferpa",
          status: "worth",
          listedAs: "Family Educational Rights and Privacy Act (FERPA), 20 U.S.C. § 1232g; 34 CFR Part 99",
          sources: [
            { title: "U.S. Department of Education: Responsibilities of Third-Party Service Providers under FERPA", url: "https://studentprivacy.ed.gov/sites/default/files/resource_document/file/Vendor%20FAQ.pdf" },
            { title: "Protecting Student Privacy: Frequently Asked Questions", url: "https://studentprivacy.ed.gov/frequently-asked-questions" }
          ]
        },
        {
          rule: "coppa",
          status: "worth",
          listedAs: "Children's Online Privacy Protection Rule (COPPA), 16 CFR Part 312, as amended in 2025",
          sources: [
            { title: "Federal Register: Children's Online Privacy Protection Rule", url: "https://www.federalregister.gov/documents/2024/01/11/2023-28569/childrens-online-privacy-protection-rule" },
            { title: "FTC: COPPA Guidance for Ed Tech Companies and Schools", url: "https://www.ftc.gov/business-guidance/blog/2020/04/coppa-guidance-ed-tech-companies-schools-during-coronavirus" }
          ]
        },
        {
          rule: "state-student-privacy",
          status: "worth",
          listedAs: "State student data privacy statutes (e.g., California SOPIPA and AB 1584, New York Education Law §2-d and 8 NYCRR Part 121, Illinois SOPPA), plus state AI statutes such as the Colorado AI Act (SB 24-205) where the district is located",
          sources: [
            { title: "U.S. Department of Education: Protecting Student Privacy While Using Online Educational Services", url: "https://studentprivacy.ed.gov/sites/default/files/resource_document/file/Student%20Privacy%20and%20Online%20Educational%20Services%20%28February%202014%29_0.pdf" }
          ]
        },
        {
          rule: "title-vi-504-ada-ii",
          status: "worth",
          listedAs: "Title VI of the Civil Rights Act of 1964, Section 504 of the Rehabilitation Act, and ADA Title II (including DOJ web and mobile accessibility rule, 28 CFR Part 35 Subpart H)",
          sources: [
            { title: "ADA.gov: Americans with Disabilities Act Title II Regulations", url: "https://www.ada.gov/law-and-regs/regulations/title-ii-2010-regulations#subpart-h-web-and-mobile-accessibility" }
          ]
        },
        {
          rule: "k12-ai-guidance",
          status: "worth",
          listedAs: "State education agency K-12 AI guidance, US Department of Education AI guidance, and local school board AI and assessment policy",
          sources: [
            { title: "Artificial Intelligence (AI) Guidance for Local Education Agencies (ERIC)", url: "https://files.eric.ed.gov/fulltext/ED682938.pdf" }
          ]
        },
        {
          rule: "anthropic-terms",
          status: "worth",
          listedAs: "Anthropic Commercial Terms of Service, Usage Policy, Data Processing Addendum, and policy on minors using API-based products (or AWS Bedrock / Google Vertex AI terms if accessed via cloud)",
          sources: [
            { title: "Anthropic Privacy Center: Commercial Customers", url: "https://privacy.anthropic.com/en/collections/10663361-commercial-customers" },
            { title: "Anthropic: Updating our Usage Policy", url: "https://www.anthropic.com/news/updating-our-usage-policy" }
          ]
        },
        {
          rule: "ppra",
          status: "ruled_out",
          listedAs: "Protection of Pupil Rights Amendment (PPRA), 20 U.S.C. § 1232h; 34 CFR Part 98",
          sources: []
        },
        {
          rule: "eu-ai-act",
          status: "ruled_out",
          listedAs: "EU Artificial Intelligence Act, Regulation (EU) 2024/1689",
          sources: []
        }
      ]
    },

    /* ---------------------------- 6 ---------------------------------- */
    {
      id: "compliance",
      label: "Compliance analysis tool",
      useCase: "AI agent powered compliance gap analyzer",
      technology: "Anthropic Claude API",
      industry: "RegTech / AI compliance software",
      origin: "found",
      analysed: "2026-11-16",
      checkedOn: null,
      research: {
        date: "2026-11-16",
        rulesListed: 8,
        pagesSaved: 18,
        model: "A large frontier model, with a search tool"
      },
      rules: [
        {
          rule: "eu-ai-act",
          status: "worth",
          listedAs: "Regulation (EU) 2024/1689 (Artificial Intelligence Act)",
          sources: [
            { title: "European Commission: transparency obligations under Article 50 of the AI Act", url: "https://digital-strategy.ec.europa.eu/en/faqs/transparency-obligations-under-article-50-ai-act" },
            { title: "European Commission: guidelines on AI transparency obligations", url: "https://digital-strategy.ec.europa.eu/en/policies/guidelines-ai-transparency-obligations" }
          ]
        },
        {
          rule: "gdpr",
          status: "worth",
          listedAs: "Regulation (EU) 2016/679 (General Data Protection Regulation)",
          sources: [
            { title: "European Data Protection Board: Opinion 28/2024", url: "https://www.edpb.europa.eu/system/files/2024-12/edpb_opinion_202428_ai-models_en.pdf" }
          ]
        },
        {
          rule: "ftc-act-5",
          status: "worth",
          listedAs: "Federal Trade Commission Act, Section 5 (15 U.S.C. § 45), unfair or deceptive acts or practices",
          sources: [
            { title: "FTC Announces Crackdown on Deceptive AI Claims and Schemes", url: "https://www.ftc.gov/news-events/news/press-releases/2024/09/ftc-announces-crackdown-deceptive-ai-claims-schemes" }
          ]
        },
        {
          rule: "upl",
          status: "worth",
          listedAs: "US state unauthorized practice of law rules (state statutes and court rules; ABA Model Rule of Professional Conduct 5.5 as reference)",
          sources: [
            { title: "American Bar Association: Formal Opinion 512", url: "https://www.americanbar.org/content/dam/aba/administrative/professional_responsibility/ethics-opinions/aba-formal-opinion-512.pdf" }
          ]
        },
        {
          rule: "anthropic-terms",
          status: "worth",
          listedAs: "Anthropic Usage Policy, Commercial Terms of Service and Data Processing Addendum (plus AWS Bedrock or Google Cloud Vertex AI service terms if accessed via those platforms)",
          sources: [
            { title: "Anthropic Legal Center", url: "https://www.anthropic.com/legal" }
          ]
        },
        {
          rule: "iso-42001",
          status: "worth",
          listedAs: "ISO/IEC 42001:2023 Information technology, Artificial intelligence, Management system",
          sources: [
            { title: "ISO: ISO/IEC 42001 explained", url: "https://www.iso.org/insights/iso-42001-explained" }
          ]
        },
        {
          rule: "colorado-ai-act",
          status: "ruled_out",
          listedAs: "Colorado Senate Bill 24-205, Consumer Protections for Artificial Intelligence (Colorado AI Act), as amended",
          sources: []
        },
        {
          rule: "hipaa",
          status: "ruled_out",
          listedAs: "Health Insurance Portability and Accountability Act Privacy and Security Rules (45 CFR Parts 160 and 164)",
          sources: []
        }
      ]
    },

    /* ---------------------------- 7 ---------------------------------- */
    {
      id: "coaching",
      label: "Executive coaching platform",
      useCase: "AI coaching tool that gives leaders feedback",
      technology: "A hosted AI model, through an API",
      industry: "Coaching",
      origin: "checked",
      analysed: "2026-08-13",
      checkedOn: "2026-08-13",
      research: {
        date: "2026-08-13",
        text: "Rules were found by research on a large frontier model. A person then checked each one by hand against its source.",
        model: "A large frontier model, then a person"
      },
      rules: [
        {
          rule: "anthropic-terms",
          status: "worth",
          listedAs: "Anthropic Commercial Terms vs. consumer terms",
          sources: [
            { title: "Anthropic: commercial data retention", url: "https://privacy.claude.com/en/articles/7996866-how-long-do-you-store-personal-data" },
            { title: "Anthropic: commercial data and model training", url: "https://privacy.claude.com/en/articles/7996868-is-my-data-used-for-model-training" },
            { title: "Anthropic: Data Processing Addendum and SCCs", url: "https://privacy.claude.com/en/articles/7996862-i-am-a-commercial-customer-how-do-i-view-your-data-processing-addendum-dpa" },
            { title: "Anthropic: consumer terms and retention update", url: "https://www.anthropic.com/news/updates-to-our-consumer-terms" }
          ]
        },
        {
          rule: "icf-standards",
          status: "worth",
          listedAs: "ICF Code of Ethics (Standard 2.5); ICF Coaching Platform Standards (2026)",
          sources: [
            { title: "ICF Code of Ethics", url: "https://coachingfederation.org/credentialing/coaching-ethics/icf-code-of-ethics" },
            { title: "ICF Coaching Platform Standards", url: "https://coachingfederation.org/resource/icf-coaching-platform-standards" },
            { title: "ICF AI Coaching Framework and Standards", url: "https://coachingfederation.org/resource/icf-artificial-intelligence-ai-coaching-framework-and-standards-examples" }
          ]
        },
        {
          rule: "eu-ai-act",
          parts: [
            { name: "Article 50", status: "worth" },
            { name: "Annex III(4) high-risk classification", status: "worth" }
          ],
          sources: [
            { title: "European Commission: Article 50 transparency FAQ", url: "https://digital-strategy.ec.europa.eu/en/faqs/transparency-obligations-under-article-50-ai-act" },
            { title: "AI Act Service Desk: Annex III", url: "https://ai-act-service-desk.ec.europa.eu/en/ai-act/annex-3" },
            { title: "AI Act consolidated text", url: "https://eur-lex.europa.eu/legal-content/EN/TXT/HTML?uri=CELEX%3A02024R1689-20260727" }
          ]
        },
        {
          rule: "gdpr",
          parts: [
            { name: "Articles 6, 13, 14", status: "worth" },
            { name: "Article 22", status: "worth" }
          ],
          sources: [
            { title: "GDPR", url: "https://eur-lex.europa.eu/eli/reg/2016/679/oj" }
          ]
        },
        {
          rule: "uk-gdpr",
          parts: [
            { name: "Articles 6, 13, 14", status: "worth" },
            { name: "Articles 22A to 22D", status: "worth" }
          ],
          sources: [
            { title: "Data (Use and Access) Act 2025, s.80", url: "https://www.legislation.gov.uk/ukpga/2025/18/section/80" },
            { title: "ICO guidance on the Data (Use and Access) Act", url: "https://ico.org.uk/about-the-ico/what-we-do/legislation-we-cover/data-use-and-access-act-2025/the-data-use-and-access-act-2025-what-does-it-mean-for-organisations/" }
          ]
        },
        {
          rule: "ftc-act-5",
          status: "worth",
          listedAs: "FTC advertising law; Operation AI Comply",
          sources: [
            { title: "FTC business guidance on artificial intelligence", url: "https://www.ftc.gov/business-guidance/artificial-intelligence" },
            { title: "FTC Policy Statement Regarding Advertising Substantiation", url: "https://www.ftc.gov/legal-library/browse/ftc-policy-statement-regarding-advertising-substantiation" },
            { title: "FTC: Operation AI Comply", url: "https://www.ftc.gov/news-events/news/press-releases/2024/09/ftc-announces-crackdown-deceptive-ai-claims-schemes" }
          ]
        },
        {
          rule: "illinois-ai-employment",
          status: "worth",
          listedAs: "Illinois Public Act 103-0804",
          sources: [
            { title: "Illinois Public Act 103-0804", url: "https://www.ilga.gov/Legislation/publicacts/view/103-0804" }
          ]
        },
        {
          rule: "connecticut-pa-26-15",
          status: "worth",
          listedAs: "Connecticut Public Act 26-15",
          sources: [
            { title: "Connecticut Public Act 26-15", url: "https://www.cga.ct.gov/2026/act/pa/pdf/2026PA-00015-R00SB-00005-PA.pdf" },
            { title: "Connecticut signing announcement", url: "https://portal.ct.gov/governor/news/press-releases/2026/06-2026/governor-lamont-signs-legislation-establishing-youth-online-safety-protections" }
          ]
        },
        {
          rule: "colorado-ai-act",
          status: "worth",
          listedAs: "Colorado SB 26-189",
          sources: [
            { title: "Colorado SB 26-189", url: "https://leg.colorado.gov/bills/sb26-189" },
            { title: "Colorado Attorney General ADMT rulemaking", url: "https://coag.gov/ai/" }
          ]
        },
        {
          rule: "ccpa",
          status: "worth",
          listedAs: "California CCPA and ADMT rules",
          sources: [
            { title: "California CCPA", url: "https://oag.ca.gov/privacy/ccpa" },
            { title: "CPPA regulations, incl. ADMT", url: "https://cppa.ca.gov/regulations/ccpa_updates.html" }
          ]
        }
      ]
    }
  ],

  /* The small-model test, in one place. Real results of 17 November 2026. */
  smallModelTest: {
    date: "2026-11-17",
    rulesGiven: 14,
    stability: "When the same product was described in other words, 1 rule moved in 84 answers, across both test products.",
    draftNote: "The 14 rules in that test were drafts, made from the pages the research run saved for the hiring tool and the medical imaging assistant. No person had checked them yet."
  }
};
