const https = require('https');
const fs = require('fs');
const path = require('path');

const TOKEN = 'pk_ZRbeKebqQmudPCju_HUkCw';
const OUT_DIR = path.join(__dirname, '..', 'public', 'logos');

const missing = [
  { slug: 'relevance-ai',      domain: 'relevanceai.com' },
  { slug: 'abnormal-ai',       domain: 'abnormalsecurity.com' },
  { slug: 'minio',             domain: 'min.io' },
  { slug: 'vastdata',          domain: 'vastdata.com' },
  { slug: 'hammerspace',       domain: 'hammerspace.com' },
  { slug: 'qumulo',            domain: 'qumulo.com' },
  { slug: 'rootstock',         domain: 'rootstock.com' },
  { slug: 'priority-software', domain: 'priority-software.com' },
  { slug: 'certinia',          domain: 'certinia.com' },
  { slug: 'syspro',            domain: 'syspro.com' },
  { slug: 'plex',              domain: 'plex.com' },
  { slug: 'arena-solutions',   domain: 'arenasolutions.com' },
  { slug: 'propel',            domain: 'propelsoftware.com' },
  { slug: 'centric-software',  domain: 'centricsoftware.com' },
  { slug: 'aras',              domain: 'aras.com' },
  { slug: 'openbom',           domain: 'openbom.com' },
  { slug: 'specright',         domain: 'specright.com' },
  { slug: 'razorleaf',         domain: 'razorleaf.com' },
  { slug: 'copper',            domain: 'copper.com' },
  { slug: 'creatio',           domain: 'creatio.com' },
  { slug: 'close',             domain: 'close.com' },
  { slug: 'capsulecrm',        domain: 'capsulecrm.com' },
  { slug: 'alloy',             domain: 'alloy.com' },
  { slug: 'sardine',           domain: 'sardine.ai' },
  { slug: 'lansweeper',        domain: 'lansweeper.com' },
  { slug: 'device42',          domain: 'device42.com' },
  { slug: 'snow-software',     domain: 'snowsoftware.com' },
  { slug: 'asset-panda',       domain: 'assetpanda.com' },
  { slug: 'snipe-it',          domain: 'snipeitapp.com' },
  { slug: 'cloudhealth',       domain: 'cloudhealth.com' },
  { slug: 'torii',             domain: 'toriihq.com' },
];

function download(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https.get(url, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        file.close();
        fs.unlinkSync(dest);
        download(res.headers.location, dest).then(resolve).catch(reject);
        return;
      }
      if (res.statusCode !== 200) {
        file.close();
        fs.unlinkSync(dest);
        reject(new Error(`HTTP ${res.statusCode}`));
        return;
      }
      res.pipe(file);
      file.on('finish', () => { file.close(); resolve(); });
    }).on('error', (err) => {
      fs.existsSync(dest) && fs.unlinkSync(dest);
      reject(err);
    });
  });
}

async function run() {
  const succeeded = [];
  const failed = [];

  for (const { slug, domain } of missing) {
    const url = `https://img.logo.dev/${domain}?token=${TOKEN}&size=80&format=png`;
    const dest = path.join(OUT_DIR, `${slug}.png`);
    process.stdout.write(`Downloading ${slug} (${domain}) ... `);
    try {
      await download(url, dest);
      const size = fs.statSync(dest).size;
      if (size < 500) {
        fs.unlinkSync(dest);
        console.log(`SKIPPED (placeholder, ${size}b)`);
        failed.push({ slug, domain, reason: `placeholder (${size}b)` });
      } else {
        console.log(`OK (${size}b)`);
        succeeded.push(slug);
      }
    } catch (e) {
      console.log(`FAILED (${e.message})`);
      failed.push({ slug, domain, reason: e.message });
    }
    await new Promise(r => setTimeout(r, 120));
  }

  console.log('\n=== RESULTS ===');
  console.log(`\nSucceeded (${succeeded.length}):`);
  succeeded.forEach(s => console.log(`  ✓ ${s}`));
  console.log(`\nFailed / no logo (${failed.length}):`);
  failed.forEach(f => console.log(`  ✗ ${f.slug}  (${f.domain}) — ${f.reason}`));
}

run();
