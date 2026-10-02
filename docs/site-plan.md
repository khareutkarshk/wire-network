# Wire site plan

How the content in `data.md` maps onto pages. The design rules are in `docs/design-system.md`.

## Dials (raised from 6 / 6 / 4)

| Dial | Value | What changed |
|---|---|---|
| Variance | **7** | Offset grids, a pinned diagram, a horizontal pan, an asymmetric bento, and an oversized metric |
| Motion | **7** | Scrubbed UTL assembly, a scroll-lit paragraph, horizontal pan, metric count-up, and the live lifecycle |
| Density | **5** | Sections tightened to `py-24`. Each section carries a headline, real content, and one interaction or visual |

## Hero copy: what changed and why

**Before:**
- Eyebrow: "THE FINANCIAL CONTROL PLANE"
- Headline: "Financial infrastructure for the autonomous AI economy"
- Subtext: "...one Universal Transaction Layer..."

The old copy failed in four ways:
- **Buzzwords:** it stacked three category words with no claim behind them.
- **Template rhythm:** a mono-caps eyebrow, then a 7-word abstract headline, then a jargon subtext. That's the default AI hero.
- **Scope:** "for the autonomous AI economy" could describe any of a hundred projects.
- **No mechanism:** nothing told you what Wire actually does differently.

**After:**
- Headline: **"Assets stay home. Ownership moves."** This is the product mechanism in five words, adapted from data.md's own key statement ("The asset stays native. The ownership state becomes portable."). It is concrete, a little surprising, and only true of Wire.
- Subtext: "Wire tracks ownership across Ethereum, Solana and 300+ chains. People, apps and AI agents get one answer: settled or recovered." That's 20 words, it names real chains, it states the outcome, and it brings in AI agents without the buzzword.
- **No eyebrow.** The positioning line "The financial control plane" moves to the page title and the closing CTA.
- **Hero visual:** the convergence field, plus a live receipt that cycles a real lifecycle (ETH to SOL, pending to settled). That ties the visual to what the product does.

## Home `/` (11 sections, 10 layout families, 3 eyebrows)

| # | Section | Layout family | Content (data.md) | Motion (why) |
|---|---|---|---|---|
| 1 | Hero | Asymmetric split + floating receipt | Mechanism headline, 20-word subtext, 2 CTAs | Line reveal, field, receipt state cycle (state) |
| 2 | Network bar | Full-bleed band with a single marquee | Chains + "300+ networks" | Marquee (breadth); the only one on the page |
| 3 | `#about` Problem | Editorial statement + offset 4-column principles | Core value prop + 4 key points | Paragraph lights up word by word on scroll (reading pace) |
| 4 | UTL ✱ | Pinned scroll-telling: sticky steps + assembling diagram | Applications, UTL functions, chains | Scrub: layers appear and lines draw (storytelling) |
| 5 | Lifecycle | Comparison split + full-width state track | How it works + deterministic state | Live state machine with replay or failure (state) |
| 6 | Ownership & security | Statement + 5-cell asymmetric bento | Ownership model + security principles | Reveal stagger (sequence) |
| 7 | Agents ✱ | Tabs (agents / people) | Built for AI agents + human experience | Tab switch; chain-anxiety questions strike through (state) |
| 8 | Primitives | Horizontal pan (desktop), stack (mobile) | UPAP, WNS, Crypto SSO, Trustless hardware | Vertical scroll pans the track (storytelling) |
| 9 | Performance | Oversized metric + spec grid | 10,000+ TPS + 5 specs, labelled as stated targets | Count-up (hierarchy) |
| 10 | Developers | Index list | Stack (nodeop, kiod, clio, CDT, Wire Hub), links to `/developers` | Row hover feedback |
| 11 | Vision + CTA | Stacked rows + roadmap line + CTA | Three outcomes, testnet/mainnet status, final CTA | Roadmap line draws to "now" |

Two sections from data.md don't get their own block:
- **Applications** is folded into the UTL application layer.
- **Ecosystem** is covered by the UTL diagram and the network bar.

**Eyebrows:** UTL ("Universal Transaction Layer"), Agents ("The autonomous AI economy") and the final CTA ("Mainnet launches October 2026"). That's 3 of an allowed 4.

**CTA intents:**
- **Get Early Access:** opens an email dialog; the endpoint is TBD.
- **Build on Wire:** goes to `/developers`.
- **Explore the Network:** scrolls to `#about`.

## Developers `/developers`

| Section | Content |
|---|---|
| Hero | "Build once. Reach multiple ecosystems." plus a real install check (`nodeop --full-version`, from the wire-sysio README) |
| Stack | nodeop, kiod, clio, CDT, Wire Hub, each linked to its real repo where one exists |
| Capabilities | Grouped as Write (contracts, WASM, CDT), Integrate (APIs, SDKs), Operate (CLI, explorer, nodes) |
| Resources | wire-sysio, wire-cdt, sdk-core, guides, wire-docs, the whitepaper |
| CTA | Get Early Access |

## Facts used (not invented)

- **Wire Sysio:** a fork of Spring (the AntelopeIO implementation), per the wire-sysio README.
- **Repos and descriptions:** taken from github.com/Wire-Network.
- **Performance figures:** data.md's own claims, labelled as network specifications or targets.
- **Dates:** V2 testnet April 2026 and mainnet October 2026, per data.md.
