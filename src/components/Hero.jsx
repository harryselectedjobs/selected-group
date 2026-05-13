import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ChevronLeft, ChevronRight, ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const slides = [
  {
    id: 'gtm',
    number: '01',
    label: 'GTM Talent',
    title: ['Hiring the Best', 'GTM Talent'],
    description:
      'We are an enterprise software sales and go-to-market recruitment specialist, placing high-performing sales leaders and new logo acquisition talent across the US and European markets with over 1,000 successful placements.',
    cta: 'Find GTM Talent',
    accent: '#4F9CF9',
    orb1: 'rgba(13,42,94,0.9)',
    orb2: 'rgba(10,31,74,0.7)',
    base: '#02080f',
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
    title: ['Specialist Product', 'Management'],
    description:
      'Product management sits at the centre of every successful technology business, connecting customer needs, commercial strategy and engineering execution across the full product lifecycle.',
    cta: 'Explore Product Roles',
    accent: '#A78BFA',
    orb1: 'rgba(45,27,105,0.9)',
    orb2: 'rgba(30,15,74,0.7)',
    base: '#080412',
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
    title: ['Specialist Engineering', 'Technology'],
    description:
      'A specialist engineering recruitment business operates at the heart of modern technology organisations, building the teams responsible for designing, developing, scaling and securing the products that drive innovation.',
    cta: 'Explore Engineering Roles',
    accent: '#34D399',
    orb1: 'rgba(13,58,31,0.9)',
    orb2: 'rgba(10,45,24,0.7)',
    base: '#010d06',
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
    title: ['Specialist Professional', 'Services'],
    description:
      'A specialist professional services recruitment business focuses on the individuals who ensure technology delivers real-world value — from pre-sales solution design through to implementation, transformation and long-term success.',
    cta: 'Explore Professional Services',
    accent: '#FBBF24',
    orb1: 'rgba(74,32,0,0.9)',
    orb2: 'rgba(58,24,0,0.7)',
    base: '#100601',
    stats: [
      { value: 'CSO', label: 'Executive Level' },
      { value: 'Global', label: 'Delivery' },
      { value: 'ERP & SaaS', label: 'Specialisms' },
    ],
  },
];

const slideVariants = {
  enter: (dir) => ({ x: dir > 0 ? '8%' : '-8%', opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir) => ({ x: dir > 0 ? '-8%' : '8%', opacity: 0 }),
};

const contentVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: (delay) => ({
    opacity: 1,
    y: 0,
    transition: { delay, duration: 0.65, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function Hero() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isPaused, setIsPaused] = useState(false);
  const navigate = useNavigate();
  const timerRef = useRef(null);

  const goTo = useCallback((index, dir) => {
    setDirection(dir);
    setCurrent(index);
  }, []);

  const next = useCallback(() => {
    goTo((current + 1) % slides.length, 1);
  }, [current, goTo]);

  const prev = useCallback(() => {
    goTo((current - 1 + slides.length) % slides.length, -1);
  }, [current, goTo]);

  useEffect(() => {
    if (isPaused) return;
    timerRef.current = setInterval(next, 6500);
    return () => clearInterval(timerRef.current);
  }, [isPaused, next]);

  const slide = slides[current];

  return (
    <section
      id="home"
      className="relative h-screen overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Slides */}
      <AnimatePresence custom={direction} initial={false}>
        <motion.div
          key={current}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.75, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="absolute inset-0"
          style={{ backgroundColor: slide.base }}
        >
          {/* Atmospheric background orbs */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div
              className="absolute -top-32 -right-32 w-[700px] h-[700px] rounded-full blur-[140px]"
              style={{ backgroundColor: slide.orb1 }}
            />
            <div
              className="absolute bottom-0 -left-32 w-[500px] h-[500px] rounded-full blur-[120px]"
              style={{ backgroundColor: slide.orb2 }}
            />
            {/* Diagonal accent line */}
            <svg
              className="absolute inset-0 w-full h-full opacity-[0.04]"
              preserveAspectRatio="none"
            >
              <line x1="60%" y1="0%" x2="100%" y2="60%" stroke="white" strokeWidth="1" />
              <line x1="55%" y1="0%" x2="100%" y2="55%" stroke="white" strokeWidth="0.5" />
              <line x1="0%" y1="40%" x2="40%" y2="100%" stroke="white" strokeWidth="0.5" />
            </svg>
          </div>

          {/* Grid texture */}
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.03]"
            style={{
              backgroundImage:
                'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)',
              backgroundSize: '80px 80px',
            }}
          />

          {/* Vignette edges */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30 pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-transparent pointer-events-none" />

          {/* Content — justify-start + fixed pt so h1 always sits at the same Y */}
          <div className="relative z-10 h-full flex flex-col justify-start">
            <div className="max-w-7xl mx-auto px-6 md:px-12 w-full pt-[50px] md:pt-[90px]">

              {/* Slide counter + module label */}
              {/* <motion.div
                custom={0.15}
                variants={contentVariants}
                initial="hidden"
                animate="visible"
                className="flex items-center gap-4 mb-6"
              >
                <span className="text-white/25 text-xs font-mono">
                  {slide.number}
                  <span className="mx-1.5 opacity-40">/</span>
                  04
                </span>
                <span className="w-10 h-px" style={{ backgroundColor: slide.accent }} />
                <span
                  className="text-xs font-semibold tracking-widest uppercase"
                  style={{ color: slide.accent }}
                >
                  {slide.label}
                </span>
              </motion.div> */}

              {/* Headline */}
              <motion.h1
                custom={0.3}
                variants={contentVariants}
                initial="hidden"
                animate="visible"
                className="text-5xl md:text-7xl lg:text-[5.5rem] font-bold text-white leading-[1.06] tracking-tight mb-6 max-w-5xl"
              >
                {slide.title[0]}
                <br />
                <span
                  className="text-transparent bg-clip-text"
                  style={{
                    backgroundImage: `linear-gradient(120deg, #ffffff 30%, ${slide.accent})`,
                  }}
                >
                  {slide.title[1]}
                </span>
              </motion.h1>

              {/* Description */}
              <motion.p
                custom={0.45}
                variants={contentVariants}
                initial="hidden"
                animate="visible"
                className="text-white/55 text-base md:text-lg max-w-xl leading-relaxed mb-7 md:mb-10"
              >
                {slide.description}
              </motion.p>

              {/* CTA row */}
              <motion.div
                custom={0.6}
                variants={contentVariants}
                initial="hidden"
                animate="visible"
                className="flex flex-wrap items-center gap-4 mb-8 md:mb-10"
              >
                <button
                  onClick={() =>
                    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })
                  }
                  className="group flex items-center gap-3 px-8 py-4 text-sm font-bold tracking-widest uppercase transition-all duration-300 hover:opacity-90"
                  style={{ backgroundColor: slide.accent, color: '#000' }}
                >
                  {slide.cta}
                  <ArrowRight
                    size={15}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </button>

                <button
                  onClick={() =>
                    document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' })
                  }
                  className="flex items-center gap-2 border border-white/20 text-white px-8 py-4 text-sm font-medium tracking-widest uppercase transition-all duration-300 hover:border-white/50 hover:bg-white/5"
                >
                  Our Expertise
                </button>

                <button
                  onClick={() => navigate('/crm')}
                  className="hidden md:flex items-center gap-2 border border-white/10 text-white/50 px-8 py-4 text-sm font-medium tracking-widest uppercase transition-all duration-300 hover:border-white/30 hover:text-white hover:bg-white/5"
                >
                  Open CRM
                </button>
              </motion.div>

              {/* Stats row */}
              <motion.div
                custom={0.75}
                variants={contentVariants}
                initial="hidden"
                animate="visible"
                className="flex items-center gap-0"
              >
                {slide.stats.map((stat, i) => (
                  <div
                    key={stat.label}
                    className={`pr-8 ${i !== 0 ? 'pl-8 border-l border-white/10' : ''}`}
                  >
                    <div
                      className="text-2xl font-bold tracking-tight"
                      style={{ color: slide.accent }}
                    >
                      {stat.value}
                    </div>
                    <div className="text-white/40 text-xs tracking-widest uppercase mt-0.5">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Left / Right arrows */}
      <button
        onClick={prev}
        aria-label="Previous slide"
        className="absolute left-4 md:left-6 top-1/2 -translate-y-1/2 z-30 w-11 h-11 flex items-center justify-center border border-white/15 text-white/50 hover:border-white/50 hover:text-white hover:bg-white/10 transition-all duration-300"
      >
        <ChevronLeft size={20} />
      </button>
      <button
        onClick={next}
        aria-label="Next slide"
        className="absolute right-4 md:right-6 top-1/2 -translate-y-1/2 z-30 w-11 h-11 flex items-center justify-center border border-white/15 text-white/50 hover:border-white/50 hover:text-white hover:bg-white/10 transition-all duration-300"
      >
        <ChevronRight size={20} />
      </button>

      {/* Slide thumbnail strip — right side */}
      <div className="absolute right-6 md:right-12 bottom-12 z-30 hidden lg:flex flex-col items-end gap-3">
        {slides.map((s, i) => (
          <button
            key={s.id}
            onClick={() => goTo(i, i > current ? 1 : -1)}
            className="flex items-center gap-3 group"
          >
            <span
              className={`text-xs tracking-widest uppercase transition-all duration-300 ${
                i === current ? 'text-white' : 'text-white/25 group-hover:text-white/50'
              }`}
            >
              {s.label}
            </span>
            <span
              className={`block h-px transition-all duration-300 ${
                i === current ? 'w-10' : 'w-4 opacity-30'
              }`}
              style={{ backgroundColor: i === current ? s.accent : '#fff' }}
            />
          </button>
        ))}
      </div>

      {/* Mobile dot indicators */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 flex items-center gap-3 lg:hidden">
        {slides.map((s, i) => (
          <button
            key={s.id}
            onClick={() => goTo(i, i > current ? 1 : -1)}
            aria-label={`Go to slide ${i + 1}`}
          >
            <span
              className={`block h-[2px] rounded-full transition-all duration-300 ${
                i === current ? 'w-8' : 'w-3 opacity-30'
              }`}
              style={{ backgroundColor: i === current ? slide.accent : '#fff' }}
            />
          </button>
        ))}
      </div>

      {/* Auto-play progress bar */}
      {!isPaused && (
        <motion.div
          key={`bar-${current}`}
          className="absolute bottom-0 left-0 h-[2px] z-30"
          style={{ backgroundColor: slide.accent }}
          initial={{ width: '0%' }}
          animate={{ width: '100%' }}
          transition={{ duration: 6.5, ease: 'linear' }}
        />
      )}

      {/* Scroll hint */}
      <button
        onClick={() =>
          document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' })
        }
        className="absolute bottom-10 left-6 md:left-12 z-30 text-white/25 hover:text-white/60 transition-colors duration-300 animate-bounce lg:flex hidden flex-col items-center gap-1"
        aria-label="Scroll down"
      >
        <ChevronDown size={20} />
      </button>
    </section>
  );
}
