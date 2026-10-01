# /carousel — Instagram Carousel Builder (Higgsfield + Canva)

Build an Instagram carousel by: generating a slide-1 cover image with **Higgsfield MCP** (4:5), writing all slide text + per-slide image prompts into a markdown file with **locked character budgets**, generating **theme-matched 16:9 images** for the middle slides, then assembling the deck by duplicating a fixed **Canva template** and replacing its text + images. Always finishes by running `/short-form-caption` for the post copy.

## Topic: $ARGUMENTS

***

## Setup — customize these once before your first run

This command drives two MCP servers and one Canva template you control. Fill these in (search-and-replace the placeholders below, or keep a copy of this file in your own `~/.claude/commands/`):

| Placeholder | What to set it to |
|---|---|
| `<YOUR_CANVA_TEMPLATE_ID>` | The design ID of your 8-page Canva carousel template. **Fastest path:** open <https://canva.link/ydtbp6ujxt22m19> — Canva copies the ready-made template into your account — then paste its design ID + the link back to Claude so it knows what to duplicate and run off of. Or recreate the anatomy in `examples/template-reference/` (8 PNGs shipped with this repo) yourself; keep template and example folder 1:1. You can also point this at your own templates later (different layout/budgets/aesthetic) — just update the anatomy + character budgets below to match. |
| `<YOUR_BRAND_VOICE_FILE>` | Path to your brand/voice context file. See `config/brand-context.example.md` for the shape. |
| `<YOUR_HANDLE>` | Your Instagram handle for the closer slide (e.g. `@yourhandle`). |

**MCP prerequisites (both must be connected in Claude Code):**
- **Higgsfield MCP** — image + video generation. Get access: <https://higgsfield.ai/s/higgsfield-mcp-ig-charlieautomates-dBaWAw>
- **Canva MCP** — `https://mcp.canva.com/mcp` (add as an `http` MCP server, then `/mcp` → authenticate).

***

## Framework constants (do not invent — these are the source of truth)

- **Canonical example deck (ALWAYS load as the framework):** `examples/template-reference/` — 8 PNGs (`1.png`–`8.png`). Read these images at the start of every run so you mirror the exact layout, two-tone headline, orange highlight, glow image, and CAPS-word body pattern. This folder is the reference whenever you are unsure what a slide should look like.
- **Canva template (duplicate this every time):** design ID `<YOUR_CANVA_TEMPLATE_ID>`, an 8-page carousel template. The example folder above is literally this template exported, so they match 1:1. Don't have it yet? Grab the ready-made one at <https://canva.link/ydtbp6ujxt22m19> (opens a copy in your Canva), then set the ID above. The skill will also run off any custom template you build with different criteria — just keep its anatomy + budgets in sync with what's below.
- **Output root:** `content/carousels/{topic-slug}/` — one folder per carousel (relative to your project root).
- **Brand voice fallback:** `<YOUR_BRAND_VOICE_FILE>`.
- **Higgsfield model:** `nano_banana_2` (Nano Banana Pro). Never the deprecated standalone `nano-banana` MCP.

### Template anatomy (8 pages — what each slide is)

| Page | Role | Editable parts |
|---|---|---|
| 1 | **Cover** | Higgsfield **4:5** image as background + Canva text overlay (big two-tone headline + italic subtext block). Text is OPTIONAL per run. |
| 2…N+1 | **Pillars** (default 5, flex 4–6) | Two-tone headline `The [Role]: [ORANGE tool] [verb phrase].` + a **16:9** glow image in the middle + dark body line ending in ONE ALL-CAPS word. |
| N+2 | **Gift / CTA** | `The Gift: Free [thing] drops in your DMs` + `Comment {KEYWORD} and I'll send {deliverable}. No catch (promise).` |
| N+3 | **Closer** | `SAVE / SHARE / FOLLOW` + `<YOUR_HANDLE>` brush. **Static — never edit.** |

### Character budgets (measured from the live template — HARD caps)

- **Pillar headline** (whole string incl. `The [Role]:` and the rest): **45–58 chars.** Exactly ONE highlighted span (the tool/noun) which renders orange.
- **Pillar body:** **65–80 chars.** Ends with ONE word in ALL CAPS for emphasis.
- **Cover headline:** short two-part stack, e.g. `Claude Code + APIFY` (≤ ~22 chars).
- **Cover subtext:** 3–4 short italic lines, last 1–2 in parentheses (a value hook + an "(for free)"-style kicker).

Why this matters: the Canva text boxes are sized for these lengths. Go over and the text reflows, the slide no longer matches the deck, and the carousel breaks visual unity. If a draft line is out of range, rewrite it BEFORE generating anything.

***

## Workflow (interview-first, approval-gated)

### Step 0 — Load the framework
**Template check first.** If `<YOUR_CANVA_TEMPLATE_ID>` is still the placeholder (not yet replaced with a real design ID), STOP and tell the user, verbatim:

> You need a Canva template before I can assemble the deck. Grab the ready-made one here: **https://canva.link/ydtbp6ujxt22m19** — opening it drops a copy into your own Canva. Then paste me the **design ID + the link** and I'll duplicate that every run. (You can also point me at any other template you build with your own layout/budgets/aesthetic — just tell me what changed.)

Wait for the ID before continuing. Once you have it, use it as the template for the rest of this run (and offer to save it into this command so they only do it once).

Then read all 8 PNGs in `examples/template-reference/`. Internalize: light grid background, dark headline with one orange word, top-left red swipe-up arrow + bottom-right orange next arrow (these belong to the template — keep them), centered 16:9 image with a soft glow, dark body line with a trailing CAPS word.

### Step 1 — Interview the idea
If `$ARGUMENTS` is empty, ask: **"What's the carousel about?"**

Then capture the system in the template's shape — a topic broken into pillars, each pillar a component doing ONE job:
1. **Core topic / system** (the cover headline, e.g. "Claude Code + APIFY").
2. **Pillars** — 4 to 6 (default 5). For each: the role word (`Setup`, `Brain`, `Pipeline`, `Trust`, `Close`…), the tool/noun to highlight orange, and the one-job it does.
3. **CTA keyword + deliverable** for the Gift slide (e.g. keyword `ENGINE`, deliverable "the full setup with all links").
4. **Pillar count** (default 5; range 4–6).

Ask these as one grouped question. Do not start generating until answered.

### Step 2 — Cover image (Higgsfield, 4:5) — this becomes the THEME ANCHOR
**Ask BOTH of these FIRST, before generating anything:**
1. **Reference images:** **"Do you have reference image(s) you want slide 1 to copy from (style, palette, subject)? Drop them, or describe the aesthetic and I'll generate from scratch."** If they drop references, upload EACH via `mcp__higgsfield__media_upload` → `mcp__higgsfield__media_confirm`, collect the `media_id`s, and pass them as `medias: [{value: "<ref_media_id>", role: "image"}]` on the cover generation so the options actually copy from them (end the prompt with *"Match the style, palette, and composition of the provided reference image(s)."*). Don't skip this — the references must be wired into the generation, not just acknowledged.
2. **Text or bare:** **"Will the cover have a text overlay (two-part headline + 3–4 italic subtext lines), or stay bare?"** If text → collect the headline + subtext now (within the cover budgets above); it becomes the page-1 Canva overlay. If bare → the page-1 text elements get deleted later. Capture this decision before generating so the image is built to suit.

Then generate:
3. Generate **3–4 cover options** with `mcp__higgsfield__generate_image`, `model: "nano_banana_2"`, `aspect_ratio: "4:5"`, `resolution: "2k"`, `count: 1` each, fired in ONE parallel batch (include the reference `medias` from step 1 if provided). Generate a **clean visual with NO baked-in text** (text goes on as a Canva overlay later, even when "text" was chosen).
4. Poll with `mcp__higgsfield__job_status` (`sync: true`). Download each via `results.rawUrl`, Read them, present to the user.
5. **User approves/picks one. This pick is the slide-1 approval gate.** The chosen cover is the **theme anchor for EVERY pillar image** — nothing in Step 4 generates until this is approved. Upload the chosen cover via `mcp__higgsfield__media_upload` → `mcp__higgsfield__media_confirm` to get its `media_id`; hold onto it (this is the anchor `media_id` Step 4 requires).

### Step 3 — Draft the MD, get approval (NO image gen yet)
Write `content/carousels/{topic-slug}/{topic-slug}.md`. For every slide include the copy AND a live character count so the user can see budget compliance:

```
## Slide 1 — Cover
- Image: cover/{chosen}.png  (4:5, theme anchor)
- Text overlay: YES | NO
- Headline: "Claude Code + APIFY"            (18 chars)
- Subtext:
    Build an Unlimited Lead Engine
    1,000s of Prospects in 10 Minutes
    (I sold this for $10,000)
    (for free)

## Slide 2 — Pillar: Setup
- Headline: The Setup: [Apify] scrapes thousands of leads in one click.   (57/58)
- Body: Pick a niche. Drop a city. Apify pulls every PROSPECT you'll ever need.   (70/80)
- 16:9 image prompt: <prompt that MATCHES the cover theme — see Step 4 rule>

… (one block per pillar) …

## Slide N+2 — Gift / CTA
- Headline: The Gift: [Free] training drops in your DMs
- Body: Comment ENGINE and I'll send the full setup with all links. No catch (promise).

## Slide N+3 — Closer  (STATIC, do not edit)
- SAVE / SHARE / FOLLOW  +  <YOUR_HANDLE>
```

Mark the orange-highlight word with `[brackets]`. Flag any line over budget in RED and fix before continuing. Pull voice from the brand-context file. **Show the draft and WAIT for approval or edits.**

### Step 4 — Generate the 16:9 pillar images (Higgsfield, THEME-LOCKED)
**Precondition: the slide-1 cover MUST be approved (Step 2.5) and its `media_id` captured. Never generate pillar images before slide 1 is approved.** For each pillar slide, generate one **16:9** image with `model: "nano_banana_2"`, `resolution: "2k"`, `count: 1`. Fire ALL pillar generations in ONE parallel batch for consistency.

**Theme-lock rule (mandatory, NO exceptions — this is the whole point of the redesign):** EVERY pillar image is ALWAYS based off the approved slide-1 cover. Pass the chosen cover's anchor `media_id` from Step 2 as `medias: [{value: "<cover_media_id>", role: "image"}]` on EVERY pillar generation, and end each prompt with: *"Match the color palette, lighting, art style, texture, and mood of the provided reference image exactly. Change only the subject described above."* This forces every middle image to inherit the cover's aesthetic. Without it the deck drifts. If the anchor `media_id` is missing, go back to Step 2 — do not generate pillars from a bare prompt.

Generate clean images — **do NOT bake a glow into the prompt.** The glow is a Canva element effect on the template's image frame; replacing the fill inside the frame keeps it. Poll, download to `slides/`, Read each to confirm no garbled artifacts. Regenerate just the bad ones.

### Step 5 — Build the Canva deck (duplicate template + replace)
1. **Copy the template** with `mcp__canva__copy-design` on `<YOUR_CANVA_TEMPLATE_ID>`. Select pages for the chosen pillar count:
   - **5 pillars** → copy all (pages 1–8).
   - **4 pillars** → copy `page_numbers: [1,2,3,4,5,7,8]` (drop one pillar page).
   - **6 pillars** → copy all 8, then duplicate one pillar page inside the editing transaction. If page-duplication isn't supported by the editing ops, tell the user and proceed with 5 + a note.
2. **Open an editing transaction** with `mcp__canva__start-editing-transaction` on the NEW design. It returns the `transaction_id` (reuse on every subsequent op) and the `pages` array (note which pages are `is_responsive` — those only allow `update_title`, `replace_text`, `update_fill`, `delete_element`, `find_and_replace_text`, which is all we need). Show the returned thumbnails to the user.
3. **Replace text** via `mcp__canva__perform-editing-operations`:
   - **Body lines + cover subtext:** `replace_text` on the whole element with the approved MD copy.
   - **Pillar headlines — preserve the orange word with `find_and_replace_text`, NOT `replace_text`.** `format_text` colors an ENTIRE element, so you cannot recolor a single word; whole-element `replace_text` would flatten the existing orange run. Instead change the headline a span at a time: `find_and_replace_text` the dark lead-in (e.g. "The Setup:" → "The Brain:"), `find_and_replace_text` the orange tool word (e.g. "Apify" → "Claude Code") which keeps that span's orange styling, and `find_and_replace_text` the dark remainder. If the new tool word differs in length/spacing and the orange styling drops, re-apply it with `format_text` color `#F26B3A`-ish (sample the exact hex from the template first).
   - Cover overlay: replace headline + subtext, or `delete_element` those text elements if the user chose "bare".
4. **Replace images with `update_fill` (this preserves the glow):**
   - Upload each image with `mcp__canva__upload-asset-from-url` → get its `asset_id`.
   - Cover (4:5): `update_fill` on the page-1 background image element with the cover `asset_id`.
   - Pillars (16:9): `update_fill` on each pillar's existing image element with that slide's `asset_id`. `update_fill` swaps the asset *inside the existing element*, so the frame's glow/shadow effect stays. Do NOT delete + re-insert the image (that loses the glow).
   - **Fallback** only if `update_fill` errors on an element: leave that placeholder, and hand the user the PNG from `slides/` with a "drag slide-N image into frame N" note. State clearly which path was taken per image.
5. **Preview + approval gate (required by Canva before commit):** show the user the updated page thumbnails and summarize the changes. Drafts are PERMANENTLY LOST if not committed, so get explicit approval, then call `mcp__canva__commit-editing-transaction` with the `transaction_id`. (If the user wants changes, keep editing in the same transaction; if they reject, `cancel-editing-transaction`.)
6. Capture the new design's `edit_url` + `view_url` from `get-design`. Write `content/carousels/{topic-slug}/canva-link.md` with both URLs + the source template ID `<YOUR_CANVA_TEMPLATE_ID>`.

### Step 6 — Output structure
```
content/carousels/{topic-slug}/
├── {topic-slug}.md        ← slide copy + char counts + 16:9 prompts + caption
├── cover/                 ← 4:5 cover options + the chosen one
├── slides/                ← 16:9 pillar images
└── canva-link.md          ← new Canva edit + view URLs, source template ID
```

### Step 7 — Caption (ALWAYS, every run)
Run **`/short-form-caption`** to produce the Instagram caption for this carousel. Feed it the topic + the pillar copy (or the source transcript if one exists) so the CTA keyword matches the Gift slide. Append the returned caption to the bottom of `{topic-slug}.md`.

***

## Anti-patterns (do not do)
- Do not bake the cover text into the Higgsfield image — it goes on as a Canva overlay (unless the user explicitly wants it baked).
- Do not generate pillar images WITHOUT the cover as a `medias` reference — that's how the deck loses its theme.
- Do not bake glow into the image prompts — glow is the Canva frame effect; replace the fill, keep the frame.
- Do not skip the MD approval gate — the user sees + approves all text (with char counts) before any image credits burn.
- Do not exceed the character budgets — over-budget text reflows the Canva boxes and breaks the deck.
- Do not edit the closer slide (SAVE / SHARE / FOLLOW + your handle) — it's static.
- Do not strip the template's swipe arrows — they're part of this template's design.
- Do not skip Step 7 — every carousel ends with a `/short-form-caption` run.

## Higgsfield notes
- **Prerequisite:** the Higgsfield MCP must be connected. If `mcp__higgsfield__*` tools aren't available at run time, stop at Step 2 and tell the user to connect Higgsfield before continuing — do NOT silently fall back to any other image generator (Nano Banana standalone is deprecated).
- `generate_image` is async → returns a `job_id`; poll `job_status` with `sync: true` (waits up to ~25s server-side). Final image at `results.rawUrl`.
- Reference image flow: `media_upload` → `media_confirm` → pass `media_id` via `medias: [{value, role: "image"}]` on the specific generation.
- Avoid the literal word "macOS" in prompts (trips content filters) — say "desktop app UI".
