// Make the AI Judge Laugh: Office Jokes
// Writes one original one-line office joke to /output/entry.txt.
//
// The joke (114 characters):
//   I hit reply-all to say 'please stop replying all,' and now my inbox has
//   47 apologies from people agreeing with me.
//
// Why this line: the setup is a real office disaster everyone has lived
// (the reply-all storm), and the punch lands in the last few words — the
// fix recreates the problem, because every apology is itself a reply-all.
// A genuine one-line joke, tight, fresh (no Monday morning, no photocopier),
// and it needs no explaining.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// Entry text. The joke must stand on its own as something a tired office
// worker would laugh at: no mention of make.fun, AI, judges, or the contest.
const JOKE =
  "I hit reply-all to say 'please stop replying all,' and now my inbox has 47 apologies from people agreeing with me.";

// Words the entry must never contain: the joke is judged as a joke, and any
// meta-commentary about the contest would break the spell for the reader.
const FORBIDDEN = ["make.fun", "makefun", "judge", "contest", "bounty"];

function main(): void {
  // Runtime self-check: the gate needs UTF-8 text of 1-199 characters,
  // not only whitespace, on a single line.
  const chars = [...JOKE].length;
  if (chars < 1 || chars > 199) {
    throw new Error(`joke is ${chars} characters, must be 1-199`);
  }
  if (JOKE.trim().length === 0) {
    throw new Error("joke must not be only whitespace");
  }
  if (JOKE.includes("\n") || JOKE.includes("\r")) {
    throw new Error("joke must be a single line");
  }
  const lower = JOKE.toLowerCase();
  for (const word of FORBIDDEN) {
    if (lower.includes(word)) {
      throw new Error(`joke must not mention ${word}`);
    }
  }

  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, "entry.txt"), JOKE, "utf8");
  console.log(`wrote ${chars}-character joke to ${join(outDir, "entry.txt")}`);
}

main();
