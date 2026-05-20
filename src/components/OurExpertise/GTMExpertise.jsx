import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowRight,
  TrendingUp,
  Users,
  Briefcase,
  Megaphone,
  BarChart3,
  Handshake,
  Cpu,
  ShieldCheck,
  ChevronDown,
  ChevronRight,
} from "lucide-react";

const sections = [
  {
    title: "Sales",
    icon: TrendingUp,
    accent: "#C8A96B",
    description:
      "Revenue-driving GTM talent focused on pipeline generation, enterprise sales cycles, and customer expansion.",
    roles: [
      "Account Executive",
      "Enterprise Sales",
      "Sales Development Representative",
      "Solutions Consultant",
    ],
  },
  {
    title: "Marketing",
    icon: Megaphone,
    accent: "#7EB8C9",
    description:
      "Strategic marketing professionals driving positioning, demand generation, growth, and market awareness.",
    roles: [
      "Product Marketing Manager",
      "Growth Marketing",
      "Demand Generation",
      "Content Marketing",
    ],
  },
  {
    title: "Customer Success",
    icon: Users,
    accent: "#A3C98A",
    description:
      "Post-sale customer teams responsible for adoption, retention, onboarding, and enterprise relationship management.",
    roles: [
      "Customer Success Manager",
      "Technical Account Manager",
      "Implementation Specialist",
      "Renewals Manager",
    ],
  },
  {
    title: "Revenue Operations",
    icon: BarChart3,
    accent: "#C47EB5",
    description:
      "Operational and analytics-focused GTM teams supporting forecasting, CRM management, and process optimisation.",
    roles: [
      "Revenue Operations",
      "Sales Operations",
      "Marketing Operations",
      "Pipeline Analytics",
    ],
  },
  {
    title: "Partnerships",
    icon: Handshake,
    accent: "#E07A5F",
    description:
      "Alliance and ecosystem specialists focused on strategic partnerships, integrations, and co-selling opportunities.",
    roles: [
      "Partnerships Manager",
      "Alliance Manager",
      "Technology Partnerships",
      "Channel Sales",
    ],
  },
  {
    title: "Technical GTM",
    icon: Cpu,
    accent: "#8FA3FF",
    description:
      "Technical customer-facing specialists bridging engineering, product, and enterprise sales environments.",
    roles: [
      "Solutions Architect",
      "Developer Relations",
      "Forward Deployed Engineer",
      "AI Evangelist",
    ],
  },
];

// ── Detailed role rows data ──────────────────────────────────────────────────
const roleRows = [
  {
    number: "01",
    category: "Sales Roles",
    accent: "#C8A96B",
    tagline: "Revenue-generating frontline roles",
    summary:
      "Sales teams own the entire commercial motion — from first outreach to closed deal. In SaaS they're structured by deal size: SMB, Mid-Market, and Enterprise, each requiring different skills and motion.",
    items: [
      {
        name: "Account Executive",
        bullets: [
          "Closes deals & runs demos",
          "Owns revenue targets",
          "Split: SMB · Mid-Market · Enterprise",
        ],
      },
      {
        name: "SDR / BDR",
        bullets: [
          "Outbound prospecting & outreach",
          "Qualifies inbound leads",
          "Books meetings for AEs",
        ],
      },
      {
        name: "Enterprise Sales",
        bullets: [
          "Large, complex multi-stakeholder deals",
          "Long relationship-driven cycles",
          "Executive-level engagement",
        ],
      },
      {
        name: "Solutions Consultant",
        bullets: [
          "Technical pre-sales support",
          "Explains APIs & integrations",
          "Bridges product and sales",
        ],
      },
      {
        name: "Account Manager",
        bullets: [
          "Manages existing customers",
          "Upsell & cross-sell expansion",
          "Retention-focused growth",
        ],
      },
      {
        name: "Channel / Partner Sales",
        bullets: [
          "Sells through resellers",
          "Manages indirect revenue",
          "Partner enablement",
        ],
      },
    ],
  },
  {
    number: "02",
    category: "Marketing Roles",
    accent: "#7EB8C9",
    tagline: "Awareness, demand generation, and positioning",
    summary:
      "Modern GTM marketing spans far beyond brand — it's the engine behind pipeline creation, product launches, competitive intelligence, and conversion at scale.",
    items: [
      {
        name: "Product Marketing Manager",
        bullets: [
          "Messaging & positioning",
          "Launch strategy & enablement",
          "Competitive intel & ICP development",
        ],
      },
      {
        name: "Demand Generation",
        bullets: [
          "Pipeline creation",
          "Paid campaigns & automation",
          "Lead generation at scale",
        ],
      },
      {
        name: "Growth Marketing",
        bullets: [
          "Conversion optimisation",
          "Acquisition funnels & PLG",
          "Rapid experimentation",
        ],
      },
      {
        name: "Content Marketing",
        bullets: [
          "Blogs, whitepapers & SEO",
          "Case studies & thought leadership",
          "Long-form brand authority",
        ],
      },
      {
        name: "Brand Marketing",
        bullets: [
          "Company reputation & awareness",
          "Creative direction",
          "Narrative and tone of voice",
        ],
      },
      {
        name: "Field Marketing",
        bullets: [
          "Events & webinars",
          "Regional campaigns",
          "In-person pipeline acceleration",
        ],
      },
    ],
  },
  {
    number: "03",
    category: "Customer Success",
    accent: "#A3C98A",
    tagline: "Adoption, retention, and expansion after the sale",
    summary:
      "Customer Success is one of the fastest-growing GTM functions in SaaS. These teams own the post-sale relationship and are directly responsible for net revenue retention.",
    items: [
      {
        name: "Customer Success Manager",
        bullets: [
          "Owns post-sale relationship",
          "Drives adoption & prevents churn",
          "Helps customers hit outcomes",
        ],
      },
      {
        name: "Technical Account Manager",
        bullets: [
          "Strategic technical advisor",
          "Enterprise customer focus",
          "Complex integration support",
        ],
      },
      {
        name: "Implementation Specialist",
        bullets: [
          "Product deployment & setup",
          "Training & onboarding",
          "Time-to-value acceleration",
        ],
      },
      {
        name: "Renewals Manager",
        bullets: [
          "Contract renewal ownership",
          "Churn risk identification",
          "Expansion pipeline",
        ],
      },
    ],
  },
  {
    number: "04",
    category: "Revenue Operations",
    accent: "#C47EB5",
    tagline: "The systems and analytics layer behind GTM",
    summary:
      "RevOps has become one of the most strategically important GTM functions — unifying Sales Ops, Marketing Ops, and CS Ops into a single data and process layer that powers the entire revenue engine.",
    items: [
      {
        name: "Revenue Operations",
        bullets: [
          "Forecasting & CRM management",
          "Pipeline analytics & GTM tooling",
          "Compensation plans & process optimisation",
        ],
      },
      {
        name: "Sales Operations",
        bullets: [
          "Territory planning & reporting",
          "Sales process management",
          "Quota & attainment tracking",
        ],
      },
      {
        name: "Marketing Operations",
        bullets: [
          "HubSpot / Marketo management",
          "Attribution modelling",
          "Campaign systems & data hygiene",
        ],
      },
    ],
  },
  {
    number: "05",
    category: "Partnerships & Ecosystem",
    accent: "#E07A5F",
    tagline: "Strategic growth via external relationships",
    summary:
      "Partner-led growth is a major lever in enterprise SaaS. Alliance and ecosystem roles build the relationships with hyperscalers, system integrators, and technology partners that accelerate market penetration.",
    items: [
      {
        name: "Partnerships Manager",
        bullets: [
          "Strategic alliances & co-selling",
          "Integration partner development",
          "Partner-sourced pipeline",
        ],
      },
      {
        name: "Alliance Manager",
        bullets: [
          "Microsoft, AWS, Salesforce relationships",
          "Executive sponsor alignment",
          "Joint go-to-market planning",
        ],
      },
      {
        name: "Technology Partnerships",
        bullets: [
          "Product integration ecosystem",
          "API & marketplace presence",
          "Partner technical enablement",
        ],
      },
    ],
  },
  {
    number: "06",
    category: "Technical GTM",
    accent: "#8FA3FF",
    tagline: "Especially critical in B2B SaaS and AI companies",
    summary:
      "Technical GTM profiles are among the rarest and most sought-after in the market. They combine deep technical knowledge with commercial instinct — essential as enterprise deals grow more complex.",
    items: [
      {
        name: "Solutions Architect",
        bullets: [
          "Deep technical customer design",
          "Enterprise implementation scoping",
          "Pre & post-sale architecture",
        ],
      },
      {
        name: "Developer Relations",
        bullets: [
          "Developer community engagement",
          "Technical content & demos",
          "Open-source advocacy",
        ],
      },
      {
        name: "Forward Deployed Engineer",
        bullets: [
          "Customer-facing engineering",
          "On-site implementation support",
          "Feedback loop to product",
        ],
      },
      {
        name: "AI / Technical Evangelist",
        bullets: [
          "Market education on AI capabilities",
          "Conference & content presence",
          "Translates technical to commercial",
        ],
      },
    ],
  },
];

// ── Career paths ─────────────────────────────────────────────────────────────
const careerPaths = [
  {
    label: "Sales",
    accent: "#C8A96B",
    steps: ["SDR", "AE", "Enterprise AE", "Sales Director"],
  },
  {
    label: "Marketing",
    accent: "#7EB8C9",
    steps: [
      "Content / Growth",
      "Product Marketing",
      "Senior PMM",
      "Director PMM",
    ],
  },
  {
    label: "Customer Success",
    accent: "#A3C98A",
    steps: ["CSM", "Senior CSM", "CS Lead", "CS Director"],
  },
  {
    label: "Revenue Ops",
    accent: "#C47EB5",
    steps: ["Sales Ops", "RevOps Manager", "Revenue Strategy", "VP RevOps"],
  },
  {
    label: "Technical GTM",
    accent: "#8FA3FF",
    steps: [
      "Sales Engineer",
      "Solutions Architect",
      "Field CTO",
      "VP Solutions",
    ],
  },
];

// ── Personality fit table ────────────────────────────────────────────────────
const personalityFit = [
  {
    type: "Competitive / persuasive",
    roles: "Sales · Enterprise AE",
    accent: "#C8A96B",
  },
  { type: "Analytical", roles: "RevOps · Growth Marketing", accent: "#C47EB5" },
  { type: "Creative", roles: "Brand · Content Marketing", accent: "#7EB8C9" },
  {
    type: "Strategic communicator",
    roles: "Product Marketing Manager",
    accent: "#A3C98A",
  },
  {
    type: "Relationship-driven",
    roles: "Customer Success · Partnerships",
    accent: "#E07A5F",
  },
  {
    type: "Technical + social",
    roles: "Solutions Engineer · DevRel",
    accent: "#8FA3FF",
  },
  { type: "Process-oriented", roles: "Revenue Operations", accent: "#C47EB5" },
  {
    type: "Big-picture thinker",
    roles: "GTM Strategy · CRO",
    accent: "#C8A96B",
  },
];

// ── RoleRow component ─────────────────────────────────────────────────────────
function RoleRow({ row, index }) {
  const [open, setOpen] = useState(false);
  const isEven = index % 2 === 0;

  return (
    <div className="border-b border-white/[0.06]">
      {/* Header row — always visible */}
      <button onClick={() => setOpen(!open)} className="w-full text-left group">
        <div className="max-w-7xl mx-auto px-6 py-8 flex items-center justify-between gap-6">
          <div className="flex items-center gap-8 flex-1 min-w-0">
            {/* Number */}
            <span
              className="text-xs tracking-[0.25em] font-medium shrink-0"
              style={{ color: row.accent }}
            >
              {row.number}
            </span>
            {/* Category */}
            <h3 className="text-xl md:text-2xl font-bold tracking-tight truncate">
              {row.category}
            </h3>
            {/* Tagline — hidden on small screens */}
            <span className="hidden lg:block text-white/40 text-sm truncate">
              {row.tagline}
            </span>
          </div>
          {/* Chevron */}
          <ChevronDown
            size={18}
            className="shrink-0 text-white/40 transition-transform duration-300"
            style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
          />
        </div>
      </button>

      {/* Expandable body */}
      <div
        className="overflow-hidden transition-all duration-500"
        style={{ maxHeight: open ? "1200px" : "0px" }}
      >
        <div className="max-w-7xl mx-auto px-6 pb-12">
          {/* Divider */}
          <div
            className="h-px mb-10"
            style={{ background: `${row.accent}30` }}
          />

          {/* Summary paragraph */}
          <p className="text-white/55 text-base leading-relaxed max-w-3xl mb-10">
            {row.summary}
          </p>

          {/* Role cards grid */}
          <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
            {row.items.map((item) => (
              <div
                key={item.name}
                className="bg-[#0D0D0D] border border-white/[0.07] p-6 hover:border-white/15 transition-colors duration-200"
              >
                {/* Accent bar */}
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
const GTMExpertise = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-black min-h-screen text-white overflow-hidden">
      {/* ── HERO ── */}
      <section className="relative border-b border-white/[0.06]">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=2000&auto=format&fit=crop"
            alt="office"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-black/70" />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 pt-36 pb-28">
          <div className="flex items-center gap-3 mb-6">
            <span className="w-8 h-px bg-[#C8A96B]" />
            <span className="text-[#C8A96B] text-xs tracking-[0.3em] uppercase font-medium">
              Go-To-Market Recruitment
            </span>
          </div>

          <h1 className="text-[3.5rem] md:text-[6rem] leading-[0.95] font-bold tracking-tight max-w-5xl">
            Building High-Performance
            <span className="block text-white/35">GTM Organisations</span>
          </h1>

          <p className="mt-8 max-w-2xl text-white/60 text-lg leading-relaxed">
            Go-To-Market teams are responsible for bringing products to market,
            generating revenue, scaling adoption, and driving long-term customer
            growth across modern SaaS and AI businesses.
          </p>

          <div className="flex flex-wrap gap-4 mt-10">
            <button
              onClick={() => navigate("/contact")}
              className="group inline-flex items-center gap-3 bg-white text-black px-8 py-4 text-sm font-bold tracking-widest uppercase transition-all duration-300 hover:bg-white/90"
            >
              Find GTM Talent
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
              ["Enterprise SaaS", "Core Market"],
              ["AI & Cloud", "Growth Areas"],
              ["US & Europe", "Hiring Coverage"],
              ["Revenue Teams", "Specialisation"],
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
              GTM Structure
            </span>
            <span className="w-8 h-px bg-white/20" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight leading-tight mb-8">
            More Than Just Sales
          </h2>
          <p className="text-white/55 text-lg leading-relaxed">
            Modern GTM organisations combine sales, marketing, customer success,
            partnerships, revenue operations, and technical customer-facing
            teams. Together, these functions drive pipeline creation, customer
            retention, product adoption, and scalable revenue growth.
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

      {/* ══════════════════════════════════════════════════════
          ── ROLE BREAKDOWN ROWS (NEW) ──
      ══════════════════════════════════════════════════════ */}
      <section className="border-t border-white/[0.06] bg-[#050505]">
        {/* Section header */}
        <div className="max-w-7xl mx-auto px-6 pt-20 pb-12">
          <div className="flex items-center gap-3 mb-6">
            <span className="w-8 h-px bg-[#C8A96B]" />
            <span className="text-[#C8A96B] text-xs tracking-[0.3em] uppercase">
              Role Breakdown
            </span>
          </div>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight leading-tight max-w-xl">
              Every GTM Function,{" "}
              <span className="text-white/35">Explained</span>
            </h2>
            <p className="text-white/45 text-sm leading-relaxed max-w-sm md:text-right">
              Explore each function in detail — what the roles do, how they fit
              together, and where they sit in a modern GTM org.
            </p>
          </div>
        </div>

        {/* Accordion rows */}
        <div>
          {roleRows.map((row, i) => (
            <RoleRow key={row.number} row={row} index={i} />
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          ── CAREER PATHS (NEW) ──
      ══════════════════════════════════════════════════════ */}
      <section className="border-t border-white/[0.06] py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-8 h-px bg-[#C8A96B]" />
            <span className="text-[#C8A96B] text-xs tracking-[0.3em] uppercase">
              Progression
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight leading-tight mb-16">
            Common GTM Career Paths
          </h2>

          <div className="space-y-6">
            {careerPaths.map((path) => (
              <div
                key={path.label}
                className="bg-[#0D0D0D] border border-white/[0.07] px-6 py-6 flex flex-col md:flex-row md:items-center gap-6"
              >
                {/* Label */}
                <div className="md:w-40 shrink-0">
                  <span
                    className="text-xs tracking-[0.2em] uppercase font-semibold"
                    style={{ color: path.accent }}
                  >
                    {path.label}
                  </span>
                </div>
                {/* Steps */}
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

      {/* ══════════════════════════════════════════════════════
          ── PERSONALITY FIT TABLE (NEW) ──
      ══════════════════════════════════════════════════════ */}
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
                Which GTM Role <span className="text-white/35">Fits You?</span>
              </h2>
              <p className="text-white/50 text-base leading-relaxed max-w-sm">
                GTM spans personalities from competitive closers to analytical
                operators. Different functions reward different strengths — the
                key is knowing where your natural edge compounds.
              </p>
            </div>

            <div className="space-y-2">
              {personalityFit.map((row) => (
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
                High-Growth GTM Roles
              </h2>
              <p className="text-white/55 text-lg leading-relaxed">
                Demand continues to accelerate across enterprise SaaS, AI-native
                businesses, cloud infrastructure companies, and platform
                technology organisations.
              </p>
            </div>
            <div className="space-y-4">
              {[
                "Enterprise Account Executives",
                "Product Marketing Managers",
                "Revenue Operations Leaders",
                "Solutions Engineers",
                "AI GTM Specialists",
                "Customer Success Leadership",
              ].map((role) => (
                <div
                  key={role}
                  className="flex items-center justify-between border border-white/[0.07] bg-[#0D0D0D] px-6 py-5"
                >
                  <div className="flex items-center gap-4">
                    <ShieldCheck size={18} className="text-[#C8A96B]" />
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
            Scale Your GTM Team
          </h2>
          <p className="text-white/55 text-lg leading-relaxed mb-10">
            We help enterprise software and AI businesses hire exceptional
            commercial, operational, and technical GTM talent across global
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

export default GTMExpertise;
