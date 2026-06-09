/* =========================================================================
   Mix i Master — skrypt kompresji zdjęć (sharp)
   - przetwarza każdy plik *.jpg z głównego folderu projektu
   - skaluje do maks. szerokości 1400px (bez powiększania mniejszych)
   - zapisuje WebP (q78) oraz JPEG (q80) do podfolderu images/
   - oryginały w folderze głównym pozostają nietknięte
   Uruchom:  node compress-images.js
   ========================================================================= */
const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const ROOT = __dirname;
const OUT_DIR = path.join(ROOT, "images");
const MAX_WIDTH = 1400;

if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

// tylko pliki .jpg/.jpeg z katalogu głównego (pomijamy podfoldery)
const files = fs
  .readdirSync(ROOT, { withFileTypes: true })
  .filter((e) => e.isFile() && /\.jpe?g$/i.test(e.name))
  .map((e) => e.name);

(async () => {
  const results = [];
  for (const name of files) {
    const base = name.replace(/\.jpe?g$/i, "");
    const src = path.join(ROOT, name);

    // wspólny pipeline: skalowanie z zachowaniem proporcji, bez powiększania
    const pipeline = sharp(src).resize({
      width: MAX_WIDTH,
      withoutEnlargement: true,
    });

    const webpInfo = await pipeline
      .clone()
      .webp({ quality: 78 })
      .toFile(path.join(OUT_DIR, base + ".webp"));

    const jpgInfo = await pipeline
      .clone()
      .jpeg({ quality: 80, mozjpeg: true })
      .toFile(path.join(OUT_DIR, base + ".jpg"));

    results.push({
      base,
      width: jpgInfo.width,
      height: jpgInfo.height,
      webpKB: Math.round(webpInfo.size / 1024),
      jpgKB: Math.round(jpgInfo.size / 1024),
    });
  }

  // czytelne podsumowanie + dokładne wymiary (do atrybutów width/height w HTML)
  console.log("\n== Skompresowane zdjęcia (images/) ==");
  for (const r of results) {
    console.log(
      `${r.base}\n   ${r.width}x${r.height}px  |  webp ${r.webpKB} KB  |  jpg ${r.jpgKB} KB`
    );
  }
  console.log(`\nGotowe: ${results.length} plików.`);
})().catch((err) => {
  console.error("Błąd kompresji:", err);
  process.exit(1);
});
