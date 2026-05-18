import { useState } from 'react';

const ACCENTS = ['#4F9CF9', '#34D399', '#A78BFA', '#FBBF24', '#F87171', '#06B6D4', '#8B5CF6'];

function getAccent(name) {
  let h = 0;
  for (let i = 0; i < name.length; i++) h = name.charCodeAt(i) + ((h << 5) - h);
  return ACCENTS[Math.abs(h) % ACCENTS.length];
}
function getInitials(name) {
  return name.split(/[\s.\-_]+/).map(w => w[0]).join('').slice(0, 2).toUpperCase();
}

function LogoTile({ name, slug }) {
  const [failed, setFailed] = useState(false);
  const ac = getAccent(name);

  return (
    <div className="flex flex-col items-center gap-2 group cursor-default">
      <div
        className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center overflow-hidden transition-transform duration-200 group-hover:scale-105"
        style={{
          background: failed ? `${ac}18` : '#ffffff',
          border: failed ? `1px solid ${ac}28` : '1px solid rgba(255,255,255,0.14)',
          boxShadow: '0 2px 14px rgba(0,0,0,0.5)',
        }}
      >
        {!failed ? (
          <img
            src={`/logos/${slug}.png`}
            alt={name}
            className="w-7 h-7 sm:w-8 sm:h-8 object-contain"
            onError={() => setFailed(true)}
            draggable={false}
          />
        ) : (
          <span className="text-[10px] font-bold" style={{ color: ac }}>{getInitials(name)}</span>
        )}
      </div>
      <span className="text-white/38 text-[9px] sm:text-[10px] font-medium text-center leading-tight max-w-[60px] sm:max-w-[72px] group-hover:text-white/60 transition-colors duration-200">
        {name}
      </span>
    </div>
  );
}

/**
 * Renders grouped logo tiles in the TrustedBy white-square style.
 *
 * groups: [{ label: string, logos: [{ name: string, slug: string }] }]
 */
export default function LogoTileGrid({ groups }) {
  return (
    <div className="flex flex-col gap-10">
      {groups.map((group) => (
        <div key={group.label}>
          <p className="text-white/28 text-[10px] sm:text-xs tracking-[0.25em] uppercase mb-5 pb-3 border-b border-white/[0.05]">
            {group.label}
          </p>
          <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-x-4 gap-y-5">
            {group.logos.map((logo) => (
              <LogoTile key={logo.slug} name={logo.name} slug={logo.slug} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
