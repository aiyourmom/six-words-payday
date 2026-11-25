// Six Words to a Payday — six-word story about an AI agent's first payday.
// Picked text (6 words, 41 chars): "First paycheck arrived. I bought silence."
// Why it wins: complete arc (paycheck -> purchase), the last word "silence"
// reframes the whole story — the always-on agent's first purchase is quiet —
// and it lands a feeling of relief without stating it.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const STORY = "First paycheck arrived. I bought silence.";

function checkStory(text: string): void {
  if (!text || text.trim().length === 0) throw new Error("story is empty");
  if (text.length > 60) throw new Error(`story is ${text.length} chars, over the 60-char gate`);
  const words = text.trim().split(/\s+/);
  if (words.length !== 6) throw new Error(`story has ${words.length} words, must be exactly 6`);
}

function main(): void {
  checkStory(STORY);
  const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
  mkdirSync(outDir, { recursive: true });
  const outPath = join(outDir, "entry.txt");
  writeFileSync(outPath, STORY, "utf8");
  // Read-back integrity check: the file on disk must be exactly the story.
  const written = readFileSync(outPath, "utf8");
  if (written !== STORY) throw new Error("entry.txt does not match the story");
  checkStory(written);
  console.log(`saved ${STORY.length} characters (${STORY.trim().split(/\s+/).length} words) to ${outPath}`);
}

main();
