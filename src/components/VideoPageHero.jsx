import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

/**
 * Reusable video-background hero for all practice and case-study pages.
 *
 * Props
 * ─────
 * videoId      – YouTube video ID (autoplay muted loop)
 * breadcrumb   – [{label, path?}]  shown above eyebrow (path makes it a link)
 * eyebrow      – small label text, e.g. "Case Studies"
 * title        – first line of the <h1>
 * titleAccent  – second line rendered at reduced opacity
 * description  – paragraph below the headline
 * stats        – [{value, label}] horizontal stat strip
 * actions      – [{label, primary, onClick}] CTA buttons
 * minHeight    – CSS min-height string, default '68vh'
 * centered     – if true, centres all content
 */
export default function VideoPageHero({
  videoId,
  breadcrumb,
  eyebrow,
  title,
  titleAccent,
  description,
  stats,
  actions,
  minHeight = '68vh',
  centered = false,
}) {
  const align = centered ? 'text-center items-center' : '';

  return (
    <div className="relative overflow-hidden bg-black border-b border-white/[0.05]" style={{ minHeight }}>

      {/* ── YouTube video background ── */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <iframe
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=0&rel=0&showinfo=0&modestbranding=1&playsinline=1&disablekb=1&fs=0&iv_load_policy=3`}
          title="bg"
          allow="autoplay; encrypted-media"
          frameBorder="0"
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '100vw',
            height: '56.25vw',
            minWidth: '177.78vh',
            minHeight: '100%',
            pointerEvents: 'none',
          }}
        />
      </div>

      {/* ── Overlay stack ── */}
      {/* Base dim */}
      <div className="absolute inset-0 bg-black/60 pointer-events-none" />
      {/* Left-to-right fade (keeps left edge readable) */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'linear-gradient(to right, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.35) 55%, rgba(0,0,0,0.05) 100%)' }}
      />
      {/* Bottom fade into page body */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, transparent 55%)' }}
      />
      {/* Navbar clearance */}
      <div
        className="absolute top-0 left-0 right-0 h-28 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.65), transparent)' }}
      />

      {/* ── Content ── */}
      <div className={`relative z-10 max-w-7xl mx-auto px-5 sm:px-8 md:px-12 pt-32 sm:pt-36 pb-14 md:pb-24 flex flex-col ${align}`}>

        {/* Breadcrumb */}
        {breadcrumb && breadcrumb.length > 0 && (
          <nav className="flex items-center gap-2 mb-7 text-[10px] sm:text-xs text-white/30 tracking-widest uppercase flex-wrap">
            {breadcrumb.map((item, i) => (
              <span key={item.label} className="flex items-center gap-2">
                {i > 0 && <span className="opacity-40">/</span>}
                {item.path ? (
                  <Link to={item.path} className="hover:text-white/65 transition-colors duration-200">{item.label}</Link>
                ) : (
                  <span className="text-white/55">{item.label}</span>
                )}
              </span>
            ))}
          </nav>
        )}

        {/* Eyebrow */}
        {eyebrow && (
          <div className={`flex items-center gap-3 mb-5 ${centered ? 'justify-center' : ''}`}>
            <span className="w-8 h-px bg-white/25 flex-shrink-0" />
            <span className="text-white/50 text-[10px] sm:text-xs font-medium tracking-[0.3em] uppercase">{eyebrow}</span>
          </div>
        )}

        {/* Headline */}
        <h1 className="text-[2.25rem] sm:text-[3rem] md:text-[3.5rem] lg:text-[4rem] font-bold text-white tracking-tight leading-[1.06] mb-5 max-w-3xl">
          {title}
          {titleAccent && (
            <>
              <br />
              <span className="text-white/65">{titleAccent}</span>
            </>
          )}
        </h1>

        {/* Description */}
        {description && (
          <p className="text-white/45 text-sm sm:text-base md:text-lg max-w-2xl leading-relaxed mb-10">
            {description}
          </p>
        )}

        {/* Stats strip */}
        {stats && stats.length > 0 && (
          <div className="flex flex-wrap items-center gap-y-4 mb-10">
            {stats.map((stat, i) => (
              <div
                key={stat.label}
                className={`pr-5 sm:pr-8 ${i !== 0 ? 'pl-5 sm:pl-8 border-l border-white/10' : ''}`}
              >
                <div className="text-base sm:text-lg md:text-xl font-bold text-white leading-tight">{stat.value}</div>
                <div className="text-white/33 text-[9px] sm:text-[10px] tracking-[0.2em] uppercase mt-0.5">{stat.label}</div>
              </div>
            ))}
          </div>
        )}

        {/* Actions */}
        {actions && actions.length > 0 && (
          <div className="flex flex-wrap items-center gap-3 sm:gap-4">
            {actions.map((action) =>
              action.primary ? (
                <button
                  key={action.label}
                  onClick={action.onClick}
                  className="group flex items-center gap-3 px-6 sm:px-8 py-3.5 sm:py-4 bg-white text-black text-xs sm:text-sm font-bold tracking-widest uppercase hover:bg-white/90 transition-all duration-300"
                >
                  {action.label}
                  <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
                </button>
              ) : (
                <button
                  key={action.label}
                  onClick={action.onClick}
                  className="flex items-center gap-2 px-6 sm:px-8 py-3.5 sm:py-4 border border-white/20 text-white text-xs sm:text-sm font-medium tracking-widest uppercase hover:border-white/50 hover:bg-white/5 transition-all duration-300"
                >
                  {action.label}
                </button>
              )
            )}
          </div>
        )}
      </div>
    </div>
  );
}
