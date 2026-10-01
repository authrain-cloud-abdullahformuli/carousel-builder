# /short-form-caption — Instagram / TikTok / Reels Caption Builder

Turn a video transcript (or topic blurb) into a tight, punchy short-form caption. Output is ready to copy-paste straight into Instagram, TikTok, or Reels. `/carousel` calls this automatically as its final step, but you can run it standalone on any transcript.

## Input: $ARGUMENTS

Accept any of:
- A pasted transcript (plain text, any length)
- A path to a transcript file (`.txt`, `.md`, `.vtt`, `.srt`)
- A short topic blurb (1–3 sentences) if no transcript yet

**If `$ARGUMENTS` is empty, STOP and ask once:**
> "Paste the transcript or drop a file path."

Do not proceed without a transcript. Do not invent topic / mechanism / outcome.

***

## Setup — customize once

| Placeholder | What to set it to |
|---|---|
| `<YOUR_VOICE_FILE>` | Path to your voice fingerprint. This repo ships a starter at `config/voice-fingerprint.example.md` — copy it, fill it in from your own transcripts, and point this command at it. The richer the fingerprint, the more the output sounds like you. |
| Default CTA table | The fallback CTAs below reference one creator's lead magnets. Swap them for **your** deliverables before relying on the fallback. |

***

## Required output shape (NON-NEGOTIABLE)

```
Comment "<KEYWORD>" for <lead magnet / video / asset>

<Punchy opener line.>

<Problem line.>
<Setup line.>

<Turn / contrast.>

<Mechanism line — what the tool / system / fix does.>

<Outcome line.>
<Optional second outcome or kicker.>

#hashtag1
#hashtag2
#hashtag3
#hashtag4
#hashtag5
```

### Hard rules
1. **CTA at the top, always.** Format: `Comment "<keyword>" for <thing they get>`.
   - **Source of truth = the transcript.** Scan it for any explicit ask the creator makes ("comment X for Y", "drop a comment for Z", "link in bio for", "DM me for").
   - If the transcript states the CTA verbatim, use it verbatim.
   - If the transcript implies a deliverable (e.g. "I'll send you the playbook", "free template", "full breakdown video"), build the CTA around that exact deliverable.
   - The default-CTA table below is a FALLBACK only — use it only when the transcript gives no CTA hint at all.
   - Never recycle a CTA from another caption if the transcript points somewhere else.
2. **Exactly 5 hashtags.** One per line. No more, no fewer. Mix broad + niche, all topic-relevant.
3. **Length cap: 500 CHARACTERS MAX for the ENTIRE caption** (CTA + body + hashtags + line breaks, counted together). Hard ceiling. Count precisely; if at or over 500, cut until under. Write the draft to a temp file and run `wc -c` to verify before output if the visual estimate looks close.
4. **Fragments are correct.** Short lines. White space. One thought per line. Do NOT write paragraphs.
5. **No em dashes.** Ever. Use period, comma, semicolon, or line break.
6. **No markdown bold/italics** in the output. IG/TikTok strip them. Use line breaks for emphasis.
7. **No emojis** unless the user explicitly requests them.
8. **No hedging.** Drop "just / really / basically / actually / simply / maybe / kind of."
9. **No corporate filler.** No "in today's world," "let's dive in," "the truth is."
10. **Voice = your brand voice** (from `<YOUR_VOICE_FILE>`). Sharp, builder-energy, contrast-driven (problem → fix → outcome). The four reference examples below show STRUCTURE and RHYTHM only — never copy their phrasing.

***

## Default CTAs — FALLBACK ONLY (customize these for your offers)

Only use this table when the transcript gives ZERO CTA hint. If the creator names a deliverable in the transcript, build the CTA around that instead.

| Topic signal | Default CTA line |
|---|---|
| Claude Code skills / agents / cloud agents | `Comment "Agent" for the FULL 24/7 Claude Code Skill Playbook` |
| Claude Code tools / setup / workflows | `Comment "AI Agent" for my FREE Claude Code ToolKit & 40+ other Claude Code Guides & Templates!` |
| Claude remote / Claude desktop / Claude mobile | `Comment "AI Agent" for the Full Claude Remote Tutorial Video` |
| Job search / career / resume AI | `Comment "AI Agent" for the Career Ops Playbook and 40+ Free Claude Code Templates` |
| Knowledge graph / context engineering | `Comment "AI Agent" for my FREE Claude Code ToolKit & 40+ other Claude Code Guides & Templates!` |
| n8n / automation workflow | `Comment "Workflow" for the n8n Build Pack + 40+ Free Claude Code Templates` |
| General AI / tool spotlight | `Comment "AI Agent" for my FREE Claude Code ToolKit & 40+ other Claude Code Guides & Templates!` |

If none fit, invent a CTA matching the shape: `Comment "<1–2 word keyword>" for <specific asset>`. Keep keyword short and easy to type on mobile.

***

## Hashtag bank (pull 5, topic-matched)

**Always-safe core:** `#AItools` `#Automation` `#BuildInPublic`

**Claude Code / AI agents:** `#ClaudeAI` `#ClaudeCode` `#AIAgent` `#AIAgents` `#AIWorkflow`

**Productivity / business:** `#Productivity` `#Tech` `#SaaS` `#NoCode` `#LowCode`

**Career / job search:** `#JobSearch` `#CareerGrowth` `#Resume` `#TechJobs`

**Dev / builder:** `#DevTools` `#OpenSource` `#100DaysOfCode` `#Coding`

**Content / creator:** `#ContentCreator` `#CreatorEconomy` `#Marketing`

**Workflow tools:** `#n8n` `#Zapier` `#Make` `#Notion`

Pick 5 that genuinely match the transcript. Never repeat the same hashtag set across consecutive captions unless the topics are nearly identical.

***

## Workflow

### Step 1 — Ingest
- If `$ARGUMENTS` is a file path, read it.
- If transcript is long, identify: the hook, the problem stated, the fix/mechanism, the outcome / payoff.
- If `$ARGUMENTS` is a short blurb, work from it directly.

### Step 2 — Extract the spine (LOCKED ORDER)
Pull 4 things from the transcript. The caption MUST flow in this order:

1. **Pain hook** (1 sentence — sharp, specific pain derived from the transcript). This is the FIRST body line after the CTA. It calls out what the viewer is doing wrong / what leverage they're leaving on the table. Pull the pain from what the creator actually said, not a generic AI version of it.
2. **Outcome-oriented benefit** (1 sentence — what's possible once the pain is solved). State the result first, not the method.
3. **Short how-to / explanation** (2–4 lines — fragments — the actual moves or mechanism). Give the viewer something they can chew on, not a feature dump.
4. **Kicker / payoff** (1 short line — optional but usually present).

### Step 3 — Pick the CTA + 5 hashtags
**CTA priority order:**
1. Verbatim CTA in transcript → use it as-is.
2. Deliverable named in transcript (playbook, video, template, toolkit, breakdown) → build `Comment "<keyword>" for <that exact deliverable>` around it.
3. Strong topic match in fallback table → use that row.
4. None of the above → ask once: **"What's the lead magnet for this one?"** Then stop until answered.

**Hashtags:** pull 5 topic-matched from bank. No more, no fewer.

### Step 4 — Draft the caption (structural skeleton only)
Assemble in the exact shape above using the spine from Step 2. This draft is the SKELETON — bullet-like lines that map to opener / problem / turn / mechanism / outcome. Do not polish the prose here. Count words; aim for ≤ 80.

### Step 4.5 — Humanize via voice fingerprint (MANDATORY)
**Voice fingerprint:** `<YOUR_VOICE_FILE>` (see `config/voice-fingerprint.example.md` for the starter shape). This is the source of truth for tone, rhythm, and signature phrases.

Workflow:
1. Read the fingerprint above.
2. Rewrite the Step-4 skeleton applying the voice summary, sentence rhythm, signature phrases (deploy 2-3, never all), the pivot pattern, and the empty patterns to avoid.
3. Preserve:
   - The CTA line verbatim (the transcript's CTA wins over voice rewriting)
   - The fragment / line-break structure
   - The 80-word body cap
   - The 5 hashtags (do NOT humanize hashtags)
4. Re-run the diagnostic checklist (Step 5) before output. Every item passes or rewrite.
5. Re-count body words. Cut if over 80.

If you have the `humanizer` skill installed you can invoke it for the explicit two-step flow — point it at the fingerprint path above.

### Step 5 — Final QA before output
Run this checklist silently:
- [ ] CTA on line 1, format `Comment "X" for Y`
- [ ] Body ≤ 80 words
- [ ] 5 hashtags, one per line, at the bottom
- [ ] No em dashes
- [ ] No markdown formatting
- [ ] No emojis (unless requested)
- [ ] No "just / really / basically / actually / simply"
- [ ] Fragments and line breaks instead of paragraphs

### Step 6 — Output
Print the caption inside a single fenced code block so the user can copy-paste cleanly:

````
```
<full caption here>
```
````

Then one footer line: body word count, CTA used, hashtag set used.

**Optional — push to a Slack channel.** If you keep a "copy-paste" Slack channel for finished captions, post it there too via the Slack MCP (`mcp__slack__conversations_add_message`), body wrapped in a triple-backtick fence. This is OFF by default; enable it only if you have the Slack MCP connected and a target channel. Surface any Slack error and the unposted caption rather than silently dropping it.

***

## Reference voice (STRUCTURE + RHYTHM ONLY — never copy phrasing)

These four examples define the line breaks, fragment rhythm, and hashtag style. Match the SHAPE, write in your own voice.

**Example 1 — Career / AI resume tool**
```
Comment "AI Agent" for the Career Ops Playbook and 40+ Free Claude Code Templates

Applying everywhere is broken.

Companies use AI filters.
So flip it.

This tool finds roles that actually fit you
and rewrites your resume for each one.

Not spam.
Precision.

It reads job posts, compares them to your CV, and matches based on meaning, not keywords.

Less noise.
Better offers.

#AItools
#JobSearch
#Automation
#CareerGrowth
#Tech
```

**Example 2 — Claude Code Remote tutorial**
```
Comment "AI Agent" for the Full Claude Remote Tutorial Video

Most "AI remote control" tools overcomplicate everything.

Claude Code Remote just made them irrelevant.

Problem: messy installs, sketchy security, clunky workflows.

Fix: update Claude, enable remote in config, connect the app.

Outcome: direct control of your computer from one clean interface.

No hacks. No weird setups. Just works.

#AItools
#ClaudeAI
#Automation
#BuildInPublic
#AIAgent
```

**Example 3 — Knowledge graph**
```
Comment "AI Agent" for my FREE Claude Code ToolKit & 40+ other Claude Code Guides & Templates!

Claude doesn't "know" your business.

It rereads everything. Every session. Wasting tokens.

The fix: build a knowledge graph.

It maps your code, docs, and strategy into one connected system that persists.

Now Claude stops searching and starts understanding.

Result: faster answers, 70x fewer tokens.

#AItools
#ClaudeAI
#Automation
#Productivity
#AIAgents
```

**Example 4 — Cloud-based Claude Code skills**
```
Comment "Agent" for the FULL 24/7 Claude Code Skill Playbook

Most people use Claude Code ONLY as a local tool.

That's the bottleneck.

Turn your skills into cloud-based agents and now they run from anywhere, even your phone.

The setup is simple:
Skill -> Dashboard -> Managed Agent -> Connect everything

Your dashboard becomes the control center.
Your agent becomes the operator.

That's how you build AI systems that work without you sitting at your desk 24/7.

#AIAgents
#ClaudeCode
#Automation
#BuildInPublic
#AIWorkflow
```

***

## Common failure modes (avoid)

- Writing 3-sentence paragraphs instead of fragments
- Going over the 500-character total cap (always count, write to temp + `wc -c` if close)
- Using 4 or 6 hashtags instead of exactly 5
- Putting hashtags inline instead of one-per-line
- Starting with the hook instead of the CTA (CTA is line 1, always)
- Using em dashes
- Adding "Let me know what you think!" or other generic engagement bait that isn't tied to the asset
- Writing in second-person motivational coach voice ("You deserve better!")
- Hashtag overlap with content already used this week, vary the mix

### Banned opener patterns (do NOT use for the pain hook line)

These read as generic AI slop. If the draft starts with any of these shapes, REWRITE the hook from the transcript's actual pain:

- "Most people use X like a chatbot." (or any "Most people use X like a Y" comparison)
- "Most people use Claude Code wrong."
- "Most people don't know that…"
- "Here's what nobody tells you about…"
- "Let me show you…"
- "I'm going to share…"
- "In this post…"
- Any opener that names the tool generically and tells the viewer they're using it wrong without specifying HOW or WHAT they're leaving on the table

A good pain hook names a SPECIFIC behavior or missed leverage tied to the transcript. Example shape: "If your [tool] stops at [surface use], you're leaving [specific %] on the table."

***

## Out-of-scope

This command writes captions ONLY. It does not:
- Generate the video
- Post to IG / TikTok / Reels
- Schedule the post
- Generate thumbnails or covers
- Write longform descriptions
