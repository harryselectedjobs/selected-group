const https = require('https');
const http  = require('http');
const fs    = require('fs');
const path  = require('path');

const TOKEN  = 'pk_ZRbeKebqQmudPCju_HUkCw';
const OUTDIR = path.join(__dirname, '..', 'public', 'logos');

const companies = [
  // Row 1 — AI & Core
  { slug: 'apple',        domain: 'apple.com' },
  { slug: 'oracle',       domain: 'oracle.com' },
  { slug: 'palantir',     domain: 'palantir.com' },
  { slug: 'anthropic',    domain: 'anthropic.com' },
  { slug: 'celonis',      domain: 'celonis.com' },
  { slug: 'langchain',    domain: 'langchain.com' },
  { slug: 'moveworks',    domain: 'moveworks.com' },
  { slug: 'aisera',       domain: 'aisera.com' },
  { slug: 'behavox',      domain: 'behavox.com' },
  { slug: 'cognition-ai', domain: 'cognition.ai' },
  { slug: 'adept-ai',     domain: 'adept.ai' },
  { slug: 'crewai',       domain: 'crewai.com' },
  { slug: 'lindy',        domain: 'lindy.ai' },
  { slug: 'sierra',       domain: 'sierra.ai' },
  // Row 2 — Cybersecurity & Storage
  { slug: 'wiz',          domain: 'wiz.io' },
  { slug: 'snyk',         domain: 'snyk.io' },
  { slug: 'sentinelone',  domain: 'sentinelone.com' },
  { slug: 'darktrace',    domain: 'darktrace.com' },
  { slug: 'backblaze',    domain: 'backblaze.com' },
  { slug: 'rubrik',       domain: 'rubrik.com' },
  { slug: 'wasabi',       domain: 'wasabi.com' },
  { slug: 'cyera',        domain: 'cyera.io' },
  { slug: 'pentera',      domain: 'pentera.io' },
  { slug: 'semperis',     domain: 'semperis.com' },
  { slug: 'lacework',     domain: 'lacework.com' },
  { slug: 'cohesity',     domain: 'cohesity.com' },
  { slug: 'purestorage',  domain: 'purestorage.com' },
  { slug: 'weka',         domain: 'weka.io' },
  { slug: 'orca',         domain: 'orca.security' },
  // Row 3 — Data & Enterprise
  { slug: 'confluent',    domain: 'confluent.io' },
  { slug: 'fivetran',     domain: 'fivetran.com' },
  { slug: 'clickhouse',   domain: 'clickhouse.com' },
  { slug: 'airbyte',      domain: 'airbyte.com' },
  { slug: 'odoo',         domain: 'odoo.com' },
  { slug: 'autodesk',     domain: 'autodesk.com' },
  { slug: 'starburst',    domain: 'starburst.io' },
  { slug: 'snowplow',     domain: 'snowplow.io' },
  { slug: 'montecarlo',   domain: 'montecarlodata.com' },
  { slug: 'singlestore',  domain: 'singlestore.com' },
  { slug: 'imply',        domain: 'imply.io' },
  { slug: 'unit4',        domain: 'unit4.com' },
  { slug: 'ptc',          domain: 'ptc.com' },
  { slug: 'deltek',       domain: 'deltek.com' },
  { slug: 'acumatica',    domain: 'acumatica.com' },
  // Row 4 — CRM & Fintech
  { slug: 'monday',       domain: 'monday.com' },
  { slug: 'pipedrive',    domain: 'pipedrive.com' },
  { slug: 'freshworks',   domain: 'freshworks.com' },
  { slug: 'plaid',        domain: 'plaid.com' },
  { slug: 'brex',         domain: 'brex.com' },
  { slug: 'ramp',         domain: 'ramp.com' },
  { slug: 'airwallex',    domain: 'airwallex.com' },
  { slug: 'mercury',      domain: 'mercury.com' },
  { slug: 'marqeta',      domain: 'marqeta.com' },
  { slug: 'mambu',        domain: 'mambu.com' },
  { slug: 'attio',        domain: 'attio.com' },
  { slug: 'flexera',      domain: 'flexera.com' },
  { slug: 'apptio',       domain: 'apptio.com' },
  { slug: 'zylo',         domain: 'zylo.com' },
  { slug: 'nutshell',     domain: 'nutshell.com' },
];

function download(url, dest) {
  return new Promise((resolve) => {
    const file = fs.createWriteStream(dest);
    const lib  = url.startsWith('https') ? https : http;

    const request = lib.get(url, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        file.close();
        fs.unlinkSync(dest);
        return download(res.headers.location, dest).then(resolve);
      }
      if (res.statusCode !== 200) {
        file.close();
        fs.unlinkSync(dest);
        return resolve(false);
      }
      res.pipe(file);
      file.on('finish', () => { file.close(); resolve(true); });
    });

    request.on('error', () => {
      file.close();
      if (fs.existsSync(dest)) fs.unlinkSync(dest);
      resolve(false);
    });

    request.setTimeout(8000, () => { request.destroy(); resolve(false); });
  });
}

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

(async () => {
  if (!fs.existsSync(OUTDIR)) fs.mkdirSync(OUTDIR, { recursive: true });

  let ok = 0, fail = 0;
  for (const { slug, domain } of companies) {
    const url  = `https://img.logo.dev/${domain}?token=${TOKEN}&size=80&format=png`;
    const dest = path.join(OUTDIR, `${slug}.png`);
    const success = await download(url, dest);
    if (success) { console.log(`  ✓  ${slug}`); ok++; }
    else          { console.log(`  ✗  ${slug} (no logo)`); fail++; }
    await sleep(120); // polite delay
  }
  console.log(`\nDone: ${ok} downloaded, ${fail} fallback to initials`);
})();
