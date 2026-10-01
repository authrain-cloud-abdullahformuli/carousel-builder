---
name: carousel-builder
description: Build branded Instagram carousels end-to-end: Higgsfield generates a theme-locked cover + middle images, character budgets keep copy on-template, and Canva assembles the deck.
---

# Carousel Builder

Build an Instagram carousel end-to-end:
1. Generate slide-1 cover image with **Higgsfield MCP** (4:5).
2. Write all slide text + per-slide image prompts into a markdown file with **locked character budgets**.
3. Generate **theme-matched 16:9 images** for the middle slides (passing the chosen cover as reference).
4. Assemble the deck by duplicating a fixed **Canva template** and replacing text spans and image fills.
5. Finish by running `/short-form-caption` for the post copy.

## Requirements
- **Higgsfield MCP**: `nano_banana_2` model for cover and pillar images.
- **Canva MCP**: `https://mcp.canva.com/mcp` for templated deck assembly.
- **Canva Template**: 8-page carousel template.

## Character Budgets (Hard Caps)
- **Pillar headline**: 45–58 characters (including `The [Role]:`, exactly 1 highlighted word).
- **Pillar body**: 65–80 characters (ends with 1 word in ALL CAPS).
- **Cover headline**: ≤ 22 characters.
- **Cover subtext**: 3–4 short italic lines.
- **Caption**: ≤ 500 characters total with exactly 5 hashtags.

## Workflow Execution
1. Check Canva template ID and brand context configuration.
2. Interview the topic into 4–6 pillars and CTA keyword.
3. Generate 3–4 4:5 cover options with Higgsfield; user selects the anchor.
4. Draft copy and validate character counts before image generation.
5. Generate 16:9 pillar images using the chosen cover as style reference.
6. Assemble in Canva via duplicate and `update_fill`.
7. Generate copy-paste caption with short-form-caption skill.
