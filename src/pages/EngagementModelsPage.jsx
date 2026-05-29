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
  ArrowLeft,
  Search,
  MapPin,
  Send,
  Award,
  TrendingUp,
  BarChart2,
  Zap,
  Crown,
  Cpu,
  Clock,
  ChevronDown,
  Settings,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

/* ── Animations ──────────────────────────────────────────────────────── */
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
    0%, 100% { box-shadow: 0 0 0 0 rgba(255,255,255,0.3), 0 8px 32px rgba(0,0,0,0.5); }
    50%      { box-shadow: 0 0 0 12px rgba(255,255,255,0), 0 8px 32px rgba(0,0,0,0.5); }
  }
  @keyframes illoFade {
    0%, 100% { opacity: 0.4; }
    50%      { opacity: 0.9; }
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
  @keyframes waveDrift {
    0%   { transform: translateX(0); }
    100% { transform: translateX(-50%); }
  }
  @keyframes scanLine {
    0%   { transform: translateY(-120%); opacity: 0; }
    10%  { opacity: 0.5; }
    90%  { opacity: 0.5; }
    100% { transform: translateY(220%); opacity: 0; }
  }
  @keyframes pulseRing {
    0%, 100% { transform: scale(1);    opacity: 0.6; }
    50%      { transform: scale(1.1);  opacity: 1; }
  }
  @keyframes statIn {
    from { opacity: 0; transform: translateY(18px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes tableRowIn {
    from { opacity: 0; transform: translateX(-10px); }
    to   { opacity: 1; transform: translateX(0); }
  }
`;

/* ── Data ────────────────────────────────────────────────────────────── */
const models = [
  {
    icon: DollarSign,
    accent: "#4F9CF9",
    title: "Contingency",
    subtitle:
      "Success-based recruitment with payment only upon successful placement",
    description:
      "Zero upfront cost, zero risk. Pay only for results. Ideal for high-volume hiring where speed matters.",
    feeStructure: "15–22% of first year salary",
    paymentTiming: "On candidate start date",
    bestFor: "High-volume hiring, junior to mid-level roles",
    advantages: [
      "Zero upfront cost",
      "No risk",
      "Fast to start",
      "Pay only for results",
    ],
    considerations: ["Higher fee %", "Less exclusivity", "Competing agencies"],
  },
  {
    icon: Target,
    accent: "#A78BFA",
    title: "Retained",
    subtitle:
      "Premium executive search with dedicated focus and guaranteed results",
    description:
      "20–35% of first-year salary paid in stages. Committed, exclusive partnership for critical hires.",
    feeStructure: "20–35% of first year salary (paid in stages)",
    paymentTiming: "1/3 upfront, 1/3 shortlist, 1/3 placement",
    bestFor: "C-suite, senior leadership, strategic hires",
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
    subtitle: "Single-partner agreement for focused, priority recruitment",
    description:
      "Contingency pricing with dedicated focus. Best of both worlds for confidential searches.",
    feeStructure: "18–22% of first year salary",
    paymentTiming: "On candidate start date",
    bestFor: "Confidential searches, niche specializations",
    advantages: [
      "No upfront cost",
      "Dedicated focus",
      "Lower fee than retained",
      "Priority service",
    ],
    considerations: [
      "Single agency only",
      "Placement-dependent",
      "Less common model",
    ],
  },
  {
    icon: Users,
    accent: "#FBBF24",
    title: "RPO",
    subtitle:
      "Embedded recruitment function with scalable, AI-powered processes",
    description:
      "We become your in-house recruiting function with scalable operations and AI-powered processes.",
    feeStructure: "Monthly retainer + per-hire fee",
    paymentTiming: "Monthly subscription model",
    bestFor: "Scaling organizations, 20+ hires annually",
    advantages: [
      "Predictable costs",
      "Embedded team",
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
    subtitle: "Flexible temporary and contract staffing solutions",
    description:
      "Markup on hourly/daily rate. Project-based work, interim coverage, seasonal needs.",
    feeStructure: "Markup on hourly/daily rate",
    paymentTiming: "Monthly or per-invoice",
    bestFor: "Project-based work, interim coverage, seasonal needs",
    advantages: [
      "Flexible duration",
      "Quick to hire",
      "No long-term commitment",
      "Easy to scale",
    ],
    considerations: [
      "Ongoing margin",
      "Less candidate commitment",
      "Contract roles only",
    ],
  },
  {
    icon: Briefcase,
    accent: "#FB923C",
    title: "Statement of Work (SoW)",
    subtitle: "Project-based recruitment for defined hiring initiatives",
    description:
      "Fixed scope, fixed price. Clear outcomes, shared accountability, enterprise preferred.",
    feeStructure: "Fixed project fee",
    paymentTiming: "Milestone-based",
    bestFor: "Specific hiring projects, departmental buildouts",
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

const MODEL_ACCENTS = {
  Contingency: "#4F9CF9",
  Retained: "#A78BFA",
  Exclusive: "#34D399",
  RPO: "#FBBF24",
  Contract: "#F87171",
  "Statement of Work (SoW)": "#FB923C",
};

const MODEL_LABELS = {
  Contingency: "Contingency",
  Retained: "Retained",
  Exclusive: "Exclusive",
  RPO: "RPO",
  Contract: "Contract",
  "Statement of Work (SoW)": "SoW",
};

const CARD_ICON_CONFIG = {
  Contingency: {
    Icon: Zap,
    gradient: "linear-gradient(135deg, #F97316 0%, #EF4444 100%)",
  },
  Retained: {
    Icon: Crown,
    gradient: "linear-gradient(135deg, #F59E0B 0%, #F97316 100%)",
  },
  Exclusive: {
    Icon: Lock,
    gradient: "linear-gradient(135deg, #EC4899 0%, #A855F7 100%)",
  },
  RPO: {
    Icon: Cpu,
    gradient: "linear-gradient(135deg, #38BDF8 0%, #3B82F6 100%)",
  },
  Contract: {
    Icon: Clock,
    gradient: "linear-gradient(135deg, #22C55E 0%, #16A34A 100%)",
  },
  "Statement of Work (SoW)": {
    Icon: FileText,
    gradient: "linear-gradient(135deg, #A855F7 0%, #7C3AED 100%)",
  },
};

const COMPARISON_METRICS = [
  {
    label: "Upfront Cost",
    values: {
      Contingency: 0,
      Retained: 80,
      Exclusive: 0,
      RPO: 60,
      Contract: 0,
      "Statement of Work (SoW)": 40,
    },
  },
  {
    label: "Risk Level",
    values: {
      Contingency: 20,
      Retained: 45,
      Exclusive: 15,
      RPO: 35,
      Contract: 10,
      "Statement of Work (SoW)": 15,
    },
  },
  {
    label: "Time to Start",
    values: {
      Contingency: 90,
      Retained: 60,
      Exclusive: 85,
      RPO: 40,
      Contract: 90,
      "Statement of Work (SoW)": 50,
    },
  },
  {
    label: "Commitment",
    values: {
      Contingency: 30,
      Retained: 90,
      Exclusive: 50,
      RPO: 95,
      Contract: 25,
      "Statement of Work (SoW)": 70,
    },
  },
  {
    label: "Scalability",
    values: {
      Contingency: 70,
      Retained: 50,
      Exclusive: 65,
      RPO: 95,
      Contract: 85,
      "Statement of Work (SoW)": 80,
    },
  },
  {
    label: "Candidate Quality",
    values: {
      Contingency: 60,
      Retained: 95,
      Exclusive: 75,
      RPO: 80,
      Contract: 55,
      "Statement of Work (SoW)": 85,
    },
  },
  {
    label: "Speed of Hiring",
    values: {
      Contingency: 90,
      Retained: 55,
      Exclusive: 80,
      RPO: 45,
      Contract: 95,
      "Statement of Work (SoW)": 60,
    },
  },
];

const QUIZ_QUESTIONS = [
  {
    question: "What's your expected hiring volume over the next 12 months?",
    options: ["1–5 hires", "6–10 hires", "10–50 hires", "50+ hires"],
    key: "volume",
  },
  {
    question: "How would you describe your budget flexibility?",
    options: [
      "Strict fixed budget",
      "Some flexibility",
      "Open to investment for quality",
      "Enterprise-scale budget",
    ],
    key: "budget",
  },
  {
    question: "How urgently do you need to hire?",
    options: [
      "ASAP — within weeks",
      "1–3 months",
      "3–6 months",
      "No immediate rush",
    ],
    key: "urgency",
  },
  {
    question: "What seniority level are you primarily hiring for?",
    options: [
      "Entry / Junior",
      "Mid-level professional",
      "Senior / Director",
      "C-Suite / Executive",
    ],
    key: "seniority",
  },
  {
    question: "What matters most in this engagement?",
    options: [
      "Lowest possible cost",
      "Speed to hire",
      "Quality of candidates",
      "Long-term partnership",
    ],
    key: "priority",
  },
];

const PROCESS_STEPS = [
  {
    icon: Search,
    label: "Discovery",
    desc: "Deep dive into your needs, culture, and target profile",
  },
  {
    icon: MapPin,
    label: "Market Mapping",
    desc: "AI-powered talent mapping and competitive intelligence",
  },
  {
    icon: Send,
    label: "Outreach",
    desc: "Strategic engagement with top-tier candidates",
  },
  {
    icon: Users,
    label: "Interviews",
    desc: "Coordinated director interviews and candidate assessments",
  },
  {
    icon: Award,
    label: "Offer",
    desc: "Realtime P&L support with offer optimisation",
  },
  {
    icon: TrendingUp,
    label: "Placement",
    desc: "Onboarding support and long-term success tracking",
  },
];

const STATS = [
  { value: "95%", label: "Success Rate" },
  { value: "45", label: "Days Avg. Time to Hire" },
  { value: "4.8/5", label: "Client Satisfaction" },
  { value: "98%", label: "Candidate Quality Score" },
];

const CLIENTS = [
  "TechCorp",
  "InnovateLabs",
  "DataFlow",
  "CloudFire",
  "NextGen",
  "QuantumAI",
];

const SUCCESS_STORIES = [
  {
    title: "Scaling a Tech Unicorn",
    metric: "100 hires in 6 months",
    result: "90% retention after 3 years",
    tag: "RPO",
    accent: "#FBBF24",
  },
  {
    title: "C-Suite Transformation",
    metric: "3 executive placements",
    result: "100% retention after 2 years",
    tag: "Retained",
    accent: "#A78BFA",
  },
  {
    title: "Building Engineering Teams",
    metric: "Remote-first 90-person team",
    result: "45-day avg. time to hire",
    tag: "Contingency",
    accent: "#4F9CF9",
  },
];

/* ── Scroll reveal hook ──────────────────────────────────────────────── */
function useScrollReveal(threshold = 0.1) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

/* ── Per-model SVG illustrations ─────────────────────────────────────── */
function CardIllustration({ title, accent, hovered }) {
  const a = accent;

  const arts = {
    Contingency: (
      <>
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
        <polygon
          points="0,-58 50,-29 50,29 0,58 -50,29 -50,-29"
          fill={`${a}10`}
          stroke={a}
          strokeWidth="1.2"
          opacity="0.55"
        />
        <polygon
          points="0,-37 32,-18 32,18 0,37 -32,18 -32,-18"
          fill={`${a}14`}
          stroke={a}
          strokeWidth="1"
          opacity="0.4"
        />
        <path
          d="M -8 -4 L -8 -18 Q -8 -28 0 -28 Q 8 -28 8 -18 L 8 -4"
          fill="none"
          stroke={a}
          strokeWidth="2"
          opacity="0.85"
          strokeLinecap="round"
        />
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
        <line
          x1="38"
          y1="69"
          x2="272"
          y2="69"
          stroke={a}
          strokeWidth="1.5"
          opacity="0.35"
        />
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
        <polyline
          points="265,63 272,69 265,75"
          fill="none"
          stroke={a}
          strokeWidth="1.5"
          opacity="0.5"
        />
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
        <polygon
          points="38,115 38,92 100,92 100,64 162,64 162,36 224,36 224,10 275,10 275,115"
          fill={a}
          opacity="0.07"
        />
        <polyline
          points="38,92 100,92 100,64 162,64 162,36 224,36 224,10 275,10"
          fill="none"
          stroke={a}
          strokeWidth="2"
          opacity="0.55"
        />
        <circle cx="100" cy="92" r="4.5" fill={a} opacity="0.75" />
        <circle cx="162" cy="64" r="4.5" fill={a} opacity="0.8" />
        <circle cx="224" cy="36" r="4.5" fill={a} opacity="0.85" />
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
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(135deg, ${a}12 0%, ${a}06 60%, transparent 100%)`,
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `radial-gradient(${a}35 1px, transparent 1px)`,
          backgroundSize: "18px 18px",
          opacity: 0.35,
        }}
      />
      <div
        className="absolute bottom-0 left-0 right-0 h-10 pointer-events-none"
        style={{
          background: "linear-gradient(to bottom, transparent, #0d0d0d)",
        }}
      />
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
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(circle at ${glow.x}% ${glow.y}%, ${accent}16 0%, transparent 62%)`,
          opacity: hovered ? 1 : 0,
          transition: "opacity 0.4s ease",
        }}
      />
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

      <CardIllustration title={title} accent={accent} hovered={hovered} />

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
          <p
            className="text-xs font-medium mt-0.5 leading-snug"
            style={{ color: accent }}
          >
            {subtitle}
          </p>
        </div>
      </div>

      <p className="text-white/45 text-sm leading-relaxed relative z-10">
        {description}
      </p>

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

      <div className="border-t border-white/[0.06] pt-4 grid grid-cols-1 gap-4 relative z-10">
        <div>
          <p className="text-white/40 text-xs font-semibold tracking-wide uppercase mb-2">
            Advantages
          </p>
          <ul className="flex flex-col gap-1.5">
            {advantages.map((adv) => (
              <li key={adv} className="flex items-center gap-2">
                <CheckCircle2
                  size={13}
                  className="text-[#34D399] flex-shrink-0"
                />
                <span className="text-white/55 text-xs">{adv}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-white/40 text-xs font-semibold tracking-wide uppercase mb-2">
            Considerations
          </p>
          <ul className="flex flex-col gap-1.5">
            {considerations.map((con) => (
              <li key={con} className="flex items-center gap-2">
                <XCircle size={13} className="text-white/25 flex-shrink-0" />
                <span className="text-white/60 text-xs">{con}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

/* ── Partner Card (Six Ways section) ─────────────────────────────── */
function PartnerCard({
  title,
  subtitle,
  feeStructure,
  bestFor,
  paymentTiming,
  advantages,
  considerations,
  delay,
  visible,
}) {
  const [expanded, setExpanded] = useState(false);
  const { Icon, gradient } = CARD_ICON_CONFIG[title];
  const displayTitle =
    title === "Statement of Work (SoW)" ? "Statement of Work" : title;

  return (
    <div
      className="rounded-xl border border-white/[0.08] flex flex-col overflow-hidden"
      style={{
        background: "linear-gradient(180deg, #0d1626 0%, #080d1a 100%)",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 0.65s ease ${delay}ms, transform 0.65s ease ${delay}ms`,
      }}
    >
      <div className="p-6 flex flex-col gap-5 flex-1">
        {/* Icon square */}
        <div
          className="w-14 h-14 flex items-center justify-center flex-shrink-0"
          style={{ background: gradient, borderRadius: 18 }}
        >
          <Icon size={26} color="white" strokeWidth={1.8} />
        </div>

        {/* Title & subtitle */}
        <div>
          <h3 className="text-white font-bold text-xl mb-2">{displayTitle}</h3>
          <p className="text-white/45 text-sm leading-relaxed">{subtitle}</p>
        </div>

        {/* Info rows */}
        <div className="flex flex-col gap-3">
          <div className="flex items-start gap-2.5">
            <DollarSign
              size={13}
              style={{ color: "#22d3ee" }}
              className="flex-shrink-0 mt-0.5"
            />
            <div>
              <p className="text-white/35 text-xs font-medium mb-0.5">
                Fee Structure
              </p>
              <p className="text-white/80 text-sm font-medium">
                {feeStructure}
              </p>
            </div>
          </div>
          <div className="flex items-start gap-2.5">
            <Target
              size={13}
              style={{ color: "#22d3ee" }}
              className="flex-shrink-0 mt-0.5"
            />
            <div>
              <p className="text-white/35 text-xs font-medium mb-0.5">
                Best For
              </p>
              <p className="text-white/80 text-sm font-medium">{bestFor}</p>
            </div>
          </div>
        </div>

        {/* Expanded details */}
        {expanded && (
          <div className="flex flex-col gap-4 border-t border-white/[0.06] pt-4">
            <div>
              <p className="text-white/35 text-xs font-medium mb-0.5">
                Payment Timing
              </p>
              <p className="text-white/70 text-sm">{paymentTiming}</p>
            </div>
            <div>
              <p className="text-white/35 text-xs font-semibold uppercase tracking-wide mb-2">
                Advantages
              </p>
              <ul className="flex flex-col gap-1.5">
                {advantages.map((adv) => (
                  <li key={adv} className="flex items-center gap-2">
                    <CheckCircle2
                      size={12}
                      className="text-[#34D399] flex-shrink-0"
                    />
                    <span className="text-white/55 text-xs">{adv}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-white/35 text-xs font-semibold uppercase tracking-wide mb-2">
                Considerations
              </p>
              <ul className="flex flex-col gap-1.5">
                {considerations.map((con) => (
                  <li key={con} className="flex items-center gap-2">
                    <XCircle
                      size={12}
                      className="text-white/25 flex-shrink-0"
                    />
                    <span className="text-white/55 text-xs">{con}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>

      {/* Expand / collapse */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="flex items-center justify-center py-3.5 border-t border-white/[0.06] text-white/25 hover:text-white/55 transition-colors duration-200"
      >
        <ChevronDown
          size={16}
          style={{
            transform: expanded ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 0.3s ease",
          }}
        />
      </button>
    </div>
  );
}

/* ── Comparison Section ──────────────────────────────────────────────── */
function ComparisonSection({ compRef }) {
  const [sectionRef, visible] = useScrollReveal(0.1);
  const [selected, setSelected] = useState(["Contingency", "Retained"]);
  const [barsVisible, setBarsVisible] = useState(false);

  useEffect(() => {
    if (visible) setTimeout(() => setBarsVisible(true), 500);
  }, [visible]);

  const toggleModel = (model) => {
    setBarsVisible(false);
    setSelected((prev) => {
      const next = prev.includes(model)
        ? prev.filter((m) => m !== model)
        : prev.length < 3
          ? [...prev, model]
          : prev;
      return next;
    });
    setTimeout(() => setBarsVisible(true), 60);
  };

  const modelKeys = Object.keys(MODEL_ACCENTS);

  const sidePanelText =
    selected.length === 0
      ? "Select models above to compare."
      : selected.length === 1
        ? `Viewing ${MODEL_LABELS[selected[0]]} across all key dimensions.`
        : `Comparing ${selected.map((m) => MODEL_LABELS[m]).join(" and ")} — notice the differences across commitment, cost, and speed.`;

  return (
    <div
      ref={(el) => {
        sectionRef.current = el;
        if (compRef) compRef.current = el;
      }}
      id="compare"
      className="border-t border-white/[0.05] bg-[#030303] py-16 px-6 relative overflow-hidden"
    >
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, white 0px, white 1px, transparent 1px, transparent 28px)",
        }}
      />
      <svg
        className="absolute top-8 right-8 pointer-events-none opacity-[0.06]"
        width="120"
        height="120"
        viewBox="0 0 120 120"
      >
        {Array.from({ length: 25 }).map((_, i) => (
          <circle
            key={i}
            cx={(i % 5) * 24 + 8}
            cy={Math.floor(i / 5) * 24 + 8}
            r="1.8"
            fill="white"
          />
        ))}
      </svg>

      <div className="max-w-7xl mx-auto relative z-10">
        <div
          className="mb-10"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "none" : "translateY(16px)",
            transition: "all 0.7s ease",
          }}
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="w-8 h-px bg-white/20" />
            <span className="text-white/60 text-xs font-medium tracking-[0.3em] uppercase">
              Compare
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-2">
            Compare Engagement Models
          </h2>
          <p className="text-white/40 text-base">
            Select up to 3 models to see how they stack up across key dimensions
          </p>
        </div>

        {/* Model selector pills */}
        <div
          className="flex flex-wrap gap-2 mb-10"
          style={{
            opacity: visible ? 1 : 0,
            transition: "opacity 0.7s ease 0.15s",
          }}
        >
          {modelKeys.map((model) => {
            const accent = MODEL_ACCENTS[model];
            const isSelected = selected.includes(model);
            return (
              <button
                key={model}
                onClick={() => toggleModel(model)}
                className="px-4 py-2 text-xs font-semibold tracking-wide uppercase transition-all duration-300"
                style={{
                  backgroundColor: isSelected ? `${accent}20` : "transparent",
                  border: `1px solid ${isSelected ? accent : "rgba(255,255,255,0.1)"}`,
                  color: isSelected ? accent : "rgba(255,255,255,0.35)",
                  boxShadow: isSelected ? `0 0 16px ${accent}20` : "none",
                }}
              >
                {MODEL_LABELS[model]}
              </button>
            );
          })}
        </div>

        <div className="grid lg:grid-cols-[1fr_320px] gap-10">
          {/* Metric bars */}
          <div
            className="flex flex-col gap-6"
            style={{
              opacity: visible ? 1 : 0,
              transition: "opacity 0.7s ease 0.25s",
            }}
          >
            {COMPARISON_METRICS.map(({ label, values }) => (
              <div key={label}>
                <div className="flex items-center gap-2 mb-3">
                  <BarChart2 size={12} className="text-white/25" />
                  <span className="text-white/50 text-xs font-semibold tracking-[0.15em] uppercase">
                    {label}
                  </span>
                </div>
                {selected.length === 0 ? (
                  <div className="h-1.5 bg-white/[0.04] rounded-full" />
                ) : (
                  <div className="flex flex-col gap-2">
                    {selected.map((model) => {
                      const accent = MODEL_ACCENTS[model];
                      const val = values[model] ?? 0;
                      return (
                        <div key={model} className="flex items-center gap-3">
                          <span className="text-white/30 text-xs w-20 truncate flex-shrink-0">
                            {MODEL_LABELS[model]}
                          </span>
                          <div className="flex-1 h-1.5 bg-white/[0.05] rounded-full overflow-hidden">
                            <div
                              className="h-full rounded-full"
                              style={{
                                width: barsVisible ? `${val}%` : "0%",
                                backgroundColor: accent,
                                boxShadow: barsVisible
                                  ? `0 0 8px ${accent}50`
                                  : "none",
                                transition:
                                  "width 0.9s cubic-bezier(0.4,0,0.2,1), box-shadow 0.9s ease",
                              }}
                            />
                          </div>
                          <span
                            className="text-xs font-mono w-8 text-right flex-shrink-0"
                            style={{ color: accent }}
                          >
                            {val}%
                          </span>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Side panel */}
          <div
            className="bg-[#0d0d0d] border border-white/[0.07] p-6 flex flex-col relative overflow-hidden self-start"
            style={{
              opacity: visible ? 1 : 0,
              transition: "opacity 0.7s ease 0.4s",
            }}
          >
            <div
              className="absolute top-0 left-0 right-0 h-[1px]"
              style={{
                background:
                  "linear-gradient(90deg, transparent, #4F9CF930, transparent)",
              }}
            />

            {/* Abstract visual */}
            <div className="relative mb-6" style={{ height: 180 }}>
              <svg viewBox="0 0 280 180" className="w-full h-full">
                <defs>
                  <radialGradient id="cpGlow" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#4F9CF9" stopOpacity="0.18" />
                    <stop offset="100%" stopColor="#4F9CF9" stopOpacity="0" />
                  </radialGradient>
                </defs>
                <circle cx="140" cy="90" r="80" fill="url(#cpGlow)" />
                <circle
                  cx="140"
                  cy="90"
                  r="74"
                  fill="none"
                  stroke="#4F9CF9"
                  strokeWidth="0.5"
                  strokeDasharray="18 10"
                  opacity="0.2"
                  style={{
                    transformOrigin: "140px 90px",
                    animation: "illoSpin 30s linear infinite",
                  }}
                />
                <circle
                  cx="140"
                  cy="90"
                  r="55"
                  fill="none"
                  stroke="#A78BFA"
                  strokeWidth="0.4"
                  strokeDasharray="8 16"
                  opacity="0.18"
                  style={{
                    transformOrigin: "140px 90px",
                    animation: "illoSpinReverse 20s linear infinite",
                  }}
                />
                <circle
                  cx="140"
                  cy="90"
                  r="36"
                  fill="none"
                  stroke="rgba(255,255,255,0.05)"
                  strokeWidth="0.5"
                />
                {selected.map((model, i) => {
                  const accent = MODEL_ACCENTS[model];
                  const angles = [270, 30, 150];
                  const rad = (angles[i] * Math.PI) / 180;
                  const x = 140 + 55 * Math.cos(rad);
                  const y = 90 + 55 * Math.sin(rad);
                  return (
                    <g key={model}>
                      <line
                        x1="140"
                        y1="90"
                        x2={x}
                        y2={y}
                        stroke={accent}
                        strokeWidth="0.5"
                        opacity="0.3"
                      />
                      <circle
                        cx={x}
                        cy={y}
                        r="8"
                        fill={`${accent}20`}
                        stroke={accent}
                        strokeWidth="1"
                        opacity="0.8"
                      />
                      <circle
                        cx={x}
                        cy={y}
                        r="3.5"
                        fill={accent}
                        opacity="0.9"
                      />
                    </g>
                  );
                })}
                <circle
                  cx="140"
                  cy="90"
                  r="20"
                  fill="rgba(79,156,249,0.08)"
                  stroke="#4F9CF9"
                  strokeWidth="1"
                  opacity="0.6"
                />
                <circle
                  cx="140"
                  cy="90"
                  r="8"
                  fill="rgba(79,156,249,0.25)"
                  style={{ animation: "pulseRing 2.5s ease-in-out infinite" }}
                />
                <line
                  x1="40"
                  y1="90"
                  x2="240"
                  y2="90"
                  stroke="#4F9CF9"
                  strokeWidth="0.5"
                  opacity="0.2"
                  style={{ animation: "scanLine 4s ease-in-out infinite" }}
                />
              </svg>
            </div>

            <div className="border-t border-white/[0.06] pt-4">
              <p className="text-white/25 text-xs font-medium tracking-[0.2em] uppercase mb-2">
                AI Analysis
              </p>
              <p className="text-white/60 text-sm leading-relaxed">
                {sidePanelText}
              </p>
            </div>

            {selected.length > 0 && (
              <div className="mt-4 flex flex-col gap-2">
                {selected.map((model) => {
                  const accent = MODEL_ACCENTS[model];
                  return (
                    <div key={model} className="flex items-center gap-2">
                      <span
                        className="w-2 h-2 rounded-full flex-shrink-0"
                        style={{ backgroundColor: accent }}
                      />
                      <span className="text-white/40 text-xs">{model}</span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Quiz recommendation logic ───────────────────────────────────────── */
function calculateRecommendation(answers) {
  const scores = {
    Contingency: 0,
    Retained: 0,
    Exclusive: 0,
    RPO: 0,
    Contract: 0,
    "Statement of Work (SoW)": 0,
  };

  const vi = answers.volume?.index ?? 0;
  if (vi === 0) {
    scores.Contingency += 3;
    scores.Contract += 1;
  }
  if (vi === 1) {
    scores.Contingency += 2;
    scores.Exclusive += 2;
  }
  if (vi === 2) {
    scores.RPO += 3;
    scores.Contingency += 1;
    scores["Statement of Work (SoW)"] += 1;
  }
  if (vi === 3) {
    scores.RPO += 5;
    scores["Statement of Work (SoW)"] += 3;
  }

  const bi = answers.budget?.index ?? 0;
  if (bi === 0) {
    scores.Contingency += 3;
    scores.Contract += 2;
  }
  if (bi === 1) {
    scores.Exclusive += 2;
    scores.Contingency += 1;
  }
  if (bi === 2) {
    scores.Retained += 3;
    scores.Exclusive += 1;
  }
  if (bi === 3) {
    scores.RPO += 3;
    scores["Statement of Work (SoW)"] += 3;
  }

  const ui = answers.urgency?.index ?? 0;
  if (ui === 0) {
    scores.Contingency += 3;
    scores.Contract += 3;
  }
  if (ui === 1) {
    scores.Exclusive += 2;
    scores.Contingency += 1;
  }
  if (ui === 2) {
    scores.Retained += 2;
    scores.RPO += 1;
  }
  if (ui === 3) {
    scores.Retained += 1;
    scores.RPO += 2;
  }

  const si = answers.seniority?.index ?? 0;
  if (si === 0) {
    scores.Contingency += 3;
    scores.Contract += 2;
  }
  if (si === 1) {
    scores.Contingency += 2;
    scores.Exclusive += 1;
  }
  if (si === 2) {
    scores.Retained += 2;
    scores.Exclusive += 2;
  }
  if (si === 3) {
    scores.Retained += 5;
  }

  const pi = answers.priority?.index ?? 0;
  if (pi === 0) {
    scores.Contingency += 3;
    scores.Contract += 2;
  }
  if (pi === 1) {
    scores.Contingency += 2;
    scores.Contract += 3;
  }
  if (pi === 2) {
    scores.Retained += 3;
    scores.Exclusive += 2;
  }
  if (pi === 3) {
    scores.Retained += 3;
    scores.RPO += 2;
  }

  return Object.entries(scores).sort((a, b) => b[1] - a[1])[0][0];
}

/* ── Quiz Section ────────────────────────────────────────────────────── */
function QuizSection({ navigate }) {
  const [sectionRef, visible] = useScrollReveal(0.1);
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [selectedOption, setSelectedOption] = useState(null);
  const [complete, setComplete] = useState(false);
  const [recommendation, setRecommendation] = useState(null);

  const currentQ = QUIZ_QUESTIONS[step];
  const progress = complete ? 100 : (step / QUIZ_QUESTIONS.length) * 100;

  const handleSelect = (optionIndex) => setSelectedOption(optionIndex);

  const handleNext = () => {
    if (selectedOption === null) return;
    const newAnswers = {
      ...answers,
      [currentQ.key]: {
        option: currentQ.options[selectedOption],
        index: selectedOption,
      },
    };
    setAnswers(newAnswers);
    setSelectedOption(null);
    if (step < QUIZ_QUESTIONS.length - 1) {
      setStep(step + 1);
    } else {
      const rec = calculateRecommendation(newAnswers);
      setRecommendation(rec);
      setComplete(true);
    }
  };

  const handleBack = () => {
    if (step > 0) {
      setStep(step - 1);
      setSelectedOption(null);
    }
  };

  const reset = () => {
    setStep(0);
    setAnswers({});
    setSelectedOption(null);
    setComplete(false);
    setRecommendation(null);
  };

  const recAccent = recommendation ? MODEL_ACCENTS[recommendation] : "#4F9CF9";

  return (
    <div
      ref={sectionRef}
      className="border-t border-white/[0.05] py-16 px-6 bg-black relative overflow-hidden"
    >
      <div
        className="absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full blur-[120px] pointer-events-none"
        style={{ backgroundColor: "rgba(79,156,249,0.06)" }}
      />

      <div className="max-w-3xl mx-auto relative z-10">
        <div
          className="text-center mb-10"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "none" : "translateY(16px)",
            transition: "all 0.7s ease",
          }}
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="w-8 h-px bg-white/20" />
            <span className="text-white/60 text-xs font-medium tracking-[0.3em] uppercase">
              AI-Powered Recommendation
            </span>
            <span className="w-8 h-px bg-white/20" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-3">
            Which Model Fits You?
          </h2>
          <p className="text-white/40 text-base">
            Answer a few questions and get personalised recommendations
          </p>
        </div>

        <div
          style={{
            opacity: visible ? 1 : 0,
            transition: "opacity 0.7s ease 0.2s",
          }}
        >
          {!complete ? (
            <div className="bg-[#0d0d0d] border border-white/[0.07] p-8 relative overflow-hidden">
              <div
                className="absolute top-0 left-0 right-0 h-[1px]"
                style={{
                  background:
                    "linear-gradient(90deg, transparent, #4F9CF930, transparent)",
                }}
              />

              {/* Progress */}
              <div className="flex items-center justify-between mb-6">
                <span className="text-white/30 text-xs font-medium">
                  Question {step + 1} of {QUIZ_QUESTIONS.length}
                </span>
                <span className="text-white/30 text-xs font-mono">
                  {Math.round(progress)}%
                </span>
              </div>
              <div className="h-px bg-white/[0.06] mb-6 relative overflow-hidden">
                <div
                  className="absolute top-0 left-0 h-full bg-[#4F9CF9] transition-all duration-500 ease-out"
                  style={{ width: `${progress}%` }}
                />
              </div>

              <h3 className="text-white text-lg font-semibold mb-6 leading-snug">
                {currentQ.question}
              </h3>

              <div className="flex flex-col gap-3 mb-8">
                {currentQ.options.map((option, i) => (
                  <button
                    key={option}
                    onClick={() => handleSelect(i)}
                    className="text-left px-5 py-3.5 border transition-all duration-200 text-sm"
                    style={{
                      backgroundColor:
                        selectedOption === i
                          ? "rgba(79,156,249,0.12)"
                          : "transparent",
                      borderColor:
                        selectedOption === i
                          ? "#4F9CF9"
                          : "rgba(255,255,255,0.08)",
                      color:
                        selectedOption === i
                          ? "rgba(255,255,255,0.9)"
                          : "rgba(255,255,255,0.5)",
                    }}
                  >
                    <span className="text-white/20 text-xs font-mono mr-3">
                      {String.fromCharCode(65 + i)}.
                    </span>
                    {option}
                  </button>
                ))}
              </div>

              <div className="flex items-center justify-between">
                <button
                  onClick={handleBack}
                  disabled={step === 0}
                  className="flex items-center gap-2 text-xs font-semibold tracking-wide uppercase transition-all duration-200"
                  style={{
                    color:
                      step === 0
                        ? "rgba(255,255,255,0.15)"
                        : "rgba(255,255,255,0.4)",
                    cursor: step === 0 ? "default" : "pointer",
                  }}
                >
                  <ArrowLeft size={13} /> Back
                </button>
                <button
                  onClick={handleNext}
                  disabled={selectedOption === null}
                  className="inline-flex items-center gap-2 px-6 py-3 text-xs font-bold tracking-widest uppercase transition-all duration-300"
                  style={{
                    backgroundColor:
                      selectedOption !== null ? "#4F9CF9" : "transparent",
                    border: `1px solid ${selectedOption !== null ? "#4F9CF9" : "rgba(255,255,255,0.1)"}`,
                    color:
                      selectedOption !== null
                        ? "#000"
                        : "rgba(255,255,255,0.2)",
                    cursor: selectedOption !== null ? "pointer" : "default",
                  }}
                >
                  {step === QUIZ_QUESTIONS.length - 1 ? "See Result" : "Next"}
                  <ArrowRight size={13} />
                </button>
              </div>
            </div>
          ) : (
            <div
              className="bg-[#0d0d0d] border p-8 relative overflow-hidden"
              style={{ borderColor: `${recAccent}40` }}
            >
              <div
                className="absolute top-0 left-0 right-0 h-[2px]"
                style={{
                  backgroundColor: recAccent,
                  boxShadow: `0 0 20px ${recAccent}`,
                }}
              />
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: `radial-gradient(ellipse 60% 50% at 50% 0%, ${recAccent}08 0%, transparent 70%)`,
                }}
              />

              <p className="text-white/40 text-xs font-medium tracking-[0.3em] uppercase mb-2 relative z-10">
                Your Recommended Model
              </p>
              <h3
                className="text-3xl font-bold mb-1 relative z-10"
                style={{ color: recAccent }}
              >
                {recommendation}
              </h3>
              <p className="text-white/50 text-sm mb-6 relative z-10">
                Based on your hiring profile and priorities
              </p>

              <div className="grid grid-cols-2 gap-3 mb-8 relative z-10">
                {Object.entries(answers).map(([key, { option }]) => (
                  <div
                    key={key}
                    className="bg-white/[0.03] border border-white/[0.06] px-4 py-3"
                  >
                    <p className="text-white/25 text-xs uppercase tracking-wide mb-0.5">
                      {key}
                    </p>
                    <p className="text-white/60 text-xs">{option}</p>
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-4 relative z-10">
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
                  className="inline-flex items-center gap-2 px-6 py-3 text-xs font-bold tracking-widest uppercase text-black transition-all duration-300 hover:opacity-90"
                  style={{
                    backgroundColor: recAccent,
                    animation: "pulseCTA 2.5s ease-in-out infinite",
                  }}
                >
                  Talk to Us <ArrowRight size={13} />
                </button>
                <button
                  onClick={reset}
                  className="text-white/30 text-xs font-semibold tracking-wide uppercase hover:text-white/60 transition-colors duration-200"
                >
                  Retake Quiz
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ── Page ─────────────────────────────────────────────────────────────── */
export default function EngagementModelsPage() {
  const navigate = useNavigate();
  const comparisonRef = useRef(null);
  const [partnersRef, partnersVisible] = useScrollReveal(0.05);
  const [processRef, processVisible] = useScrollReveal(0.1);
  const [statsRef, statsVisible] = useScrollReveal(0.2);
  const [clientsRef, clientsVisible] = useScrollReveal(0.1);
  const [storiesRef, storiesVisible] = useScrollReveal(0.1);
  const [email, setEmail] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
    if (window.location.hash === "#compare") {
      setTimeout(
        () => comparisonRef.current?.scrollIntoView({ behavior: "smooth" }),
        400,
      );
    }
  }, []);

  return (
    <div className="bg-black min-h-screen">
      <style dangerouslySetInnerHTML={{ __html: KEYFRAMES }} />

      {/* ── Hero ──────────────────────────────────────────────────────── */}
      <div className="pt-32 pb-16 px-6 relative overflow-hidden bg-black">
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
        <div
          className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[250px] rounded-full blur-[140px] pointer-events-none"
          style={{ backgroundColor: "rgba(20,10,60,0.3)" }}
        />

        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />
        <div className="absolute bottom-0 left-0 right-0 h-40 overflow-hidden pointer-events-none opacity-[0.05]">
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
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black to-transparent pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left: text */}
            <div>
              <div
                className="inline-flex items-center gap-2 border border-white/[0.08] bg-white/[0.03] px-3 py-1.5 mb-6"
                style={{
                  animation: "heroFadeUp 0.7s ease both",
                  animationDelay: "0.05s",
                }}
              >
                <span
                  className="w-1.5 h-1.5 rounded-full bg-[#4F9CF9]"
                  style={{ animation: "pulseRing 2s ease-in-out infinite" }}
                />
                <span className="text-white/50 text-xs font-medium tracking-[0.2em] uppercase">
                  AI-Powered Recruitment
                </span>
              </div>

              <h1
                className="text-[2.8rem] md:text-[3.5rem] font-bold text-white tracking-tight mb-5 leading-[1.05]"
                style={{
                  animation: "heroFadeUp 0.8s ease both",
                  animationDelay: "0.18s",
                }}
              >
                Choose the Right{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4F9CF9] to-[#A78BFA]">
                  Hiring Partnership
                </span>
              </h1>

              <p
                className="text-white/50 text-base md:text-lg max-w-lg leading-relaxed mb-8"
                style={{
                  animation: "heroFadeUp 0.8s ease both",
                  animationDelay: "0.32s",
                }}
              >
                From contingency hiring to embedded RPO partnerships — scale
                recruitment your way.
              </p>

              <div
                className="flex items-center gap-4 flex-wrap"
                style={{
                  animation: "heroFadeUp 0.8s ease both",
                  animationDelay: "0.46s",
                }}
              >
                <button
                  onClick={() =>
                    comparisonRef.current?.scrollIntoView({
                      behavior: "smooth",
                    })
                  }
                  className="inline-flex items-center gap-2 bg-white text-black px-7 py-3.5 text-xs font-bold tracking-widest uppercase hover:bg-white/90 transition-all duration-300"
                  style={{ animation: "pulseCTA 2.5s ease-in-out infinite" }}
                >
                  Compare Models <ArrowRight size={13} />
                </button>
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
                  className="group inline-flex items-center gap-2 border border-white/20 text-white/60 hover:border-white/40 hover:text-white px-7 py-3.5 text-xs font-semibold tracking-widest uppercase transition-all duration-300"
                >
                  Talk to an Expert
                  <ArrowRight
                    size={13}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </button>
              </div>
            </div>

            {/* Right: abstract AI visual */}
            <div
              className="hidden lg:flex items-center justify-center relative"
              style={{ height: 400 }}
            >
              <svg
                viewBox="0 0 400 400"
                className="w-full h-full max-w-sm"
                style={{ overflow: "visible" }}
              >
                <defs>
                  <radialGradient id="heroGlow" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#4F9CF9" stopOpacity="0.2" />
                    <stop offset="100%" stopColor="#4F9CF9" stopOpacity="0" />
                  </radialGradient>
                </defs>
                <circle cx="200" cy="200" r="180" fill="url(#heroGlow)" />

                {/* Outer rotating ring */}
                <circle
                  cx="200"
                  cy="200"
                  r="168"
                  fill="none"
                  stroke="#4F9CF9"
                  strokeWidth="0.7"
                  strokeDasharray="22 10"
                  opacity="0.2"
                  style={{
                    transformOrigin: "200px 200px",
                    animation: "illoSpin 40s linear infinite",
                  }}
                />
                {/* Middle ring */}
                <circle
                  cx="200"
                  cy="200"
                  r="130"
                  fill="none"
                  stroke="#A78BFA"
                  strokeWidth="0.5"
                  strokeDasharray="10 18"
                  opacity="0.18"
                  style={{
                    transformOrigin: "200px 200px",
                    animation: "illoSpinReverse 28s linear infinite",
                  }}
                />
                {/* Static grid rings */}
                <circle
                  cx="200"
                  cy="200"
                  r="90"
                  fill="none"
                  stroke="rgba(255,255,255,0.04)"
                  strokeWidth="0.5"
                />
                <circle
                  cx="200"
                  cy="200"
                  r="55"
                  fill="none"
                  stroke="rgba(255,255,255,0.05)"
                  strokeWidth="0.5"
                />

                {/* Cross lines */}
                <line
                  x1="32"
                  y1="200"
                  x2="368"
                  y2="200"
                  stroke="rgba(255,255,255,0.03)"
                  strokeWidth="0.5"
                />
                <line
                  x1="200"
                  y1="32"
                  x2="200"
                  y2="368"
                  stroke="rgba(255,255,255,0.03)"
                  strokeWidth="0.5"
                />

                {/* 6 orbital nodes (one per model) */}
                {[
                  [200, 60, "#4F9CF9", "Contingency"],
                  [319, 130, "#A78BFA", "Retained"],
                  [319, 270, "#34D399", "Exclusive"],
                  [200, 340, "#FBBF24", "RPO"],
                  [81, 270, "#F87171", "Contract"],
                  [81, 130, "#FB923C", "SoW"],
                ].map(([x, y, color, label], i) => (
                  <g key={label}>
                    <line
                      x1="200"
                      y1="200"
                      x2={x}
                      y2={y}
                      stroke={color}
                      strokeWidth="0.5"
                      opacity="0.25"
                    />
                    <circle
                      cx={x}
                      cy={y}
                      r="14"
                      fill={`${color}15`}
                      stroke={color}
                      strokeWidth="1"
                      opacity="0.7"
                    />
                    <circle
                      cx={x}
                      cy={y}
                      r="5"
                      fill={color}
                      opacity="0.85"
                      style={{
                        animation: `illoFade ${1.5 + i * 0.2}s ease-in-out infinite`,
                        animationDelay: `${i * 0.3}s`,
                      }}
                    />
                  </g>
                ))}

                {/* Scan line */}
                <line
                  x1="32"
                  y1="200"
                  x2="368"
                  y2="200"
                  stroke="#4F9CF9"
                  strokeWidth="0.7"
                  opacity="0.3"
                  style={{ animation: "scanLine 5s ease-in-out infinite" }}
                />

                {/* Central core */}
                <circle
                  cx="200"
                  cy="200"
                  r="42"
                  fill="rgba(79,156,249,0.07)"
                  stroke="#4F9CF9"
                  strokeWidth="1.2"
                  opacity="0.6"
                />
                <circle
                  cx="200"
                  cy="200"
                  r="26"
                  fill="rgba(79,156,249,0.12)"
                  stroke="#4F9CF9"
                  strokeWidth="1"
                  opacity="0.75"
                />
                <circle
                  cx="200"
                  cy="200"
                  r="12"
                  fill="rgba(79,156,249,0.3)"
                  style={{ animation: "pulseRing 2.2s ease-in-out infinite" }}
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
      {/* ── Six Ways to Partner ───────────────────────────────────────── */}
      <div
        ref={partnersRef}
        className="py-20 px-6 relative overflow-hidden"
        style={{
          background: "linear-gradient(180deg, #020b1a 0%, #030e1d 100%)",
        }}
      >
        {/* Subtle star-dot background */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(rgba(255,255,255,0.32) 1px, transparent 1px)",
            backgroundSize: "52px 52px",
            opacity: 0.14,
          }}
        />

        <div className="max-w-7xl mx-auto relative z-10">
          <div
            className="text-center mb-14"
            style={{
              opacity: partnersVisible ? 1 : 0,
              transform: partnersVisible ? "none" : "translateY(16px)",
              transition: "all 0.7s ease",
            }}
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 mb-7">
              <Settings size={13} style={{ color: "#22d3ee" }} />
              <span className="text-white/55 text-xs font-medium tracking-[0.2em] uppercase">
                Engagement Models
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-4">
              Six Ways to Partner
            </h2>
            <p className="text-white/40 text-base max-w-xl mx-auto leading-relaxed">
              Choose the engagement model that aligns with your hiring needs,
              budget, and growth trajectory
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {models.map((m, i) => (
              <PartnerCard
                key={m.title}
                {...m}
                delay={i * 100}
                visible={partnersVisible}
              />
            ))}
          </div>
        </div>
      </div>

      {/* ── Comparison ────────────────────────────────────────────────── */}
      <ComparisonSection compRef={comparisonRef} />

      {/* ── Quiz ──────────────────────────────────────────────────────── */}
      <QuizSection navigate={navigate} />

      {/* ── Our Proven Process ────────────────────────────────────────── */}
      <div
        ref={processRef}
        className="border-t border-white/[0.05] py-16 px-6 bg-[#030303] relative overflow-hidden"
      >
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.025]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(45deg, white 0, white 1px, transparent 1px, transparent 28px)",
          }}
        />

        <div className="max-w-7xl mx-auto relative z-10">
          <div
            className="text-center mb-14"
            style={{
              opacity: processVisible ? 1 : 0,
              transform: processVisible ? "none" : "translateY(16px)",
              transition: "all 0.7s ease",
            }}
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <span className="w-8 h-px bg-white/20" />
              <span className="text-white/60 text-xs font-medium tracking-[0.3em] uppercase">
                How We Deliver
              </span>
              <span className="w-8 h-px bg-white/20" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-3">
              Our Proven Process
            </h2>
            <p className="text-white/40 text-base">
              A systematic approach to finding and placing exceptional talent
            </p>
          </div>

          <div className="relative">
            {/* Connector line */}
            <div className="hidden md:block absolute top-[26px] left-[calc(100%/12)] right-[calc(100%/12)] h-px bg-white/[0.06]" />

            <div className="grid md:grid-cols-6 gap-6">
              {PROCESS_STEPS.map(({ icon: StepIcon, label, desc }, i) => (
                <div
                  key={label}
                  className="flex flex-col items-center text-center"
                  style={{
                    opacity: processVisible ? 1 : 0,
                    transform: processVisible ? "none" : "translateY(20px)",
                    transition: `opacity 0.6s ease ${0.1 + i * 0.1}s, transform 0.6s ease ${0.1 + i * 0.1}s`,
                  }}
                >
                  <div
                    className="w-[52px] h-[52px] rounded-full flex items-center justify-center mb-4 relative z-10 border"
                    style={{
                      backgroundColor: "rgba(79,156,249,0.08)",
                      borderColor: "rgba(79,156,249,0.25)",
                    }}
                  >
                    <StepIcon size={18} style={{ color: "#4F9CF9" }} />
                  </div>
                  <span className="text-white/15 text-xs font-mono mb-1">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="text-white text-sm font-semibold mb-2">
                    {label}
                  </p>
                  <p className="text-white/30 text-xs leading-relaxed">
                    {desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Stats ─────────────────────────────────────────────────────── */}
      <div
        ref={statsRef}
        className="border-t border-white/[0.05] py-14 px-6 bg-black"
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {STATS.map(({ value, label }, i) => (
              <div
                key={label}
                className="text-center"
                style={{
                  opacity: statsVisible ? 1 : 0,
                  transform: statsVisible ? "none" : "translateY(18px)",
                  transition: `opacity 0.6s ease ${i * 0.1}s, transform 0.6s ease ${i * 0.1}s`,
                }}
              >
                <p className="text-white text-4xl md:text-5xl font-bold tracking-tight mb-2">
                  {value}
                </p>
                <p className="text-white/35 text-xs font-medium tracking-wide uppercase">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Trusted by Industry Leaders ───────────────────────────────── */}
      <div
        ref={clientsRef}
        className="border-t border-white/[0.05] py-14 px-6 bg-[#030303] relative overflow-hidden"
      >
        <div className="max-w-7xl mx-auto relative z-10">
          <div
            className="text-center mb-8"
            style={{
              opacity: clientsVisible ? 1 : 0,
              transition: "opacity 0.7s ease",
            }}
          >
            <p className="text-white/30 text-xs font-medium tracking-[0.3em] uppercase mb-6">
              Trusted by Industry Leaders
            </p>
            <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
              {CLIENTS.map((client, i) => (
                <span
                  key={client}
                  className="text-white font-semibold text-base md:text-lg tracking-tight"
                  style={{
                    opacity: clientsVisible ? 0.25 : 0,
                    transition: `opacity 0.5s ease ${i * 0.08}s`,
                  }}
                >
                  {client}
                </span>
              ))}
            </div>
          </div>

          <div
            className="border-t border-white/[0.05] pt-8 grid grid-cols-3 gap-4 text-center"
            style={{
              opacity: clientsVisible ? 1 : 0,
              transition: "opacity 0.7s ease 0.4s",
            }}
          >
            {[
              {
                value: "500+",
                sub: "Successful Placements",
                note: "Last 12 months",
              },
              {
                value: "92%",
                sub: "Client Retention Rate",
                note: "Year over year",
              },
              {
                value: "4.9/5",
                sub: "Average Rating",
                note: "From client reviews",
              },
            ].map(({ value, sub, note }) => (
              <div key={sub}>
                <p className="text-white text-3xl font-bold tracking-tight mb-1">
                  {value}
                </p>
                <p className="text-white/50 text-xs font-medium mb-0.5">
                  {sub}
                </p>
                <p className="text-white/20 text-xs">{note}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Success Stories ───────────────────────────────────────────── */}
      <div
        ref={storiesRef}
        className="border-t border-white/[0.05] py-16 px-6 bg-black relative overflow-hidden"
      >
        <div className="max-w-7xl mx-auto relative z-10">
          <div
            className="text-center mb-10"
            style={{
              opacity: storiesVisible ? 1 : 0,
              transform: storiesVisible ? "none" : "translateY(16px)",
              transition: "all 0.7s ease",
            }}
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <span className="w-8 h-px bg-white/20" />
              <span className="text-white/60 text-xs font-medium tracking-[0.3em] uppercase">
                Case Studies
              </span>
              <span className="w-8 h-px bg-white/20" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-3">
              Success Stories
            </h2>
            <p className="text-white/40 text-base">
              Join hundreds of companies that have transformed their hiring
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {SUCCESS_STORIES.map(
              ({ title, metric, result, tag, accent }, i) => (
                <div
                  key={title}
                  className="bg-[#0d0d0d] border border-white/[0.07] p-6 flex flex-col gap-4 group cursor-pointer relative overflow-hidden hover:border-white/[0.14] transition-all duration-300"
                  style={{
                    opacity: storiesVisible ? 1 : 0,
                    transform: storiesVisible ? "none" : "translateY(20px)",
                    transition: `opacity 0.6s ease ${i * 0.12}s, transform 0.6s ease ${i * 0.12}s, border-color 0.3s ease`,
                    boxShadow: "0 4px 24px rgba(0,0,0,0.2)",
                  }}
                >
                  <div
                    className="absolute top-0 left-0 right-0 h-[1px]"
                    style={{ backgroundColor: accent, opacity: 0.5 }}
                  />
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none"
                    style={{
                      background: `radial-gradient(ellipse 70% 50% at 50% 0%, ${accent}08 0%, transparent 70%)`,
                    }}
                  />

                  <div>
                    <span
                      className="inline-block px-2.5 py-1 text-xs font-semibold tracking-wide uppercase mb-3"
                      style={{ backgroundColor: `${accent}18`, color: accent }}
                    >
                      {tag}
                    </span>
                    <h3 className="text-white font-bold text-lg tracking-tight">
                      {title}
                    </h3>
                  </div>

                  <div className="border-t border-white/[0.06] pt-4 flex flex-col gap-2">
                    <div>
                      <p className="text-white/30 text-xs uppercase tracking-wide mb-0.5">
                        Outcome
                      </p>
                      <p className="text-white/70 text-sm font-semibold">
                        {metric}
                      </p>
                    </div>
                    <div>
                      <p className="text-white/30 text-xs uppercase tracking-wide mb-0.5">
                        Result
                      </p>
                      <p className="text-sm" style={{ color: accent }}>
                        {result}
                      </p>
                    </div>
                  </div>

                  <button className="inline-flex items-center gap-1.5 text-white/30 text-xs font-semibold tracking-wide uppercase hover:text-white/60 transition-colors duration-200 mt-auto group-hover:gap-2.5">
                    View Case Study{" "}
                    <ArrowRight
                      size={12}
                      className="transition-all duration-200"
                    />
                  </button>
                </div>
              ),
            )}
          </div>
        </div>
      </div>

      {/* ── Newsletter / CTA ──────────────────────────────────────────── */}
      <div className="border-t border-white/[0.05] py-16 px-6 bg-[#030303] relative overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 60% 60% at 50% 50%, rgba(79,156,249,0.05) 0%, transparent 70%)",
          }}
        />

        <div className="max-w-2xl mx-auto text-center relative z-10">
          <p className="text-white/30 text-xs font-medium tracking-[0.3em] uppercase mb-4">
            Stay Ahead
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-3">
            Stay Ahead in Talent Acquisition
          </h2>
          <p className="text-white/40 text-base leading-relaxed mb-8">
            Receive hiring trends, salary benchmarks, and exclusive resources
            delivered to your inbox.
          </p>

          <div className="flex items-center gap-3 mb-6">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="flex-1 bg-white/[0.04] border border-white/[0.1] text-white placeholder-white/25 px-5 py-3.5 text-sm outline-none focus:border-white/25 transition-colors duration-200"
            />
            <button className="bg-white text-black px-6 py-3.5 text-xs font-bold tracking-widest uppercase hover:bg-white/90 transition-all duration-300 whitespace-nowrap">
              Subscribe
            </button>
          </div>

          <div className="border-t border-white/[0.06] pt-6">
            <p className="text-white/30 text-sm mb-4">
              Not sure which model fits? We'll help you choose.
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
              className="group inline-flex items-center gap-2 border border-white/20 text-white/60 hover:border-white/40 hover:text-white px-8 py-3.5 text-xs font-semibold tracking-widest uppercase transition-all duration-300"
            >
              Talk to Us{" "}
              <ArrowRight
                size={13}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
