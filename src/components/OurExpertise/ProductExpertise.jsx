import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowRight,
  Briefcase,
  Layers,
  Cpu,
  Users,
  BarChart3,
  TrendingUp,
  ChevronDown,
  ChevronRight,
} from "lucide-react";

const sections = [
  {
    title: "Product Leadership",
    icon: Briefcase,
    accent: "#C8A96B",
    description:
      "Senior product executives setting vision, aligning commercial priorities, and building the product culture that drives sustainable growth across SaaS, AI, and enterprise software.",
    roles: [
      "Chief Product Officer",
      "VP of Product",
      "Group Product Manager",
      "Head of Product",
    ],
  },
  {
    title: "Core Product Management",
    icon: Layers,
    accent: "#8FA3FF",
    description:
      "The backbone of any high-performing product org — senior PMs through APMs owning roadmaps, discovery, stakeholder management, and sprint-to-sprint delivery across feature, platform, and growth teams.",
    roles: [
      "Senior Product Manager",
      "Product Manager",
      "Associate Product Manager",
      "Product Operations Manager",
    ],
  },
  {
    title: "Specialized PM Roles",
    icon: Cpu,
    accent: "#7EB8C9",
    description:
      "Specialized product managers driving outsized impact in growth, AI, platform infrastructure, and technical systems — increasingly critical as product orgs mature and scale.",
    roles: [
      "Growth Product Manager",
      "Platform Product Manager",
      "AI Product Manager",
      "Technical Product Manager",
    ],
  },
  {
    title: "Product Design & Research",
    icon: Users,
    accent: "#A3C98A",
    description:
      "Design and research talent essential to great product outcomes — from interaction design and design systems to customer interviews, usability testing, and UX writing.",
    roles: [
      "Product Designer",
      "UX Researcher",
      "Content Designer / UX Writer",
      "UX Lead",
    ],
  },
  {
    title: "Product Analytics & Data",
    icon: BarChart3,
    accent: "#E07A5F",
    description:
      "Data professionals embedded in the product org to power experimentation, KPI tracking, cohort analysis, predictive modelling, and AI-driven product intelligence.",
    roles: [
      "Product Analyst",
      "Data Scientist (Product)",
      "Program Manager",
      "Delivery Manager",
    ],
  },
  {
    title: "Commercial & Customer Product",
    icon: TrendingUp,
    accent: "#C47EB5",
    description:
      "Product-adjacent commercial talent bridging customer insight, GTM strategy, and market positioning — from PMMs and solutions consultants to enterprise and customer-facing PM roles.",
    roles: [
      "Product Marketing Manager",
      "Solutions / Product Consultant",
      "Enterprise Product Manager",
      "Customer PM",
    ],
  },
];

const roleRows = [
  {
    number: "01",
    category: "Product Leadership",
    accent: "#C8A96B",
    tagline: "Vision, portfolio ownership, and product culture",
    summary:
      "The CPO and VP Product set the product direction and own the commercial alignment between product strategy and revenue goals. In AI-first and SaaS companies, product leadership must balance near-term delivery with long-term platform bets — while building and developing high-performing PM teams across multiple domains.",
    items: [
      {
        name: "Chief Product Officer",
        bullets: [
          "Product vision & portfolio strategy",
          "Executive alignment & board reporting",
          "AI productisation leadership",
          "Product culture & org design",
        ],
      },
      {
        name: "VP of Product",
        bullets: [
          "PM org structure & management",
          "Roadmap execution & prioritisation",
          "Customer feedback loops",
          "Revenue alignment",
        ],
      },
      {
        name: "Group Product Manager",
        bullets: [
          "Domain product leadership",
          "PM coaching & development",
          "Cross-team prioritisation",
          "KPI accountability",
        ],
      },
      {
        name: "Head of Product",
        bullets: [
          "End-to-end product ownership",
          "Strategic + operational balance",
          "Common in scale-up & growth stage",
        ],
      },
    ],
  },
  {
    number: "02",
    category: "Core Product Management",
    accent: "#8FA3FF",
    tagline: "Roadmaps, discovery, and sprint-to-sprint delivery",
    summary:
      "Senior PMs are the backbone of the product organisation — owning roadmaps, leading discovery, managing stakeholders, and driving execution. Product Managers on smaller surface areas partner closely with engineering and design. Product Operations Managers dramatically improve PM leverage through better tooling, rituals, and voice-of-customer systems.",
    items: [
      {
        name: "Senior Product Manager",
        bullets: [
          "Full roadmap ownership",
          "Customer research & discovery",
          "Stakeholder management",
          "Specialise in growth, enterprise, AI",
        ],
      },
      {
        name: "Product Manager",
        bullets: [
          "Feature team ownership",
          "Sprint delivery & requirements",
          "Engineering & design partnership",
          "Emerging product tracks",
        ],
      },
      {
        name: "Associate Product Manager",
        bullets: [
          "Entry-level PM pipeline",
          "Rotational / mentored programs",
          "Future PM leader development",
        ],
      },
      {
        name: "Product Operations Manager",
        bullets: [
          "Product rituals & planning cadences",
          "OKR & roadmap tooling",
          "Voice-of-customer systems",
          "PM leverage & analytics ops",
        ],
      },
    ],
  },
  {
    number: "03",
    category: "Specialized PM Roles",
    accent: "#7EB8C9",
    tagline: "Growth, AI, platform, and technical product management",
    summary:
      "Specialized PMs drive outsized impact in domains requiring deep expertise beyond core product skills. Growth PMs run acquisition and retention experiments. Platform PMs own internal capabilities that multiply engineering output. AI PMs govern LLM workflows, evaluation frameworks, and human-in-the-loop systems. Technical PMs thrive in infrastructure, security, and enterprise integrations.",
    items: [
      {
        name: "Growth Product Manager",
        bullets: [
          "Acquisition, activation & retention",
          "Monetisation & experimentation",
          "Works with marketing & lifecycle",
          "Critical in SaaS & consumer",
        ],
      },
      {
        name: "Platform Product Manager",
        bullets: [
          "API & developer platform ownership",
          "Identity, data platform & tooling",
          "Engineering-facing product role",
          "Requires strong technical depth",
        ],
      },
      {
        name: "AI Product Manager",
        bullets: [
          "LLM workflow & prompt UX",
          "AI governance & model evaluation",
          "Cost / performance tradeoffs",
          "Human-in-the-loop system design",
        ],
      },
      {
        name: "Technical Product Manager",
        bullets: [
          "Infrastructure & enterprise integrations",
          "Security & compliance products",
          "Strong engineering collaboration",
          "Complexity-over-UX focus",
        ],
      },
    ],
  },
  {
    number: "04",
    category: "Product Design & Research",
    accent: "#A3C98A",
    tagline: "UX design, research, and content that drives product quality",
    summary:
      "The PM, design, and engineering trio is the core operating unit of high-performing product teams. Product designers own interaction design and design systems. UX researchers run customer interviews and usability studies that ground product decisions in evidence. Content designers improve onboarding, clarity, and AI interaction quality — especially critical in enterprise SaaS and complex workflows.",
    items: [
      {
        name: "Product Designer / UX Designer",
        bullets: [
          "UX flows & interaction design",
          "Design systems & prototyping",
          "Cross-functional collaboration",
          "Visual & motion design",
        ],
      },
      {
        name: "UX Researcher",
        bullets: [
          "Customer interviews & usability testing",
          "Research synthesis & JTBD analysis",
          "Evidence-based product decisions",
          "Essential post founder-led discovery",
        ],
      },
      {
        name: "Content Designer / UX Writer",
        bullets: [
          "In-product copy & onboarding",
          "Clarity & cognitive load reduction",
          "AI interaction quality",
          "Critical in enterprise & AI products",
        ],
      },
      {
        name: "UX Lead / Design Manager",
        bullets: [
          "Design team leadership",
          "Design culture & process",
          "Cross-product design consistency",
        ],
      },
    ],
  },
  {
    number: "05",
    category: "Product Analytics & Delivery",
    accent: "#E07A5F",
    tagline: "Data, experimentation, and cross-functional delivery at scale",
    summary:
      "High-performing product orgs are heavily data-enabled. Product Analysts partner directly with PMs on KPI tracking, funnel analysis, and experiment evaluation. Data Scientists provide predictive modelling and recommendation systems. Program and Delivery Managers drive cross-functional coordination at scale — especially critical in enterprise SaaS, multi-team initiatives, and regulated industries.",
    items: [
      {
        name: "Product Analyst",
        bullets: [
          "KPI tracking & experiment analysis",
          "Funnel & cohort analysis",
          "Direct PM partnership",
          "Data-driven product decisions",
        ],
      },
      {
        name: "Data Scientist (Product)",
        bullets: [
          "Predictive modelling",
          "Recommendation systems",
          "Experiment methodology",
          "ML opportunity identification",
        ],
      },
      {
        name: "Program Manager",
        bullets: [
          "Cross-functional coordination",
          "Dependency management",
          "Enterprise & launch orchestration",
          "Multi-team initiative delivery",
        ],
      },
      {
        name: "Delivery Manager",
        bullets: [
          "Agile delivery ownership",
          "Sprint health & velocity",
          "Stakeholder communication",
          "Regulated industry delivery",
        ],
      },
    ],
  },
  {
    number: "06",
    category: "Commercial & Customer Product",
    accent: "#C47EB5",
    tagline: "GTM, positioning, enterprise, and customer-facing product roles",
    summary:
      "Product Marketing Managers are among the most important adjacent hires — owning positioning, messaging, launch strategy, and competitive intelligence. Solutions and Product Consultants bridge enterprise customers, sales, and product. Enterprise PMs and Customer PMs own the roadmap for large accounts, validating commercial priorities and gathering the customer feedback that shapes product strategy.",
    items: [
      {
        name: "Product Marketing Manager",
        bullets: [
          "Positioning & messaging strategy",
          "GTM & product launch ownership",
          "Competitive intelligence",
          "Strong PM + PMM partnership",
        ],
      },
      {
        name: "Solutions / Product Consultant",
        bullets: [
          "Enterprise customer bridge",
          "Roadmap validation & feedback",
          "Sales & implementation support",
          "Customer needs to product loop",
        ],
      },
      {
        name: "Enterprise Product Manager",
        bullets: [
          "Large account product strategy",
          "Enterprise-specific roadmap",
          "Commercial & compliance focus",
          "Customer advisory alignment",
        ],
      },
      {
        name: "Customer PM",
        bullets: [
          "Customer feedback ownership",
          "Voice-of-customer programs",
          "CS & product alignment",
          "Retention-linked product strategy",
        ],
      },
    ],
  },
];

const careerPaths = [
  {
    label: "Product",
    accent: "#C8A96B",
    steps: [
      "APM",
      "Product Manager",
      "Senior PM",
      "Group PM",
      "VP Product",
      "CPO",
    ],
  },
  {
    label: "Growth",
    accent: "#7EB8C9",
    steps: ["Growth Analyst", "Growth PM", "Head of Growth", "VP Growth"],
  },
  {
    label: "Technical PM",
    accent: "#8FA3FF",
    steps: [
      "Engineer",
      "Technical PM",
      "Platform PM",
      "Head of Platform",
      "VP Platform",
    ],
  },
  {
    label: "Design",
    accent: "#A3C98A",
    steps: ["UX Designer", "Senior Designer", "Design Lead", "VP Design"],
  },
  {
    label: "Commercial",
    accent: "#C47EB5",
    steps: [
      "PMM Associate",
      "PMM",
      "Senior PMM",
      "Head of PMM",
      "VP Marketing",
    ],
  },
];

const roleFit = [
  {
    type: "Visionary product strategist",
    roles: "CPO · VP Product",
    accent: "#C8A96B",
  },
  {
    type: "Data & experimentation driven",
    roles: "Growth PM · Product Analyst",
    accent: "#7EB8C9",
  },
  {
    type: "Technically deep builder",
    roles: "Platform PM · Technical PM",
    accent: "#8FA3FF",
  },
  {
    type: "AI-first product thinker",
    roles: "AI Product Manager",
    accent: "#7EB8C9",
  },
  {
    type: "Customer insight leader",
    roles: "UX Researcher · Customer PM",
    accent: "#A3C98A",
  },
  {
    type: "Process & systems optimiser",
    roles: "Product Operations Manager",
    accent: "#E07A5F",
  },
  {
    type: "Commercial product mind",
    roles: "PMM · Solutions Consultant",
    accent: "#C47EB5",
  },
  {
    type: "Structured delivery focus",
    roles: "Program Manager · Delivery Manager",
    accent: "#E07A5F",
  },
];

function RoleRow({ row }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-white/[0.06]">
      <button onClick={() => setOpen(!open)} className="w-full text-left group">
        <div className="max-w-7xl mx-auto px-6 py-8 flex items-center justify-between gap-6">
          <div className="flex items-center gap-8 flex-1 min-w-0">
            <span
              className="text-xs tracking-[0.25em] font-medium shrink-0"
              style={{ color: row.accent }}
            >
              {row.number}
            </span>
            <h3 className="text-xl md:text-2xl font-bold tracking-tight truncate">
              {row.category}
            </h3>
            <span className="hidden lg:block text-white/40 text-sm truncate">
              {row.tagline}
            </span>
          </div>
          <ChevronDown
            size={18}
            className="shrink-0 text-white/40 transition-transform duration-300"
            style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
          />
        </div>
      </button>

      <div
        className="overflow-hidden transition-all duration-500"
        style={{ maxHeight: open ? "1200px" : "0px" }}
      >
        <div className="max-w-7xl mx-auto px-6 pb-12">
          <div
            className="h-px mb-10"
            style={{ background: `${row.accent}30` }}
          />

          <p className="text-white/55 text-base leading-relaxed max-w-3xl mb-10">
            {row.summary}
          </p>

          <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
            {row.items.map((item) => (
              <div
                key={item.name}
                className="bg-[#0D0D0D] border border-white/[0.07] p-6 hover:border-white/15 transition-colors duration-200"
              >
                <div
                  className="w-8 h-0.5 mb-4"
                  style={{ background: row.accent }}
                />
                <p className="font-bold text-base mb-3 tracking-tight">
                  {item.name}
                </p>
                <ul className="space-y-2">
                  {item.bullets.map((b) => (
                    <li
                      key={b}
                      className="flex items-start gap-2 text-white/50 text-sm"
                    >
                      <span
                        className="mt-1.5 w-1 h-1 rounded-full shrink-0"
                        style={{ background: row.accent, opacity: 0.7 }}
                      />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

const ProductExpertise = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-black min-h-screen text-white overflow-hidden">
      {/* ── HERO ── */}
      <section className="relative border-b border-white/[0.06]">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2000&auto=format&fit=crop"
            alt="product management"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-black/70" />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 pt-36 pb-28">
          <div className="flex items-center gap-3 mb-6">
            <span className="w-8 h-px bg-[#C8A96B]" />
            <span className="text-[#C8A96B] text-xs tracking-[0.3em] uppercase font-medium">
              Product Management Recruitment
            </span>
          </div>

          <h1 className="text-[3.5rem] md:text-[6rem] leading-[0.95] font-bold tracking-tight max-w-5xl">
            Hiring the Teams That
            <span className="block text-white/35">
              Ship Exceptional Products
            </span>
          </h1>

          <p className="mt-8 max-w-2xl text-white/60 text-lg leading-relaxed">
            Product management recruitment spans CPO to APM, growth to platform,
            AI to technical PM — across design, research, analytics, and
            commercial product roles in SaaS, fintech, and AI-native businesses.
          </p>

          <div className="flex flex-wrap gap-4 mt-10">
            <button
              onClick={() => navigate("/contact")}
              className="group inline-flex items-center gap-3 bg-white text-black px-8 py-4 text-sm font-bold tracking-widest uppercase transition-all duration-300 hover:bg-white/90"
            >
              Find Product Talent
              <ArrowRight
                size={15}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </button>
            <button
              onClick={() => navigate("/case-studies")}
              className="px-8 py-4 border border-white/15 text-white/70 text-sm tracking-widest uppercase hover:border-white/40 hover:text-white transition-all duration-300"
            >
              View Case Studies
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mt-20 max-w-4xl">
            {[
              ["PM & Design", "Core Disciplines"],
              ["Growth & AI", "Specialist Focus"],
              ["UK & US", "Hiring Coverage"],
              ["SaaS & AI", "Specialisation"],
            ].map(([value, label]) => (
              <div key={value}>
                <p className="text-3xl md:text-4xl font-bold tracking-tight">
                  {value}
                </p>
                <p className="text-white/45 text-sm mt-2">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── INTRO ── */}
      <section className="py-24 border-b border-white/[0.06]">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <span className="w-8 h-px bg-white/20" />
            <span className="text-white/50 text-xs tracking-[0.3em] uppercase">
              Product Org Architecture
            </span>
            <span className="w-8 h-px bg-white/20" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight leading-tight mb-8">
            More Than Just Roadmaps
          </h2>
          <p className="text-white/55 text-lg leading-relaxed">
            Modern product organisations span far beyond core PM roles. At
            scale, the product function includes growth, platform, AI, design,
            research, analytics, delivery, operations, and commercial product
            talent — each requiring distinct skills, career profiles, and hiring
            approaches specific to company stage and product complexity.
          </p>
        </div>
      </section>

      {/* ── FUNCTION GRID ── */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
            {sections.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="group bg-[#0D0D0D] border border-white/[0.07] p-8 transition-all duration-300 hover:border-white/15 hover:-translate-y-1"
                >
                  <div
                    className="w-12 h-12 flex items-center justify-center mb-6"
                    style={{ background: `${item.accent}15` }}
                  >
                    <Icon size={22} style={{ color: item.accent }} />
                  </div>
                  <h3 className="text-2xl font-bold tracking-tight mb-4">
                    {item.title}
                  </h3>
                  <p className="text-white/55 leading-relaxed mb-8">
                    {item.description}
                  </p>
                  <div className="space-y-3">
                    {item.roles.map((role) => (
                      <div
                        key={role}
                        className="flex items-center gap-3 text-white/75 text-sm"
                      >
                        <div
                          className="w-1.5 h-1.5 rounded-full"
                          style={{ background: item.accent }}
                        />
                        {role}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── ROLE BREAKDOWN ROWS ── */}
      <section className="border-t border-white/[0.06] bg-[#050505]">
        <div className="max-w-7xl mx-auto px-6 pt-20 pb-12">
          <div className="flex items-center gap-3 mb-6">
            <span className="w-8 h-px bg-[#C8A96B]" />
            <span className="text-[#C8A96B] text-xs tracking-[0.3em] uppercase">
              Role Breakdown
            </span>
          </div>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight leading-tight max-w-xl">
              Every Product Role,{" "}
              <span className="text-white/35">Explained</span>
            </h2>
            <p className="text-white/45 text-sm leading-relaxed max-w-sm md:text-right">
              Explore each product function in detail — what the roles own, how
              they interact, and where they sit in a modern product organisation
              at each stage of growth.
            </p>
          </div>
        </div>

        <div>
          {roleRows.map((row, i) => (
            <RoleRow key={row.number} row={row} index={i} />
          ))}
        </div>
      </section>

      {/* ── CAREER PATHS ── */}
      <section className="border-t border-white/[0.06] py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-8 h-px bg-[#C8A96B]" />
            <span className="text-[#C8A96B] text-xs tracking-[0.3em] uppercase">
              Progression
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight leading-tight mb-16">
            Common Product Career Paths
          </h2>

          <div className="space-y-6">
            {careerPaths.map((path) => (
              <div
                key={path.label}
                className="bg-[#0D0D0D] border border-white/[0.07] px-6 py-6 flex flex-col md:flex-row md:items-center gap-6"
              >
                <div className="md:w-40 shrink-0">
                  <span
                    className="text-xs tracking-[0.2em] uppercase font-semibold"
                    style={{ color: path.accent }}
                  >
                    {path.label}
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-0">
                  {path.steps.map((step, i) => (
                    <div key={step} className="flex items-center">
                      <div className="flex flex-col items-start">
                        <span className="text-white/80 text-sm font-medium px-3 py-1.5 bg-white/[0.04] border border-white/[0.08] whitespace-nowrap">
                          {step}
                        </span>
                      </div>
                      {i < path.steps.length - 1 && (
                        <ChevronRight
                          size={14}
                          className="mx-1 shrink-0"
                          style={{ color: path.accent, opacity: 0.5 }}
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ROLE FIT TABLE ── */}
      <section className="border-t border-white/[0.06] py-24 bg-[#050505]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-px bg-[#C8A96B]" />
                <span className="text-[#C8A96B] text-xs tracking-[0.3em] uppercase">
                  Role Fit
                </span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight leading-tight mb-6">
                Which Product Role{" "}
                <span className="text-white/35">Fits You?</span>
              </h2>
              <p className="text-white/50 text-base leading-relaxed max-w-sm">
                Product talent spans vastly different profiles — from visionary
                strategists to data-obsessed growth operators. The best
                placements align natural strengths, career history, and domain
                expertise with the specific product mandate the organisation
                needs at its current growth stage.
              </p>
            </div>

            <div className="space-y-2">
              {roleFit.map((row) => (
                <div
                  key={row.type}
                  className="flex items-center justify-between gap-4 border border-white/[0.06] bg-[#0D0D0D] px-5 py-4 group hover:border-white/12 transition-colors duration-200"
                >
                  <span className="text-white/65 text-sm">{row.type}</span>
                  <span
                    className="text-xs font-medium tracking-wide shrink-0"
                    style={{ color: row.accent }}
                  >
                    {row.roles}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── DEMAND SECTION ── */}
      <section className="border-t border-white/[0.06] py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <span className="w-8 h-px bg-[#C8A96B]" />
                <span className="text-[#C8A96B] text-xs tracking-[0.3em] uppercase">
                  2025–2026 Hiring Demand
                </span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight leading-tight mb-8">
                Most In-Demand Product Roles
              </h2>
              <p className="text-white/55 text-lg leading-relaxed">
                Demand continues to accelerate across AI-native SaaS, fintech,
                healthtech, and enterprise software — with AI PMs, platform
                specialists, and product operations managers among the fastest
                growing and most competitive roles in the market.
              </p>
            </div>
            <div className="space-y-4">
              {[
                "AI Product Managers",
                "Platform Product Managers",
                "Growth PMs (SaaS & Consumer)",
                "Product Operations Managers",
                "Technical PMs (Enterprise & Infrastructure)",
                "Product Marketing Managers",
              ].map((role) => (
                <div
                  key={role}
                  className="flex items-center justify-between border border-white/[0.07] bg-[#0D0D0D] px-6 py-5"
                >
                  <div className="flex items-center gap-4">
                    <Layers size={18} className="text-[#C8A96B]" />
                    <span className="text-white/85">{role}</span>
                  </div>
                  <span className="text-xs uppercase tracking-[0.2em] text-white/35">
                    High Demand
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="border-t border-white/[0.06] py-24 text-center">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight leading-tight mb-6">
            Build Your Product Organisation
          </h2>
          <p className="text-white/55 text-lg leading-relaxed mb-10">
            We help enterprise software, AI, and technology businesses hire
            exceptional product, design, and analytics talent across global
            markets.
          </p>
          <button
            onClick={() => navigate("/contact")}
            className="group inline-flex items-center gap-3 bg-white text-black px-8 py-4 text-sm font-bold tracking-widest uppercase transition-all duration-300 hover:bg-white/90"
          >
            Speak With Us
            <ArrowRight
              size={15}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </button>
        </div>
      </section>
    </div>
  );
};

export default ProductExpertise;
