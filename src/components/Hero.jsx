import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ChevronLeft, ChevronRight, ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const slides = [
  {
    id: 'gtm',
    number: '01',
    label: 'GTM Talent',
    videoId: 'qz9ADlOqqs8',
    title: ['Hiring the Best', 'GTM Talent'],
    description:
      'Enterprise software sales and go-to-market recruitment specialist, placing high-performing sales leaders across the US and European markets with over 1,000 successful placements.',
    cta: 'Find GTM Talent',
    route: '/gtm',
    stats: [
      { value: '1,000+', label: 'Placements' },
      { value: 'US & EU', label: 'Markets' },
      { value: 'C-Suite', label: 'Exec Hires' },
    ],
  },
  {
    id: 'executive',
    number: '02',
    label: 'Executive Recruitment',
    videoId: 'AHJVDFop9sU',
    title: ['Executive', 'Recruitment'],
    description:
      'We identify and place transformational leaders who define company direction — from C-suite and board appointments to VP-level mandates across enterprise technology businesses globally.',
    cta: 'Explore Executive Roles',
    route: '/executive',
    stats: [
      { value: 'C-Suite', label: 'Appointments' },
      { value: 'Global', label: 'Network' },
      { value: 'Board', label: 'Mandates' },
    ],
  },
  {
    id: 'product',
    number: '03',
    label: 'Product Management',
    videoId: 'zwUsFN__jtE',
    title: ['Specialist Product', 'Management'],
    description:
      'Product management sits at the centre of every successful technology business, connecting customer needs, commercial strategy and engineering execution across the full product lifecycle.',
    cta: 'Explore Product Roles',
    route: '/product-management',
    stats: [
      { value: 'CPO', label: 'Exec Level' },
      { value: 'Full Stack', label: 'Product Teams' },
      { value: 'SaaS & AI', label: 'Specialisms' },
    ],
  },
  {
    id: 'engineering',
    number: '04',
    label: 'Engineering & Technology',
    videoId: 'Hgg7M3kSqyE',
    title: ['Specialist Engineering', '& Technology'],
    description:
      "Building the teams responsible for designing, developing, scaling and securing the products that drive innovation across the world's leading enterprise technology organisations.",
    cta: 'Explore Engineering Roles',
    route: '/engineering',
    stats: [
      { value: 'CTO', label: 'Exec Level' },
      { value: 'Full Stack', label: 'Engineering' },
      { value: 'AI & Cloud', label: 'Specialisms' },
    ],
  },
  {
    id: 'professional',
    number: '05',
    label: 'Professional Services',
    videoId: 'AHJVDFop9sU',
    title: ['Specialist Professional', 'Services'],
    description:
      "Focusing on the individuals who ensure technology delivers real-world value — from pre-sales solution design through to implementation, transformation and long-term customer success.",
    cta: 'Explore Professional Services',
    route: '/professional-services',
    stats: [
      { value: 'CSO', label: 'Exec Level' },
      { value: 'Global', label: 'Delivery' },
      { value: 'ERP & SaaS', label: 'Specialisms' },
    ],
  },
];

const total = slides.length;

const fadeUp = (delay) => ({
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1, y: 0,
    transition: { delay, duration: 0.65, ease: [0.22, 1, 0.36, 1] },
  },
});

function VideoBackground({ videoId, active }) {
  return (
    <div
      className="absolute inset-0 overflow-hidden pointer-events-none"
      style={{ opacity: active ? 1 : 0, transition: 'opacity 1.2s ease', zIndex: active ? 1 : 0 }}
    >
      <iframe
        src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=0&rel=0&showinfo=0&modestbranding=1&playsinline=1&disablekb=1&fs=0&iv_load_policy=3`}
        title={`bg-${videoId}`}
        allow="autoplay; encrypted-media"
        frameBorder="0"
        style={{
          position: 'absolute', top: '50%', left: '50%',
          transform: 'translate(-50%,-50%)',
          width: '100vw', height: '56.25vw',
          minWidth: '177.78vh', minHeight: '100vh',
          pointerEvents: 'none',
        }}
      />
    </div>
  );
}

export default function Hero() {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const navigate = useNavigate();
  const timerRef = useRef(null);

  const goTo = useCallback((i) => setCurrent(i), []);
  const next = useCallback(() => setCurrent((c) => (c + 1) % total), []);
  const prev = useCallback(() => setCurrent((c) => (c - 1 + total) % total), []);

  useEffect(() => {
    if (isPaused) return;
    timerRef.current = setInterval(next, 7000);
    return () => clearInterval(timerRef.current);
  }, [isPaused, next]);

  const slide = slides[current];

  return (
    <section
      id="home"
      className="relative h-[100svh] overflow-hidden bg-black"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Videos */}
      <div className="absolute inset-0" style={{ zIndex: 0 }}>
        {slides.map((s, i) => (
          <VideoBackground key={s.id} videoId={s.videoId} active={i === current} />
        ))}
      </div>

      {/* Overlays */}
      <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 2, background: 'rgba(0,0,0,0.55)' }} />
      <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 2, background: 'linear-gradient(to right, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.45) 55%, rgba(0,0,0,0.1) 100%)' }} />
      {/* Strong bottom fade so content is always readable */}
      <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 2, background: 'linear-gradient(to top, rgba(0,0,0,0.96) 0%, rgba(0,0,0,0.7) 30%, rgba(0,0,0,0.2) 60%, transparent 100%)' }} />
      {/* Top fade for nav */}
      <div className="absolute top-0 left-0 right-0 h-32 pointer-events-none" style={{ zIndex: 2, background: 'linear-gradient(to bottom, rgba(0,0,0,0.55), transparent)' }} />

      {/* ── SLIDE CONTENT
           On mobile: content is bottom-anchored so headline is always visible
           On desktop: vertically centered
      ── */}
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={current}
          className="absolute inset-0 flex flex-col justify-end md:justify-center"
          style={{ zIndex: 10 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="max-w-7xl mx-auto w-full px-5 sm:px-10 lg:px-12
                          pb-[110px] sm:pb-20 md:pb-0">

            {/* Eyebrow */}
            <motion.div
              variants={fadeUp(0.05)}
              initial="hidden"
              animate="visible"
              className="flex items-center gap-3 mb-4 sm:mb-5"
            >
              <span className="text-white/28 text-[10px] font-mono tracking-wider">
                {slide.number} / {String(total).padStart(2, '0')}
              </span>
              <span className="w-5 h-px bg-white/20" />
              <span className="text-[10px] font-semibold tracking-[0.22em] uppercase text-white/40">
                {slide.label}
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={fadeUp(0.15)}
              initial="hidden"
              animate="visible"
              className="font-bold text-white leading-[1.08] tracking-tight mb-4 sm:mb-5
                         text-[2rem] sm:text-[2.8rem] lg:text-[3.8rem]"
            >
              {slide.title[0]}
              <br />
              <span className="text-white/60">{slide.title[1]}</span>
            </motion.h1>

            {/* Description */}
            <motion.p
              variants={fadeUp(0.25)}
              initial="hidden"
              animate="visible"
              className="text-white/48 text-[0.85rem] sm:text-[0.95rem] leading-relaxed
                         mb-6 sm:mb-7 max-w-xs sm:max-w-md lg:max-w-lg"
            >
              {slide.description}
            </motion.p>

            {/* ── CTAs ── */}
            <motion.div
              variants={fadeUp(0.35)}
              initial="hidden"
              animate="visible"
              className="flex flex-row flex-wrap items-center gap-2.5 sm:gap-3 mb-7 sm:mb-8"
            >
              <button
                onClick={() =>
                  slide.route
                    ? navigate(slide.route)
                    : document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })
                }
                className="group inline-flex items-center gap-2.5
                           bg-white text-black font-bold uppercase tracking-[0.18em]
                           text-[9px] sm:text-[10px]
                           px-5 sm:px-7 py-2.5 sm:py-3
                           hover:bg-white/88 active:scale-95 transition-all duration-200"
              >
                {slide.cta}
                <ArrowRight size={11} className="group-hover:translate-x-0.5 transition-transform" />
              </button>

              <button
                onClick={() => document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' })}
                className="inline-flex items-center
                           border border-white/20 text-white/75 font-medium uppercase tracking-[0.18em]
                           text-[9px] sm:text-[10px]
                           px-5 sm:px-7 py-2.5 sm:py-3
                           hover:border-white/45 hover:bg-white/5 active:scale-95 transition-all duration-200"
              >
                Our Expertise
              </button>

              <button
                onClick={() => navigate('/crm')}
                className="hidden lg:inline-flex items-center
                           border border-white/10 text-white/30 font-medium uppercase tracking-[0.18em]
                           text-[10px] px-7 py-3
                           hover:border-white/25 hover:text-white/55 hover:bg-white/5 transition-all duration-200"
              >
                Open CRM
              </button>
            </motion.div>

            {/* ── STATS ── */}
            <motion.div
              variants={fadeUp(0.45)}
              initial="hidden"
              animate="visible"
              className="flex items-center"
            >
              {slide.stats.map((stat, i) => (
                <div
                  key={stat.label}
                  className={`
                    ${i !== 0 ? 'border-l border-white/10 pl-4 sm:pl-6 ml-0' : ''}
                    pr-4 sm:pr-6
                  `}
                >
                  <div className="text-[1.05rem] sm:text-[1.3rem] font-bold text-white tracking-tight leading-none">
                    {stat.value}
                  </div>
                  <div className="text-white/28 text-[8px] sm:text-[9px] tracking-[0.2em] uppercase mt-1">
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>

          </div>
        </motion.div>
      </AnimatePresence>

      {/* ── PREV / NEXT ARROWS
           Mobile: fixed to vertical centre of screen on the very edges
           Desktop: same but with more breathing room
      ── */}
      <button
        onClick={prev}
        aria-label="Previous"
        className="absolute left-1.5 sm:left-4 top-1/2 -translate-y-1/2
                   w-9 h-9 sm:w-11 sm:h-11
                   flex items-center justify-center
                   border border-white/12 text-white/35
                   hover:border-white/45 hover:text-white hover:bg-white/8
                   transition-all duration-300"
        style={{ zIndex: 20 }}
      >
        <ChevronLeft size={16} />
      </button>
      <button
        onClick={next}
        aria-label="Next"
        className="absolute right-1.5 sm:right-4 top-1/2 -translate-y-1/2
                   w-9 h-9 sm:w-11 sm:h-11
                   flex items-center justify-center
                   border border-white/12 text-white/35
                   hover:border-white/45 hover:text-white hover:bg-white/8
                   transition-all duration-300"
        style={{ zIndex: 20 }}
      >
        <ChevronRight size={16} />
      </button>

      {/* ── DOT / LABEL NAVIGATION ── */}
      {/* Mobile + tablet: dots centred at bottom */}
      <div
        className="absolute bottom-[68px] sm:bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-2.5 lg:hidden"
        style={{ zIndex: 20 }}
      >
        {slides.map((s, i) => (
          <button key={s.id} onClick={() => goTo(i)} aria-label={`Slide ${i + 1}`}>
            <span
              className={`block h-[2px] rounded-full bg-white transition-all duration-300 ${
                i === current ? 'w-7 opacity-70' : 'w-2.5 opacity-20'
              }`}
            />
          </button>
        ))}
      </div>

      {/* Desktop: labelled list right column */}
      <div
        className="absolute right-6 md:right-12 bottom-12 hidden lg:flex flex-col items-end gap-3"
        style={{ zIndex: 20 }}
      >
        {slides.map((s, i) => (
          <button key={s.id} onClick={() => goTo(i)} className="flex items-center gap-3 group">
            <span className={`text-[9px] tracking-[0.22em] uppercase transition-all duration-300 ${i === current ? 'text-white' : 'text-white/22 group-hover:text-white/50'}`}>
              {s.label}
            </span>
            <span className={`block h-px bg-white transition-all duration-300 ${i === current ? 'w-10 opacity-65' : 'w-2.5 opacity-15 group-hover:opacity-35'}`} />
          </button>
        ))}
      </div>

      {/* Progress bar */}
      {!isPaused && (
        <motion.div
          key={`bar-${current}`}
          className="absolute bottom-0 left-0 h-[2px] bg-white/40"
          style={{ zIndex: 30 }}
          initial={{ width: '0%' }}
          animate={{ width: '100%' }}
          transition={{ duration: 7, ease: 'linear' }}
        />
      )}

      {/* Scroll hint — desktop only */}
      <button
        onClick={() => document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' })}
        aria-label="Scroll down"
        className="absolute bottom-10 left-6 md:left-12 text-white/20 hover:text-white/50
                   transition-colors duration-300 animate-bounce hidden lg:flex"
        style={{ zIndex: 20 }}
      >
        <ChevronDown size={20} />
      </button>
    </section>
  );
}