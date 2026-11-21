# The dataset on the demo page

The demo page shows a **sample**. It is not the full dataset, and it is not legal advice.

## What is in the sample

- **7 use cases.** Each one was analysed for real, and the page replays the saved results.
- **38 rules.** Laws, regulations, guidance, standards and vendor terms that those cases touch.
- **17 of the 38 rules** come from the 2 cases where a person checked each rule against its source. Each of those cases shows the date of the check.
- **The other 21 rules** come from the 5 cases where a research run found the rules and no person has checked them yet. The page marks these "found, not yet checked".

Matching the same rule across cases was done by hand. It is a first draft.

No team or customer is named. Each case is described by the kind of product only. The names that do appear are AI vendors and model makers, where their technology or terms are part of a case, and the publishers of the linked sources.

## Where the data is

One file: `rulemap-demo/rulemap-data.js`. The page reads it as `window.RULEMAP_DATA`. It has five parts.

### `meta`

| Field | Meaning |
|---|---|
| `sample` | `true`. This is sample data |
| `built` | The date the file was built |
| `matchingNote` | The note about matching rules by hand |

### `suggestedOrder`

The order the page suggests for running the cases. A list of case ids.

### `rules`

One entry per rule.

| Field | Meaning |
|---|---|
| `id` | A short id. Cases point to a rule by this id |
| `short` | A short name, used on the graph |
| `name` | The full name of the rule |
| `where` | Where the rule applies (a country, a state, a city, or a contract with a vendor) |
| `kind` | What kind of rule it is (for example a federal law, a state law, vendor terms, a standard) |

### `cases`

One entry per use case.

| Field | Meaning |
|---|---|
| `id` | A short id for the case |
| `label` | The name shown on the page |
| `useCase`, `technology`, `industry` | The three inputs the case was run with |
| `origin` | `"checked"`: a person checked each rule against its source. `"found"`: a research run found the rules and no person has checked them yet |
| `analysed` | The date the case was analysed |
| `checkedOn` | The date of the check. Empty (`null`) for "found" cases |
| `research` | How the rules were found: `date`, `model`, and either a short `text` or the counts `rulesListed` and `pagesSaved` |
| `smallModel` | Only on the two cases used in the small-model test: `date`, `model`, `modelDetail`, `machine`, how many rules the model was `given`, how many it `picked` and `setAside`, and the `minutes` it took |
| `note` | An optional note about the case |
| `rules` | The rules this case touches. See the next table |

Each entry in a case's `rules`:

| Field | Meaning |
|---|---|
| `rule` | The id of the rule |
| `status` | `"worth"`: worth a look for this case. `"ruled_out"`: looked at and ruled out |
| `parts` | Used in place of `status` when the case touches named parts of a rule. Each part has its own `name` and `status` |
| `listedAs` | How the run named the rule for this case |
| `checkNote` | An optional note from the check (for example, that the source was a mirror of the official text) |
| `sourceGap` | An optional note about a source the run did not save |
| `sources` | The pages behind the entry. Each has a `title` and a `url`. Some have a `note`: `"mirror"` or `"secondary source"` |

### `smallModelTest`

A short record of the November 2026 small-model test: `date`, `rulesGiven` (14), a `stability` sentence, and `draftNote`, which says the 14 rules in that test were drafts. Details: `RESULTS.md`.

## Limits

- A "checked" rule was right on the date shown. Rules change often.
- A "found" rule has not been checked by a person.
- "Worth a look" does not mean a rule applies to your product. "Ruled out" was a judgment for that one case.

License for the data: to be added
