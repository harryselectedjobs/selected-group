/* ─────────────────────────────────────────────
   REDESIGNED ABOUT PAGE
   - Same structure
   - Premium dark aesthetic
   - Multiple accent gradients
   - Founder photo section added
───────────────────────────────────────────── */

import { useEffect, useRef, useState } from "react";
import {
  Users,
  Target,
  Award,
  Globe,
  TrendingUp,
  Shield,
  Zap,
  ChevronRight,
  Play,
  CheckCircle,
  ArrowRight,
} from "lucide-react";

const useInView = (threshold = 0.15) => {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      { threshold }
    );

    if (ref.current) obs.observe(ref.current);

    return () => obs.disconnect();
  }, [threshold]);

  return [ref, inView];
};

const FadeIn = ({ children, delay = 0, className = "" }) => {
  const [ref, inView] = useInView();

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(32px)",
        transition: `all 0.8s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
      }}
    >
      {children}
    </div>
  );
};

const stats = [
  { value: "3,000+", label: "Placements" },
  { value: "10+", label: "Years Experience" },
  { value: "Global", label: "Reach" },
  { value: "4", label: "Core Divisions" },
];

export default function AboutPage() {
  const [videoHovered, setVideoHovered] = useState(false);

  return (
    <div className="bg-[#060606] text-white overflow-hidden">

      {/* ───────────────── HERO ───────────────── */}

      <section className="relative min-h-screen flex items-center px-6 lg:px-12 overflow-hidden">

        {/* background gradients */}

        <div className="absolute inset-0">

          <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px]
            bg-[#7C3AED]/20 blur-[160px] rounded-full" />

          <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px]
            bg-[#F59E0B]/10 blur-[160px] rounded-full" />

          <div className="absolute top-[40%] left-[50%] w-[400px] h-[400px]
            bg-[#06B6D4]/10 blur-[120px] rounded-full" />

        </div>

        <div className="max-w-7xl mx-auto relative z-10 w-full">

          <FadeIn>

            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-px bg-gradient-to-r from-[#F59E0B] to-[#7C3AED]" />
              <span className="uppercase tracking-[0.3em] text-xs text-[#D1D5DB]">
                About Selected Group
              </span>
            </div>

            <h1
              className="font-black leading-[0.9] tracking-[-0.04em] max-w-5xl mb-10"
              style={{
                fontSize: "clamp(4rem, 10vw, 8rem)",
              }}
            >
              Building
              <br />

              <span className="text-transparent bg-clip-text bg-gradient-to-r
                from-[#F59E0B] via-[#E879F9] to-[#06B6D4]">
                World-Class
              </span>

              <br />
              Technology Teams
            </h1>

            <p className="text-lg lg:text-xl text-[#A1A1AA] max-w-2xl leading-relaxed mb-12">
              Selected Group partners with software vendors, enterprise
              technology businesses, and consulting organisations to build
              scalable teams across GTM, Product, Professional Services,
              and Engineering.
            </p>

            <div className="flex flex-wrap gap-4">

              <a
                href="/contact"
                className="px-8 py-4 rounded-xl bg-white text-black font-semibold
                hover:scale-[1.02] transition-all duration-300"
              >
                Get In Touch
              </a>

              <a
                href="#story"
                className="px-8 py-4 rounded-xl border border-white/10
                hover:border-white/30 transition-all duration-300"
              >
                Our Story
              </a>

            </div>

          </FadeIn>
        </div>
      </section>

      {/* ───────────────── STATS ───────────────── */}

      <section className="border-y border-white/5 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16 grid grid-cols-2 lg:grid-cols-4 gap-10">

          {stats.map((s, i) => (
            <FadeIn key={i} delay={i * 0.1}>

              <div className="relative p-8 rounded-2xl border border-white/5 bg-white/[0.03]">

                <div className="absolute top-0 left-0 w-10 h-px bg-gradient-to-r from-[#F59E0B] to-transparent" />

                <div className="text-5xl font-black mb-3 text-white">
                  {s.value}
                </div>

                <div className="uppercase tracking-[0.2em] text-xs text-[#71717A]">
                  {s.label}
                </div>

              </div>

            </FadeIn>
          ))}

        </div>
      </section>

      {/* ───────────────── INTRO ───────────────── */}

      <section className="max-w-7xl mx-auto px-6 lg:px-12 py-28 grid lg:grid-cols-12 gap-20">

        <FadeIn className="lg:col-span-5">

          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-px bg-[#E879F9]" />
            <span className="uppercase tracking-[0.25em] text-xs text-[#E879F9]">
              Who We Are
            </span>
          </div>

          <h2 className="text-4xl lg:text-5xl font-bold leading-tight mb-8">
            More Than
            <br />
            Recruitment
          </h2>

        </FadeIn>

        <FadeIn delay={0.15} className="lg:col-span-7 space-y-6">

          <p className="text-lg text-[#A1A1AA] leading-relaxed">
            Selected Group was founded over ten years ago with a clear mission:
            to deliver a genuinely results-driven recruitment service for
            software vendors, technology businesses, and consulting
            organisations looking to scale.
          </p>

          <p className="text-lg text-[#A1A1AA] leading-relaxed">
            The company partners with organisations throughout every stage of
            their growth journey — whether launching into new markets,
            expanding existing teams, or building scalable global functions.
          </p>

          <p className="text-lg text-[#A1A1AA] leading-relaxed">
            What differentiates Selected Group is its consultative,
            relationship-led approach combined with deep expertise across
            enterprise technology hiring.
          </p>

        </FadeIn>
      </section>

      {/* ───────────────── FOUNDERS ───────────────── */}

      <section
        id="story"
        className="bg-[#0B0B0B] border-y border-white/5 py-28 px-6 lg:px-12"
      >
        <div className="max-w-7xl mx-auto">

          <FadeIn className="text-center mb-16">

            <div className="flex items-center justify-center gap-3 mb-5">
              <div className="w-8 h-px bg-[#06B6D4]" />
              <span className="uppercase tracking-[0.3em] text-xs text-[#06B6D4]">
                Founders
              </span>
              <div className="w-8 h-px bg-[#06B6D4]" />
            </div>

            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Built on Partnership & Trust
            </h2>

            <p className="text-[#A1A1AA] max-w-2xl mx-auto text-lg leading-relaxed">
              Selected Group was founded by Steven Petty and Harry Brown —
              built on long-term friendship, loyalty, and a shared ambition
              to redefine technology recruitment.
            </p>

          </FadeIn>

          {/* founder photo cards */}

          <div className="grid lg:grid-cols-2 gap-8">

            {/* Harry */}

            <FadeIn>

              <div className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03]">

                <div className="aspect-[4/5] overflow-hidden">

                  <img
                    src="/founders/harry-wife.jpg"
                    alt="Harry Brown and wife"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />

                </div>

                <div className="p-8">

                  <p className="uppercase tracking-[0.25em] text-xs text-[#F59E0B] mb-3">
                    Co-Founder
                  </p>

                  <h3 className="text-3xl font-bold mb-4">
                    Harry Brown
                  </h3>

                  <p className="text-[#A1A1AA] leading-relaxed">
                    Harry helped build Selected Group around the belief that
                    recruitment should create long-term impact — not simply
                    fill vacancies.
                  </p>

                </div>
              </div>

            </FadeIn>

            {/* Steven */}

            <FadeIn delay={0.15}>

              <div className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03]">

                <div className="aspect-[4/5] overflow-hidden">

                  <img
                    src="/founders/steven-wife.jpg"
                    alt="Steven Petty and wife"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />

                </div>

                <div className="p-8">

                  <p className="uppercase tracking-[0.25em] text-xs text-[#E879F9] mb-3">
                    Co-Founder
                  </p>

                  <h3 className="text-3xl font-bold mb-4">
                    Steven Petty
                  </h3>

                  <p className="text-[#A1A1AA] leading-relaxed">
                    Steven has spent more than a decade helping enterprise
                    technology companies scale through relationship-led,
                    strategic recruitment partnerships.
                  </p>

                </div>
              </div>

            </FadeIn>

          </div>

        </div>
      </section>

      {/* ───────────────── VIDEO SECTION ───────────────── */}

      <section className="max-w-7xl mx-auto px-6 lg:px-12 py-28">

        <FadeIn className="text-center mb-14">

          <div className="flex items-center justify-center gap-3 mb-5">
            <div className="w-8 h-px bg-[#F59E0B]" />
            <span className="uppercase tracking-[0.25em] text-xs text-[#F59E0B]">
              Company Story
            </span>
            <div className="w-8 h-px bg-[#F59E0B]" />
          </div>

          <h2 className="text-4xl lg:text-5xl font-bold mb-5">
            The Selected Group Journey
          </h2>

        </FadeIn>

        <FadeIn delay={0.1}>

          <div
            onMouseEnter={() => setVideoHovered(true)}
            onMouseLeave={() => setVideoHovered(false)}
            className="relative overflow-hidden rounded-3xl border border-white/10
            bg-gradient-to-br from-[#111827] to-[#0B0B0B]
            aspect-video flex items-center justify-center group"
          >

            <div className="absolute inset-0 opacity-20">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.12),transparent_60%)]" />
            </div>

            <div
              className={`relative z-10 w-24 h-24 rounded-full border border-white/20
              flex items-center justify-center transition-all duration-300
              ${videoHovered ? "scale-110 bg-white/10" : "bg-white/5"}`}
            >
              <Play size={32} fill="white" className="ml-1" />
            </div>

            <div className="absolute bottom-8 left-8">

              <p className="uppercase tracking-[0.25em] text-xs text-[#A1A1AA] mb-2">
                AI Generated Founder Story
              </p>

              <h3 className="text-2xl font-bold">
                Video Coming Soon
              </h3>

            </div>

          </div>

        </FadeIn>

      </section>

    </div>
  );
}