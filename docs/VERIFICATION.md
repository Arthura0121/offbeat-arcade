# Verification of the first version

Verified locally on November 19, 2026 (America/New_York).

## Automated

`npm test`: all 12 tests passed. Coverage includes repeated-letter allocation, six-guess losses and win locking, finite Rarebird answer lookup and aliases, post-completion rejection, invalid saved-state replay, score recomputation, deterministic UTC dailies, practice bag cycling, all grouping-puzzle solutions, duplicate/wrong-group handling, starter bank integrity and rejection of malformed AI drafts.

`npm run check` and `npm run build` passed. The bank contains 12 rare-answer topics, 1,235 words and 12 grouping puzzles. The build has no third-party dependencies. A real AI request has not been tested: no Cloudflare credentials have been supplied.

## Browser checks

- Completed the full daily Rarebird round; rejected an unknown answer with no turn lost; confirmed case-insensitive answer aliases and a 400/500 result.
- Refreshed mid-round and resumed at the correct prompt and score.
- Completed Fivefold after a non-winning guess; confirmed colored letter feedback and the win result.
- Completed all four Common Ground groups with no mistakes; verified the solved groups are removed from the remaining tiles.
- Verified personal completed-round counts and spoiler-free copy feedback.
- Checked Common Ground at an actual 390-pixel layout viewport: document width 390 pixels, no horizontal overflow.

The tests establish game-rule behavior and personal score correctness, not protection against cheating. The answer bank is public and browser storage is user-controlled. AI draft structural validation does not prove factual truth or puzzle quality.
