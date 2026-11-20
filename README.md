# Offbeat

Three original puzzles for curious minds. Free daily and unlimited play, no sign-in, no API keys for players.

**[Play the arcade](https://Arthura0121.github.io/offbeat-arcade/)** · [Simple setup guide](docs/DEPLOY.md) · [AI and free hosting explained](docs/AI-AND-COSTS.md)

- **Rarebird:** five finite knowledge prompts. Less familiar accepted answers earn higher editorial scores. Clear scope, aliases, no lost turn for an unrecognized answer.
- **Fivefold:** five-letter word deduction in six guesses. Repeated letters handled correctly, physical and touch keyboards, 1,235-word independently selected starter dictionary.
- **Common Ground:** four original groups of four words; four mistakes, shuffle, selection feedback and “one away.”

All games have a shared UTC daily edition, unlimited practice, local progress, personal statistics and spoiler-free result sharing. Responsive layout, keyboard controls, focus indicators, modal focus management through native dialogs, reduced-motion support and no third-party fonts or analytics.

## Start locally

The downloadable ZIP also includes `Offbeat-play.html`: double-click it to try all three games without installing anything. This standalone copy embeds the same game and bank. Browser storage or clipboard access may be restricted for local files. Regenerate it with `npm run standalone` after code changes. Use the modular source for GitHub deployment.

Install Node.js 22 or newer from [nodejs.org](https://nodejs.org/), open a terminal in this folder, and run:

```sh
npm start
```

Open the printed address, normally `http://127.0.0.1:4173`. Stop with Ctrl+C. No `npm install` is needed. Opening `index.html` directly as a file will not work reliably because browsers restrict module imports; use the preview server or GitHub Pages.

```sh
npm test          # game rules, saved-state replay, bank checks, candidate validation
npm run check    # validate the published bank
npm run build    # create the static site in dist/
```

## Put it on GitHub Pages

See [the step-by-step guide](docs/DEPLOY.md). The included workflow checks the games, builds `dist/`, and deploys it. All asset paths are relative, so both project URLs and custom domains work. GitHub Pages serves only the game assets; AI tokens and maintenance scripts are not part of the built site.

## Puzzle content and honest limits

The starter bank contains 12 Rarebird topics, 1,235 words, and 12 complete grouping puzzles. Unlimited means no paywall or play cap; the finite bank eventually repeats. Word and grouping practice cycle through a shuffled bag before repeating. Rarebird samples five distinct topics per round; topics can recur in consecutive rounds.

Daily puzzles use a deterministic UTC date and immutable bank version. A day does not depend on a visitor's local time. Do not change an existing bank release in place: publish a new version, preferably at 00:00 UTC, and announce that it starts a fresh edition. New bank versions reset current-edition progress and statistics; old saved data remains in the browser. There is no automatic fresh-content generation in v1.

Rarebird is a factual finite-set game. Unknown answers are rejected without penalty, never guessed by an LLM. Its 10/25/50/100-point tiers are human editorial familiarity estimates, not measured rarity or objective difficulty. They are visible in the post-game answer review.

All scores are calculated from validated moves; stored scores and completion flags are ignored. This is **personal score correctness, not anti-cheat**: a static public website ships its solutions, and browser data can be edited. There are no global rankings, accounts, multiplayer or device syncing. [The backend path](docs/AI-AND-COSTS.md) explains what those would require.

## Add vetted content

Edit `data/bank.js`, run the checks, and review the content before releasing a new bank version. An optional Cloudflare Workers AI script and a manual GitHub Actions workflow create an **unreviewed draft artifact only**. They cannot edit or deploy the live bank. Read [the review workflow and free-tier comparison](docs/AI-AND-COSTS.md) before enabling it. AI is not required to run or play the arcade.

## Project map

- `src/engine.js`: deterministic puzzles, scoring, move validation, safe saved-state replay, bank validation.
- `src/app.js`, `style.css`, `index.html`: responsive arcade and game screens.
- `data/bank.js`: original starter puzzles, aliases, scope and factual source references.
- `scripts/`: preview, static build, validation and optional AI draft generation.
- `tests/`: meaningful game-rule and content-pipeline regression checks.
- `.github/workflows/`: Pages deployment and optional manual AI drafts.

Original branding, bird illustration, interface and puzzle sets. No affiliation with other puzzle publishers. Code and original content are provided under the MIT license; external references retain their own rights.
