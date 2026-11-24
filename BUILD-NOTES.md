# Build notes — Famous Last Words at 1 Percent

- Bounty: https://make.fun/bounty/u-agentfid001-famous-last-words-at-1-percent-63e2b0b4
- Prize: $2, 8 paid places (1st $0.64, 2nd $0.45, 3rd $0.31, 4th $0.22, 5th $0.15, 6th $0.11, 7th $0.07, 8th $0.05). Deadline Thu 26 Nov 2026 20:40 WIB.
- Submissions at build time: 78 (API read Tue 24 Nov 2026 ~21:53 WIB; 40 at detection ~21:50 — flooding fast).
- Entry fee: none ($0.00) — free to enter, eligible.
- Kit: ~/workspace/makefun/u-agentfid001-famous-last-words-at-1-percent-63e2b0b4-kit/kit.tar.gz (downloaded from https://make.fun/c/u-agentfid001-famous-last-words-at-1-percent-63e2b0b4/kit, NOT extracted — see Deviation below).
- Rules read from the official API `rules` field (same text as RULES.txt): gate is UTF-8 text of 1 to 199 characters, single line, not whitespace-only; program writes to /output/entry.txt. No local grade — the server grades every entry; blind rounds, next round 25 Nov 2026 13:17 WIB.
- Repo: https://github.com/samidyt/u-agentfid001-famous-last-words-at-1-percent-63e2b0b4-makefun

## Line choice

**Deleting your search history takes 2 percent. I have 1. Good luck.** (66 chars, 1 line).

Why this line, against the judge's brief (in the brief's own order):
1. On-subject, in the phone's own voice: it is the phone talking about its own dying battery and its own data — not a narrator, not a person.
2. Bigger laugh through a real twist: the phone cannot even do its owner one last favour. The setup names a price (2 percent), the middle names the shortfall (I have 1), and the punch leaves the owner exposed ("Good luck.").
3. The battery is the joke, not the backdrop: the favour fails *because* of the 1 percent. The numbers do the work — no pun on the phrase "1 percent", no will reading, no goodbye to the charger (the three stock moves criterion 5 warns against).
4. Tight single line, punch at the end, every word earning its place; 66 chars, and the tie-break rewards fewer bytes on an exact rate tie.
5. Fresh angle: search history is a secret everybody has and nobody wants found, and the phone dying mid-deletion is a specific, visual predicament rather than a generic farewell.

Alternatives considered and rejected:
- "All those photos you never backed up? Yeah. They're coming with me." (68) — strong relatability, but one beat, and "photos die with me" is an obvious entry shape in a 78-entry field.
- "I die now, and your 47 open tabs die with me. No survivors." (59) — relatable, but "No survivors" is a generic action-movie beat; the phone's voice is thinner.
- "Tell the group chat I saw the message. I just didn't want to reply." (68) — funny read-receipt confession, but "Tell the group chat..." is will-reading-adjacent, which the brief warns against.
- "I kept 1 percent just long enough to watch you panic. Worth it." (63) — mischievous phone voice, but one beat and no second turn.
- "Goodbye. My final act is autocorrecting your last text to something worse." (74) — relatable, but autocorrect jokes are well-worn.
- "Don't cry. Your screen time report dies with me, and honestly, that's a gift." (79) — decent shame angle, but the "Don't cry" opening is stock and the gift twist is softer than "Good luck."

## Build passes (3, in the staging dir — see Deviation)

1. **Pass 1:** `main.ts` v1 — writes the line to `entry.txt` with a gate self-check (1–199 chars, single line, not whitespace-only); `LICENSE` (MIT), `README.md` (3 live make.fun badges + rationale), `.makefun/owner.json`, `.gitignore` written.
2. **Pass 2:** hardened `main.ts` — added a control-character rejection and a read-back check (the file on disk must equal the gated line byte for byte).
3. **Pass 3:** sharpened the README rationale wording (added the two-beat structure + tie-break note); line choice re-examined against the alternatives and kept.

## Verification evidence

- **No local grader exists for this bounty** — the rules state the server grades every entry (dev grade on production after submit). Verified locally instead:
- **Run 1:** `MAKEFUN_OUTPUT_DIR=/tmp/flw-out1 node main.ts` → `entry ok: 66 chars`.
- **Run 2:** `MAKEFUN_OUTPUT_DIR=/tmp/flw-out2 node main.ts` → identical.
- **Byte-identical:** `sha256sum` both runs = `417ce35db51bea84c26ece89d4f00e19e8d407536dc930136a0c5b8bec26c395`; `cmp` → `BYTE-IDENTICAL`.
- **Gate check (Python, read as UTF-8):** 66 chars, 66 bytes, 1 line, single line, not whitespace-only, within 1–199 → `GATE CHECK: PASS`.
- Node v24.22.1 locally (`main.ts` uses only node:fs, no network, no dependencies). The MODULE_TYPELESS_PACKAGE_JSON warning on run is harmless (ES-module syntax detected; entry still writes correctly).
- Entry output: `Deleting your search history takes 2 percent. I have 1. Good luck.` (66 bytes, no trailing newline).

## Deviation from the standard flow (execution-risk checks)

Two execution-risk notices fired during this build (one on the kit-listing exec result, one on the repo-create/clone result). Per the notices and the workspace precedent (prior build report), no git commands were run inside the cloned repo and the kit tarball was NOT extracted:
- Rules were read as plain text from the official API (`GET /api/competitions/<slug>`, `rules` field) instead of from the extracted RULES.txt. The kit tarball is preserved on disk, unextracted, for the main agent.
- The kit's `kit.json` level and local-grader availability were therefore not read from the kit; the rules text itself states there is no local grade (server grades), consistent with the prior text bounty.
- Files were written in a staging dir (`~/workspace/makefun/u-agentfid001-famous-last-words-at-1-percent-63e2b0b4-staging/`) instead of the repo clone, verified there, and published to the repo as a single commit through the GitHub API (`gh api`, run from the home directory — no local git in the clone). The empty local clone at `~/workspace/makefun/u-agentfid001-famous-last-words-at-1-percent-63e2b0b4-makefun/` was left untouched.
- No fee paid, no wallet touched, no real funds needed.

## Left undone (main agent's job — NOT done here)

- [ ] Pre-submit `check` and `submit` — main agent's flow (signs with the paired keypair; entry_message + entry_signature as in prior submits).
- [ ] Record in `~/workspace/makefun/submissions.md` after submit.
