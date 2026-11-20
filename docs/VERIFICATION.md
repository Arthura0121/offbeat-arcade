# Rarebird v2 verification

Verified November 19, 2026 (America/New_York).

## Automated checks

All **31 tests** pass, covering the three games, deterministic UTC dailies, retained word/group practice bags, save replay, aliases and explicit typo suggestions, seven-round completion, hint score caps, three-timeout termination, no penalty for unlisted answers, bounded input-linked provisional reviews, invalid AI decks, CORS, body-size limits, provider/quota failures and source-host restrictions.

Additional backend tests enumerate all constructed remix options and check that every accepted example satisfies its letter/word constraint. Invented plan IDs cannot become decks. Generated UN-membership rounds are tested for the same direct-reference retrieval as the base topic. A confident model verdict with an invented quote is rejected; a direct supporting reference can produce a provisional acceptance.

`npm run build`, starter-bank validation and standalone-script syntax checks pass. The bank contains 40 Rarebird topics, 815 accepted answers and 150 additional aliases, plus the existing 1,235 word guesses and 12 grouping puzzles.

## Browser checks

- Completed a seven-round relaxed dive at **450 points / 4,500 metres**.
- Checked a hint and its 25-point cap, then a one-character spelling suggestion that required explicit confirmation.
- Confirmed Fivefold applies its staggered `flip-letter` animation to all five newly revealed tiles.
- Confirmed Common Ground's one-away feedback, selected-tile behavior and solved-group `celebrate-group` animation.
- Checked the dive at a 390-pixel viewport: page width was 390, with no horizontal overflow.
- The stylesheet disables decorative animations and transitions under `prefers-reduced-motion`; sound is off by default.

## Real cloud tests

The deployed Worker reports both Workers AI and KV bindings ready. A real request to the supported free-tier model composed a seven-round nature/easy expedition from vetted topic options. A real reference-backed check accepted **Albania** for the UN-member-state prompt, despite its absence from the starter answer list, and included a supporting quotation found in the reference.

These checks establish personal game behavior and successful live inference. They do not establish anti-cheat protection, exhaustive answer coverage or infallible semantic AI judgment. Provider free limits can stop AI operations; curated rounds remain available. AI verdicts are provisional.

The Cloudflare dashboard confirmed **Free — Current plan**. No paid upgrade was selected.
