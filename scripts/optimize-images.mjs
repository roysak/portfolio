/**
 * Recompresses the PNGs under public/img in place.
 *
 * In place, and keeping the .png extension, is deliberate: the case-study data
 * files reference dozens of these paths by name, and a format swap would mean
 * editing content to fix a delivery problem. sharp's palette quantisation gets
 * most of the win without touching a single reference.
 *
 * Originals are in git — `git checkout -- public/img` restores them.
 *
 *   node scripts/optimize-images.mjs          # report only
 *   node scripts/optimize-images.mjs --write  # actually rewrite
 */
import { readdir, readFile, writeFile, stat } from "node:fs/promises";
import { join, extname } from "node:path";
import sharp from "sharp";

const ROOT = "public/img";
const WRITE = process.argv.includes("--write");
const MIN_BYTES = 40 * 1024; // leave small files alone
const MIN_SAVING = 0.15; // skip rewrites that barely help
const MAX_EDGE = 2000; // nothing here is displayed larger than this

const kb = (n) => `${(n / 1024).toFixed(0)} kB`;

async function* walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(path);
    else yield path;
  }
}

let before = 0;
let after = 0;
let rewritten = 0;

for await (const file of walk(ROOT)) {
  if (extname(file).toLowerCase() !== ".png") continue;

  const { size } = await stat(file);
  before += size;

  if (size < MIN_BYTES) {
    after += size;
    continue;
  }

  const input = await readFile(file);
  const image = sharp(input);
  const meta = await image.metadata();

  // Screenshots are flat-colour and quantise beautifully. The paintings are
  // continuous-tone — a 256-colour palette bands their skies — so they get
  // lossless recompression and a resize only.
  const isArtwork = file.replaceAll("\\", "/").includes("/img/dp/");

  const resized = image.resize({
    width: Math.min(meta.width ?? MAX_EDGE, MAX_EDGE),
    withoutEnlargement: true,
  });

  const out = await (isArtwork
    ? resized.png({ compressionLevel: 9, palette: false, effort: 10 })
    : resized.png({ quality: 82, compressionLevel: 9, palette: true, effort: 9 })
  ).toBuffer();

  const saving = 1 - out.length / size;
  if (saving < MIN_SAVING) {
    after += size;
    console.log(`  skip   ${file}  (${kb(size)}, only ${(saving * 100).toFixed(0)}% saved)`);
    continue;
  }

  after += out.length;
  rewritten++;
  console.log(
    `  ${WRITE ? "write " : "would "} ${file}  ${kb(size)} → ${kb(out.length)}  (−${(saving * 100).toFixed(0)}%)`,
  );
  if (WRITE) await writeFile(file, out);
}

console.log(
  `\n${rewritten} file(s) ${WRITE ? "rewritten" : "would be rewritten"}: ` +
    `${kb(before)} → ${kb(after)} (−${(((before - after) / before) * 100).toFixed(0)}%)`,
);
if (!WRITE) console.log("Dry run. Re-run with --write to apply.");
