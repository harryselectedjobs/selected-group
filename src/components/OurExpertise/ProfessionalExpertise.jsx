import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowRight,
  Briefcase,
  Cpu,
  Users,
  BarChart3,
  Layers,
  TrendingUp,
  ShieldCheck,
  ChevronDown,
  ChevronRight,
} from "lucide-react";

const sections = [
  {
    title: "Client Delivery & Implementation",
    icon: Briefcase,
    accent: "#C8A96B",
    description:
      "Core delivery professionals implementing, configuring, and deploying software products for enterprise clients across complex multi-stakeholder environments.",
    roles: [
      "Professional Services Consultant",
      "Implementation Consultant",
      "Integration Consultant",
      "Digital Transformation Consultant",
    ],
  },
  {
    title: "Solution Architecture",
    icon: Cpu,
    accent: "#8FA3FF",
    description:
      "Technical architects designing enterprise solutions, integration patterns, and cloud infrastructure to support complex client deployments and platform migrations.",
    roles: [
      "Solutions Architect",
      "Enterprise Architect",
      "Integration Architect",
      "Cloud Architect",
    ],
  },
  {
    title: "Project & Delivery Management",
    icon: BarChart3,
    accent: "#7EB8C9",
    description:
      "Delivery leaders managing scope, budget, and stakeholder alignment across enterprise implementation programs — from project kick-off through to go-live.",
    roles: [
      "Delivery Manager",
      "Engagement Manager",
      "Program Manager",
      "Technical Project Manager",
    ],
  },
  {
    title: "Engineering & Platform",
    icon: Layers,
    accent: "#A3C98A",
    description:
      "Software and platform engineers building integrations, automating deployments, and maintaining the technical infrastructure that powers client delivery.",
    roles: [
      "Integration Engineer",
      "DevOps Engineer",
      "Platform Engineer",
      "Full Stack Engineer",
    ],
  },
  {
    title: "Customer Success & Support",
    icon: Users,
    accent: "#E07A5F",
    description:
      "Customer-facing specialists driving adoption, resolving technical issues, and managing long-term client relationships post-implementation.",
    roles: [
      "Customer Success Manager",
      "Technical Account Manager",
      "Onboarding Specialist",
      "Support Engineer",
    ],
  },
  {
    title: "Product, Data & AI",
    icon: TrendingUp,
    accent: "#C47EB5",
    description:
      "Product managers, data engineers, and AI specialists building the tools, analytics, and intelligence layers that underpin modern professional services platforms.",
    roles: [
      "Technical Product Manager",
      "Data Engineer",
      "AI Engineer",
      "BI Developer",
    ],
  },
];

const roleRows = [
  {
    number: "01",
    category: "Consulting & Implementation",
    accent: "#C8A96B",
    tagline: "The frontline delivery professionals in professional services",
    summary:
      "Implementation and consulting roles are the revenue-generating engine of a professional services organisation. These professionals configure software, manage client relationships during deployment, and translate technical requirements into working solutions — often spanning months-long enterprise projects.",
    items: [
      {
        name: "Professional Services Consultant",
        bullets: [
          "End-to-end client engagement delivery",
          "Requirements gathering & solution design",
          "Configuration, testing & go-live support",
        ],
      },
      {
        name: "Implementation Specialist",
        bullets: [
          "Product deployment & setup",
          "Data migration & integration",
          "Time-to-value acceleration",
        ],
      },
      {
        name: "Functional Consultant",
        bullets: [
          "Business process mapping",
          "Product configuration to requirements",
          "User training & adoption",
        ],
      },
      {
        name: "Technical Consultant",
        bullets: [
          "API & integration development",
          "Custom configuration & scripting",
          "Technical client advisory",
        ],
      },
      {
        name: "Integration Consultant",
        bullets: [
          "Third-party system connections",
          "Middleware & API design",
          "Data flow architecture",
        ],
      },
      {
        name: "Digital Transformation Consultant",
        bullets: [
          "Process re-engineering",
          "Change management programs",
          "Enterprise-wide adoption strategy",
        ],
      },
    ],
  },
  {
    number: "02",
    category: "Solution Architecture",
    accent: "#8FA3FF",
    tagline: "Designing scalable technical solutions for enterprise clients",
    summary:
      "Solution architects sit at the intersection of technology and business — translating complex client needs into viable technical designs. In professional services, they are critical to winning enterprise deals and ensuring long-term delivery success across multi-system environments.",
    items: [
      {
        name: "Solutions Architect",
        bullets: [
          "End-to-end solution design",
          "Pre & post-sale architecture",
          "Enterprise implementation scoping",
        ],
      },
      {
        name: "Enterprise Architect",
        bullets: [
          "Technology landscape governance",
          "Platform & integration strategy",
          "Cross-system architecture",
        ],
      },
      {
        name: "Integration Architect",
        bullets: [
          "API & middleware design",
          "Data flow & pipeline architecture",
          "Legacy modernisation patterns",
        ],
      },
      {
        name: "Cloud Architect",
        bullets: [
          "Cloud infrastructure design",
          "AWS / Azure / GCP architecture",
          "Scalability & resilience planning",
        ],
      },
      {
        name: "Technical Architect",
        bullets: [
          "Low-level technical design",
          "Code quality & standards",
          "Platform capability definition",
        ],
      },
    ],
  },
  {
    number: "03",
    category: "Project & Delivery Management",
    accent: "#7EB8C9",
    tagline: "Keeping enterprise implementations on time and on budget",
    summary:
      "Delivery management is one of the most critical functions in professional services — managing scope creep, client expectations, resource allocation, and delivery risk across complex programs. Strong project and engagement managers are the single biggest driver of client satisfaction scores.",
    items: [
      {
        name: "Delivery Manager",
        bullets: [
          "End-to-end program ownership",
          "Stakeholder & escalation management",
          "Budget & timeline governance",
        ],
      },
      {
        name: "Engagement Manager",
        bullets: [
          "Senior client relationship ownership",
          "Commercial oversight of engagements",
          "Renewal & expansion positioning",
        ],
      },
      {
        name: "Technical Project Manager",
        bullets: [
          "Technical workstream coordination",
          "Cross-team dependency management",
          "Risk & issue tracking",
        ],
      },
      {
        name: "Program Manager",
        bullets: [
          "Multi-project portfolio management",
          "Strategic governance & reporting",
          "Resource capacity planning",
        ],
      },
      {
        name: "Scrum Master",
        bullets: [
          "Agile ceremony facilitation",
          "Team velocity & blockers",
          "Continuous improvement culture",
        ],
      },
    ],
  },
  {
    number: "04",
    category: "Engineering & Platform",
    accent: "#A3C98A",
    tagline: "Building and maintaining the technical foundation for delivery",
    summary:
      "Engineering roles in professional services span integration development, infrastructure automation, and product engineering. These teams build the technical connective tissue — APIs, pipelines, and platform tooling — that allows client implementations to scale and operate reliably.",
    items: [
      {
        name: "Integration Engineer",
        bullets: [
          "API & webhook development",
          "Data pipeline & ETL builds",
          "Third-party system integration",
        ],
      },
      {
        name: "DevOps / Platform Engineer",
        bullets: [
          "CI/CD pipeline management",
          "Cloud infrastructure automation",
          "Deployment reliability & SRE",
        ],
      },
      {
        name: "Full Stack Engineer",
        bullets: [
          "Client-facing feature delivery",
          "Frontend & backend development",
          "Custom portal & tooling builds",
        ],
      },
      {
        name: "QA / Test Automation Engineer",
        bullets: [
          "Test strategy & coverage",
          "Automated test framework builds",
          "Pre-go-live validation",
        ],
      },
    ],
  },
  {
    number: "05",
    category: "Customer Success & Support",
    accent: "#E07A5F",
    tagline: "Driving adoption, retention, and long-term client value",
    summary:
      "Post-implementation customer success and support roles are responsible for ensuring that clients extract value from the product long after go-live. CSMs, TAMs, and support engineers are the frontline of retention — directly impacting NRR and expansion revenue.",
    items: [
      {
        name: "Customer Success Manager",
        bullets: [
          "Post-sale relationship ownership",
          "Adoption & renewal management",
          "Escalation & risk identification",
        ],
      },
      {
        name: "Technical Account Manager",
        bullets: [
          "Strategic technical advisory",
          "Enterprise client focus",
          "Complex integration support",
        ],
      },
      {
        name: "Onboarding Specialist",
        bullets: [
          "New client setup & training",
          "Time-to-value programs",
          "User adoption acceleration",
        ],
      },
      {
        name: "Support Engineer",
        bullets: [
          "Technical issue resolution",
          "Product bug triage & escalation",
          "SLA & ticket management",
        ],
      },
      {
        name: "Adoption Consultant",
        bullets: [
          "Change management support",
          "Feature utilisation programs",
          "Client health scoring",
        ],
      },
    ],
  },
  {
    number: "06",
    category: "Product, Data & AI",
    accent: "#C47EB5",
    tagline: "Intelligence and product capability inside professional services",
    summary:
      "Product, data, and AI roles are increasingly embedded within professional services organisations — either building internal delivery tooling, developing client-facing analytics products, or enabling AI-powered implementation accelerators and automation.",
    items: [
      {
        name: "Technical Product Manager",
        bullets: [
          "Product requirements & roadmap",
          "Engineering team alignment",
          "Customer-driven prioritisation",
        ],
      },
      {
        name: "Data Engineer",
        bullets: [
          "Data pipeline & warehouse builds",
          "ETL architecture",
          "Analytics infrastructure",
        ],
      },
      {
        name: "AI / ML Engineer",
        bullets: [
          "AI feature integration",
          "Model deployment & MLOps",
          "GenAI implementation support",
        ],
      },
      {
        name: "BI Developer",
        bullets: [
          "Reporting & dashboard builds",
          "Business intelligence tooling",
          "Client analytics delivery",
        ],
      },
    ],
  },
];

const careerPaths = [
  {
    label: "Consulting",
    accent: "#C8A96B",
    steps: [
      "Consultant",
      "Senior Consultant",
      "Principal Consultant",
      "Practice Director",
      "VP Professional Services",
    ],
  },
  {
    label: "Architecture",
    accent: "#8FA3FF",
    steps: [
      "Solutions Architect",
      "Senior Architect",
      "Principal Architect",
      "Practice Lead",
      "CTO",
    ],
  },
  {
    label: "Delivery",
    accent: "#7EB8C9",
    steps: ["PM", "Senior PM", "Program Manager", "Delivery Director"],
  },
  {
    label: "Engineering",
    accent: "#A3C98A",
    steps: ["Engineer", "Senior Engineer", "Tech Lead", "VP Engineering"],
  },
  {
    label: "Customer Success",
    accent: "#E07A5F",
    steps: ["CSM", "Senior CSM", "TAM", "CS Director", "VP Customer Success"],
  },
];

const roleFit = [
  {
    type: "Problem solver / builder",
    roles: "Implementation Consultant · Technical Consultant",
    accent: "#C8A96B",
  },
  {
    type: "Technical communicator",
    roles: "Solutions Architect · Pre-Sales Consultant",
    accent: "#8FA3FF",
  },
  {
    type: "Process-oriented",
    roles: "Project Manager · Delivery Manager",
    accent: "#7EB8C9",
  },
  {
    type: "Relationship-driven",
    roles: "Customer Success Manager · TAM",
    accent: "#E07A5F",
  },
  {
    type: "Data & analytical",
    roles: "Data Engineer · BI Developer",
    accent: "#C47EB5",
  },
  {
    type: "Strategic advisor",
    roles: "Engagement Manager · Practice Director",
    accent: "#C8A96B",
  },
  {
    type: "Operationally minded",
    roles: "Resource Manager · PMO Analyst",
    accent: "#7EB8C9",
  },
  {
    type: "Technical + commercial",
    roles: "Sales Engineer · Pre-Sales Consultant",
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

const ProfessionalExpertise = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-black min-h-screen text-white overflow-hidden">
      {/* ── HERO ── */}
      <section className="relative border-b border-white/[0.06]">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=2000&auto=format&fit=crop"
            alt="professional services"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-black/70" />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 pt-36 pb-28">
          <div className="flex items-center gap-3 mb-6">
            <span className="w-8 h-px bg-[#C8A96B]" />
            <span className="text-[#C8A96B] text-xs tracking-[0.3em] uppercase font-medium">
              Professional Services Recruitment
            </span>
          </div>

          <h1 className="text-[3.5rem] md:text-[6rem] leading-[0.95] font-bold tracking-tight max-w-5xl">
            Staffing the Engine of
            <span className="block text-white/35">Software Delivery</span>
          </h1>

          <p className="mt-8 max-w-2xl text-white/60 text-lg leading-relaxed">
            Professional services teams implement, integrate, and support
            software products for enterprise clients. We specialise in placing
            talent across consulting, architecture, delivery, engineering, and
            customer success functions at every stage of the product lifecycle.
          </p>

          <div className="flex flex-wrap gap-4 mt-10">
            <button
              onClick={() => navigate("/contact")}
              className="group inline-flex items-center gap-3 bg-white text-black px-8 py-4 text-sm font-bold tracking-widest uppercase transition-all duration-300 hover:bg-white/90"
            >
              Find PS Talent
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
              ["Implementation", "Core Delivery"],
              ["Architecture", "Technical Depth"],
              ["US & Europe", "Hiring Coverage"],
              ["SaaS & Cloud", "Specialisation"],
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
              PS Function Structure
            </span>
            <span className="w-8 h-px bg-white/20" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight leading-tight mb-8">
            More Than Just Consultants
          </h2>
          <p className="text-white/55 text-lg leading-relaxed">
            Professional services organisations span far beyond implementation
            consultants — they include architects, delivery managers, engineers,
            data specialists, customer success teams, and product managers.
            Together, they drive software adoption, client satisfaction, and
            long-term revenue retention across enterprise accounts.
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
              Every PS Function,{" "}
              <span className="text-white/35">Explained</span>
            </h2>
            <p className="text-white/45 text-sm leading-relaxed max-w-sm md:text-right">
              Explore each function in detail — what the roles do, how they
              interact, and where they sit in a modern professional services
              organisation.
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
            Common PS Career Paths
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
                Which PS Role <span className="text-white/35">Fits You?</span>
              </h2>
              <p className="text-white/50 text-base leading-relaxed max-w-sm">
                Professional services attracts a wide range of profiles — from
                hands-on technical builders to strategic client advisors.
                Understanding where your strengths compound is key to finding
                the right path in a PS organisation.
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
                High-Growth PS Roles
              </h2>
              <p className="text-white/55 text-lg leading-relaxed">
                Demand continues to accelerate across enterprise SaaS, AI-native
                platforms, cloud infrastructure, and digital transformation
                programs — with implementation and architecture talent among the
                most sought-after in the market.
              </p>
            </div>
            <div className="space-y-4">
              {[
                "Solutions Architects",
                "Implementation Consultants",
                "Delivery & Engagement Managers",
                "Customer Success Managers",
                "Cloud & DevOps Engineers",
                "Technical Account Managers",
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
            Scale Your Professional Services Team
          </h2>
          <p className="text-white/55 text-lg leading-relaxed mb-10">
            We help enterprise software and SaaS businesses hire exceptional
            implementation, architecture, delivery, and customer success talent
            across global markets.
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

export default ProfessionalExpertise;
