# Carousel Builder — AI Coding Agent Guide

This repository contains the **Carousel Builder** plugin, commands, and open skills standard implementation for building branded Instagram carousels and high-converting short-form captions end-to-end directly in AI coding CLIs (Claude Code, Cursor, Codex, OpenCode, Antigravity CLI).

Maintained by **[Abdullah Formuli](https://github.com/authrain-cloud-abdullahformuli)** ([@abdullahformuli](https://x.com/abdullahformuli)).

## Core Concepts & Invariants

1. **Character Budget Enforcement**:
   - Pillar headlines: **45–58 characters** (exactly one highlighted orange word).
   - Pillar body: **65–80 characters** (ending with one word in ALL CAPS).
   - Cover headline: **≤ 22 characters**.
   - Cover subtext: **3–4 short italic lines**.
   - Captions: **≤ 500 characters** hard cap total (including CTA, body, and exactly 5 hashtags).

2. **Image Consistency (Higgsfield MCP)**:
   - Cover image generated at **4:5 aspect ratio**.
   - Chosen cover is passed as reference to all pillar images (**16:9 aspect ratio**) to lock theme, palette, and lighting without visual drift.

3. **Canva Assembly (Canva MCP)**:
   - Duplicates the 8-page template.
   - Updates text spans in-place without breaking formatting.
   - Updates images with `update_fill` so the frame glow styling remains intact.
   - Never commits until the user reviews and confirms the preview link.

## Directory Structure

| Path | Purpose |
|---|---|
| `commands/carousel.md` | Claude Code `/carousel` command prompt |
| `commands/short-form-caption.md` | Claude Code `/short-form-caption` command prompt |
| `skills/carousel-builder/SKILL.md` | Universal Open Agent Skill (`agentskills.io` standard) |
| `skills/short-form-caption/SKILL.md` | Universal Open Agent Skill for captions |
| `config/` | Brand context and voice fingerprint templates |
| `examples/template-reference/` | 8-slide reference deck images (`1.png` - `8.png`) |
| `index.html` | Live interactive carousel preview & character budget validator |
| `.claude-plugin/` | Claude Code plugin and marketplace manifests |

## Development & Testing

```bash
# Run local verification test
node test.mjs

# Serve the web preview
npx serve -l 8080 .
```
