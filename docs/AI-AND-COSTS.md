# Live AI and free operation

GitHub Pages hosts the frontend. Cloudflare hosts a separate Worker with a Workers AI binding named `AI` and KV namespace binding named `PUZZLES`. Players need no account, token or payment method. The public service address is in `src/config.js`; credentials never belong there.

## What AI does during play

**Answer checks:** the local answer bank and aliases are checked first. A unique one-character typo is suggested for explicit confirmation. When a submitted answer is unlisted and the service is connected, Rarebird pauses its timer and asks the backend to check it. The backend identifies the candidate entity, retrieves an English Wikipedia introduction from a fixed Wikipedia API host, and asks the model whether that evidence directly supports the exact prompt and scope. Accepted responses include the reference and explanation. They are labeled provisional. Missing evidence, ambiguous output, rate limits and outages do not mark an answer wrong or remove a life.

**AI remixes:** in Unlimited, choose theme/difficulty and **AI remix**. The live model chooses an entertaining seven-round plan from curated topics and compatible constraints (such as an English starting letter or a multiword name). The server constructs the actual question text and filters the vetted answer bank mechanically; it rejects invented option IDs, duplicate questions and invalid decks. This avoids relying on a second model to certify newly invented facts. Easy uses broader topics; mixed/hard can add constraints. The finite source bank still limits the universe of verified facts. Unlisted answers can be checked separately and remain provisional.

An accepted AI answer must include a verbatim quote found in the fetched reference that directly supports the conditions. For UN membership, the quote must mention the United Nations explicitly; being a country or an EU candidate is not enough. Lexical remix constraints are checked mechanically against the canonical answer, and closed curated sets require a recognized canonical answer. These checks reduce mistakes but do not prove an LLM’s semantic judgment is always right.

Daily play stays on the authored starter bank. The new Rarebird daily is balanced across difficulty levels. Fivefold and Common Ground use their existing original banks; they receive animation improvements but do not contact AI during play.

## Limits and cost controls

- Stay on **Workers Free**. The chosen model is `@cf/meta/llama-3.3-70b-instruct-fp8-fast`; confirm ongoing free eligibility when changing models.
- Workers AI currently includes 10,000 Neurons/day on Free. Extra usage requires upgrading; on Free, exhausted requests fail. This is not an unlimited AI allowance. Some other models require paid billing.
- Workers Free currently includes 100,000 requests/day and 10ms CPU per request. KV has its own free read/write/storage limits. These are shared account quotas, not guaranteed visitor counts.
- The application allows up to twelve AI-expedition requests and twenty answer-check requests per IP per UTC day. Households may share an IP. KV counters are eventually consistent and not an exact global abuse/security boundary; concurrent requests can exceed those approximate application limits.
- Accepted checks are cached for seven days. AI decks are cached by UTC day, theme, difficulty and one of four slots. Referenced expedition IDs remain usable for seven days. Concurrent requests in one isolate share an in-flight generation. Cache sharing reduces inference use; it does not guarantee unlimited fresh content.
- Provider calls have a timeout, limited output sizes, a fixed model, bounded inputs and no automatic retries. There is no paid upgrade, billing credential or fallback to a paid model in the application.
- AI availability does not determine whether the game can be played: curated rounds, hints and passing remain available.

Checked against official docs November 19, 2026. Free offerings and model availability can change; keep billing disabled and inspect quotas before enabling additional online features.

## Privacy and service boundaries

Requesting an AI remix sends the chosen theme and difficulty to Cloudflare and its AI model. Submitting an unlisted answer while connected, or choosing **Check with AI**, sends that answer and its prompt/scope to the same service. The backend may look up an English Wikipedia article to support the check. Gameplay progress and personal scores stay in the player's browser.

KV stores generated decks and successful answer-check results for up to seven days. Approximate rate-limit keys contain a hash of IP, date and operation, expiring after one day. That hash is not an anonymity guarantee. Hosting providers may retain standard access/invocation logs under their own policies. The app does not create accounts, run analytics or sell player data. Do not type personal or sensitive information into trivia answers.

CORS permits the GitHub Pages origin. CORS is not authentication: bots can spoof an Origin header. Only known topic IDs and stored generated rounds are usable; arbitrary model endpoints, arbitrary prompts and arbitrary external fetch hosts are not exposed. The service is recreational and not appropriate for high-stakes fact checking. No secret competitive solution bank or verified leaderboard is implemented.

## Deploy the backend on your own free Cloudflare account

1. Create a Worker named `offbeat-ai` (or choose your own unique name).
2. Create a KV namespace, for example `offbeat-puzzles`, and bind it to that Worker as **PUZZLES**.
3. Add a **Workers AI** binding named **AI**. If the provider presents additional model/service terms, read and accept those yourself only if you agree. Do not select paid models or enable billing.
4. Update the allowed GitHub Pages origin in `cloud/worker.js` for your account. In `cloud/wrangler.jsonc`, use your own namespace ID. IDs and public service URLs are configuration, not API secrets.
5. Run `npm run worker:bundle`, then paste `work/offbeat-worker.js` into Cloudflare's Worker editor and deploy. Alternatively deploy the modular entry point with the official Wrangler CLI using your own account authentication. Do not publish account tokens in this repository.
6. Update `AI_ENDPOINT` in `src/config.js` to the actual Worker URL. Visit `/status` to verify the two bindings are present. A successful status check does not prove inference: test a real generated round and an unlisted valid answer too.
7. Deploy the frontend using [the Pages guide](DEPLOY.md). Test AI from the actual allowed site origin; a local file or localhost does not satisfy production CORS.

When editing the backend bank or validation logic, rebuild and redeploy the Worker as well as the frontend so topic IDs stay aligned. Editing frontend files alone does not redeploy Cloudflare. Keep runtime secrets out of code and use only the minimal account permissions needed if you later add CI deployment.

## Optional maintainer batch drafting

The manual **Draft puzzles (optional AI)** GitHub workflow remains a separate authoring tool. It uses repository Actions secrets `CF_ACCOUNT_ID` and `CF_AI_TOKEN` only if you configure that workflow. It creates an unreviewed artifact; it cannot edit or deploy the live bank. Those secrets are not needed by the live Worker binding.

For trusted daily releases: verify every fact and source independently, check scope/aliases and answer coverage, assign familiarity estimates honestly, playtest ambiguity and appropriate difficulty, run the tests, and review the source change before publishing. Never claim AI confidence is observed rarity.

## Official references

- [GitHub Pages static hosting](https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages)
- [Workers AI pricing and free allocation](https://developers.cloudflare.com/workers-ai/platform/pricing/)
- [Workers AI bindings](https://developers.cloudflare.com/workers-ai/configuration/bindings/)
- [Workers limits](https://developers.cloudflare.com/workers/platform/limits/)
- [KV pricing and free limits](https://developers.cloudflare.com/kv/platform/pricing/)
- [KV consistency behavior](https://developers.cloudflare.com/kv/concepts/how-kv-works/)
