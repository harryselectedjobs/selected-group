import { useEffect, useRef, useState, useCallback } from "react";
import {
  DollarSign,
  Target,
  Lock,
  Users,
  FileText,
  Briefcase,
  CheckCircle2,
  XCircle,
  ArrowRight,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const KEYFRAMES = `
  @keyframes floatA {
    0%, 100% { transform: translate(0px, 0px) scale(1); }
    33%       { transform: translate(28px, -38px) scale(1.06); }
    66%       { transform: translate(-16px, -24px) scale(0.95); }
  }
  @keyframes floatB {
    0%, 100% { transform: translate(0px, 0px) scale(1); }
    50%      { transform: translate(-30px, -48px) scale(1.09); }
  }
  @keyframes heroFadeUp {
    from { opacity: 0; transform: translateY(22px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes shimmerSlide {
    0%   { transform: translateX(-200%) skewX(-12deg); }
    100% { transform: translateX(500%)  skewX(-12deg); }
  }
  @keyframes pulseCTA {
    0%, 100% { box-shadow: 0 0 0 0   rgba(255,255,255,0.3), 0 8px 32px rgba(0,0,0,0.5); }
    50%      { box-shadow: 0 0 0 12px rgba(255,255,255,0),   0 8px 32px rgba(0,0,0,0.5); }
  }
  @keyframes tableRowIn {
    from { opacity: 0; transform: translateX(-10px); }
    to   { opacity: 1; transform: translateX(0); }
  }
  @keyframes illoDrift {
    0%, 100% { transform: translateY(0px); }
    50%      { transform: translateY(-6px); }
  }
  @keyframes illoSpin {
    from { transform: rotate(0deg); }
    to   { transform: rotate(360deg); }
  }
  @keyframes illoSpinReverse {
    from { transform: rotate(0deg); }
    to   { transform: rotate(-360deg); }
  }
  @keyframes illoFade {
    0%, 100% { opacity: 0.4; }
    50%      { opacity: 0.9; }
  }
  @keyframes waveDrift {
    0%   { transform: translateX(0); }
    100% { transform: translateX(-50%); }
  }
`;

const models = [
  {
    icon: DollarSign,
    accent: "#4F9CF9",
    title: "Contingency",
    subtitle: "No risk, pay on success",
    description:
      "Only pay when we successfully place a candidate. Zero upfront cost, zero risk.",
    feeStructure: "15–25% of first year salary",
    paymentTiming: "On candidate start date",
    bestFor:
      "Individual mid-level hires, backfilling roles, testing a new recruiter",
    advantages: [
      "Zero upfront cost",
      "No risk",
      "Fast to start",
      "Pay only for results",
    ],
    considerations: [
      "Higher fee percentage",
      "Less recruiter commitment",
      "Competing with other agencies",
    ],
  },
  {
    icon: Target,
    accent: "#A78BFA",
    title: "Retained",
    subtitle: "Dedicated executive search",
    description:
      "Committed, exclusive partnership. Ideal for senior hires and hard-to-fill roles.",
    feeStructure: "25–35% of first year salary",
    paymentTiming: "Staged: 1/3 upfront, 1/3 at shortlist, 1/3 on placement",
    bestFor:
      "Executive roles (CTO, CPO), niche specialists, confidential searches",
    advantages: [
      "Exclusive focus",
      "Deep market mapping",
      "Higher quality",
      "Guaranteed commitment",
    ],
    considerations: [
      "Upfront investment",
      "Higher total fee",
      "Longer process",
    ],
  },
  {
    icon: Lock,
    accent: "#34D399",
    title: "Exclusive",
    subtitle: "Priority without upfront cost",
    description:
      "Contingency-style payment but with exclusivity. Best of both models.",
    feeStructure: "18–22% of first year salary",
    paymentTiming: "On candidate start date",
    bestFor:
      "Multiple hires in the same function, where exclusivity unlocks better candidates",
    advantages: [
      "No upfront cost",
      "Dedicated focus",
      "Better than standard contingency",
      "Lower fee than retained",
    ],
    considerations: [
      "Can only use one agency",
      "Still dependent on placement",
      "Less common model",
    ],
  },
  {
    icon: Users,
    accent: "#FBBF24",
    title: "RPO",
    subtitle: "Scale hiring operations",
    description:
      "Embedded recruiting team. We become your in-house recruiting function.",
    feeStructure: "Monthly retainer + per-hire fee",
    paymentTiming: "Monthly subscription model",
    bestFor:
      "High-volume hiring (10+ hires/quarter), scaling teams, building hiring infrastructure",
    advantages: [
      "Predictable costs",
      "Embedded in your team",
      "Process improvement",
      "Scalable",
    ],
    considerations: [
      "Ongoing commitment",
      "Higher minimum spend",
      "Requires close collaboration",
    ],
  },
  {
    icon: FileText,
    accent: "#F87171",
    title: "Contract",
    subtitle: "Project-based talent",
    description:
      "Contractors and freelancers for project work. Flexible duration.",
    feeStructure: "5–15% margin on contractor rate",
    paymentTiming: "Monthly or per-invoice",
    bestFor:
      "Short-term projects, augmenting teams, covering gaps, specialist contractors",
    advantages: [
      "Flexible duration",
      "Quick to hire",
      "No long-term commitment",
      "Easy to scale up/down",
    ],
    considerations: [
      "Ongoing margin",
      "Less candidate commitment",
      "Limited to contract roles",
    ],
  },
  {
    icon: Briefcase,
    accent: "#FB923C",
    title: "Statement of Work (SoW)",
    subtitle: "Outcome-based delivery",
    description:
      'Fixed scope, fixed price. We deliver an agreed outcome (e.g., "hire 20 data engineers in Q1").',
    feeStructure: "Fixed project fee",
    paymentTiming: "Milestone-based",
    bestFor:
      "Large hiring initiatives, enterprise programs, transformation projects",
    advantages: [
      "Predictable cost",
      "Clear outcomes",
      "Shared accountability",
      "Enterprise preferred",
    ],
    considerations: [
      "Less flexibility",
      "Requires clear scope",
      "Longer sales cycle",
    ],
  },
];

const comparison = [
  {
    model: "Contingency",
    upfront: "None",
    upfrontColor: "#34D399",
    risk: "Zero",
    riskColor: "#34D399",
    time: "Immediate",
    timeColor: "#4F9CF9",
    commitment: "Per hire",
  },
  {
    model: "Retained",
    upfront: "33% upfront",
    upfrontColor: "#FBBF24",
    risk: "Medium",
    riskColor: "#FBBF24",
    time: "1–2 weeks",
    timeColor: "#4F9CF9",
    commitment: "Exclusive",
  },
  {
    model: "Exclusive",
    upfront: "None",
    upfrontColor: "#34D399",
    risk: "Zero",
    riskColor: "#34D399",
    time: "Immediate",
    timeColor: "#4F9CF9",
    commitment: "Exclusive",
  },
  {
    model: "RPO",
    upfront: "Monthly retainer",
    upfrontColor: "#FBBF24",
    risk: "Medium",
    riskColor: "#FBBF24",
    time: "2–4 weeks",
    timeColor: "#4F9CF9",
    commitment: "6–12 months",
  },
  {
    model: "Contract",
    upfront: "None",
    upfrontColor: "#34D399",
    risk: "Low",
    riskColor: "#34D399",
    time: "Immediate",
    timeColor: "#4F9CF9",
    commitment: "Per contractor",
  },
  {
    model: "SoW",
    upfront: "Project deposit",
    upfrontColor: "#F87171",
    risk: "Low (fixed price)",
    riskColor: "#34D399",
    time: "2–4 weeks",
    timeColor: "#4F9CF9",
    commitment: "Project duration",
  },
];

/* ── Per-model SVG illustrations ─────────────────────────────────────── */
function CardIllustration({ title, accent, hovered }) {
  const a = accent;

  const arts = {
    Contingency: (
      <>
        {/* Ascending bar chart */}
        <rect
          x="55"
          y="92"
          width="26"
          height="30"
          rx="3"
          fill={`${a}18`}
          stroke={a}
          strokeWidth="1"
          opacity="0.7"
        />
        <rect
          x="113"
          y="66"
          width="26"
          height="56"
          rx="3"
          fill={`${a}22`}
          stroke={a}
          strokeWidth="1.1"
          opacity="0.75"
        />
        <rect
          x="171"
          y="38"
          width="26"
          height="84"
          rx="3"
          fill={`${a}28`}
          stroke={a}
          strokeWidth="1.2"
          opacity="0.8"
        />
        <rect
          x="229"
          y="14"
          width="26"
          height="108"
          rx="3"
          fill={`${a}35`}
          stroke={a}
          strokeWidth="1.5"
          opacity="0.85"
        />
        {/* Trend line */}
        <polyline
          points="68,88 126,62 184,34 242,10"
          fill="none"
          stroke={a}
          strokeWidth="1.5"
          strokeDasharray="5 3"
          opacity="0.55"
        />
        <circle cx="68" cy="88" r="3.5" fill={a} opacity="0.8" />
        <circle cx="126" cy="62" r="3.5" fill={a} opacity="0.8" />
        <circle cx="184" cy="34" r="3.5" fill={a} opacity="0.8" />
        <circle
          cx="242"
          cy="10"
          r="3.5"
          fill={a}
          opacity="0.9"
          style={{
            animation: hovered ? "illoFade 1.2s ease-in-out infinite" : "none",
          }}
        />
        {/* Ghost $ watermark */}
        <text
          x="270"
          y="108"
          fill={a}
          fontSize="72"
          opacity="0.05"
          fontFamily="monospace"
          fontWeight="bold"
        >
          $
        </text>
      </>
    ),

    Retained: (
      <g transform="translate(155,66)">
        {/* Concentric target rings */}
        <circle
          cx="0"
          cy="0"
          r="60"
          fill="none"
          stroke={a}
          strokeWidth="0.7"
          opacity="0.18"
        />
        <circle
          cx="0"
          cy="0"
          r="46"
          fill="none"
          stroke={a}
          strokeWidth="0.9"
          opacity="0.28"
        />
        <circle
          cx="0"
          cy="0"
          r="32"
          fill="none"
          stroke={a}
          strokeWidth="1.1"
          opacity="0.42"
        />
        <circle
          cx="0"
          cy="0"
          r="18"
          fill={`${a}18`}
          stroke={a}
          strokeWidth="1.4"
          opacity="0.65"
        />
        <circle
          cx="0"
          cy="0"
          r="6"
          fill={a}
          opacity="0.9"
          style={{
            animation: hovered ? "illoFade 1s ease-in-out infinite" : "none",
          }}
        />
        {/* Crosshairs */}
        {[
          [-65, -12],
          [-22, 0],
          [22, 0],
          [65, -12],
        ].map(([x, y], i) =>
          i < 2 ? (
            <line
              key={i}
              x1={x}
              y1={y}
              x2={x + 22}
              y2={y}
              stroke={a}
              strokeWidth="0.8"
              opacity="0.25"
            />
          ) : (
            <line
              key={i}
              x1={x - 22}
              y1={y}
              x2={x}
              y2={y}
              stroke={a}
              strokeWidth="0.8"
              opacity="0.25"
            />
          ),
        )}
        <line
          x1="0"
          y1="-65"
          x2="0"
          y2="-22"
          stroke={a}
          strokeWidth="0.8"
          opacity="0.25"
        />
        <line
          x1="0"
          y1="22"
          x2="0"
          y2="65"
          stroke={a}
          strokeWidth="0.8"
          opacity="0.25"
        />
        {/* Rotating arc */}
        <circle
          cx="0"
          cy="0"
          r="54"
          fill="none"
          stroke={a}
          strokeWidth="1.5"
          strokeDasharray="30 310"
          opacity="0.5"
          style={{
            transformOrigin: "center",
            animation: hovered ? "illoSpin 3s linear infinite" : "none",
          }}
        />
      </g>
    ),

    Exclusive: (
      <g transform="translate(155,65)">
        {/* Outer hexagon */}
        <polygon
          points="0,-58 50,-29 50,29 0,58 -50,29 -50,-29"
          fill={`${a}10`}
          stroke={a}
          strokeWidth="1.2"
          opacity="0.55"
        />
        {/* Inner hexagon */}
        <polygon
          points="0,-37 32,-18 32,18 0,37 -32,18 -32,-18"
          fill={`${a}14`}
          stroke={a}
          strokeWidth="1"
          opacity="0.4"
        />
        {/* Lock shackle */}
        <path
          d="M -8 -4 L -8 -18 Q -8 -28 0 -28 Q 8 -28 8 -18 L 8 -4"
          fill="none"
          stroke={a}
          strokeWidth="2"
          opacity="0.85"
          strokeLinecap="round"
        />
        {/* Lock body */}
        <rect
          x="-13"
          y="-4"
          width="26"
          height="22"
          rx="4"
          fill={`${a}30`}
          stroke={a}
          strokeWidth="2"
          opacity="0.85"
        />
        <circle cx="0" cy="7" r="3" fill={a} opacity="0.9" />
        {/* Rotating outer dashes */}
        <circle
          cx="0"
          cy="0"
          r="54"
          fill="none"
          stroke={a}
          strokeWidth="1"
          strokeDasharray="8 18"
          opacity="0.35"
          style={{
            transformOrigin: "center",
            animation: hovered ? "illoSpinReverse 6s linear infinite" : "none",
          }}
        />
      </g>
    ),

    RPO: (
      <>
        {/* Connections */}
        <line
          x1="155"
          y1="62"
          x2="88"
          y2="30"
          stroke={a}
          strokeWidth="0.9"
          opacity="0.3"
        />
        <line
          x1="155"
          y1="62"
          x2="222"
          y2="30"
          stroke={a}
          strokeWidth="0.9"
          opacity="0.3"
        />
        <line
          x1="155"
          y1="76"
          x2="68"
          y2="100"
          stroke={a}
          strokeWidth="0.9"
          opacity="0.3"
        />
        <line
          x1="155"
          y1="76"
          x2="242"
          y2="100"
          stroke={a}
          strokeWidth="0.9"
          opacity="0.3"
        />
        <line
          x1="155"
          y1="76"
          x2="155"
          y2="108"
          stroke={a}
          strokeWidth="0.9"
          opacity="0.3"
        />
        <line
          x1="88"
          y1="30"
          x2="68"
          y2="100"
          stroke={a}
          strokeWidth="0.6"
          opacity="0.15"
        />
        <line
          x1="222"
          y1="30"
          x2="242"
          y2="100"
          stroke={a}
          strokeWidth="0.6"
          opacity="0.15"
        />
        {/* Satellite nodes */}
        <circle
          cx="88"
          cy="30"
          r="8"
          fill={`${a}20`}
          stroke={a}
          strokeWidth="1.2"
          opacity="0.75"
        />
        <circle
          cx="222"
          cy="30"
          r="8"
          fill={`${a}20`}
          stroke={a}
          strokeWidth="1.2"
          opacity="0.75"
        />
        <circle
          cx="68"
          cy="100"
          r="7"
          fill={`${a}18`}
          stroke={a}
          strokeWidth="1.1"
          opacity="0.7"
        />
        <circle
          cx="242"
          cy="100"
          r="7"
          fill={`${a}18`}
          stroke={a}
          strokeWidth="1.1"
          opacity="0.7"
        />
        <circle
          cx="155"
          cy="108"
          r="6"
          fill={`${a}15`}
          stroke={a}
          strokeWidth="1"
          opacity="0.65"
        />
        {/* Hub */}
        <circle
          cx="155"
          cy="69"
          r="14"
          fill={`${a}28`}
          stroke={a}
          strokeWidth="1.8"
          opacity="0.9"
        />
        <circle
          cx="155"
          cy="69"
          r="5"
          fill={a}
          opacity="0.95"
          style={{
            animation: hovered ? "illoFade 1.4s ease-in-out infinite" : "none",
          }}
        />
      </>
    ),

    Contract: (
      <>
        {/* Timeline spine */}
        <line
          x1="38"
          y1="69"
          x2="272"
          y2="69"
          stroke={a}
          strokeWidth="1.5"
          opacity="0.35"
        />
        {/* Milestone groups */}
        {[72, 122, 172, 222].map((x, i) => (
          <g key={x}>
            <line
              x1={x}
              y1="54"
              x2={x}
              y2="84"
              stroke={a}
              strokeWidth="1"
              opacity="0.4"
            />
            <rect
              x={x - 18}
              y="84"
              width="36"
              height="7"
              rx="3"
              fill={a}
              opacity={0.08 + i * 0.06}
            />
            <circle
              cx={x}
              cy="69"
              r={i === 1 ? 9 : 6.5}
              fill={`${a}${i === 1 ? "35" : "20"}`}
              stroke={a}
              strokeWidth={i === 1 ? 2 : 1.3}
              opacity={0.6 + i * 0.08}
              style={
                i === 1 && hovered
                  ? { animation: "illoFade 1s ease-in-out infinite" }
                  : {}
              }
            />
          </g>
        ))}
        {/* Active marker pulse ring */}
        <circle
          cx="122"
          cy="69"
          r="18"
          fill="none"
          stroke={a}
          strokeWidth="1"
          opacity="0.3"
          style={{
            animation: hovered ? "illoFade 1s ease-in-out infinite" : "none",
          }}
        />
        {/* Arrow end */}
        <polyline
          points="265,63 272,69 265,75"
          fill="none"
          stroke={a}
          strokeWidth="1.5"
          opacity="0.5"
        />
        {/* Ghost doc lines */}
        <rect
          x="230"
          y="20"
          width="50"
          height="35"
          rx="3"
          fill={`${a}08`}
          stroke={a}
          strokeWidth="0.8"
          opacity="0.3"
        />
        <line
          x1="237"
          y1="30"
          x2="273"
          y2="30"
          stroke={a}
          strokeWidth="0.7"
          opacity="0.25"
        />
        <line
          x1="237"
          y1="37"
          x2="273"
          y2="37"
          stroke={a}
          strokeWidth="0.7"
          opacity="0.25"
        />
        <line
          x1="237"
          y1="44"
          x2="260"
          y2="44"
          stroke={a}
          strokeWidth="0.7"
          opacity="0.25"
        />
      </>
    ),

    "Statement of Work (SoW)": (
      <>
        {/* Step-up path fill */}
        <polygon
          points="38,115 38,92 100,92 100,64 162,64 162,36 224,36 224,10 275,10 275,115"
          fill={a}
          opacity="0.07"
        />
        {/* Step path stroke */}
        <polyline
          points="38,92 100,92 100,64 162,64 162,36 224,36 224,10 275,10"
          fill="none"
          stroke={a}
          strokeWidth="2"
          opacity="0.55"
        />
        {/* Step corner dots */}
        <circle cx="100" cy="92" r="4.5" fill={a} opacity="0.75" />
        <circle cx="162" cy="64" r="4.5" fill={a} opacity="0.8" />
        <circle cx="224" cy="36" r="4.5" fill={a} opacity="0.85" />
        {/* Milestone labels */}
        <rect
          x="82"
          y="96"
          width="36"
          height="7"
          rx="2"
          fill={a}
          opacity="0.12"
        />
        <rect
          x="144"
          y="68"
          width="36"
          height="7"
          rx="2"
          fill={a}
          opacity="0.16"
        />
        <rect
          x="206"
          y="40"
          width="36"
          height="7"
          rx="2"
          fill={a}
          opacity="0.20"
        />
        {/* Flag at top */}
        <line
          x1="275"
          y1="10"
          x2="275"
          y2="42"
          stroke={a}
          strokeWidth="1.5"
          opacity="0.6"
        />
        <polygon
          points="275,10 298,19 275,28"
          fill={a}
          opacity="0.55"
          style={{
            animation: hovered ? "illoDrift 2s ease-in-out infinite" : "none",
          }}
        />
        {/* Ghost grid lines */}
        <line
          x1="38"
          y1="115"
          x2="275"
          y2="115"
          stroke={a}
          strokeWidth="0.6"
          opacity="0.2"
        />
      </>
    ),
  };

  return (
    <div
      className="-mx-7 -mt-7 mb-0 relative overflow-hidden"
      style={{ height: 138 }}
    >
      {/* Tinted gradient background */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(135deg, ${a}12 0%, ${a}06 60%, transparent 100%)`,
        }}
      />
      {/* Dot-grid texture */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `radial-gradient(${a}35 1px, transparent 1px)`,
          backgroundSize: "18px 18px",
          opacity: 0.35,
        }}
      />
      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-10 pointer-events-none"
        style={{
          background: "linear-gradient(to bottom, transparent, #0d0d0d)",
        }}
      />
      {/* SVG art */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 310 130"
        preserveAspectRatio="xMidYMid meet"
      >
        {arts[title]}
      </svg>
    </div>
  );
}

/* ── ModelCard ────────────────────────────────────────────────────────── */
function ModelCard({
  icon: Icon,
  accent,
  title,
  subtitle,
  description,
  feeStructure,
  paymentTiming,
  bestFor,
  advantages,
  considerations,
  delay,
}) {
  const ref = useRef(null);
  const rafRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [glow, setGlow] = useState({ x: 50, y: 50 });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setVisible(true), delay);
          obs.disconnect();
        }
      },
      { threshold: 0.05 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [delay]);

  useEffect(
    () => () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    },
    [],
  );

  const handleMouseMove = useCallback((e) => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      if (!ref.current) return;
      const r = ref.current.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width;
      const y = (e.clientY - r.top) / r.height;
      setTilt({ x: (y - 0.5) * -12, y: (x - 0.5) * 12 });
      setGlow({ x: x * 100, y: y * 100 });
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setHovered(false);
    setTilt({ x: 0, y: 0 });
  }, []);

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        opacity: visible ? 1 : 0,
        transform: `perspective(1200px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateY(${visible ? 0 : 24}px)`,
        transition: hovered
          ? "opacity 0.7s ease, transform 0.12s ease, box-shadow 0.3s ease"
          : "opacity 0.7s ease, transform 0.55s cubic-bezier(0.23,1,0.32,1), box-shadow 0.4s ease",
        boxShadow: hovered
          ? `0 28px 70px rgba(0,0,0,0.65), 0 0 0 1px ${accent}35, 0 0 50px ${accent}08`
          : "0 4px 24px rgba(0,0,0,0.2)",
        willChange: "transform",
      }}
      className="bg-[#0d0d0d] border border-white/[0.07] p-7 flex flex-col gap-5 relative overflow-hidden"
    >
      {/* Cursor-following radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(circle at ${glow.x}% ${glow.y}%, ${accent}16 0%, transparent 62%)`,
          opacity: hovered ? 1 : 0,
          transition: "opacity 0.4s ease",
        }}
      />

      {/* Animated top accent line */}
      <div
        className="absolute top-0 left-0 h-[2px] z-10"
        style={{
          width: hovered ? "100%" : "0%",
          backgroundColor: accent,
          boxShadow: hovered ? `0 0 14px ${accent}` : "none",
          transition:
            "width 0.45s cubic-bezier(0.4,0,0.2,1), box-shadow 0.3s ease",
        }}
      />

      {/* Shimmer sweep */}
      {hovered && (
        <div className="absolute inset-0 pointer-events-none z-10">
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(105deg, transparent 28%, rgba(255,255,255,0.045) 50%, transparent 72%)",
              animation: "shimmerSlide 1.4s cubic-bezier(0.4,0,0.6,1) forwards",
            }}
          />
        </div>
      )}

      {/* Per-model illustration banner */}
      <CardIllustration title={title} accent={accent} hovered={hovered} />

      {/* Header */}
      <div className="flex items-center gap-4 relative z-10">
        <div
          style={{
            width: 44,
            height: 44,
            borderRadius: 12,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            backgroundColor: hovered ? `${accent}28` : `${accent}18`,
            boxShadow: hovered ? `0 0 28px ${accent}45` : "none",
            transform: hovered
              ? "scale(1.1) rotate(-5deg)"
              : "scale(1) rotate(0deg)",
            transition: "all 0.4s cubic-bezier(0.34,1.56,0.64,1)",
          }}
        >
          <Icon size={20} style={{ color: accent }} />
        </div>
        <div>
          <h3 className="text-white font-bold text-lg tracking-tight leading-tight">
            {title}
          </h3>
          <p className="text-sm font-medium mt-0.5" style={{ color: accent }}>
            {subtitle}
          </p>
        </div>
      </div>

      <p className="text-white/45 text-sm leading-relaxed relative z-10">
        {description}
      </p>

      {/* Details */}
      <div className="border-t border-white/[0.06] pt-4 flex flex-col gap-3 relative z-10">
        <div>
          <p className="text-white/55 text-xs font-medium tracking-wide uppercase mb-1">
            Fee Structure
          </p>
          <p className="text-white/70 text-sm font-semibold">{feeStructure}</p>
        </div>
        <div>
          <p className="text-white/55 text-xs font-medium tracking-wide uppercase mb-1">
            Payment Timing
          </p>
          <p className="text-white/70 text-sm">{paymentTiming}</p>
        </div>
        <div>
          <p className="text-white/55 text-xs font-medium tracking-wide uppercase mb-1">
            Best For
          </p>
          <p className="text-sm leading-relaxed" style={{ color: accent }}>
            {bestFor}
          </p>
        </div>
      </div>

      {/* Advantages & Considerations */}
      <div className="border-t border-white/[0.06] pt-4 grid grid-cols-1 gap-4 relative z-10">
        <div>
          <p className="text-white/40 text-xs font-semibold tracking-wide uppercase mb-2">
            Advantages
          </p>
          <ul className="flex flex-col gap-1.5">
            {advantages.map((a) => (
              <li key={a} className="flex items-center gap-2">
                <CheckCircle2
                  size={13}
                  className="text-[#34D399] flex-shrink-0"
                />
                <span className="text-white/55 text-xs">{a}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-white/40 text-xs font-semibold tracking-wide uppercase mb-2">
            Considerations
          </p>
          <ul className="flex flex-col gap-1.5">
            {considerations.map((c) => (
              <li key={c} className="flex items-center gap-2">
                <XCircle size={13} className="text-white/25 flex-shrink-0" />
                <span className="text-white/60 text-xs">{c}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

/* ── Page ────────────────────────────────────────────────────────────── */
export default function EngagementModelsPage() {
  const navigate = useNavigate();
  const tableRef = useRef(null);
  const [tableVisible, setTableVisible] = useState(false);
  const [hoveredRow, setHoveredRow] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (window.location.hash === "#quick-comparison") {
      setTimeout(
        () => tableRef.current?.scrollIntoView({ behavior: "smooth" }),
        400,
      );
    }
  }, []);

  useEffect(() => {
    const el = tableRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTableVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.1 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div className="bg-black min-h-screen">
      <style dangerouslySetInnerHTML={{ __html: KEYFRAMES }} />

      {/* ── Hero ──────────────────────────────────────────────────────── */}
      <div className="pt-32 pb-16 px-6 relative overflow-hidden bg-black">
        {/* Animated floating orbs */}
        <div
          className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full blur-[140px] pointer-events-none"
          style={{
            backgroundColor: "rgba(13,42,94,0.7)",
            animation: "floatA 14s ease-in-out infinite",
          }}
        />
        <div
          className="absolute bottom-0 -left-20 w-[400px] h-[400px] rounded-full blur-[120px] pointer-events-none"
          style={{
            backgroundColor: "rgba(45,27,105,0.4)",
            animation: "floatB 18s ease-in-out infinite",
          }}
        />
        {/* Extra mid orb */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[300px] rounded-full blur-[160px] pointer-events-none"
          style={{ backgroundColor: "rgba(20,10,60,0.35)" }}
        />

        {/* Fine grid */}
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />

        {/* Scrolling wave SVG background */}
        <div className="absolute bottom-0 left-0 right-0 h-40 overflow-hidden pointer-events-none opacity-[0.06]">
          <svg
            viewBox="0 0 1440 160"
            preserveAspectRatio="none"
            className="absolute w-[200%] h-full"
            style={{ animation: "waveDrift 18s linear infinite" }}
          >
            <path
              d="M0,80 C180,140 360,20 540,80 C720,140 900,20 1080,80 C1260,140 1440,20 1440,80 L1440,160 L0,160 Z"
              fill="white"
            />
          </svg>
        </div>

        {/* Abstract dot cluster — top right */}
        <svg
          className="absolute top-16 right-12 pointer-events-none opacity-[0.12]"
          width="180"
          height="180"
          viewBox="0 0 180 180"
        >
          {Array.from({ length: 64 }).map((_, i) => {
            const col = i % 8;
            const row = Math.floor(i / 8);
            return (
              <circle
                key={i}
                cx={col * 24 + 12}
                cy={row * 24 + 12}
                r="2"
                fill="white"
              />
            );
          })}
        </svg>

        {/* Abstract dot cluster — bottom left */}
        <svg
          className="absolute bottom-8 left-10 pointer-events-none opacity-[0.08]"
          width="120"
          height="120"
          viewBox="0 0 120 120"
        >
          {Array.from({ length: 25 }).map((_, i) => {
            const col = i % 5;
            const row = Math.floor(i / 5);
            return (
              <circle
                key={i}
                cx={col * 24 + 12}
                cy={row * 24 + 12}
                r="1.5"
                fill="white"
              />
            );
          })}
        </svg>

        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black to-transparent pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div
            className="flex items-center gap-3 mb-5"
            style={{
              animation: "heroFadeUp 0.7s ease both",
              animationDelay: "0.05s",
            }}
          >
            <span className="w-8 h-px bg-white/20" />
            <span className="text-white/60 text-xs font-medium tracking-[0.3em] uppercase">
              How We Work
            </span>
          </div>

          <h1
            className="text-[3.25rem] font-bold text-white tracking-tight mb-4 max-w-3xl leading-tight"
            style={{
              animation: "heroFadeUp 0.8s ease both",
              animationDelay: "0.18s",
            }}
          >
            Engagement{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/40">
              Models
            </span>
          </h1>

          <p
            className="text-white/50 text-base md:text-lg max-w-xl leading-relaxed mb-8"
            style={{
              animation: "heroFadeUp 0.8s ease both",
              animationDelay: "0.32s",
            }}
          >
            Choose the approach that fits your hiring needs. From no-risk
            contingency to embedded RPO partnerships.
          </p>

          <div
            style={{
              animation: "heroFadeUp 0.8s ease both",
              animationDelay: "0.46s",
            }}
          >
            <button
              onClick={() =>
                tableRef.current?.scrollIntoView({ behavior: "smooth" })
              }
              className="group inline-flex items-center gap-2 border border-white/20 text-white/60 hover:border-white/40 hover:text-white px-6 py-3 text-xs font-semibold tracking-widest uppercase transition-all duration-300"
            >
              Quick Comparison
              <ArrowRight
                size={13}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </button>
          </div>
        </div>
      </div>

      {/* ── Model Cards ───────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-6 py-12 md:py-16">
        <div className="grid md:grid-cols-2 gap-5">
          {models.map((m, i) => (
            <ModelCard key={m.title} {...m} delay={i * 80} />
          ))}
        </div>
      </div>

      {/* ── Quick Comparison Table ────────────────────────────────────── */}
      <div
        ref={tableRef}
        id="quick-comparison"
        className="border-t border-white/[0.05] bg-[#030303] py-12 md:py-16 px-6 relative overflow-hidden"
      >
        {/* Diagonal stripe background */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.025]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(45deg, white 0px, white 1px, transparent 1px, transparent 28px)",
          }}
        />
        {/* Corner accent dot grid */}
        <svg
          className="absolute top-8 right-8 pointer-events-none opacity-[0.07]"
          width="140"
          height="140"
          viewBox="0 0 140 140"
        >
          {Array.from({ length: 36 }).map((_, i) => {
            const col = i % 6;
            const row = Math.floor(i / 6);
            return (
              <circle
                key={i}
                cx={col * 24 + 8}
                cy={row * 24 + 8}
                r="1.8"
                fill="white"
              />
            );
          })}
        </svg>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-12">
            <div
              className="flex items-center justify-center gap-3 mb-5"
              style={{
                opacity: tableVisible ? 1 : 0,
                transform: tableVisible ? "none" : "translateY(16px)",
                transition: "opacity 0.7s ease, transform 0.7s ease",
              }}
            >
              <span className="w-8 h-px bg-white/20" />
              <span className="text-white/60 text-xs font-medium tracking-[0.3em] uppercase">
                Side by Side
              </span>
              <span className="w-8 h-px bg-white/20" />
            </div>
            <h2
              className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-3"
              style={{
                opacity: tableVisible ? 1 : 0,
                transform: tableVisible ? "none" : "translateY(16px)",
                transition:
                  "opacity 0.7s ease 0.12s, transform 0.7s ease 0.12s",
              }}
            >
              Quick Comparison
            </h2>
            <p
              className="text-white/40 text-base"
              style={{
                opacity: tableVisible ? 1 : 0,
                transition: "opacity 0.7s ease 0.22s",
              }}
            >
              Compare models side by side
            </p>
          </div>

          <div
            className="overflow-x-auto rounded-sm"
            style={{
              opacity: tableVisible ? 1 : 0,
              transform: tableVisible ? "none" : "translateY(20px)",
              transition: "opacity 0.8s ease 0.28s, transform 0.8s ease 0.28s",
            }}
          >
            <table className="w-full border-collapse">
              <thead>
                <tr
                  style={{
                    background:
                      "linear-gradient(90deg, #0d1a3a 0%, #1a2a5e 100%)",
                  }}
                >
                  {[
                    "Model",
                    "Upfront Cost",
                    "Risk Level",
                    "Time to Start",
                    "Commitment",
                  ].map((h) => (
                    <th
                      key={h}
                      className="text-left px-6 py-4 text-white/80 text-xs font-bold tracking-[0.2em] uppercase border-b border-white/[0.08]"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {comparison.map((row, i) => (
                  <tr
                    key={row.model}
                    onMouseEnter={() => setHoveredRow(i)}
                    onMouseLeave={() => setHoveredRow(null)}
                    className="border-b border-white/[0.05]"
                    style={{
                      backgroundColor:
                        hoveredRow === i
                          ? "rgba(255,255,255,0.045)"
                          : i % 2 === 0
                            ? "rgba(255,255,255,0.01)"
                            : "transparent",
                      transition: "background-color 0.2s ease",
                      animation: tableVisible
                        ? "tableRowIn 0.5s ease both"
                        : "none",
                      animationDelay: `${0.38 + i * 0.07}s`,
                    }}
                  >
                    <td className="px-6 py-4 text-white font-semibold text-sm">
                      <span
                        style={{
                          display: "inline-block",
                          transform:
                            hoveredRow === i
                              ? "translateX(5px)"
                              : "translateX(0)",
                          transition: "transform 0.25s ease",
                        }}
                      >
                        {row.model}
                      </span>
                    </td>
                    <td
                      className="px-6 py-4 text-sm font-medium"
                      style={{ color: row.upfrontColor }}
                    >
                      {row.upfront}
                    </td>
                    <td
                      className="px-6 py-4 text-sm font-medium"
                      style={{ color: row.riskColor }}
                    >
                      {row.risk}
                    </td>
                    <td
                      className="px-6 py-4 text-sm font-medium"
                      style={{ color: row.timeColor }}
                    >
                      {row.time}
                    </td>
                    <td className="px-6 py-4 text-white/50 text-sm">
                      {row.commitment}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* ── CTA ───────────────────────────────────────────────────────── */}
      <div className="border-t border-white/[0.05] py-16 px-6 text-center relative overflow-hidden">
        {/* Radial glow behind CTA */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 60% 60% at 50% 50%, rgba(79,156,249,0.06) 0%, transparent 70%)",
          }}
        />
        {/* Corner dot grid */}
        <svg
          className="absolute bottom-4 left-8 pointer-events-none opacity-[0.06]"
          width="100"
          height="100"
          viewBox="0 0 100 100"
        >
          {Array.from({ length: 16 }).map((_, i) => {
            const col = i % 4;
            const row = Math.floor(i / 4);
            return (
              <circle
                key={i}
                cx={col * 28 + 10}
                cy={row * 28 + 10}
                r="1.5"
                fill="white"
              />
            );
          })}
        </svg>

        <div className="max-w-xl mx-auto relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-4">
            Not Sure Which Model Fits?
          </h2>
          <p className="text-white/45 text-base leading-relaxed mb-10">
            We'll help you choose the right approach based on your timeline,
            budget, and hiring goals.
          </p>
          <button
            onClick={() => {
              navigate("/");
              setTimeout(
                () =>
                  document
                    .querySelector("#contact")
                    ?.scrollIntoView({ behavior: "smooth" }),
                300,
              );
            }}
            className="group inline-flex items-center gap-3 bg-white text-black px-8 py-4 text-sm font-bold tracking-widest uppercase transition-all duration-300 hover:bg-white/90"
            style={{ animation: "pulseCTA 2.5s ease-in-out infinite" }}
          >
            Talk to Us
            <ArrowRight
              size={15}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </button>
        </div>
      </div>
    </div>
  );
}
