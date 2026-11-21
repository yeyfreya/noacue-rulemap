# The previous version: the AI Compliance Gap Analyzer

The code in this repository is the previous version of the project. Noacue Rulemap is the redesign that came out of it. See the [README](README.md).

The previous version takes three inputs (your AI use case, your technology and your industry), researches official sources, and writes a report of the potential gaps worth confirming. It has been open source and in use since February 2026. Example reports are in [`reports/`](reports/).

**How it handles your data.** It runs on a large hosted model and a hosted search tool, with your own keys. What you type is sent to those two providers. Rulemap is designed to work differently: see "How your data is handled" in the README.

The hosted demo of the previous version is locked for now. To try it, run it on your own machine.

## Run it locally

Prerequisites: Python 3.14+, an [Anthropic API key](https://console.anthropic.com/), a [Tavily API key](https://tavily.com/).

```bash
git clone https://github.com/yeyfreya/noacue-rulemap.git
cd noacue-rulemap

python -m venv venv
# Windows:
venv\Scripts\activate
# macOS/Linux:
source venv/bin/activate

pip install -r requirements.txt
```

Create a `.env` file in the project root:

```
ANTHROPIC_API_KEY = <your-anthropic-key>
TAVILY_API_KEY   = <your-tavily-key>
```

Web interface:

```bash
python -m streamlit run streamlit_app.py
```

Command line, with one of the saved scenarios (`hr`, `healthcare`, `fintech`, `education`, `regtech`):

```bash
python agent.py hr
```

## Not legal advice

The reports point at what is worth confirming. They are not legal advice. Results can vary between runs. Check anything you act on against the source.
