# OpenKrillion renderer reuse

Offbeat reuses and adapts selected rendering code and independently generated pixel art from [VulcanEon/openkrillion.com-service](https://github.com/VulcanEon/openkrillion.com-service), researched at commit [33fdff48623fb4815e95081a1a1d41bd1902f99d](https://github.com/VulcanEon/openkrillion.com-service/tree/33fdff48623fb4815e95081a1a1d41bd1902f99d).

This is an independent MIT-licensed reconstruction, **not the original Krillion source code**. The upstream [README](https://github.com/VulcanEon/openkrillion.com-service/blob/33fdff48623fb4815e95081a1a1d41bd1902f99d/README.md) and [third-party notices](https://github.com/VulcanEon/openkrillion.com-service/blob/33fdff48623fb4815e95081a1a1d41bd1902f99d/THIRD_PARTY_NOTICES.md) explicitly distinguish it from the original game at krillion.io. The original game's [FAQ](https://krillion.io/faq) did not link a public source repository or a code reuse license during this research; none was found, rather than proving one cannot exist.

## Selected material and license

- Upstream public/ocean.mjs and public/seascape.mjs form the basis of src/vendor/ocean.js and src/vendor/seascape.js. Offbeat adapts asset paths, lifecycle, UI coupling and movement integration.
- Six original procedural SVG character illustrations are included under assets/ocean/. Their upstream generator is scripts/pixel-art.mjs; the upstream notices describe these as independently implemented original artwork.
- These selected files are covered by the upstream [MIT license](https://github.com/VulcanEon/openkrillion.com-service/blob/33fdff48623fb4815e95081a1a1d41bd1902f99d/LICENSE), copyright 2026 OpenKrillion contributors. Its full notice is retained in [assets/ocean/LICENSE.txt](../assets/ocean/LICENSE.txt).
- Offbeat retains its own Rarebird branding, bird mascot, puzzle bank, scoring, answer validation and cloud AI integration. Upstream effect identifiers are internal implementation names, not claims of affiliation.

No original-game answer snapshots, upstream reference-data synchronization, synthesized sounds, production analytics, provider brand marks or backend services were imported. The upstream MIT license does not relicense original-game reference snapshots; Offbeat uses its own puzzle material. The renderer makes no request to the original game.

## Font

VT323 Regular was obtained separately from the official [google/fonts ofl/vt323 directory](https://github.com/google/fonts/tree/main/ofl/vt323), using [VT323-Regular.ttf](https://github.com/google/fonts/blob/main/ofl/vt323/VT323-Regular.ttf) and [OFL.txt](https://github.com/google/fonts/blob/main/ofl/vt323/OFL.txt). Copyright 2011 The VT323 Project Authors. It is distributed under the SIL Open Font License 1.1; the unchanged font and full notice are bundled at assets/fonts/VT323-Regular.ttf and assets/fonts/OFL.txt. It is served locally, with no Google Fonts network dependency.

Downloaded TTF SHA-256: cf4de751ada78ceac033dbe16a687742939995b77bc2a052ae17a4957958594d.

