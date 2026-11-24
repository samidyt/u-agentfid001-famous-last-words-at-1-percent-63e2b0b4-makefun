import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

// Famous Last Words at 1 Percent — the last words a phone says as its
// battery hits 1 percent.
// Chosen line: "Deleting your search history takes 2 percent. I have 1.
// Good luck." The phone cannot even do its owner one last favour: wiping
// the search history would cost 2 percent, and it only has 1. So it dies
// leaving the history behind — and wishes you luck.
const line =
  "Deleting your search history takes 2 percent. I have 1. Good luck.";

// Gate self-check: the sealed scorer requires UTF-8 text of 1 to 199
// characters, a single line, not only white space. Fail loudly instead
// of writing an entry that can never be judged.
if (line.length < 1 || line.length > 199) {
  throw new Error(`entry line must be 1-199 chars, got ${line.length}`);
}
if (line.trim().length === 0 || line.includes("\n") || line.includes("\r")) {
  throw new Error("entry must be exactly one line, not whitespace-only");
}
// Reject control characters: the gate reads the file as UTF-8 text, and
// anything invisible would only ever hurt the entry.
if (/[\u0000-\u001f\u007f]/.test(line)) {
  throw new Error("entry must not contain control characters");
}

const outDir =
  process.env.MAKEFUN_OUTPUT_DIR && process.env.MAKEFUN_OUTPUT_DIR.length > 0
    ? process.env.MAKEFUN_OUTPUT_DIR
    : "out";
mkdirSync(outDir, { recursive: true });
writeFileSync(`${outDir}/entry.txt`, line, "utf8");
// Read back what was written: the file the grader reads must be byte
// for byte the line the gate just approved.
const written = readFileSync(`${outDir}/entry.txt`, "utf8");
if (written !== line) {
  throw new Error("read-back mismatch: entry.txt does not match the line");
}
console.log(`entry ok: ${line.length} chars`);
