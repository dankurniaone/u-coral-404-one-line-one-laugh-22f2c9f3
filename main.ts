// One Line, One Laugh — u-coral-404-one-line-one-laugh-22f2c9f3
// Writes one sharp line (1-200 UTF-8 chars) to /output/entry.txt.
// The joke: a smartwatch praises 10,000 steps, but the wearer was
// sitting on a plane the whole time — the turn is that the watch
// counts turbulence as cardio. Specific, surprising, no setup wasted.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const LINE =
  "My smartwatch congratulated me on 10,000 steps. I was on a plane — it counts turbulence as cardio.";

// Gate self-check, kept as its own step so the entry fails loudly
// instead of writing a bad file: 1-200 chars, not only whitespace,
// single line, no leading/trailing space, valid UTF-8 round-trip.
function validate(line: string): number {
  const chars = [...line].length;
  if (chars < 1 || chars > 200) {
    throw new Error(`line is ${chars} chars, gate requires 1-200`);
  }
  if (!line.trim() || line.includes("\n") || line !== line.trim()) {
    throw new Error("line must be non-blank, single-line, unpadded");
  }
  if (Buffer.from(line, "utf8").toString("utf8") !== line) {
    throw new Error("line is not clean UTF-8");
  }
  return chars;
}

const chars = validate(LINE);

const outDir = process.env.OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const outPath = `${outDir}/entry.txt`;
writeFileSync(outPath, LINE, "utf8");
// Read back and verify the file holds exactly the line (no trailing newline).
if (readFileSync(outPath, "utf8") !== LINE) {
  throw new Error("round-trip check failed: entry.txt differs from the line");
}
console.log(`wrote ${chars} chars to ${outPath}`);
