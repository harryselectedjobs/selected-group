import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowRight,
  Briefcase,
  TrendingUp,
  Cpu,
  Layers,
  BarChart3,
  ShieldCheck,
  ChevronDown,
  ChevronRight,
} from "lucide-react";

const sections = [
  {
    title: "C-Suite Technology",
    icon: Briefcase,
    accent: "#C8A96B",
    description:
      "Chief-level technology executives setting vision, architecture, and innovation strategy across SaaS, AI, fintech, and enterprise software businesses.",
    roles: [
      "Chief Technology Officer",
      "Chief Information Officer",
      "Chief AI Officer",
      "Chief Data Officer",
    ],
  },
  {
    title: "Engineering Leadership",
    icon: Cpu,
    accent: "#8FA3FF",
    description:
      "Senior engineering leaders scaling delivery teams, engineering culture, platform reliability, and developer excellence at hypergrowth pace.",
    roles: [
      "VP of Engineering",
      "Engineering Director",
      "Head of Engineering",
      "Head of Platform Engineering",
    ],
  },
  {
    title: "AI & Data Leadership",
    icon: BarChart3,
    accent: "#7EB8C9",
    description:
      "Data and AI executives driving enterprise analytics maturity, AI adoption strategy, ML infrastructure, and data monetisation at scale.",
    roles: [
      "Chief AI Officer",
      "Chief Data Officer",
      "VP of Data",
      "Head of AI / ML",
    ],
  },
  {
    title: "Cybersecurity",
    icon: ShieldCheck,
    accent: "#E07A5F",
    description:
      "Security executives protecting enterprise infrastructure, driving regulatory compliance, and governing AI and cloud risk across critical environments.",
    roles: [
      "Chief Information Security Officer",
      "VP Security",
      "Head of Cybersecurity",
      "Director of Security Engineering",
    ],
  },
  {
    title: "Product Leadership",
    icon: Layers,
    accent: "#A3C98A",
    description:
      "Product executives translating customer insight and market signals into scalable product strategy, AI productisation, and commercial growth.",
    roles: [
      "Chief Product Officer",
      "VP of Product",
      "Head of Product",
      "Product Director",
    ],
  },
  {
    title: "Commercial Technology",
    icon: TrendingUp,
    accent: "#C47EB5",
    description:
      "Revenue and digital transformation leaders owning GTM alignment, enterprise sales engineering, and digital customer experience strategy.",
    roles: [
      "Chief Digital Officer",
      "Chief Revenue Officer",
      "VP Solutions / Pre-Sales",
      "VP of Infrastructure",
    ],
  },
];

const roleRows = [
  {
    number: "01",
    category: "Chief Technology Officer",
    accent: "#C8A96B",
    tagline: "Technology vision, architecture, and innovation leadership",
    summary:
      "The CTO sets the technical vision and owns the platform architecture that powers the business. In SaaS and AI companies, CTOs must balance technical excellence with product velocity — attracting engineering talent while serving as a credible voice with investors, customers, and the board.",
    items: [
      {
        name: "Chief Technology Officer",
        bullets: [
          "Technology strategy & roadmap",
          "Platform and architecture decisions",
          "AI/ML and innovation adoption",
          "Technical due diligence for M&A",
        ],
      },
      {
        name: "VP of Engineering",
        bullets: [
          "Engineering team delivery",
          "Velocity & quality ownership",
          "Headcount planning & structure",
        ],
      },
      {
        name: "Head of Architecture",
        bullets: [
          "Platform design decisions",
          "Technical standards & debt",
          "Scalability & resilience",
        ],
      },
      {
        name: "Engineering Director",
        bullets: [
          "Department-level leadership",
          "Team performance & delivery",
          "Technical program management",
        ],
      },
    ],
  },
  {
    number: "02",
    category: "Chief Information Officer",
    accent: "#8FA3FF",
    tagline: "Internal enterprise technology and digital operations",
    summary:
      "Where the CTO owns the product technology, the CIO owns the internal technology estate — ERP, CRM, IT governance, and vendor relationships. CIOs are increasingly strategic in large enterprises driving digital transformation, modernisation programs, and compliance mandates.",
    items: [
      {
        name: "Chief Information Officer",
        bullets: [
          "Enterprise systems & IT governance",
          "Digital transformation leadership",
          "Vendor management & ERP/CRM",
        ],
      },
      {
        name: "IT Director",
        bullets: [
          "Day-to-day IT operations",
          "Infrastructure & support",
          "Business systems management",
        ],
      },
      {
        name: "Head of Enterprise Architecture",
        bullets: [
          "Technology landscape design",
          "Integration strategy",
          "Legacy modernisation",
        ],
      },
    ],
  },
  {
    number: "03",
    category: "Chief Information Security Officer",
    accent: "#E07A5F",
    tagline: "Security, risk, governance, and compliance at enterprise scale",
    summary:
      "CISOs have become board-level figures as cybersecurity moves from a technical concern to a strategic one. In AI and cloud-first companies, they govern an expanding attack surface — spanning zero-trust architecture, AI security, regulatory compliance, and incident response.",
    items: [
      {
        name: "Chief Information Security Officer",
        bullets: [
          "Cybersecurity strategy & governance",
          "Regulatory compliance (GDPR, SOC2, ISO)",
          "Board-level security reporting",
          "Incident response leadership",
        ],
      },
      {
        name: "VP of Security",
        bullets: [
          "Security operations & engineering",
          "Risk management programs",
          "Security team leadership",
        ],
      },
      {
        name: "Director of Security Engineering",
        bullets: [
          "Security tooling & architecture",
          "Cloud & application security",
          "Threat detection & response",
        ],
      },
      {
        name: "Head of Cybersecurity",
        bullets: [
          "Enterprise security transformation",
          "Zero trust implementation",
          "AI and cloud security governance",
        ],
      },
    ],
  },
  {
    number: "04",
    category: "Chief Product Officer",
    accent: "#A3C98A",
    tagline: "Product strategy, customer value, and AI productisation",
    summary:
      "CPOs are responsible for translating market signals and customer insight into product roadmaps that drive competitive advantage. In AI-first companies, they must navigate rapid innovation cycles, balance platform bets against near-term delivery, and align product strategy with commercial motion.",
    items: [
      {
        name: "Chief Product Officer",
        bullets: [
          "Product vision & strategy",
          "Cross-functional alignment",
          "AI productisation leadership",
          "Monetisation strategy",
        ],
      },
      {
        name: "VP of Product",
        bullets: [
          "Product org management",
          "Roadmap execution & prioritisation",
          "Customer feedback loops",
        ],
      },
      {
        name: "Head of Product",
        bullets: [
          "End-to-end product ownership",
          "Strategic + operational balance",
          "Common in scale-ups",
        ],
      },
      {
        name: "Product Director",
        bullets: [
          "Domain / vertical leadership",
          "Platform product ownership",
          "Data-led decision making",
        ],
      },
    ],
  },
  {
    number: "05",
    category: "Chief Data & AI Officer",
    accent: "#7EB8C9",
    tagline: "Enterprise data strategy, AI governance, and monetisation",
    summary:
      "The CDO and Chief AI Officer are among the fastest-growing executive roles in the market. As AI becomes central to product and operations, companies need leaders who can govern data assets, build ML infrastructure, enable GenAI initiatives, and drive the enterprise AI operating model.",
    items: [
      {
        name: "Chief Data Officer",
        bullets: [
          "Data governance & platforms",
          "Analytics transformation",
          "AI enablement & data monetisation",
        ],
      },
      {
        name: "Chief AI Officer",
        bullets: [
          "Enterprise AI adoption strategy",
          "GenAI implementation programs",
          "AI ethics & governance",
          "AI operating model design",
        ],
      },
      {
        name: "VP of Data / Head of Data",
        bullets: [
          "Data platform strategy",
          "Analytics maturity",
          "AI readiness & infrastructure",
        ],
      },
      {
        name: "Director of Data Science",
        bullets: [
          "Modelling team leadership",
          "Predictive analytics programs",
          "Commercial data insights",
        ],
      },
    ],
  },
  {
    number: "06",
    category: "Commercial Technology Leadership",
    accent: "#C47EB5",
    tagline: "Revenue, digital transformation, and GTM in tech businesses",
    summary:
      "Commercial technology leaders bridge the gap between technical capability and market value. Chief Digital Officers own the customer-facing digital transformation agenda. CROs in enterprise SaaS are increasingly technical. VP Solutions leaders are critical to winning complex enterprise deals.",
    items: [
      {
        name: "Chief Digital Officer",
        bullets: [
          "Digital customer transformation",
          "Digital product & channel ownership",
          "Common in retail, finance, healthcare",
        ],
      },
      {
        name: "Chief Revenue Officer",
        bullets: [
          "GTM alignment across sales & CS",
          "Revenue operations governance",
          "Enterprise sales scaling",
        ],
      },
      {
        name: "VP Solutions / Pre-Sales",
        bullets: [
          "Solution architecture leadership",
          "Enterprise client advisory",
          "Technical sales enablement",
        ],
      },
      {
        name: "VP Infrastructure",
        bullets: [
          "Cloud operations & reliability",
          "SRE & DevOps leadership",
          "Platform scalability",
        ],
      },
    ],
  },
];

const careerPaths = [
  {
    label: "Engineering",
    accent: "#8FA3FF",
    steps: ["Engineer", "Tech Lead", "Eng Director", "VP Engineering", "CTO"],
  },
  {
    label: "Product",
    accent: "#A3C98A",
    steps: ["PM", "Senior PM", "Product Director", "VP Product", "CPO"],
  },
  {
    label: "Data & AI",
    accent: "#7EB8C9",
    steps: ["Data Analyst", "Data Scientist", "Head of Data", "VP Data", "CDO"],
  },
  {
    label: "Security",
    accent: "#E07A5F",
    steps: [
      "Security Analyst",
      "Security Architect",
      "Head of Security",
      "VP Security",
      "CISO",
    ],
  },
  {
    label: "Commercial",
    accent: "#C47EB5",
    steps: [
      "Solutions Engineer",
      "VP Solutions",
      "Chief Digital Officer",
      "CRO",
    ],
  },
];

const leadershipFit = [
  {
    type: "Visionary technical architect",
    roles: "CTO · VP Engineering",
    accent: "#8FA3FF",
  },
  {
    type: "Security / risk-obsessed",
    roles: "CISO · VP Security",
    accent: "#E07A5F",
  },
  {
    type: "Data & AI strategist",
    roles: "CDO · Chief AI Officer",
    accent: "#7EB8C9",
  },
  {
    type: "Customer-obsessed product thinker",
    roles: "CPO · VP Product",
    accent: "#A3C98A",
  },
  {
    type: "Internal systems builder",
    roles: "CIO · IT Director",
    accent: "#C8A96B",
  },
  {
    type: "Digital transformer",
    roles: "Chief Digital Officer",
    accent: "#C47EB5",
  },
  {
    type: "Commercially-minded technologist",
    roles: "CRO · VP Solutions",
    accent: "#C47EB5",
  },
  {
    type: "Infrastructure & reliability focus",
    roles: "VP Infrastructure · SRE Leader",
    accent: "#8FA3FF",
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

const ExecutiveExpertise = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-black min-h-screen text-white overflow-hidden">
      {/* ── HERO ── */}
      <section className="relative border-b border-white/[0.06]">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1560179707-f14e90ef3623?q=80&w=2000&auto=format&fit=crop"
            alt="executive leadership"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-black/70" />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 pt-36 pb-28">
          <div className="flex items-center gap-3 mb-6">
            <span className="w-8 h-px bg-[#C8A96B]" />
            <span className="text-[#C8A96B] text-xs tracking-[0.3em] uppercase font-medium">
              Technology Executive Search
            </span>
          </div>

          <h1 className="text-[3.5rem] md:text-[6rem] leading-[0.95] font-bold tracking-tight max-w-5xl">
            Building World-Class
            <span className="block text-white/35">Technology Leaders</span>
          </h1>

          <p className="mt-8 max-w-2xl text-white/60 text-lg leading-relaxed">
            Technology executive search focuses on placing senior leadership
            talent that can scale product, engineering, data, cybersecurity, AI,
            and digital transformation functions across SaaS, fintech, and
            AI-native businesses.
          </p>

          <div className="flex flex-wrap gap-4 mt-10">
            <button
              onClick={() => navigate("/contact")}
              className="group inline-flex items-center gap-3 bg-white text-black px-8 py-4 text-sm font-bold tracking-widest uppercase transition-all duration-300 hover:bg-white/90"
            >
              Find Executive Talent
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
              ["C-Suite", "Primary Focus"],
              ["VP & Director", "Senior Roles"],
              ["US & Europe", "Hiring Coverage"],
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
              Leadership Architecture
            </span>
            <span className="w-8 h-px bg-white/20" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight leading-tight mb-8">
            More Than Just Titles
          </h2>
          <p className="text-white/55 text-lg leading-relaxed">
            Technology executive structures have evolved significantly with
            cloud, AI, cybersecurity, and platform-based businesses. Modern tech
            organisations require leaders across CTO, CIO, CISO, CPO, CDO, and
            Chief AI Officer functions — each with distinct mandates, skill
            profiles, and market dynamics.
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
              Every Executive Role,{" "}
              <span className="text-white/35">Explained</span>
            </h2>
            <p className="text-white/45 text-sm leading-relaxed max-w-sm md:text-right">
              Explore each leadership function in detail — what the roles own,
              how they interact, and where they sit in a modern technology
              executive team.
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
            Common Tech Executive Career Paths
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

      {/* ── LEADERSHIP FIT TABLE ── */}
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
                Which Tech Executive Role{" "}
                <span className="text-white/35">Fits You?</span>
              </h2>
              <p className="text-white/50 text-base leading-relaxed max-w-sm">
                Technology leadership spans vastly different profiles — from
                visionary architects to security-obsessed risk leaders. The best
                placements align natural strengths and career history with the
                specific mandate the organisation needs at its current growth
                stage.
              </p>
            </div>

            <div className="space-y-2">
              {leadershipFit.map((row) => (
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
                Most Competitive Executive Markets
              </h2>
              <p className="text-white/55 text-lg leading-relaxed">
                Demand continues to accelerate across AI infrastructure,
                cybersecurity, enterprise SaaS, fintech, healthtech, and cloud
                platform businesses — with AI leadership and CISO roles among
                the most contested in the market.
              </p>
            </div>
            <div className="space-y-4">
              {[
                "Chief AI Officers",
                "CISOs (Cloud & AI Security)",
                "AI-Native Chief Technology Officers",
                "VP Engineering (Hypergrowth)",
                "Chief Data Officers",
                "Chief Digital Officers",
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
            Build Your Technology Leadership Team
          </h2>
          <p className="text-white/55 text-lg leading-relaxed mb-10">
            We help enterprise software, AI, and technology businesses hire
            exceptional executive and senior leadership talent across global
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

export default ExecutiveExpertise;
