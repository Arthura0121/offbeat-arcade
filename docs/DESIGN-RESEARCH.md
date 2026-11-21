# Expedition rebuild

Research checked 20 November 2026: https://krillion.io/faq and the live opening game sequence at https://krillion.io/.

The original creator describes merging reference datasets into prepared answer sets. Some rarity estimates use a familiarity database; others receive LLM assistance and a manual pass. The FAQ also documents aliases, missing valid answers, and intentional editorial selection of special answers. It does not document a live AI call on every guess. Prepared answer matching is therefore a supported architectural inference for the fast response, not a claim about their private backend implementation. Search results include independent imitations; those are not evidence about the original.

Observed presentation: world at the surface, a launch countdown before the answer clock, depth/score instruments, and a continuous descent. The current implementation adapts the independent MIT-licensed OpenKrillion ocean renderer and original pixel art, uses a new Offbeat bird pilot, and retains our own category bank and scoring. The earlier brass diving bell has been replaced. No proprietary original-game answer snapshots, sounds or source were copied. See OPENKRILLION-REUSE.md for pinned sources and notices.

The frontend keeps its canvas across prompt renders. A requestAnimationFrame loop interpolates depth and camera movement, draws parallax shoals, bubbles and changing encounters, and displays discovery particles. Reduced motion skips interpolation and particles. The launch countdown does not consume the answer clock. The old Web Audio oscillators and sound preference were removed entirely.

Local answers are synchronous. Cloud AI remains available for constrained, vetted question remixes and reference-supported unlisted-answer reviews. That review can take seconds and pauses the answer timer. It is provisional and can fail or be uncertain; the UI must not claim arbitrary answers are reliably covered or that ratings are measured player rarity. Current cloud free quotas still apply.
