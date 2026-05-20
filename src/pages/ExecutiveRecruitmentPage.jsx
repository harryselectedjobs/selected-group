import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  Crown,
  Shield,
  Brain,
  Database,
  Briefcase,
  Users,
  Target,
  Cloud,
  LineChart,
  Cpu,
  CheckCircle2,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import VideoPageHero from "../components/VideoPageHero";

const stats = [
  { value: "C-Suite", label: "Executive Search" },
  { value: "Global", label: "Technology Markets" },
  { value: "AI & SaaS", label: "Core Specialisms" },
  { value: "Retained", label: "Search Delivery" },
];

const roleCategories = [
  {
    icon: Crown,
    accent: "#FBBF24",
    title: "C-Suite Technology Leadership",
    description:
      "Executive leadership hiring across product, engineering, AI, cloud, cybersecurity and enterprise transformation functions.",
    roles: [
      "Chief Technology Officer (CTO)",
      "Chief Information Officer (CIO)",
      "Chief Information Security Officer (CISO)",
      "Chief Product Officer (CPO)",
      "Chief Data Officer (CDO)",
      "Chief AI Officer",
    ],
    tags: ["SaaS", "AI", "FinTech", "Enterprise Software"],
  },

  {
    icon: Cpu,
    accent: "#A78BFA",
    title: "Engineering Leadership",
    description:
      "Leadership hiring for engineering organisations responsible for platform scalability, architecture and product delivery.",
    roles: [
      "VP Engineering",
      "Head of Engineering",
      "Engineering Director",
      "Platform Engineering Leader",
      "Site Reliability Engineering Leadership",
    ],
    highlight:
      "Highly demanded across scale-ups, enterprise SaaS and AI-native businesses.",
  },

  {
    icon: Briefcase,
    accent: "#34D399",
    title: "Product Leadership",
    description:
      "Strategic product hiring focused on customer value creation, monetisation and product-market fit.",
    roles: [
      "VP Product",
      "Head of Product",
      "Product Director",
      "AI Product Leadership",
      "Marketplace Product Leaders",
    ],
    tags: ["B2B SaaS", "AI Products", "Marketplace", "Data Platforms"],
  },

  {
    icon: Database,
    accent: "#4F9CF9",
    title: "Data & AI Leadership",
    description:
      "Executive search for AI, analytics and data transformation leadership teams driving enterprise intelligence initiatives.",
    roles: [
      "VP Data",
      "Head of Data",
      "Head of AI / ML",
      "Director of Data Science",
      "AI Transformation Leaders",
    ],
    tags: ["Machine Learning", "LLM Ops", "AI Governance", "Analytics"],
  },

  {
    icon: Shield,
    accent: "#F87171",
    title: "Cybersecurity Leadership",
    description:
      "Security-focused executive recruitment supporting enterprise governance, cloud security and risk management.",
    roles: [
      "Chief Information Security Officer",
      "VP Security",
      "Head of Cybersecurity",
      "Director of Security Engineering",
      "Cloud Security Leadership",
    ],
    highlight:
      "Particularly critical across regulated industries and enterprise cloud environments.",
  },

  {
    icon: Cloud,
    accent: "#38BDF8",
    title: "Infrastructure & Cloud Leadership",
    description:
      "Executive search focused on cloud operations, infrastructure scalability and platform engineering transformation.",
    roles: [
      "VP Infrastructure",
      "Head of Platform Engineering",
      "Cloud Operations Leadership",
      "DevOps Transformation Leaders",
      "SRE Leadership",
    ],
  },

  {
    icon: LineChart,
    accent: "#FBBF24",
    title: "Commercial Technology Leadership",
    description:
      "Commercially aligned executive hiring across enterprise SaaS, digital transformation and technical go-to-market leadership.",
    roles: [
      "Chief Revenue Officer",
      "Chief Digital Officer",
      "VP Solutions / Pre-Sales",
      "Enterprise Sales Leadership",
      "Revenue Operations Leaders",
    ],
    tags: ["Enterprise SaaS", "Digital Transformation", "Revenue Growth"],
  },

  {
    icon: Users,
    accent: "#34D399",
    title: "Transformation & Delivery Leadership",
    description:
      "Senior transformation executives responsible for enterprise modernisation, operational scaling and digital programmes.",
    roles: [
      "Transformation Directors",
      "Programme Directors",
      "Delivery Executives",
      "Enterprise Architecture Leaders",
      "Digital Transformation Leaders",
    ],
    highlight:
      "Strong demand across PE-backed, global enterprise and consulting environments.",
  },
];

const techFocus = [
  { category: "AI & Machine Learning", items: ["GenAI", "LLM Ops", "AI Governance"] },

  { category: "Enterprise SaaS", items: ["Salesforce", "Workday", "SAP", "ServiceNow"] },

  { category: "Cloud Infrastructure", items: ["AWS", "Azure", "GCP"] },

  { category: "Cybersecurity", items: ["Zero Trust", "Cloud Security", "SOC2"] },

  { category: "Data Platforms", items: ["Snowflake", "Databricks", "dbt"] },
];

const domains = [
  "Enterprise SaaS",
  "FinTech",
  "HealthTech",
  "Cybersecurity",
  "AI & DeepTech",
  "Cloud Infrastructure",
  "Retail & eCommerce",
  "Financial Services",
];

function useScrollReveal(delay = 0, threshold = 0.08) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;

    if (!el) return;

    el.style.opacity = "0";
    el.style.transform = "translateY(24px)";

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            el.style.transition =
              "opacity 0.7s ease, transform 0.7s ease";

            el.style.opacity = "1";
            el.style.transform = "translateY(0)";
          }, delay);

          observer.disconnect();
        }
      },
      { threshold }
    );

    observer.observe(el);

    return () => observer.disconnect();
  }, [delay, threshold]);

  return ref;
}

function RoleCard({
  icon: Icon,
  accent,
  title,
  description,
  roles,
  tags,
  highlight,
  delay,
}) {
  const ref = useScrollReveal(delay);

  const [expanded, setExpanded] = useState(false);

  const visibleRoles = expanded ? roles : roles.slice(0, 4);

  return (
    <div
      ref={ref}
      className="group bg-[#0d0d0d] border border-white/[0.07] p-7 flex flex-col gap-4 transition-all duration-300 hover:border-white/20 hover:-translate-y-1 relative"
    >
      <div
        className="absolute top-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ backgroundColor: accent }}
      />

      <div className="flex items-center gap-4">
        <div
          className="w-11 h-11 flex items-center justify-center flex-shrink-0"
          style={{ backgroundColor: `${accent}18` }}
        >
          <Icon size={20} style={{ color: accent }} />
        </div>

        <h3 className="text-white font-bold text-lg tracking-tight leading-tight">
          {title}
        </h3>
      </div>

      <p className="text-white/45 text-sm leading-relaxed">
        {description}
      </p>

      <div className="border-t border-white/[0.06] pt-4">
        <p className="text-white/50 text-xs font-medium tracking-widest uppercase mb-3">
          Key Roles
        </p>

        <ul className="flex flex-col gap-1.5">
          {visibleRoles.map((role) => (
            <li
              key={role}
              className="flex items-center gap-2 text-white/60 text-sm"
            >
              <span
                className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                style={{ backgroundColor: accent }}
              />

              {role}
            </li>
          ))}
        </ul>

        {roles.length > 4 && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="mt-3 text-xs tracking-widest uppercase transition-colors duration-200"
            style={{ color: `${accent}99` }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.color = accent)
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.color = `${accent}99`)
            }
          >
            {expanded ? "Show Less" : `+${roles.length - 4} More Roles`}
          </button>
        )}
      </div>

      {tags && (
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="text-xs px-2.5 py-0.5 font-medium"
              style={{
                backgroundColor: `${accent}15`,
                color: accent,
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {highlight && (
        <p
          className="text-xs leading-relaxed italic"
          style={{ color: `${accent}aa` }}
        >
          {highlight}
        </p>
      )}
    </div>
  );
}

export default function ExecutiveRecruitmentPage() {
  const navigate = useNavigate();

  const introRef = useScrollReveal(0, 0.15);

  const statsRef = useScrollReveal(0, 0.1);

  const techRef = useScrollReveal(0, 0.1);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-black min-h-screen">

      <VideoPageHero
        videoId="zwUsFN__jtE"
        eyebrow="Executive Search Practice"
        title="Executive"
        titleAccent="Recruitment"
        description="Specialist technology executive search focused on hiring senior leadership talent across engineering, product, AI, cybersecurity, cloud infrastructure and enterprise transformation."
        stats={stats}
        actions={[
          {
            label: "Start Executive Search",
            primary: true,
            onClick: () => {
              navigate("/contact");
            },
          }

          
        ]}
      />

      {/* Overview */}
      <div className="max-w-4xl mx-auto px-6 py-12 md:py-16 text-center">
        <div ref={introRef}>

          <div className="flex items-center justify-center gap-3 mb-5">
            <span className="w-8 h-px bg-white/20" />

            <span className="text-white/60 text-xs font-medium tracking-[0.3em] uppercase">
              Executive Search
            </span>

            <span className="w-8 h-px bg-white/20" />
          </div>

          <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-6">
            Leadership Hiring for Modern Technology Businesses
          </h2>

          <p className="text-white/45 text-base md:text-lg leading-relaxed max-w-3xl mx-auto">
            Technology executive recruitment focuses on identifying leaders capable
            of scaling product, engineering, AI, cloud, cybersecurity and digital
            transformation functions within complex global organisations.
          </p>

          <p className="text-white/60 text-base leading-relaxed max-w-3xl mx-auto mt-5">
            We partner with SaaS vendors, AI-native businesses, enterprise
            technology companies, PE-backed organisations and high-growth startups
            to secure transformational leadership talent globally.
          </p>

        </div>
      </div>

      {/* Stats */}
      <div
        ref={statsRef}
        className="border-t border-b border-white/[0.05] py-14 md:py-18 px-6 bg-[#050505]"
      >
        <div className="max-w-7xl mx-auto">

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {stats.map((s) => (
              <div key={s.label}>
                <div className="text-3xl md:text-4xl font-bold mb-2 tracking-tight text-white">
                  {s.value}
                </div>

                <div className="text-white/45 text-sm font-medium tracking-wide">
                  {s.label}
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* Role Categories */}
      <div className="border-t border-white/[0.05] bg-[#030303] py-12 md:py-16 px-6">
        <div className="max-w-7xl mx-auto">

          <div className="text-center mb-14">

            <div className="flex items-center justify-center gap-3 mb-5">
              <span className="w-8 h-px bg-white/20" />

              <span className="text-white/60 text-xs font-medium tracking-[0.3em] uppercase">
                Leadership Coverage
              </span>

              <span className="w-8 h-px bg-white/20" />
            </div>

            <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-3">
              Executive Technology Hiring
            </h2>

            <p className="text-white/40 text-base max-w-md mx-auto">
              From C-suite leadership to operational technology executives
            </p>

          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {roleCategories.map((cat, i) => (
              <RoleCard key={cat.title} {...cat} delay={i * 80} />
            ))}
          </div>

        </div>
      </div>

      {/* Technology Focus */}
      <div className="py-12 md:py-16 px-6">
        <div className="max-w-7xl mx-auto">

          <div ref={techRef}>

            <div className="text-center mb-14">

              <div className="flex items-center justify-center gap-3 mb-5">
                <span className="w-8 h-px bg-white/20" />

                <span className="text-white/60 text-xs font-medium tracking-[0.3em] uppercase">
                  Technology Markets
                </span>

                <span className="w-8 h-px bg-white/20" />
              </div>

              <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-3">
                Core Executive Search Areas
              </h2>

              <p className="text-white/40 text-base max-w-lg mx-auto">
                Technology domains driving the highest executive demand globally
              </p>

            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
              {techFocus.map((stack) => (
                <div
                  key={stack.category}
                  className="bg-[#0d0d0d] border border-white/[0.07] p-6 hover:border-white/15 transition-all duration-300"
                >
                  <p
                    className="text-xs font-bold tracking-widest uppercase mb-4"
                    style={{ color: "#FBBF24" }}
                  >
                    {stack.category}
                  </p>

                  <ul className="flex flex-col gap-2">
                    {stack.items.map((item) => (
                      <li
                        key={item}
                        className="text-white/55 text-sm flex items-center gap-2"
                      >
                        <span className="w-1 h-1 rounded-full bg-white/20 flex-shrink-0" />

                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="bg-[#0d0d0d] border border-white/[0.07] p-8">

              <p className="text-white/60 text-xs font-bold tracking-widest uppercase mb-4">
                Industry Expertise
              </p>

              <div className="flex flex-wrap gap-3">
                {domains.map((domain) => (
                  <span
                    key={domain}
                    className="text-xs px-3 py-1.5 font-medium text-white/55"
                    style={{
                      backgroundColor: "#FBBF2415",
                      border: "1px solid #FBBF2420",
                    }}
                  >
                    {domain}
                  </span>
                ))}
              </div>

            </div>

          </div>

        </div>
      </div>

      {/* CTA */}
      <div className="border-t border-white/[0.05] py-20 px-6 text-center">

        <div className="max-w-xl mx-auto">

          <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-4">
            Build Your Leadership Team
          </h2>

          <p className="text-white/45 text-base leading-relaxed mb-10">
            Whether you're scaling an AI startup, building a SaaS leadership team
            or driving enterprise transformation, we help secure the executive
            talent needed to deliver growth.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">

            <button
              onClick={() => navigate("/contact")}
              className="group inline-flex items-center gap-3 bg-white text-black px-8 py-4 text-sm font-bold tracking-widest uppercase transition-all duration-300 hover:bg-white/90 w-full sm:w-auto justify-center"
            >
              Start a Search

              <ArrowRight
                size={15}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </button>

            <button
              onClick={() => navigate("/engagement-model")}
              className="flex items-center justify-center px-8 py-4 text-sm font-medium tracking-widest uppercase border border-white/20 text-white/70 hover:border-white/50 hover:text-white transition-all duration-300 w-full sm:w-auto"
            >
              View Engagement Models
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}