import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ChevronLeft, ChevronRight, ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Each slide has its own free-use YouTube background video
const slides = [
  {
    id: 'gtm',
    number: '01',
    label: 'GTM Talent',
    videoId: 'qz9ADlOqqs8', // Office / Business stock footage 4K
    title: ['Hiring the Best', 'GTM Talent'],
    description:
      'We are an enterprise software sales and go-to-market recruitment specialist, placing high-performing sales leaders and new logo acquisition talent across the US and European markets with over 1,000 successful placements.',
    cta: 'Find GTM Talent',
    route: '/gtm',
    stats: [
      { value: '1,000+', label: 'Placements' },
      { value: 'US & EU', label: 'Markets' },
      { value: 'C-Suite', label: 'Executive Hires' },
    ],
  },
  {
    id: 'product',
    number: '02',
    label: 'Product Management',
    videoId: 'zwUsFN__jtE', // 4K Business Meeting / product discussions
    title: ['Specialist Product', 'Management'],
    description:
      'Product management sits at the centre of every successful technology business, connecting customer needs, commercial strategy and engineering execution across the full product lifecycle.',
    cta: 'Explore Product Roles',
    route: '/product-management',
    stats: [
      { value: 'CPO', label: 'Executive Level' },
      { value: 'Full Stack', label: 'Product Teams' },
      { value: 'SaaS & AI', label: 'Specialisms' },
    ],
  },
  {
    id: 'engineering',
    number: '03',
    label: 'Engineering & Technology',
    videoId: 'Hgg7M3kSqyE', // Technology looped background 4K
    title: ['Specialist Engineering', 'Technology'],
    description:
      'A specialist engineering recruitment business operates at the heart of modern technology organisations, building the teams responsible for designing, developing, scaling and securing the products that drive innovation.',
    cta: 'Explore Engineering Roles',
    route: '/engineering',
    stats: [
      { value: 'CTO', label: 'Executive Level' },
      { value: 'Full Stack', label: 'Engineering' },
      { value: 'AI & Cloud', label: 'Specialisms' },
    ],
  },
  {
    id: 'professional',
    number: '04',
    label: 'Professional Services',
    videoId: 'AHJVDFop9sU', // Work Space — business, technology, office meeting
    title: ['Specialist Professional', 'Services'],
    description:
      'A specialist professional services recruitment business focuses on the individuals who ensure technology delivers real-world value — from pre-sales solution design through to implementation, transformation and long-term success.',
    cta: 'Explore Professional Services',
    route: '/professional-services',
    stats: [
      { value: 'CSO', label: 'Executive Level' },
      { value: 'Global', label: 'Delivery' },
      { value: 'ERP & SaaS', label: 'Specialisms' },
    ],
  },
];

const contentVariants = {
  hidden: { opacity: 0, y: 22 },
  visible: (delay) => ({
    opacity: 1,
    y: 0,
    transition: { delay, duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  }),
};

function VideoBackground({ videoId, active }) {
  return (
    <div
      className="absolute inset-0 overflow-hidden pointer-events-none"
      style={{
        opacity: active ? 1 : 0,
        transition: 'opacity 1.2s ease',
        zIndex: active ? 1 : 0,
      }}
    >
      <iframe
        src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=0&rel=0&showinfo=0&modestbranding=1&playsinline=1&disablekb=1&fs=0&iv_load_policy=3`}
        title={`hero-bg-${videoId}`}
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
          minHeight: '100vh',
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

  const goTo = useCallback((index) => setCurrent(index), []);

  const next = useCallback(() => {
    setCurrent((c) => (c + 1) % slides.length);
  }, []);

  const prev = useCallback(() => {
    setCurrent((c) => (c - 1 + slides.length) % slides.length);
  }, []);

  useEffect(() => {
    if (isPaused) return;
    timerRef.current = setInterval(next, 7000);
    return () => clearInterval(timerRef.current);
  }, [isPaused, next]);

  const slide = slides[current];

  return (
    <section
      id="home"
      className="relative h-screen overflow-hidden bg-black"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* All video backgrounds mounted — they crossfade via opacity */}
      <div className="absolute inset-0" style={{ zIndex: 0 }}>
        {slides.map((s, i) => (
          <VideoBackground key={s.id} videoId={s.videoId} active={i === current} />
        ))}
      </div>

      {/* Overlays — cinematic depth + legibility */}
      <div className="absolute inset-0 bg-black/55 pointer-events-none" style={{ zIndex: 2 }} />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          zIndex: 2,
          background: 'linear-gradient(to right, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.45) 50%, rgba(0,0,0,0.1) 100%)',
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          zIndex: 2,
          background: 'linear-gradient(to top, rgba(0,0,0,0.88) 0%, transparent 50%, rgba(0,0,0,0.35) 100%)',
        }}
      />

      {/* Navbar clearance fade */}
      <div
        className="absolute top-0 left-0 right-0 h-28 pointer-events-none"
        style={{ zIndex: 3, background: 'linear-gradient(to bottom, rgba(0,0,0,0.6), transparent)' }}
      />

      {/* Slide content */}
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={current}
          className="absolute inset-0"
          style={{ zIndex: 10 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
        >
          <div className="h-full flex flex-col justify-start">
            <div className="max-w-7xl mx-auto px-6 md:px-12 w-full pt-[50px] md:pt-[90px]">

              {/* Slide number + label */}
              <motion.div
                custom={0.1}
                variants={contentVariants}
                initial="hidden"
                animate="visible"
                className="flex items-center gap-4 mb-7"
              >
                <span className="text-white/25 text-xs font-mono tracking-wider">
                  {slide.number}
                  <span className="mx-1.5 opacity-40">/</span>
                  04
                </span>
                <span className="w-8 h-px bg-white/25" />
                <span className="text-xs font-semibold tracking-[0.25em] uppercase text-white/45">
                  {slide.label}
                </span>
              </motion.div>

              {/* Headline */}
              <motion.h1
                custom={0.22}
                variants={contentVariants}
                initial="hidden"
                animate="visible"
                className="text-[2.6rem] md:text-[3.5rem] lg:text-[4rem] font-bold text-white leading-[1.06] tracking-tight mb-6 max-w-3xl"
              >
                {slide.title[0]}
                <br />
                <span className="text-white/70">{slide.title[1]}</span>
              </motion.h1>

              {/* Description */}
              <motion.p
                custom={0.36}
                variants={contentVariants}
                initial="hidden"
                animate="visible"
                className="text-white/48 text-base md:text-[1.05rem] max-w-[520px] leading-relaxed mb-9 md:mb-10"
              >
                {slide.description}
              </motion.p>

              {/* CTAs */}
              <motion.div
                custom={0.5}
                variants={contentVariants}
                initial="hidden"
                animate="visible"
                className="flex flex-wrap items-center gap-4 mb-10"
              >
                <button
                  onClick={() =>
                    slide.route
                      ? navigate(slide.route)
                      : document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })
                  }
                  className="group flex items-center gap-3 px-8 py-[14px] bg-white text-black text-[11px] font-bold tracking-[0.2em] uppercase transition-all duration-300 hover:bg-white/92"
                >
                  {slide.cta}
                  <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
                </button>

                <button
                  onClick={() =>
                    document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' })
                  }
                  className="flex items-center gap-2 border border-white/18 text-white/85 px-8 py-[14px] text-[11px] font-medium tracking-[0.2em] uppercase transition-all duration-300 hover:border-white/45 hover:bg-white/5"
                >
                  Our Expertise
                </button>

                <button
                  onClick={() => navigate('/crm')}
                  className="hidden md:flex items-center gap-2 border border-white/10 text-white/35 px-8 py-[14px] text-[11px] font-medium tracking-[0.2em] uppercase transition-all duration-300 hover:border-white/25 hover:text-white/60 hover:bg-white/5"
                >
                  Open CRM
                </button>
              </motion.div>

              {/* Stats */}
              <motion.div
                custom={0.64}
                variants={contentVariants}
                initial="hidden"
                animate="visible"
                className="flex items-center"
              >
                {slide.stats.map((stat, i) => (
                  <div
                    key={stat.label}
                    className={`pr-8 ${i !== 0 ? 'pl-8 border-l border-white/10' : ''}`}
                  >
                    <div className="text-[1.4rem] font-bold tracking-tight text-white">
                      {stat.value}
                    </div>
                    <div className="text-white/32 text-[10px] tracking-[0.22em] uppercase mt-0.5">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </motion.div>

            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Prev / Next arrows */}
      <button
        onClick={prev}
        aria-label="Previous slide"
        className="absolute left-4 md:left-6 top-1/2 -translate-y-1/2 w-11 h-11 flex items-center justify-center border border-white/12 text-white/35 hover:border-white/45 hover:text-white hover:bg-white/8 transition-all duration-300"
        style={{ zIndex: 20 }}
      >
        <ChevronLeft size={19} />
      </button>
      <button
        onClick={next}
        aria-label="Next slide"
        className="absolute right-4 md:right-6 top-1/2 -translate-y-1/2 w-11 h-11 flex items-center justify-center border border-white/12 text-white/35 hover:border-white/45 hover:text-white hover:bg-white/8 transition-all duration-300"
        style={{ zIndex: 20 }}
      >
        <ChevronRight size={19} />
      </button>

      {/* Desktop slide labels — right column */}
      <div
        className="absolute right-6 md:right-12 bottom-12 hidden lg:flex flex-col items-end gap-3"
        style={{ zIndex: 20 }}
      >
        {slides.map((s, i) => (
          <button
            key={s.id}
            onClick={() => goTo(i)}
            className="flex items-center gap-3 group"
          >
            <span
              className={`text-[10px] tracking-[0.22em] uppercase transition-all duration-400 ${
                i === current ? 'text-white' : 'text-white/22 group-hover:text-white/48'
              }`}
            >
              {s.label}
            </span>
            <span
              className={`block h-px bg-white transition-all duration-400 ${
                i === current ? 'w-10 opacity-75' : 'w-3 opacity-18 group-hover:opacity-35'
              }`}
            />
          </button>
        ))}
      </div>

      {/* Mobile dot strip */}
      <div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-3 lg:hidden"
        style={{ zIndex: 20 }}
      >
        {slides.map((s, i) => (
          <button key={s.id} onClick={() => goTo(i)} aria-label={`Go to slide ${i + 1}`}>
            <span
              className={`block h-[2px] rounded-full bg-white transition-all duration-300 ${
                i === current ? 'w-8 opacity-75' : 'w-3 opacity-22'
              }`}
            />
          </button>
        ))}
      </div>

      {/* Auto-play progress bar */}
      {!isPaused && (
        <motion.div
          key={`bar-${current}`}
          className="absolute bottom-0 left-0 h-[2px] bg-white/50"
          style={{ zIndex: 20 }}
          initial={{ width: '0%' }}
          animate={{ width: '100%' }}
          transition={{ duration: 7, ease: 'linear' }}
        />
      )}

      {/* Scroll hint */}
      <button
        onClick={() => document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' })}
        className="absolute bottom-10 left-6 md:left-12 text-white/22 hover:text-white/55 transition-colors duration-300 animate-bounce lg:flex hidden flex-col items-center gap-1"
        style={{ zIndex: 20 }}
        aria-label="Scroll down"
      >
        <ChevronDown size={20} />
      </button>
    </section>
  );
}
