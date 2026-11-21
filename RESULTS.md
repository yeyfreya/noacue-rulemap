# Results: small-model tests, November 2026

Two tests, run on 17 November 2026. Both asked one question: can a small open model, on a laptop, do the work the first version does on a large model?

Short answer: not as a straight swap. With a changed design, the early signs are good. The limits are at the end of this page, and they matter.

Failed attempts are on this page on purpose. This project shares what did not work.

## What was tested

| | Test 1: straight swap | Test 2: new design |
|---|---|---|
| What the small model did | Everything the large model does: list the rules, choose the sites to search, write the report | Two small jobs per rule: say if it is worth a look, then explain it with an exact quote |
| Where the rules came from | The model's memory | A dataset of 14 draft rules, given to the model one at a time |
| Models | Olmo 3 7B, Apertus 8B, Ministral 3 8B, Qwen 3.5 9B | Olmo 3 7B, Qwen 3.5 9B |
| Products | A hiring tool (resume screening, US) and a hospital tool (reads medical images and suggests diagnoses, US) | The same two |
| Web search | Yes | No |

In the new design, code does the rest. It loads the rules. It checks that every quote is copied word for word and that no new facts were added. It puts the report together. If an explanation fails the check twice, the report shows the rule's own text.

**Hardware and settings.** One MacBook Air (M5, 16 GB). All models ran on the laptop, at the same compression level (Q4_K_M). Model sizes: 7.3 to 9.0 billion parameters. Randomness was off (temperature 0, fixed seed 7), with a forced answer shape, so a run can be repeated. One model can think before it answers. That was turned off, so all four were treated the same.

## Results

| | Straight swap (4 models) | New design |
|---|---|---|
| Runs | 8 (4 models, 2 products). All finished, each report with all seven sections | 4 (2 models, 2 products) |
| Rules for the hiring tool | 3 of 4 models listed no hiring law. The fourth listed the federal agency and no state or city hiring law | Both models picked all 9 hiring rules and none of the 5 health rules |
| Rules for the hospital tool | All 4 listed HIPAA. 3 of 4 listed the FDA. None listed the nondiscrimination rule (Section 1557) | Both models picked 7 rules and skipped 7, with no hiring rules picked |
| Agreement with the draft answer key | Not measured this way | 13 of 13 (hiring) and 12 of 12 (hospital), both models |
| Same input, run again | Identical | Identical |
| Same product, reworded 3 ways | About half of each rule list changed | 1 rule moved in 84 answers, per model |
| Time per report | 2.6 to 6.0 minutes | 2.2 to 2.7 minutes |

For comparison, the large model's saved runs on the same two products took 2.7 and 2.9 minutes. Stability was measured on the step that lists or picks the rules, not on report writing.

### What failed in the straight swap

- **Wrong rules.** For a US hiring tool, three models listed health and EU privacy rules and no hiring law.
- **Wrong sites.** The search step expects plain site names. All four models wrote full web addresses instead, in every run. One hiring run drew 13 of its 21 search results from a news site about a health law. Two hospital runs drew all 24 of their results from open-web pages, such as vendor blogs.
- **Claims from memory.** The worst claims in the reports were not in the sources the model was given. Some cited article numbers that were not in those sources.
- **Rewording changed the answer.** Rules kept after rewording, out of 7 or 8 listed:

| Model | Hiring tool, rewordings 1, 2, 3 | Hospital tool, rewordings 1, 2, 3 |
|---|---|---|
| Olmo | 5, 5, 4 of 8 | 4, 4, 5 of 8 |
| Apertus | 3, unusable, 6 of 7 | 3, 4, 3 of 8 |
| Ministral | 4, 3, 4 of 8 | 6, 6, 7 of 8 |
| Qwen | 4, 3, 4 of 7 | 4, 3, 3 of 7 |

This count matches rules by name and is a little too harsh. One Apertus answer repeated one word until it ran out of room.

Every report looked complete. That is the risk: a finished report is not a right report.

### What the new design changed, and what it did not

- **Explanations.** Qwen: 16 of 16 passed the code checks on the first try. Olmo: 11 of 16 passed (2 of them after one retry). The other 5 were replaced by the rule's own text. In 4 of those, Olmo shortened the quote. In 1, it spoke to the reader as "you".
- **Some wording errors still get through.** Code can catch a wrong quote, a new number or name, and a voice break. It cannot catch a loose rewording or a guess written as a fact. Both models made a few of these.
- **One known flaw in the pick question.** On one rewording, Olmo dropped HIPAA for the hospital tool. The question asked about the product's activity and not the data it handles. Not fixed yet.
- **Speed.** About 4 to 7 seconds per pick question.

## Limits

- **The 14 rules were drafts.** No person had checked them against their sources. The answer key was a draft too.
- **The reports have not been scored.** The numbers above are machine checks. They do not show that any report is legally right.
- **The sample is small.** Two products, two to four models, one laptop, one day.
- **The test was easy in one way.** The 14 draft rules were written from these same two products. It shows a small model can tell hiring rules from health rules. It does not show how it does on a third product, or with many more rules.
- **Not tested:** the new design with Apertus or Ministral; stability of the explanation step; a laptop with 8 GB of memory.

## Where the files are

The test code and the 14 draft rules are being prepared for this repository and will be added under `experiments/small-model/`.

*This is not legal advice.*
