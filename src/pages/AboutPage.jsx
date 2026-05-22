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
  CheckCircle,
  ArrowRight,
} from "lucide-react";
import StorySlider from "../components/StorySlider";
import harywifeImage from "../assets/images/harry-wife.jpg";
import stevenwifeImage from "../assets/images/steven-wife.jpg";

const useInView = (threshold = 0.15) => {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      { threshold },
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
  return (
    <div className="bg-[#060606] text-white overflow-hidden">
      {/* ───────────────── HERO ───────────────── */}

      <section className="relative min-h-screen flex items-center px-6 lg:px-12 overflow-hidden">
        {/* background gradients */}

        <div className="absolute inset-0">
          <div
            className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px]
            bg-[#7C3AED]/20 blur-[160px] rounded-full"
          />

          <div
            className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px]
            bg-[#F59E0B]/10 blur-[160px] rounded-full"
          />

          <div
            className="absolute top-[40%] left-[50%] w-[400px] h-[400px]
            bg-[#06B6D4]/10 blur-[120px] rounded-full"
          />
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
              <span
                className="text-transparent bg-clip-text bg-gradient-to-r
                from-[#F59E0B] via-[#E879F9] to-[#06B6D4]"
              >
                World-Class
              </span>
              <br />
              Teams
            </h1>

            <p className="text-lg lg:text-xl text-[#A1A1AA] max-w-2xl leading-relaxed mb-12">
              Selected Group is a specialist technology recruitment business
              founded over ten years ago with a clear mission: to deliver a
              genuinely results-driven recruitment service for software vendors,
              technology businesses, and consulting organisations looking to
              scale.
            </p>
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
            Selected Group was founded over ten years ago by Steven Petty and
            Harry Brown following a successful partnership during their time
            together at Abika Consulting. Having developed elite recruitment
            expertise under the guidance of respected industry mentors James
            Gordon and Joe Armiger, the two founders set out to build a
            recruitment business with a different approach - one centred around
            relationships, trust, and genuine partnership.
          </p>

          <p className="text-lg text-[#A1A1AA] leading-relaxed">
            hough people often say never to go into business with family or
            close friends, Steven and Harry have built the foundation of
            Selected Group’s success on exactly that relationship. Over the past
            decade, they have experienced the highs and lows of business and
            life together, creating a culture built on loyalty, resilience, and
            always wanting the best for one another, their employees, and their
            customers.
          </p>

          <p className="text-lg text-[#A1A1AA] leading-relaxed">
            Selected Group was established on the belief that recruitment is
            about far more than filling jobs. The company partners with software
            vendors, consulting firms, and technology organisations to help them
            scale strategically across GTM, Professional Services, Product, and
            Engineering functions - whether entering new markets or expanding
            existing teams.
          </p>
        </FadeIn>
      </section>

      {/* ───────────────── FOUNDERS ───────────────── */}

      {/* ───────────────── STORY SLIDER ───────────────── */}

      <StorySlider />
    </div>
  );
}
