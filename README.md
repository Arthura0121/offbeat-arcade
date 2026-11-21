# Offbeat

**[Play the arcade](https://arthura0121.github.io/offbeat-arcade/)** · [Publish it yourself](docs/DEPLOY.md) · [Live AI, privacy and free limits](docs/AI-AND-COSTS.md)

Three original browser puzzles, free daily and unlimited play, no player accounts or keys.

## Rarebird: The Midnight Dive

A pixel-ocean expedition with an original bird pilot, moving depth zones, staged plunges, tier-specific effects and a dive recap. The independently implemented OpenKrillion renderer and selected artwork are reused under MIT; see [credits and provenance](docs/OPENKRILLION-REUSE.md). No audio is included. Seven prompts per dive; every point explores another ten metres.

- Classic: 30 seconds per round, three lives. Only a timeout costs a life. Pass for zero points without losing a life.
- Relaxed: no timer. Unlimited includes difficulty choices and nature, world, culture and science themes.
- Hints show a familiar accepted answer and cap that round at 25 points.
- Exact names and listed aliases work immediately. A unique one-character spelling match is offered for confirmation, never silently substituted.
- Unlisted answers offer an optional, cancellable **AI review**. Accepted reviews are cached locally for seven days, matched to the full question semantics, for immediate reuse. The timer pauses while checking; uncertainty or service failure never marks an answer wrong or costs a life.
- **AI expedition** in Unlimited prepares ahead of play and saves four variations per theme/difficulty for quick reuse. It asks AI to compose seven rounds from vetted topics and compatible letter/word constraints. Prompts and accepted examples are then constructed and checked by the server. Extra AI-checked answers remain provisional; AI can still make judgment errors.

The local starter bank now has **40 topics**, including broad everyday prompts with 973 accepted answers and 187 additional aliases, including all 193 UN members. Its familiarity tiers remain estimates, not measured player popularity. Daily Rarebird balances four easy, two mixed and one hard prompt. The new `dive-2` rules begin a fresh Rarebird edition; existing Fivefold and Common Ground daily choices and progress remain compatible.

## Fivefold and Common Ground

Fivefold offers five-letter deduction with correct repeated-letter handling, physical/touch keyboards and staggered tile flips. Its original starter dictionary contains 1,235 common words.

Common Ground offers twelve original grouping puzzles, four mistakes, selection pops, shuffle motion, wrong-group feedback and animated solved groups. Both retain daily and unlimited play, local progress and spoiler-free sharing. Reduced-motion settings disable decorative movement throughout the arcade. Sound is off by default and can be enabled in Rarebird.

## Try or edit locally

The downloadable ZIP contains `Offbeat-play.html`: double-click it for a standalone copy with curated gameplay. Browser restrictions can limit file-based storage and cloud AI; use the hosted site for live AI.

For the modular source, install [Node.js 22+](https://nodejs.org/), open a terminal here, and run:

```sh
npm start
```

Open the printed address. No dependency installation is needed.

```sh
npm test                # game rules, saved-state replay, AI shapes and service failure paths
npm run check           # starter bank integrity
npm run build           # static GitHub Pages site in dist/
npm run standalone      # standalone HTML copy
npm run worker:bundle   # one-file backend for the Cloudflare dashboard
```

## Hosting and AI

The frontend deploys from GitHub to GitHub Pages. The live AI service is a separate Cloudflare Worker using Workers AI and a KV puzzle cache. It accepts only known local topics or server-created expedition IDs; visitors cannot submit arbitrary system prompts or model choices. No provider token is shipped to players. Source is in `cloud/worker.js`; `cloud/wrangler.jsonc` records the public binding configuration.

AI remixes are shared/cached by UTC day, theme, difficulty and one of four variations. Free-service usage is capped; local gameplay has no play cap and continues if AI is unavailable. See [the operational guide](docs/AI-AND-COSTS.md) for exact behavior, data retention, backend setup and limitations. Optional maintainer-only batch drafting is also preserved and never auto-publishes drafts.

## Score correctness and honest limits

Scores and lives are recomputed from validated moves. Hint caps, timeouts, aliases, input-bound AI review shapes and terminal-state checks are tested. AI-created decks and provisional review objects are bounded and checked before use. This is **personal score correctness, not anti-cheat**: the frontend and local data can be edited, and AI assessments are not guaranteed facts. There are no competitive leaderboards, multiplayer, synced accounts or claims of measured rarity.

Curated banks eventually repeat. Human review remains necessary for adding new trusted daily puzzles. Keep original release data in version control and change editions deliberately. Do not copy another publisher's branding, art, interface assets or puzzle sets.

Offbeat code and original puzzle sets are provided under MIT. Selected OpenKrillion rendering code/art retains its MIT notice; the locally hosted VT323 font retains its SIL OFL notice. Independent project; no affiliation with other puzzle publishers.
