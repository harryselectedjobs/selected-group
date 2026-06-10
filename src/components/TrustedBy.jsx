import { useState } from "react";

/*
  All logos are stored locally in /public/logos/{slug}.png
  No external API or token required at runtime.
*/

const row1 = [
  { name: "Apple", slug: "apple" },
  { name: "Oracle", slug: "oracle" },
  { name: "Palantir", slug: "palantir" },
  { name: "Anthropic", slug: "anthropic" },
  { name: "Celonis", slug: "celonis" },
  { name: "LangChain", slug: "langchain" },
  { name: "Moveworks", slug: "moveworks" },
  { name: "Aisera", slug: "aisera" },
  { name: "Behavox", slug: "behavox" },
  { name: "Cognition AI", slug: "cognition-ai" },
  { name: "Adept AI", slug: "adept-ai" },
  { name: "CrewAI", slug: "crewai" },
  { name: "Lindy", slug: "lindy" },
  { name: "Sierra", slug: "sierra" },
  { name: "Relevance AI", slug: "relevance-ai" },
  { name: "Abnormal AI", slug: "abnormal-ai" },
  { name: "Copper", slug: "copper" },
  { name: "Creatio", slug: "creatio" },
  { name: "Close", slug: "close" },
  { name: "Capsule CRM", slug: "capsulecrm" },
  { name: "Alloy", slug: "alloy" },
  { name: "Sardine", slug: "sardine" },
];

const row2 = [
  { name: "Wiz", slug: "wiz" },
  // { name: "Snyk", slug: "snyk" },
  { name: "SentinelOne", slug: "sentinelone" },
  { name: "Darktrace", slug: "darktrace" },
  { name: "Backblaze", slug: "backblaze" },
  { name: "Rubrik", slug: "rubrik" },
  { name: "Wasabi", slug: "wasabi" },
  // { name: "Cyera", slug: "cyera" },
  { name: "Pentera", slug: "pentera" },
  { name: "Semperis", slug: "semperis" },
  { name: "Lacework", slug: "lacework" },
  { name: "Cohesity", slug: "cohesity" },
  { name: "Pure Storage", slug: "purestorage" },
  { name: "WEKA", slug: "weka" },
  { name: "Orca Security", slug: "orca" },
  { name: "Hammerspace", slug: "hammerspace" },
  { name: "Qumulo", slug: "qumulo" },
  { name: "MinIO", slug: "minio" },
  { name: "Vast Data", slug: "vastdata" },
  { name: "Snipe-IT", slug: "snipe-it" },
  { name: "CloudHealth", slug: "cloudhealth" },
  { name: "Lansweeper", slug: "lansweeper" },
  { name: "Device42", slug: "device42" },
];

const row3 = [
  { name: "Confluent", slug: "confluent" },
  { name: "Fivetran", slug: "fivetran" },
  { name: "ClickHouse", slug: "clickhouse" },
  { name: "Airbyte", slug: "airbyte" },
  { name: "Odoo", slug: "odoo" },
  { name: "Autodesk", slug: "autodesk" },
  { name: "Starburst", slug: "starburst" },
  { name: "Snowplow", slug: "snowplow" },
  { name: "Monte Carlo", slug: "montecarlo" },
  { name: "SingleStore", slug: "singlestore" },
  { name: "Imply", slug: "imply" },
  { name: "Unit4", slug: "unit4" },
  { name: "PTC", slug: "ptc" },
  { name: "Deltek", slug: "deltek" },
  { name: "Acumatica", slug: "acumatica" },
  { name: "Rootstock", slug: "rootstock" },
  { name: "Priority Software", slug: "priority-software" },
  { name: "Certinia", slug: "certinia" },
  { name: "Syspro", slug: "syspro" },
  { name: "Plex", slug: "plex" },
  { name: "Arena Solutions", slug: "arena-solutions" },
  { name: "Propel", slug: "propel" },
  { name: "Specright", slug: "specright" },
];

const row4 = [
  { name: "monday.com", slug: "monday" },
  { name: "Pipedrive", slug: "pipedrive" },
  { name: "Freshworks", slug: "freshworks" },
  { name: "Plaid", slug: "plaid" },
  { name: "Brex", slug: "brex" },
  { name: "Ramp", slug: "ramp" },
  { name: "Airwallex", slug: "airwallex" },
  { name: "Mercury", slug: "mercury" },
  { name: "Marqeta", slug: "marqeta" },
  { name: "Mambu", slug: "mambu" },
  { name: "Attio", slug: "attio" },
  { name: "Flexera", slug: "flexera" },
  { name: "Apptio", slug: "apptio" },
  { name: "Zylo", slug: "zylo" },
  { name: "Nutshell", slug: "nutshell" },
  { name: "Centric Software", slug: "centric-software" },
  { name: "Aras", slug: "aras" },
  { name: "OpenBOM", slug: "openbom" },
  { name: "Razorleaf", slug: "razorleaf" },
  { name: "Snow Software", slug: "snow-software" },
  { name: "Asset Panda", slug: "asset-panda" },
  { name: "Torii", slug: "torii" },
];

/* ── Initials fallback ── */
const ACCENTS = [
  "#4F9CF9",
  "#34D399",
  "#A78BFA",
  "#FBBF24",
  "#F87171",
  "#06B6D4",
  "#8B5CF6",
  "#EC4899",
  "#10B981",
  "#F59E0B",
];
function getAccent(name) {
  let h = 0;
  for (let i = 0; i < name.length; i++) h = name.charCodeAt(i) + ((h << 5) - h);
  return ACCENTS[Math.abs(h) % ACCENTS.length];
}
function getInitials(name) {
  return name
    .split(/[\s.\-]+/)
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

/* ── Logo tile ── */
function LogoTile({ name, slug }) {
  const [failed, setFailed] = useState(false);
  const ac = getAccent(name);
  const ini = getInitials(name);

  return (
    <div className="flex-shrink-0 flex flex-col items-center gap-2.5 px-5 group cursor-default">
      <div
        className="w-[54px] h-[54px] rounded-2xl flex items-center justify-center overflow-hidden transition-all duration-300 group-hover:scale-110"
        style={{
          background: failed ? `${ac}15` : "#ffffff",
          border: failed
            ? `1px solid ${ac}25`
            : "1px solid rgba(255,255,255,0.12)",
          boxShadow: "0 2px 12px rgba(0,0,0,0.45)",
        }}
      >
        {!failed ? (
          <img
            src={`/logos/${slug}.png`}
            alt={name}
            width={36}
            height={36}
            className="w-9 h-9 object-contain"
            onError={() => setFailed(true)}
            draggable={false}
          />
        ) : (
          <span className="text-xs font-bold" style={{ color: ac }}>
            {ini}
          </span>
        )}
      </div>

      <span className="text-white/50 text-[10px] font-medium tracking-wide text-center whitespace-nowrap group-hover:text-white/80 transition-colors duration-200 max-w-[72px] leading-tight">
        {name}
      </span>
    </div>
  );
}

/* ── Marquee row ── */
function MarqueeRow({ companies, direction = "left", speed = "50s" }) {
  const items = [...companies, ...companies, ...companies, ...companies];
  const anim = direction === "left" ? "tb-left" : "tb-right";

  return (
    <div className="relative overflow-hidden">
      <div
        className="absolute left-0 top-0 bottom-0 w-28 z-10 pointer-events-none"
        style={{ background: "linear-gradient(to right,#000 20%,transparent)" }}
      />
      <div
        className="absolute right-0 top-0 bottom-0 w-28 z-10 pointer-events-none"
        style={{ background: "linear-gradient(to left,#000 20%,transparent)" }}
      />

      <div
        className="inline-flex items-start py-2"
        style={{
          animation: `${anim} ${speed} linear infinite`,
          willChange: "transform",
        }}
      >
        {items.map((c, i) => (
          <LogoTile key={`${c.name}-${i}`} name={c.name} slug={c.slug} />
        ))}
      </div>
    </div>
  );
}

/* ── Section ── */
export default function TrustedBy() {
  return (
    <section className="bg-black border-t border-white/[0.06] py-16 overflow-hidden">
      {/* Header */}
      <div className="max-w-3xl mx-auto px-6 text-center mb-12">
        <p className="text-white/55 text-[10px] font-bold tracking-[0.42em] uppercase mb-4">
          Trusted by industry leaders
        </p>
        <h2 className="text-white text-2xl md:text-[1.8rem] font-bold tracking-tight leading-snug mb-3">
          Powering teams at the world's best companies
        </h2>
        <p className="text-white/60 text-sm">
          Join <span className="text-white font-semibold">100+</span> companies
          already working with Selected Group
        </p>
      </div>

      {/* 4 rows — alternating direction */}
      <div className="flex flex-col gap-8">
        <MarqueeRow companies={row1} direction="left" speed="55s" />
        <MarqueeRow companies={row2} direction="right" speed="62s" />
        <MarqueeRow companies={row3} direction="left" speed="50s" />
        <MarqueeRow companies={row4} direction="right" speed="58s" />
      </div>

      <style>{`
        @keyframes tb-left  { from { transform: translateX(0);    } to { transform: translateX(-25%); } }
        @keyframes tb-right { from { transform: translateX(-25%); } to { transform: translateX(0);    } }
      `}</style>
    </section>
  );
}
