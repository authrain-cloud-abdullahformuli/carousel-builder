import { readFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';

let passed = 0;
let failed = 0;

function assert(condition, message) {
  if (condition) {
    console.log(`  ✓ ${message}`);
    passed++;
  } else {
    console.error(`  ✗ ${message}`);
    failed++;
  }
}

console.log('Running Carousel Builder verification tests...\n');

// 1. Check plugin metadata
try {
  const plugin = JSON.parse(readFileSync('./.claude-plugin/plugin.json', 'utf8'));
  assert(plugin.name === 'carousel-builder', 'plugin.json has correct name');
  assert(plugin.author?.name === 'Abdullah Formuli', 'plugin.json author is Abdullah Formuli');
  assert(plugin.commands?.length === 2, 'plugin.json lists 2 commands');
} catch (e) {
  assert(false, `plugin.json error: ${e.message}`);
}

// 2. Check marketplace metadata
try {
  const marketplace = JSON.parse(readFileSync('./.claude-plugin/marketplace.json', 'utf8'));
  assert(marketplace.owner?.name === 'Abdullah Formuli', 'marketplace.json owner is Abdullah Formuli');
} catch (e) {
  assert(false, `marketplace.json error: ${e.message}`);
}

// 3. Check commands
const carouselCmd = readFileSync('./commands/carousel.md', 'utf8');
assert(carouselCmd.includes('45–58 chars') || carouselCmd.includes('45-58 chars'), 'carousel.md enforces 45-58 char headline budget');
assert(carouselCmd.includes('65–80 chars') || carouselCmd.includes('65-80 chars'), 'carousel.md enforces 65-80 char body budget');

const captionCmd = readFileSync('./commands/short-form-caption.md', 'utf8');
assert(captionCmd.includes('500 CHARACTERS MAX') || captionCmd.includes('500 characters'), 'short-form-caption.md enforces 500 char max');
assert(captionCmd.includes('Exactly 5 hashtags') || captionCmd.includes('5 hashtags'), 'short-form-caption.md enforces 5 hashtags');

// 4. Check Open Agent Skills
assert(existsSync('./skills/carousel-builder/SKILL.md'), 'skills/carousel-builder/SKILL.md exists');
assert(existsSync('./skills/short-form-caption/SKILL.md'), 'skills/short-form-caption/SKILL.md exists');

// 5. Check reference templates (8 PNGs)
for (let i = 1; i <= 8; i++) {
  assert(existsSync(`./examples/template-reference/${i}.png`), `Reference slide ${i}.png exists`);
}

// 6. Character budget check helper test
function validateHeadline(text) {
  const len = text.length;
  return len >= 45 && len <= 58;
}

function validateBody(text) {
  const len = text.length;
  return len >= 65 && len <= 80;
}

function validateCaption(text) {
  return text.length <= 500;
}

const sampleHeadline = "The Architect: Cursor automates repetitive tasks.";
assert(validateHeadline(sampleHeadline), `Sample headline '${sampleHeadline}' (${sampleHeadline.length} chars) meets 45-58 char budget`);

const sampleBody = "Generate robust infrastructure scaffolding in seconds with zero manual GRIND.";
assert(validateBody(sampleBody), `Sample body (${sampleBody.length} chars) meets 65-80 char budget`);

console.log(`\nTests finished: ${passed} passed, ${failed} failed.`);
if (failed > 0) {
  process.exit(1);
}
