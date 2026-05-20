import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowRight,
  Briefcase,
  Cpu,
  Layers,
  BarChart3,
  TrendingUp,
  ShieldCheck,
  ChevronDown,
  ChevronRight,
} from "lucide-react";

const sections = [
  {
    title: "Software Engineering",
    icon: Cpu,
    accent: "#C8A96B",
    description:
      "Core software engineers building applications, systems, and platforms — spanning frontend, backend, full-stack, mobile, and embedded disciplines across SaaS, fintech, and AI-native products.",
    roles: [
      "Frontend Developer",
      "Backend Developer",
      "Full-Stack Developer",
      "Mobile Developer",
    ],
  },
  {
    title: "DevOps, Platform & SRE",
    icon: TrendingUp,
    accent: "#8FA3FF",
    description:
      "Engineers owning deployment pipelines, cloud infrastructure, CI/CD automation, reliability, and internal developer platforms — the operational backbone of modern software delivery.",
    roles: [
      "DevOps Engineer",
      "Site Reliability Engineer",
      "Platform Engineer",
      "Cloud Engineer",
    ],
  },
  {
    title: "Data & AI Engineering",
    icon: BarChart3,
    accent: "#7EB8C9",
    description:
      "Specialist engineers building data pipelines, ML infrastructure, and AI systems — from analytics engineering and data platforms to production ML deployment at scale.",
    roles: [
      "Data Engineer",
      "Machine Learning Engineer",
      "AI Engineer",
      "Data Scientist",
    ],
  },
  {
    title: "Quality & Security",
    icon: ShieldCheck,
    accent: "#E07A5F",
    description:
      "Quality and security specialists ensuring software reliability, compliance, and protection — from manual QA and test automation to application security, penetration testing, and cloud security.",
    roles: [
      "QA Engineer",
      "SDET (Test Automation)",
      "Security Engineer",
      "Performance Tester",
    ],
  },
  {
    title: "Architecture & Design",
    icon: Layers,
    accent: "#A3C98A",
    description:
      "Architects and designers shaping system structure, technical standards, and user experience — from solution and enterprise architects to product designers and UX researchers.",
    roles: [
      "Solution Architect",
      "Enterprise Architect",
      "Product / UX Designer",
      "UX Researcher",
    ],
  },
  {
    title: "Engineering Leadership",
    icon: Briefcase,
    accent: "#C47EB5",
    description:
      "Technical leaders driving engineering delivery, team growth, and technology strategy — from tech leads and engineering managers through to Director, VP Engineering, and CTO.",
    roles: [
      "Engineering Manager",
      "Tech Lead / Team Lead",
      "Director of Engineering",
      "VP of Engineering",
    ],
  },
];

const roleRows = [
  {
    number: "01",
    category: "Software Engineering",
    accent: "#C8A96B",
    tagline: "Frontend, backend, full-stack, mobile, and embedded systems",
    summary:
      "Software engineers are the core of every product team. Frontend developers own the user-facing layer — performance, accessibility, and component architecture. Backend engineers own API design, business logic, and data persistence. Full-stack engineers span both, especially valuable in smaller teams. Mobile engineers build iOS and Android experiences, while embedded developers work closer to hardware in IoT and systems contexts.",
    items: [
      {
        name: "Frontend Developer",
        bullets: [
          "UI component architecture & React/Vue/Angular",
          "Performance & accessibility",
          "State management & API integration",
          "Design system implementation",
        ],
      },
      {
        name: "Backend Developer",
        bullets: [
          "API design & business logic",
          "Database architecture & ORM",
          "Authentication, security & scalability",
          "Microservices & event-driven systems",
        ],
      },
      {
        name: "Full-Stack Developer",
        bullets: [
          "End-to-end feature ownership",
          "Frontend + backend across the stack",
          "High-leverage in growth-stage teams",
          "Rapid prototyping & product velocity",
        ],
      },
      {
        name: "Mobile Developer",
        bullets: [
          "iOS (Swift) & Android (Kotlin) native",
          "React Native & cross-platform",
          "App store deployment & CI/CD",
          "Offline-first & device optimisation",
        ],
      },
    ],
  },
  {
    number: "02",
    category: "DevOps, Platform & SRE",
    accent: "#8FA3FF",
    tagline: "Infrastructure, reliability, and internal developer platforms",
    summary:
      "DevOps and platform engineers are the operational foundation of modern software delivery. DevOps engineers own CI/CD pipelines, cloud provisioning, and automation. Site Reliability Engineers apply software engineering to operations — owning SLOs, incident response, and reliability at scale. Platform engineers build the internal developer experience that multiplies the entire engineering organisation.",
    items: [
      {
        name: "DevOps Engineer",
        bullets: [
          "CI/CD pipeline ownership",
          "Cloud provisioning & IaC (Terraform)",
          "Containerisation (Docker/Kubernetes)",
          "Monitoring, alerting & observability",
        ],
      },
      {
        name: "Site Reliability Engineer",
        bullets: [
          "SLO & error budget management",
          "Incident response & post-mortems",
          "Reliability automation & toil reduction",
          "Capacity planning & scalability",
        ],
      },
      {
        name: "Platform Engineer",
        bullets: [
          "Internal developer platform (IDP) ownership",
          "Shared tooling & deployment abstractions",
          "Developer experience & self-service infra",
          "Golden paths & engineering standards",
        ],
      },
      {
        name: "Cloud Engineer",
        bullets: [
          "AWS / Azure / GCP infrastructure",
          "Cloud cost optimisation",
          "Security & networking in cloud",
          "Migration & modernisation programs",
        ],
      },
    ],
  },
  {
    number: "03",
    category: "Data & AI Engineering",
    accent: "#7EB8C9",
    tagline: "Pipelines, ML systems, and AI-native product engineering",
    summary:
      "Data and AI engineers build the infrastructure that powers analytics, machine learning, and AI-native products. Data engineers design and maintain the pipelines, warehouses, and transformation layers that make data usable. ML engineers deploy and scale models into production. AI engineers build LLM-powered features and agentic systems — one of the fastest growing and most sought-after specialisms in 2026.",
    items: [
      {
        name: "Data Engineer",
        bullets: [
          "Data pipeline design & ETL/ELT",
          "Data warehouse & lakehouse architecture",
          "dbt, Spark, Airflow & orchestration",
          "Data quality & governance tooling",
        ],
      },
      {
        name: "Machine Learning Engineer",
        bullets: [
          "ML model deployment & serving",
          "MLOps & training infrastructure",
          "Feature engineering & pipelines",
          "Experimentation & A/B infrastructure",
        ],
      },
      {
        name: "AI Engineer",
        bullets: [
          "LLM integration & prompt engineering",
          "RAG systems & vector databases",
          "Agentic workflow design",
          "AI evaluation & human-in-the-loop",
        ],
      },
      {
        name: "Data Scientist",
        bullets: [
          "Statistical modelling & analysis",
          "Predictive models & forecasting",
          "Experiment design & causal inference",
          "Product & business insight generation",
        ],
      },
    ],
  },
  {
    number: "04",
    category: "Quality & Security",
    accent: "#E07A5F",
    tagline: "Testing, automation, and software security across the SDLC",
    summary:
      "Quality and security engineers protect software reliability and trust. QA engineers design test strategies and own the test lifecycle. SDETs build automation frameworks that keep quality sustainable at velocity. Security engineers shift security left — embedding application security, penetration testing, and cloud security into the engineering process rather than treating it as a separate phase.",
    items: [
      {
        name: "QA Engineer",
        bullets: [
          "Test strategy & case design",
          "Manual & exploratory testing",
          "Bug triage & regression management",
          "Release quality ownership",
        ],
      },
      {
        name: "SDET / Automation Engineer",
        bullets: [
          "Test framework design & build",
          "E2E, integration & API automation",
          "CI/CD quality gates",
          "Performance & load testing",
        ],
      },
      {
        name: "Security Engineer",
        bullets: [
          "Application & API security",
          "Penetration testing & vulnerability management",
          "Cloud security architecture",
          "Secure SDLC & threat modelling",
        ],
      },
      {
        name: "Performance Tester",
        bullets: [
          "Load & stress testing",
          "Bottleneck identification",
          "k6, JMeter & Gatling tooling",
          "Scalability validation",
        ],
      },
    ],
  },
  {
    number: "05",
    category: "Architecture & Design",
    accent: "#A3C98A",
    tagline: "System design, technical standards, and user experience",
    summary:
      "Architects and designers shape the structural and experiential quality of software products. Solution architects translate business requirements into technical designs. Enterprise architects govern the broader technology landscape and integration strategy. Product designers and UX researchers form the essential creative and evidence layer that ensures engineering effort maps to genuine user value.",
    items: [
      {
        name: "Solution Architect",
        bullets: [
          "End-to-end technical design",
          "Integration & API architecture",
          "Customer-facing presales architecture",
          "Technology evaluation & POCs",
        ],
      },
      {
        name: "Enterprise Architect",
        bullets: [
          "Technology landscape governance",
          "Legacy modernisation strategy",
          "Standards, patterns & guardrails",
          "Cross-system integration design",
        ],
      },
      {
        name: "Product / UX Designer",
        bullets: [
          "UX flows & interaction design",
          "Design systems & component libraries",
          "Figma prototyping & handoff",
          "Accessibility & inclusive design",
        ],
      },
      {
        name: "UX Researcher",
        bullets: [
          "Customer interviews & usability testing",
          "Research synthesis & insight generation",
          "JTBD & jobs-based discovery",
          "Evidence-based product decisions",
        ],
      },
    ],
  },
  {
    number: "06",
    category: "Engineering Leadership",
    accent: "#C47EB5",
    tagline: "Technical direction, team building, and delivery ownership",
    summary:
      "Engineering leaders drive delivery, team health, and technical excellence across the organisation. Tech leads balance hands-on coding with coordination and mentorship. Engineering managers own team performance, headcount planning, and delivery. Directors and VP Engineering are accountable for multi-team organisations, engineering culture, and the technical strategy that underpins business outcomes.",
    items: [
      {
        name: "Tech Lead / Team Lead",
        bullets: [
          "Technical direction & code quality",
          "Senior IC with coordination scope",
          "Mentorship & code review culture",
          "Delivery & architecture decisions",
        ],
      },
      {
        name: "Engineering Manager",
        bullets: [
          "Team performance & headcount",
          "Delivery velocity & quality",
          "Hiring & career development",
          "PM/EM/design partnership",
        ],
      },
      {
        name: "Director of Engineering",
        bullets: [
          "Multi-team programme leadership",
          "Senior hiring & org design",
          "Technical debt & platform investment",
          "Executive stakeholder management",
        ],
      },
      {
        name: "VP of Engineering",
        bullets: [
          "Engineering organisation ownership",
          "Technology strategy & roadmap",
          "Hypergrowth team scaling",
          "Board & investor reporting",
        ],
      },
    ],
  },
];

const careerPaths = [
  {
    label: "IC Track",
    accent: "#C8A96B",
    steps: [
      "Junior Engineer",
      "Mid-Level Engineer",
      "Senior Engineer",
      "Staff Engineer",
      "Principal Engineer",
    ],
  },
  {
    label: "Management",
    accent: "#C47EB5",
    steps: [
      "Tech Lead",
      "Engineering Manager",
      "Sr. Eng Manager",
      "Director",
      "VP Engineering",
      "CTO",
    ],
  },
  {
    label: "DevOps / SRE",
    accent: "#8FA3FF",
    steps: [
      "Cloud Engineer",
      "DevOps Engineer",
      "SRE",
      "Platform Lead",
      "VP Infrastructure",
    ],
  },
  {
    label: "Data & AI",
    accent: "#7EB8C9",
    steps: [
      "Data Analyst",
      "Data Engineer",
      "Staff Data Engineer",
      "Head of Data Eng",
    ],
  },
  {
    label: "Security",
    accent: "#E07A5F",
    steps: [
      "Security Analyst",
      "Security Engineer",
      "Principal Architect",
      "Head of Security",
      "CISO",
    ],
  },
];

const roleFit = [
  {
    type: "Code-obsessed problem solver",
    roles: "Backend Engineer · Full-Stack Engineer",
    accent: "#C8A96B",
  },
  {
    type: "User-first interface thinker",
    roles: "Frontend Engineer · Product Designer",
    accent: "#A3C98A",
  },
  {
    type: "Systems & reliability mindset",
    roles: "SRE · Platform Engineer · DevOps",
    accent: "#8FA3FF",
  },
  {
    type: "AI / ML practitioner",
    roles: "ML Engineer · AI Engineer",
    accent: "#7EB8C9",
  },
  {
    type: "Data pipeline builder",
    roles: "Data Engineer · Analytics Engineer",
    accent: "#7EB8C9",
  },
  {
    type: "Quality-driven methodologist",
    roles: "QA Engineer · SDET",
    accent: "#E07A5F",
  },
  {
    type: "Security & risk specialist",
    roles: "Security Engineer · AppSec",
    accent: "#E07A5F",
  },
  {
    type: "Team leader & technical mentor",
    roles: "Engineering Manager · Tech Lead",
    accent: "#C47EB5",
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

const EngineeringExpertise = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-black min-h-screen text-white overflow-hidden">
      {/* ── HERO ── */}
      <section className="relative border-b border-white/[0.06]">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=2000&auto=format&fit=crop"
            alt="engineering and development"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-black/70" />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 pt-36 pb-28">
          <div className="flex items-center gap-3 mb-6">
            <span className="w-8 h-px bg-[#C8A96B]" />
            <span className="text-[#C8A96B] text-xs tracking-[0.3em] uppercase font-medium">
              Engineering & Development Recruitment
            </span>
          </div>

          <h1 className="text-[3.5rem] md:text-[6rem] leading-[0.95] font-bold tracking-tight max-w-5xl">
            Engineering the Teams
            <span className="block text-white/35">Behind Great Software</span>
          </h1>

          <p className="mt-8 max-w-2xl text-white/60 text-lg leading-relaxed">
            Engineering recruitment spans every discipline — frontend, backend,
            full-stack, mobile, DevOps, data, AI, security, and architecture —
            through to the technical leaders who build the teams and culture
            that delivers world-class software at scale.
          </p>

          <div className="flex flex-wrap gap-4 mt-10">
            <button
              onClick={() => navigate("/contact")}
              className="group inline-flex items-center gap-3 bg-white text-black px-8 py-4 text-sm font-bold tracking-widest uppercase transition-all duration-300 hover:bg-white/90"
            >
              Find Engineering Talent
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
              ["IC & Leadership", "Full Spectrum"],
              ["Frontend to AI", "All Disciplines"],
              ["UK & US", "Hiring Coverage"],
              ["SaaS & AI-Native", "Specialisation"],
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
              Engineering Org Architecture
            </span>
            <span className="w-8 h-px bg-white/20" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight leading-tight mb-8">
            Beyond the Job Title
          </h2>
          <p className="text-white/55 text-lg leading-relaxed">
            Modern engineering organisations span a far wider range of
            disciplines than traditional software development. From platform
            reliability and AI engineering to quality automation, security, and
            UX design — today's product teams require deep specialist hiring
            alongside generalist engineers who can operate across the full
            delivery lifecycle.
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
              Every Engineering Role,{" "}
              <span className="text-white/35">Explained</span>
            </h2>
            <p className="text-white/45 text-sm leading-relaxed max-w-sm md:text-right">
              Explore each engineering discipline in detail — what the roles
              own, how they interact, and where they sit in a modern software
              delivery organisation.
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
            Common Engineering Career Paths
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
                Which Engineering Role{" "}
                <span className="text-white/35">Fits You?</span>
              </h2>
              <p className="text-white/50 text-base leading-relaxed max-w-sm">
                Engineering careers span radically different profiles — from
                deep IC specialists to people-first technical leaders. The best
                placements match natural strengths, technical depth, and career
                goals with the specific discipline and team stage the
                organisation needs.
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
                Most In-Demand Engineering Roles
              </h2>
              <p className="text-white/55 text-lg leading-relaxed">
                Demand continues to surge across AI-native SaaS, fintech,
                healthtech, and cloud platform businesses — with AI, platform,
                and security engineering roles among the most contested in the
                global talent market.
              </p>
            </div>
            <div className="space-y-4">
              {[
                "Full-Stack Engineers",
                "AI / ML Engineers",
                "DevOps & SRE Engineers",
                "Platform Engineers",
                "Security Engineers",
                "Data Engineers",
              ].map((role) => (
                <div
                  key={role}
                  className="flex items-center justify-between border border-white/[0.07] bg-[#0D0D0D] px-6 py-5"
                >
                  <div className="flex items-center gap-4">
                    <Cpu size={18} className="text-[#C8A96B]" />
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
            Build Your Engineering Team
          </h2>
          <p className="text-white/55 text-lg leading-relaxed mb-10">
            We help enterprise software, AI, and technology businesses hire
            exceptional engineering talent — from individual contributors
            through to senior technical leadership across global markets.
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

export default EngineeringExpertise;