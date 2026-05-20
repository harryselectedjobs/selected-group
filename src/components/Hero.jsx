import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const slides = [
  {
    id: "gtm",
    number: "01",
    label: "GTM Talent",
    videoId: "qz9ADlOqqs8",
    title: ["Hiring the Best", "GTM Talent"],
    description:
      "Enterprise software sales and go-to-market recruitment specialist, placing high-performing sales leaders across the US and European markets with over 1,000 successful placements.",
    cta: "Find GTM Talent",
    route: "/gtm",
    stats: [
      { value: "1,000+", label: "Placements" },
      { value: "US & EU", label: "Markets" },
      { value: "C-Suite", label: "Executive Hires" },
    ],
  },

  {
    id: "executive",
    number: "02",
    label: "Executive Recruitment",
    videoId: "AHJVDFop9sU",
    title: ["Executive", "Recruitment"],
    description:
      "We identify and place transformational leaders who define company direction — from C-suite and board appointments to VP-level mandates across enterprise technology businesses globally.",
    cta: "Explore Executive Search",
    route: "/executive",
    stats: [
      { value: "C-Suite", label: "Leadership" },
      { value: "Global", label: "Network" },
      { value: "Board", label: "Mandates" },
    ],
  },

  {
    id: "product",
    number: "03",
    label: "Product Management",
    videoId: "zwUsFN__jtE",
    title: ["Specialist Product", "Management"],
    description:
      "Product management sits at the centre of every successful technology business, connecting customer needs, commercial strategy and engineering execution.",
    cta: "Explore Product Roles",
    route: "/product-management",
    stats: [
      { value: "CPO", label: "Executive Level" },
      { value: "SaaS", label: "Products" },
      { value: "AI", label: "Innovation" },
    ],
  },

  {
    id: "engineering",
    number: "04",
    label: "Engineering & Technology",
    videoId: "Hgg7M3kSqyE",
    title: ["Engineering &", "Technology"],
    description:
      "Building the teams responsible for designing, developing, scaling and securing modern enterprise technology products.",
    cta: "Explore Engineering",
    route: "/engineering",
    stats: [
      { value: "CTO", label: "Leadership" },
      { value: "Cloud", label: "Infrastructure" },
      { value: "AI", label: "Technology" },
    ],
  },

  {
    id: "professional",
    number: "05",
    label: "Professional Services",
    videoId: "AHJVDFop9sU",
    title: ["Professional", "Services"],
    description:
      "Specialist recruitment across pre-sales, consulting, implementation and customer success teams.",
    cta: "Explore Services",
    route: "/professional-services",
    stats: [
      { value: "ERP", label: "Platforms" },
      { value: "Global", label: "Delivery" },
      { value: "SaaS", label: "Transformation" },
    ],
  },
];

function VideoBackground({ videoId, active }) {
  return (
    <div
      className="absolute inset-0 overflow-hidden transition-opacity duration-1000"
      style={{
        opacity: active ? 1 : 0,
        zIndex: active ? 1 : 0,
      }}
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
          w-[350vw]
          h-[350vw]
          sm:w-[220vw]
          sm:h-[220vw]
          md:w-[177.77vh]
          md:h-[56.25vw]
          min-h-full
          min-w-full
        "
      />
    </div>
  );
}

export default function Hero() {
  const navigate = useNavigate();

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

    intervalRef.current = setInterval(() => {
      next();
    }, 7000);

    return () => clearInterval(intervalRef.current);
  }, [paused, next]);

  const slide = slides[current];

  return (
    <section
      className="relative h-[100svh] bg-black overflow-hidden"
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
      <div className="absolute inset-0 bg-black/55 z-[2]" />

      <div
        className="absolute inset-0 z-[2]"
        style={{
          background:
            "linear-gradient(to right, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.58) 45%, rgba(0,0,0,0.1) 100%)",
        }}
      />

      <div
        className="absolute inset-0 z-[2]"
        style={{
          background:
            "linear-gradient(to top, rgba(0,0,0,0.96) 0%, rgba(0,0,0,0.65) 25%, transparent 60%)",
        }}
      />

      {/* CONTENT */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          onDragEnd={(e, info) => {
            if (info.offset.x < -80) next();
            if (info.offset.x > 80) prev();
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45 }}
          className="
            relative z-10
            h-full
            flex items-end md:items-center
          "
        >
          <div
            className="
              w-full
              max-w-7xl
              mx-auto

              px-5
              sm:px-8
              md:px-12
              lg:px-16

              pb-28
              sm:pb-24
              md:pb-0
            "
          >
            {/* TOP LABEL */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="flex items-center gap-3 mb-5"
            >
              <span className="text-white/30 text-[10px] tracking-[0.25em] uppercase">
                {slide.number} / 05
              </span>

              <span className="w-6 h-px bg-white/20" />

              <span className="text-white/45 text-[10px] tracking-[0.25em] uppercase font-medium">
                {slide.label}
              </span>
            </motion.div>

            {/* TITLE */}
            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="
                text-white
                font-bold
                tracking-tight
                leading-[1.02]

                text-[2rem]
                sm:text-[3rem]
                md:text-[4rem]
                lg:text-[5rem]

                max-w-4xl
              "
            >
              {slide.title[0]}
              <br />

              <span className="text-white/65">{slide.title[1]}</span>
            </motion.h1>

            {/* DESCRIPTION */}
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="
                mt-5
                text-white/55
                leading-relaxed

                text-sm
                sm:text-[15px]
                md:text-base

                max-w-xl
              "
            >
              {slide.description}
            </motion.p>

            {/* BUTTONS */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="
                mt-8
                flex
                flex-wrap
                items-center
                gap-3
              "
            >
              <button
                onClick={() => navigate(slide.route)}
                className="
                  group
                  flex items-center gap-2

                  bg-white
                  text-black

                  px-6 py-3
                  sm:px-7

                  text-[10px]
                  sm:text-[11px]

                  uppercase
                  tracking-[0.2em]
                  font-bold

                  hover:bg-white/90
                  transition-all
                "
              >
                {slide.cta}

                <ArrowRight
                  size={13}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </button>

              <button
                onClick={() => {
                  navigate("/our-expertise", { state: { page: slide.id } });
                  document
                    .querySelector("#about")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
                className="
                  border border-white/15
                  text-white/75

                  px-6 py-3
                  sm:px-7

                  text-[10px]
                  sm:text-[11px]

                  uppercase
                  tracking-[0.2em]

                  hover:border-white/40
                  hover:bg-white/5
                  transition-all
                "
              >
                Our Expertise
              </button>
            </motion.div>

            {/* STATS */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="
                mt-10
                flex items-center
                flex-wrap
                gap-y-4
              "
            >
              {slide.stats.map((stat, i) => (
                <div
                  key={stat.label}
                  className={`
                    pr-6 sm:pr-8
                    ${i !== 0 ? "pl-6 sm:pl-8 border-l border-white/10" : ""}
                  `}
                >
                  <div className="text-white text-xl sm:text-2xl font-bold tracking-tight">
                    {stat.value}
                  </div>

                  <div className="text-white/30 text-[9px] tracking-[0.2em] uppercase mt-1">
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* DESKTOP ARROWS */}
      <button
        onClick={prev}
        className="
          hidden md:flex
          absolute left-6 top-1/2 -translate-y-1/2
          z-20

          w-11 h-11
          items-center justify-center

          border border-white/15
          text-white/40

          hover:text-white
          hover:border-white/40
          hover:bg-white/5

          transition-all
        "
      >
        <ChevronLeft size={18} />
      </button>

      <button
        onClick={next}
        className="
          hidden md:flex
          absolute right-6 top-1/2 -translate-y-1/2
          z-20

          w-11 h-11
          items-center justify-center

          border border-white/15
          text-white/40

          hover:text-white
          hover:border-white/40
          hover:bg-white/5

          transition-all
        "
      >
        <ChevronRight size={18} />
      </button>

      {/* MOBILE DOTS */}
      <div
        className="
          absolute
          bottom-8
          left-1/2
          -translate-x-1/2

          flex items-center gap-2
          z-20

          md:hidden
        "
      >
        {slides.map((_, i) => (
          <button key={i} onClick={() => setCurrent(i)}>
            <span
              className={`
                block rounded-full transition-all duration-300

                ${
                  i === current
                    ? "w-7 h-[2px] bg-white opacity-80"
                    : "w-2 h-[2px] bg-white opacity-25"
                }
              `}
            />
          </button>
        ))}
      </div>

      {/* DESKTOP SIDE NAV */}
      <div
        className="
          hidden xl:flex
          absolute right-10 bottom-12
          z-20

          flex-col items-end gap-3
        "
      >
        {slides.map((s, i) => (
          <button
            key={s.id}
            onClick={() => setCurrent(i)}
            className="flex items-center gap-3 group"
          >
            <span
              className={`
                text-[10px]
                uppercase
                tracking-[0.2em]
                transition-all

                ${
                  i === current
                    ? "text-white"
                    : "text-white/25 group-hover:text-white/50"
                }
              `}
            >
              {s.label}
            </span>

            <span
              className={`
                h-px bg-white transition-all

                ${i === current ? "w-10 opacity-70" : "w-3 opacity-20"}
              `}
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
          className="
            absolute bottom-0 left-0
            h-[2px]
            bg-white/50
            z-30
          "
        />
      )}

      {/* SCROLL HINT */}
      <button
        onClick={() =>
          document
            .querySelector("#about")
            ?.scrollIntoView({ behavior: "smooth" })
        }
        className="
          hidden lg:flex
          absolute left-10 bottom-10
          z-20

          text-white/25
          hover:text-white/50

          animate-bounce
          transition-colors
        "
      >
        <ChevronDown size={20} />
      </button>
    </section>
  );
}
