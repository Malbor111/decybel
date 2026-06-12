const { chromium } = require('playwright');
const path = require('path');
const url = require('url');

const files = [
  'artykuly/czym-jest-daw.html',                     // stary
  'artykuly/ile-spotify-placi-za-odtworzenie.html',  // nowy
];
const widths = [1440, 900, 390];

(async () => {
  const browser = await chromium.launch();
  let problems = 0;
  for (const f of files) {
    const fileUrl = url.pathToFileURL(path.resolve(f)).href;
    for (const w of widths) {
      const page = await browser.newPage({ viewport: { width: w, height: 900 } });
      await page.goto(fileUrl);
      const data = await page.evaluate(() => {
        const r = el => el ? el.getBoundingClientRect() : null;
        const prose = document.querySelector('.prose');
        const banner = document.querySelector('.article-banner');
        const p = prose ? prose.querySelector('p') : null;
        const h2 = prose ? prose.querySelector('h2') : null;
        const faq = prose ? prose.querySelector('.faq') : null;
        const related = prose ? prose.querySelector('.related') : null;
        const rb = r(banner), rp = r(prose);
        const rpara = r(p), rh2 = r(h2), rfaq = r(faq), rrel = r(related);
        return {
          docScrollW: document.documentElement.scrollWidth,
          innerW: window.innerWidth,
          banner: rb && {l: Math.round(rb.left), r: Math.round(rb.right), w: Math.round(rb.width), c: Math.round((rb.left+rb.right)/2)},
          prose:  rp && {l: Math.round(rp.left), r: Math.round(rp.right), w: Math.round(rp.width), c: Math.round((rp.left+rp.right)/2)},
          para:   rpara && {l: Math.round(rpara.left), w: Math.round(rpara.width)},
          h2:     rh2 && {l: Math.round(rh2.left), w: Math.round(rh2.width)},
          faq:    rfaq && {l: Math.round(rfaq.left), w: Math.round(rfaq.width)},
          related:rrel && {l: Math.round(rrel.left), w: Math.round(rrel.width)},
        };
      });
      const overflow = data.docScrollW > data.innerW + 1;
      const lefts = [data.para && data.para.l, data.h2 && data.h2.l, data.faq && data.faq.l, data.related && data.related.l].filter(x=>x!=null);
      const widthsArr = [data.para && data.para.w, data.h2 && data.h2.w, data.faq && data.faq.w, data.related && data.related.w].filter(x=>x!=null);
      const sameLeft = Math.max(...lefts) - Math.min(...lefts) <= 2;
      const sameWidth = Math.max(...widthsArr) - Math.min(...widthsArr) <= 2;
      const proseCenterOffset = Math.abs(data.prose.c - data.innerW/2);
      console.log(`\n=== ${f} @ ${w}px ===`);
      console.log(`  overflow-x: ${overflow ? 'TAK !!!' : 'brak'} (scrollW=${data.docScrollW}, innerW=${data.innerW})`);
      console.log(`  prose:  l=${data.prose.l} r=${data.prose.r} w=${data.prose.w} center=${data.prose.c}`);
      console.log(`  para:   l=${data.para && data.para.l} w=${data.para && data.para.w}`);
      console.log(`  h2:     l=${data.h2 && data.h2.l} w=${data.h2 && data.h2.w}`);
      console.log(`  faq:    l=${data.faq && data.faq.l} w=${data.faq && data.faq.w}`);
      console.log(`  related:l=${data.related && data.related.l} w=${data.related && data.related.w}`);
      console.log(`  banner: l=${data.banner && data.banner.l} r=${data.banner && data.banner.r} center=${data.banner && data.banner.c}`);
      console.log(`  -> ta sama lewa krawedz tresci: ${sameLeft ? 'OK' : 'NIE'}; ta sama szerokosc: ${sameWidth ? 'OK' : 'NIE'}`);
      console.log(`  -> prose center vs viewport center: offset=${Math.round(proseCenterOffset)}px`);
      if (overflow) { problems++; console.log('  [FAIL] overflow poziomy'); }
      if (!sameLeft || !sameWidth) { problems++; console.log('  [FAIL] tresc nie tworzy jednej spojnej kolumny'); }
      await page.close();
    }
  }
  await browser.close();
  console.log(`\n\n==== PODSUMOWANIE: ${problems === 0 ? 'WSZYSTKO OK' : problems + ' PROBLEM(OW)'} ====`);
  process.exit(problems === 0 ? 0 : 1);
})();
