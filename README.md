# Noacue Rulemap

An open, checked map of the rules AI products face, for small teams with no legal budget.

**Demo: [yeyfreya.github.io/noacue-rulemap/rulemap-demo](https://yeyfreya.github.io/noacue-rulemap/rulemap-demo/)**

Small teams build AI products with no lawyer and no compliance person, and they cannot see which rules and AI risks they face. A team describes its AI use case. Rulemap researches and maps out which rules are worth a look, each with its source and an exact quote. Every checked rule adds to an open dataset, so the next team starts ahead.

## How it works

1. It looks in an open dataset of rules people have checked.
2. For what is new, it researches in real time: a search tool fetches official sources.
3. A small open model reads one rule or one page at a time and answers: is it worth a look for this use case, and what does it ask, quoted exactly. Code checks every quote.

The output is a report and a growing dataset.

## What is different

- **Private use builds public knowledge.** Each analysis is designed to run on the team's own laptop. The more Rulemap is used, the less research and compute each team needs.
- **AI researches, code checks.** Rulemap scopes a product description, then researches the rules worth a look: first in the open dataset, then online in official sources. Code, not AI, checks every quote against its source. No chatbot, no answers from memory.
- **Built to get the most from a small model.** The system breaks the work into small questions and hands the model checked sources to read. Reliability comes from the design, not from model size.

## How your data is handled

Rulemap is designed so that what you type stays on your laptop, in files you can delete. Nothing is shared unless you choose to contribute. A contribution holds only public information: the rule, its source, the industry and the AI use case category. No team is named.

## Where it stands today

- **The demo** replays real saved runs from seven use cases. Its dataset is a sample: 38 rules, 17 of them checked by a person. See [`DATASET.md`](DATASET.md).
- **A small model on a laptop** (Olmo 3 7B, on a 16 GB laptop) reads rules from the dataset, decides which are worth a look, and explains each with an exact quote. See [`RESULTS.md`](RESULTS.md).
- **The previous version, the AI Compliance Gap Analyzer,** is the code in this repository. It has been open source and in use since February 2026. Note: it does the research on a large hosted model, so it sends what you type to that provider. It taught us that a bigger model makes an answer more convincing, not more correct. Rulemap is the redesign that came out of that: built around small models for the same purpose.

## What we tested (November 2026)

| | Rulemap's design (7B model) | Small models swapped into the previous version (4 models) |
|---|---|---|
| Rules for a hiring tool | All 9 hiring rules found, no health rules | 3 of 4 models listed no hiring law |
| Same product, reworded | 1 answer in 84 changed | About half of the rule list changed |
| Time per report | 2.2 to 2.7 minutes | 2.6 to 6.0 minutes |

The 14 rules used in this test were drafts, not yet checked by a person, and the reports have not been scored. Details: [`RESULTS.md`](RESULTS.md).

## What is next

- Real-time research on a small model.
- More checked rules, from more real use cases.

## In this repository

| Path | What it is |
|---|---|
| `rulemap-demo/` | The demo page and its sample dataset |
| `DATASET.md` | What is in the sample dataset, and what each field means |
| `RESULTS.md` | The small-model test results, failed attempts included |
| `PREVIOUS-VERSION.md` | How to run the previous version, the AI Compliance Gap Analyzer |
| `agent.py`, `streamlit_app.py` and the files beside them | The code of the previous version |
| `CHANGELOG.md` | Version history |

## Contribute

Found a rule that is wrong or missing? Open an issue. We check it against the official source before anything changes. Code contributions are welcome too.

## Not legal advice

Rulemap points at what is worth a look. It is not legal advice, and it does not confirm that any product meets any rule. The dataset on the demo page is a sample. Check anything you act on against the source.

## Author and license

Built by **Freya Ye Yu**, Noacue. [LinkedIn](https://www.linkedin.com/in/yeyufreya/) · [Portfolio](https://www.yeyufreya.com/)

Open source. See [`LICENSE`](LICENSE).
