import { useEffect, useRef, useState } from 'react';
import { ArrowRight, Users, Layers, Code2, Briefcase } from 'lucide-react';

const modules = [
  {
    icon: Users,
    accent: '#4F9CF9',
    number: '01',
    label: 'GTM Talent',
    title: 'Go-To-Market Recruitment Specialists',
    description:
      'We are an enterprise software sales and go-to-market recruitment specialist, placing high-performing sales leaders and new logo acquisition talent across the US and European markets with over 1,000 successful placements.',
    roles: [
      'Chief Revenue Officer (CRO)',
      'VP Sales / VP GTM',
      'Enterprise Account Executives',
      'SDRs & BDRs',
      'Revenue Operations Leaders',
      'Sales Engineers',
    ],
    markets: 'US & European Markets',
  },
  {
    icon: Layers,
    accent: '#A78BFA',
    number: '02',
    label: 'Product Management',
    title: 'Specialist Product Management Recruitment',
    description:
      'Product management sits at the centre of every successful technology business, connecting customer needs, commercial strategy and engineering execution. We cover the full product lifecycle from discovery through to scaling mature organisations.',
    roles: [
      'Chief Product Officer (CPO)',
      'VP Product / Head of Product',
      'Senior & Lead Product Managers',
      'Technical Product Managers',
      'Product Owners & Scrum Specialists',
      'Growth & Data Product Managers',
    ],
    markets: 'SaaS, AI & Enterprise Software',
  },
  {
    icon: Code2,
    accent: '#34D399',
    number: '03',
    label: 'Engineering & Technology',
    title: 'Specialist Engineering Technology Recruitment',
    description:
      'A specialist engineering recruitment business at the heart of modern technology organisations, building the teams responsible for designing, developing, scaling and securing the products that drive innovation and growth.',
    roles: [
      'Chief Technology Officer (CTO)',
      'VP Engineering / Engineering Directors',
      'Frontend, Backend & Full Stack Engineers',
      'Platform, DevOps & Cloud Engineers',
      'Data, AI & ML Engineers',
      'Security & QA Engineers',
    ],
    markets: 'Startups, Scale-ups & Enterprise',
  },
  {
    icon: Briefcase,
    accent: '#FBBF24',
    number: '04',
    label: 'Professional Services',
    title: 'Specialist Professional Services Recruitment',
    description:
      'A specialist professional services recruitment business focused on the individuals who ensure technology delivers real-world value — from pre-sales solution design through to implementation, transformation and long-term customer success.',
    roles: [
      'Chief Services Officer / VP PS',
      'Programme & Delivery Directors',
      'Principal & Senior Consultants',
      'Solutions Engineers & Pre-Sales',
      'Implementation & Customer Success',
      'Business Analysts & PMO Leads',
    ],
    markets: 'Global Consultancies & SaaS Vendors',
  },
];

function useScrollReveal(delay = 0) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.opacity = '0';
    el.style.transform = 'translateY(40px)';

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            el.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
          }, delay);
          observer.disconnect();
        }
      },
      { threshold: 0.08 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);

  return ref;
}

function ModuleCard({ mod, delay }) {
  const ref = useScrollReveal(delay);
  const [expanded, setExpanded] = useState(false);
  const Icon = mod.icon;

  return (
    <div
      ref={ref}
      className="group relative bg-[#0d0d0d] border border-white/[0.07] overflow-hidden transition-all duration-500 hover:border-white/20 hover:-translate-y-1"
    >
      {/* Accent top border */}
      <div
        className="absolute top-0 left-0 right-0 h-[2px]"
        style={{ backgroundColor: mod.accent }}
      />

      {/* Hover glow */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at top right, ${mod.accent}10 0%, transparent 60%)`,
        }}
      />

      <div className="relative p-8">
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div
            className="w-12 h-12 flex items-center justify-center"
            style={{ backgroundColor: `${mod.accent}15` }}
          >
            <Icon size={22} style={{ color: mod.accent }} />
          </div>
          <span className="text-white/15 text-3xl font-bold tracking-tight font-mono">
            {mod.number}
          </span>
        </div>

        {/* Label */}
        <div className="flex items-center gap-2 mb-3">
          <span className="w-4 h-px" style={{ backgroundColor: mod.accent }} />
          <span
            className="text-xs font-semibold tracking-[0.25em] uppercase"
            style={{ color: mod.accent }}
          >
            {mod.label}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-white font-bold text-xl leading-tight tracking-tight mb-4">
          {mod.title}
        </h3>

        {/* Description */}
        <p className="text-white/50 text-sm leading-relaxed mb-6">
          {mod.description}
        </p>

        {/* Key roles */}
        <div className="mb-6">
          <p className="text-white/30 text-xs tracking-widest uppercase mb-3">Key Roles</p>
          <ul className="space-y-1.5">
            {mod.roles.slice(0, expanded ? mod.roles.length : 3).map((role) => (
              <li key={role} className="flex items-center gap-2 text-white/60 text-sm">
                <span
                  className="w-1 h-1 rounded-full flex-shrink-0"
                  style={{ backgroundColor: mod.accent }}
                />
                {role}
              </li>
            ))}
          </ul>
          {mod.roles.length > 3 && (
            <button
              onClick={() => setExpanded(!expanded)}
              className="mt-3 text-xs tracking-widest uppercase transition-colors duration-200"
              style={{ color: `${mod.accent}99` }}
              onMouseEnter={(e) => (e.currentTarget.style.color = mod.accent)}
              onMouseLeave={(e) => (e.currentTarget.style.color = `${mod.accent}99`)}
            >
              {expanded ? 'Show Less' : `+${mod.roles.length - 3} More Roles`}
            </button>
          )}
        </div>

        {/* Markets tag */}
        <div
          className="inline-block px-3 py-1 text-xs tracking-wide rounded-sm mb-6"
          style={{ backgroundColor: `${mod.accent}15`, color: mod.accent }}
        >
          {mod.markets}
        </div>

        {/* CTA */}
        <button
          onClick={() =>
            document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })
          }
          className="group/btn flex items-center gap-2 text-white/40 hover:text-white transition-colors duration-300"
        >
          <span className="text-xs tracking-widest uppercase font-medium">Get in Touch</span>
          <span
            className="w-6 h-px transition-all duration-300 group-hover/btn:w-10"
            style={{ backgroundColor: mod.accent }}
          />
          <ArrowRight size={13} style={{ color: mod.accent }} />
        </button>
      </div>
    </div>
  );
}

export default function Services() {
  const headerRef = useRef(null);

  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
          el.style.opacity = '1';
          el.style.transform = 'translateY(0)';
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="services" className="bg-black py-28 md:py-36">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <div ref={headerRef} className="max-w-3xl mb-16">
          <div className="flex items-center gap-3 mb-6">
            <span className="w-8 h-px bg-white/30" />
            <span className="text-white/40 text-xs font-medium tracking-[0.3em] uppercase">
              Our Specialist Practices
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight tracking-tight mb-4">
            Four Specialist
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/50">
              Recruitment Practices
            </span>
          </h2>

          <p className="text-white/45 text-base leading-relaxed max-w-2xl">
            We operate four distinct specialist recruitment practices, each with deep market
            knowledge and established networks across the technology ecosystem. From
            executive leadership to highly skilled individual contributors.
          </p>
        </div>

        {/* Module Cards Grid */}
        <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {modules.map((mod, i) => (
            <ModuleCard key={mod.label} mod={mod} delay={i * 100} />
          ))}
        </div>

      </div>
    </section>
  );
}
