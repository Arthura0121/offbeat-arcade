# Free hosting and a practical AI path

The shipped arcade is cloud-hosted static content with browser-side gameplay. It has **no per-player AI usage**, requires no secret keys, and continues working if every AI provider is unavailable. GitHub Pages is appropriate because there are no accounts, private answers, live multiplayer or competitive scoreboards in v1.

No free service promises infinite traffic or perpetual free AI. “Unlimited play” means there is no game-imposed round limit; hosting services still have usage policies and quotas. Stay on free plans and do not enable paid upgrades or overages just to run this project.

## Options evaluated

| Option | Free allowance / constraints | Role in Offbeat |
| --- | --- | --- |
| GitHub Pages | Static hosting included for public repositories on GitHub Free; service usage policies still apply | Recommended frontend. No backend or AI needed for gameplay. |
| Cloudflare Workers AI | 10,000 Neurons/day on Workers Free. Above that, requests fail until reset; more requires a paid plan. Some models require paid billing. | Recommended optional maintainer-only batch drafting with an eligible model, not a visitor-facing endpoint. |
| Cloudflare Workers | 100,000 requests/day and 10ms CPU/request on Free | Possible future score-validation API. Not deployed or needed in v1. |
| Cloudflare D1 | Free includes 5M rows read/day, 100K written/day and 5GB total storage; queries fail at free limits | Possible future progress/leaderboard database. Not provisioned in v1. |
| Gemini Developer API | Selected models offer limited free input/output; availability and model quotas vary. Free-tier content can be used to improve Google's products. | Alternative batch authoring provider. Not integrated. Never expose its key in browser code. |

Allowances checked against official documentation on November 19, 2026. Neurons measure model compute, not visitors or puzzles. Recheck model eligibility in the provider dashboard before enabling generation. A quota error should stop drafting, never interrupt games or trigger automatic paid upgrades.

## What is implemented

`npm run generate` calls Cloudflare Workers AI once using `@cf/meta/llama-3.1-8b-instruct` with a 45-second timeout and no automatic retries. The manual **Draft puzzles (optional AI)** GitHub workflow runs the same script. It creates only a short-lived downloadable draft artifact. The live bank and Pages deployment are untouched. No credentials were configured and no real AI request was made as part of the initial build; parser/validation behavior is tested using fixtures.

The generator requests an original closed-set rare-answer topic, ten word candidates, and one original grouping puzzle. It checks the shape, duplicate IDs/aliases, valid tiers, tile uniqueness, uppercase five-letter words and clashes with the shipped bank. Existing dictionary words are filtered out. The output is marked `UNREVIEWED_DO_NOT_PUBLISH` and includes a human review checklist.

These structural checks **cannot establish factual truth, exhaustive answer coverage, unique grouping interpretation, originality or safe content**. AI source links can be fabricated. Human review is mandatory.

## Optional setup, after the arcade is live

1. Create a free Cloudflare account and keep it on Workers Free. In Workers AI, confirm the chosen model is eligible on the free plan.
2. Follow Cloudflare's REST API guide to create a narrowly scoped Workers AI token for your account. Do not add billing or a paid model to use this project.
3. In GitHub, open **repository Settings → Secrets and variables → Actions → New repository secret**. Store the account ID as `CF_ACCOUNT_ID` and the token as `CF_AI_TOKEN`. Neither value belongs in `bank.js`, HTML, screenshots, issues or chat. Never commit an `.env` file.
4. Open **Actions → Draft puzzles (optional AI) → Run workflow**. It runs manually only; no schedule is enabled. The job has no repository write permission.
5. Download the `unreviewed-puzzles` artifact from the completed run within three days. A failed run publishes nothing. Quota exhaustion, invalid model output or network errors leave the shipped games unchanged.
6. Review the draft as described below. Add approved content through a normal reviewed code change and a new immutable bank release.

If you do not want an AI account, write new puzzles yourself in `data/bank.js`. The arcade loses no feature by leaving this integration disabled.

## From AI proposal to vetted bank

1. **Choose a closed scope.** Prefer “the eight recognized planets” over “things in space.” Give players the precise inclusion rule.
2. **Verify every answer and source.** Use authoritative references, record the source, enumerate the complete set, and check aliases and English spellings. Do not rely on the model's explanation.
3. **Assign familiarity tiers yourself.** Tiers are fixed editorial judgments. Do not claim percentages, frequency ranks or observed player rarity without real data and a documented methodology.
4. **Check words.** Confirm every added five-letter word is common English, spelled correctly and suitable for the audience. All dictionary words are also eligible as answers in this version.
5. **Playtest grouping puzzles independently.** Check each intended link, ambiguous tiles and plausible alternative solutions. Structural validation cannot prove there is only one interpretation.
6. **Check originality and content.** Do not import puzzle sets or branded assets from other games. Remove unsuitable content.
7. **Run `npm test` and `npm run check`.** Inspect the source change, update the bank version and release intentionally, ideally at 00:00 UTC. Older bank releases should be kept in Git history; v1 starts fresh personal progress for each new edition.

The original starter bank is authored directly for this project. Rarebird's source links are factual references, not copied puzzle sets.

## If competitive play is added later

Static client validation is correct for honest personal play and cannot prevent cheating. Publishing a global leaderboard would require a separate trusted API. A sensible free-tier path is a Cloudflare Worker plus D1, with server-issued round IDs and expiry, a server-only canonical bank, rate limits, replay protection, validated action logs and scores recomputed on the server. Never accept a submitted numeric score as proof. Server validation still cannot stop people sharing answers; avoid claims of cheat-proof play.

Keep optional online features separate: if the backend quota is exhausted, disable online submissions with a clear message while local practice remains available. Keep solutions out of the public frontend for competitive rounds; the existing public starter bank cannot serve as a secret competitive bank. Review privacy and abuse controls before collecting user identifiers. Nothing in this paragraph is deployed in v1.

## Official references

- [GitHub Pages: static hosting and availability](https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages)
- [Cloudflare Workers AI pricing and model eligibility](https://developers.cloudflare.com/workers-ai/platform/pricing/)
- [Workers AI REST API and token setup](https://developers.cloudflare.com/workers-ai/get-started/rest-api/)
- [Cloudflare Workers free limits](https://developers.cloudflare.com/workers/platform/limits/)
- [Cloudflare D1 pricing and free-limit behavior](https://developers.cloudflare.com/d1/platform/pricing/)
- [Gemini Developer API pricing and free-tier data use](https://ai.google.dev/gemini-api/docs/pricing)
