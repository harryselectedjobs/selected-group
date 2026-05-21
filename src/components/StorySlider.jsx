import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
  {
    id: "founding-moment",
    number: "01",
    label: "Founding Moment",
    videoId: "rCO-iohFqQ0",
    chapter: "The Beginning",
    title: ["Founding", "Moment"],
    description:
      "In 2013, two friends with a shared frustration about how recruitment was being done decided to build something different. Steven Petty and Harry Brown sat down with a simple belief: great people deserve great partners — and the industry had forgotten that.",
  },
  {
    id: "shared-journey",
    number: "02",
    label: "Shared Journey Begins",
    videoId: "bN33jd5y1rE",
    chapter: "Early Days",
    title: ["Shared", "Journey Begins"],
    description:
      "Before Selected Group existed, Steven and Harry walked the same path — learning the craft of recruitment side by side, building trust, and developing a friendship forged through long hours and shared ambition. That foundation never left the business.",
  },
  {
    id: "mentorship",
    number: "03",
    label: "Mentorship & Learning",
    videoId: "p-24rae44CU",
    chapter: "Formative Years",
    title: ["Mentorship &", "Learning"],
    description:
      "Growth came through listening. Early in the company's life, both founders invested deeply in learning from the best — senior leaders, seasoned operators, and the clients who trusted them with their most critical hires. Every lesson was built into the DNA of the firm.",
  },
  {
    id: "growth",
    number: "04",
    label: "Growth of the Company",
    videoId: "f0Shc2YFBIk",
    chapter: "Scaling Up",
    title: ["Growth of", "the Company"],
    description:
      "What started as two people with a vision grew into a firm spanning multiple divisions, markets, and geographies. Over a decade, Selected Group scaled by staying true to a simple principle: results-driven recruitment built on genuine relationships.",
  },
  {
    id: "trust",
    number: "05",
    label: "Trust & Client Relationships",
    videoId: "JH_Kf-th-mk",
    chapter: "Long-Term Partnerships",
    title: ["Trust &", "Client Relationships"],
    description:
      "The clients who came to Selected Group in year one are still partners today. That longevity is not an accident — it's the product of transparency, consistent delivery, and a commitment to understanding every client's business as deeply as they do themselves.",
  },
  {
    id: "collaboration",
    number: "06",
    label: "Team Collaboration",
    videoId: "gXFATcwrO-U",
    chapter: "Building Culture",
    title: ["Team", "Collaboration"],
    description:
      "Inside Selected Group, collaboration is not a value on a wall — it's how work gets done. Consultants share markets, intelligence, and networks freely. The internal culture mirrors exactly what the firm promises its clients: partnership without ego.",
  },
  {
    id: "impact",
    number: "07",
    label: "Impact on Careers",
    videoId: "Y7cpCDlRfV0",
    chapter: "Lasting Change",
    title: ["Impact on", "Careers"],
    description:
      "Over 3,000 professionals have moved into defining roles through Selected Group. Behind each placement is a conversation, a relationship, and a moment of change — a career accelerated, a team completed, a company strengthened. That is the measure that matters.",
  },
  {
    id: "legacy",
    number: "08",
    label: "Legacy & Success",
    videoId: "CPst7UcwOwg",
    chapter: "The Road Ahead",
    title: ["Legacy &", "Success"],
    description:
      "More than a decade in, the ambition has not diminished — it has sharpened. Selected Group's legacy is being written by every hire made, every partnership deepened, and every technology business helped to build a team worthy of its potential.",
  },
];

function VideoBackground({ videoId, active }) {
  return (
    <div
      className="absolute inset-0 overflow-hidden transition-opacity duration-1000"
      style={{ opacity: active ? 1 : 0, zIndex: active ? 1 : 0 }}
    >
      <iframe
        src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=0&showinfo=0&modestbranding=1&playsinline=1&rel=0`}
        title={videoId}
        allow="autoplay"
        frameBorder="0"
        className="
          absolute top-1/2 left-1/2
          -translate-x-1/2 -translate-y-1/2
          pointer-events-none
          w-[350vw] h-[350vw]
          sm:w-[220vw] sm:h-[220vw]
          md:w-[177.77vh] md:h-[56.25vw]
          min-h-full min-w-full
        "
      />
    </div>
  );
}

export default function StorySlider() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const intervalRef = useRef(null);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % slides.length);
  }, []);

  const prev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  }, []);

  useEffect(() => {
    if (paused) return;
    intervalRef.current = setInterval(next, 7000);
    return () => clearInterval(intervalRef.current);
  }, [paused, next]);

  const slide = slides[current];

  return (
    <section
      className="relative h-[90vh] bg-black overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* VIDEO BACKGROUNDS */}
      <div className="absolute inset-0">
        {slides.map((s, i) => (
          <VideoBackground
            key={s.id}
            videoId={s.videoId}
            active={i === current}
          />
        ))}
      </div>

      {/* OVERLAYS */}
      <div className="absolute inset-0 bg-black/60 z-[2]" />
      <div
        className="absolute inset-0 z-[2]"
        style={{
          background:
            "linear-gradient(to right, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.6) 45%, rgba(0,0,0,0.15) 100%)",
        }}
      />
      <div
        className="absolute inset-0 z-[2]"
        style={{
          background:
            "linear-gradient(to top, rgba(0,0,0,0.98) 0%, rgba(0,0,0,0.5) 25%, transparent 60%)",
        }}
      />

      {/* CHAPTER LABEL — top centre */}
      <div className="absolute top-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-3">
        <div className="w-8 h-px bg-[#F59E0B]/60" />
        <span className="uppercase tracking-[0.3em] text-[10px] text-[#F59E0B]/80">
          Company Story
        </span>
        <div className="w-8 h-px bg-[#F59E0B]/60" />
      </div>

      {/* SLIDE CONTENT */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          onDragEnd={(_, info) => {
            if (info.offset.x < -80) next();
            if (info.offset.x > 80) prev();
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45 }}
          className="relative z-10 h-full flex items-end md:items-center"
        >
          <div className="w-full max-w-7xl mx-auto px-5 sm:px-8 md:px-12 lg:px-16 pb-28 sm:pb-24 md:pb-0">
            {/* NUMBER / LABEL */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="flex items-center gap-3 mb-4"
            >
              <span className="text-white/30 text-[10px] tracking-[0.25em] uppercase">
                {slide.number} / 08
              </span>
              <span className="w-6 h-px bg-white/20" />
              <span className="text-white/50 text-[10px] tracking-[0.25em] uppercase font-medium">
                {slide.label}
              </span>
            </motion.div>

            {/* CHAPTER */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="text-[#F59E0B]/70 text-[11px] uppercase tracking-[0.3em] mb-4"
            >
              {slide.chapter}
            </motion.p>

            {/* TITLE */}
            <motion.h2
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="
                text-white font-bold tracking-tight leading-[1.02]
                text-[2rem] sm:text-[3rem] md:text-[4rem] lg:text-[5rem]
                max-w-3xl
              "
            >
              {slide.title[0]}
              <br />
              <span className="text-white/60">{slide.title[1]}</span>
            </motion.h2>

            {/* DESCRIPTION */}
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-5 text-white/55 leading-relaxed text-sm sm:text-[15px] md:text-base max-w-xl"
            >
              {slide.description}
            </motion.p>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* DESKTOP ARROWS */}
      <button
        onClick={prev}
        className="
          hidden md:flex absolute left-6 top-1/2 -translate-y-1/2 z-20
          w-11 h-11 items-center justify-center
          border border-white/15 text-white/40
          hover:text-white hover:border-white/40 hover:bg-white/5
          transition-all
        "
      >
        <ChevronLeft size={18} />
      </button>

      <button
        onClick={next}
        className="
          hidden md:flex absolute right-6 top-1/2 -translate-y-1/2 z-20
          w-11 h-11 items-center justify-center
          border border-white/15 text-white/40
          hover:text-white hover:border-white/40 hover:bg-white/5
          transition-all
        "
      >
        <ChevronRight size={18} />
      </button>

      {/* MOBILE DOTS */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2 z-20 md:hidden">
        {slides.map((_, i) => (
          <button key={i} onClick={() => setCurrent(i)}>
            <span
              className={`block rounded-full transition-all duration-300 ${
                i === current
                  ? "w-7 h-[2px] bg-white opacity-80"
                  : "w-2 h-[2px] bg-white opacity-25"
              }`}
            />
          </button>
        ))}
      </div>

      {/* DESKTOP SIDE NAV */}
      <div className="hidden xl:flex absolute right-10 bottom-12 z-20 flex-col items-end gap-3">
        {slides.map((s, i) => (
          <button
            key={s.id}
            onClick={() => setCurrent(i)}
            className="flex items-center gap-3 group"
          >
            <span
              className={`text-[10px] uppercase tracking-[0.2em] transition-all ${
                i === current
                  ? "text-white"
                  : "text-white/25 group-hover:text-white/50"
              }`}
            >
              {s.label}
            </span>
            <span
              className={`h-px bg-white transition-all ${
                i === current ? "w-10 opacity-70" : "w-3 opacity-20"
              }`}
            />
          </button>
        ))}
      </div>

      {/* PROGRESS BAR */}
      {!paused && (
        <motion.div
          key={current}
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 7, ease: "linear" }}
          className="absolute bottom-0 left-0 h-[2px] bg-white/50 z-30"
        />
      )}
    </section>
  );
}
