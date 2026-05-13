import { useEffect, useRef, useState } from 'react';
import { ArrowRight, Crown, Briefcase, Users, Wrench, CheckCircle2, FileText, Headphones, Target } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const stats = [
  { value: 'CSO', label: 'Executive Level Hiring' },
  { value: 'Global', label: 'Delivery Capability' },
  { value: 'ERP & SaaS', label: 'Specialisms' },
  { value: 'End-to-End', label: 'Services Lifecycle' },
];

const roleCategories = [
  {
    icon: Crown,
    accent: '#FBBF24',
    title: 'Executive Leadership & Practice Management',
    description:
      'At the most senior level, we support the appointment of leaders responsible for building and scaling professional services organisations, managing P&L and ensuring alignment between product, sales and customer outcomes.',
    roles: [
      'Chief Services Officer',
      'Chief Delivery Officer',
      'Chief Consulting Officer',
      'Chief Transformation Officer',
      'Managing Director – Professional Services',
      'VP Professional Services / VP Consulting / VP Delivery',
      'Partner (Technology Consulting / Digital Transformation)',
    ],
  },
  {
    icon: Target,
    accent: '#4F9CF9',
    title: 'Programme, Delivery & Transformation Leadership',
    description:
      'At the core of professional services is delivery — ensuring that complex technology programmes are executed successfully across enterprise clients, significant budgets and long timelines.',
    roles: [
      'Programme Directors',
      'Programme Managers',
      'Transformation Directors',
      'Delivery Managers',
      'Engagement Directors',
      'Client Delivery Leads',
    ],
    tags: ['Digital Transformation', 'Cloud Migration', 'ERP/CRM', 'Data & AI'],
  },
  {
    icon: Briefcase,
    accent: '#34D399',
    title: 'Consulting & Solution Delivery',
    description:
      'Consultants sit at the heart of professional services, translating business requirements into technical solutions and guiding clients through change. They are often domain specialists combining industry knowledge with platform expertise.',
    roles: [
      'Principal Consultants',
      'Senior Consultants',
      'Technology Consultants',
      'Implementation Consultants',
      'Solutions Consultants',
      'Functional Consultants (Salesforce, SAP, Workday)',
    ],
    tags: ['Salesforce', 'SAP', 'Workday', 'ServiceNow'],
  },
  {
    icon: Wrench,
    accent: '#A78BFA',
    title: 'Solutions Engineering & Pre-Sales',
    description:
      'A critical area within professional services — where technical expertise supports the sales process. These professionals work alongside sales teams to understand client requirements, design solutions and demonstrate value.',
    roles: [
      'Solutions Engineers',
      'Pre-Sales Consultants',
      'Sales Engineers',
      'Technical Solution Architects',
    ],
    highlight: 'Requires a blend of technical depth, commercial awareness and strong communication skills.',
  },
  {
    icon: CheckCircle2,
    accent: '#FBBF24',
    title: 'Implementation & Customer Success Delivery',
    description:
      'Once a deal is signed, implementation and customer-facing delivery teams take ownership of ensuring successful deployment and adoption — critical in SaaS and subscription-based businesses.',
    roles: [
      'Implementation Managers',
      'Implementation Consultants',
      'Customer Success Managers (technical / delivery-focused)',
      'Onboarding Specialists',
      'Adoption and Training Consultants',
    ],
  },
  {
    icon: FileText,
    accent: '#34D399',
    title: 'Project Management, PMO & Business Analysis',
    description:
      'Structured delivery environments rely heavily on project governance and analysis. These individuals ensure programmes are delivered on time, within scope and aligned to business objectives.',
    roles: [
      'Project Managers',
      'PMO Managers and Analysts',
      'Business Analysts',
      'Technical Business Analysts',
      'Change and Transformation Managers',
    ],
  },
  {
    icon: Headphones,
    accent: '#4F9CF9',
    title: 'Service Delivery & Managed Services',
    description:
      'Many organisations operate ongoing service models, providing continuous support and optimisation beyond initial implementation. These roles maintain service quality and build long-term client relationships.',
    roles: [
      'Service Delivery Managers',
      'Managed Services Leads',
      'Support Managers',
      'Client Services Managers',
    ],
  },
  {
    icon: Users,
    accent: '#F87171',
    title: 'Forward Deployed & Embedded Services Talent',
    description:
      'An increasingly important area — individuals who work directly within client environments to deliver highly customised or complex solutions. They operate at the intersection of consulting, engineering and customer success.',
    roles: [
      'Forward Deployed Consultants',
      'Embedded Engineers / Consultants',
      'Field Engineers (technical delivery-focused)',
      'Customer Engineers',
    ],
    highlight: 'Particularly valuable in AI/data platforms, deep tech and enterprise SaaS with complex integrations.',
  },
];

const techFocus = [
  { category: 'Cloud Platforms', items: ['AWS', 'Azure', 'GCP'] },
  { category: 'Enterprise SaaS', items: ['Salesforce', 'SAP', 'Workday', 'ServiceNow'] },
  { category: 'Data & Analytics', items: ['Snowflake', 'BigQuery', 'Tableau', 'dbt'] },
  { category: 'AI & ML', items: ['OpenAI', 'Azure AI', 'ML Platforms', 'LLM Ops'] },
  { category: 'Integration', items: ['MuleSoft', 'Boomi', 'Kafka', 'REST/GraphQL APIs'] },
];

const domains = [
  'Financial Services',
  'Healthcare & Life Sciences',
  'Retail & eCommerce',
  'Public Sector',
  'Telecommunications',
  'Manufacturing & Supply Chain',
];

function useScrollReveal(delay = 0, threshold = 0.08) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.opacity = '0';
    el.style.transform = 'translateY(24px)';
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
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [delay, threshold]);
  return ref;
}

function RoleCard({ icon: Icon, accent, title, description, roles, tags, highlight, delay }) {
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
        <h3 className="text-white font-bold text-lg tracking-tight leading-tight">{title}</h3>
      </div>

      <p className="text-white/45 text-sm leading-relaxed">{description}</p>

      <div className="border-t border-white/[0.06] pt-4">
        <p className="text-white/50 text-xs font-medium tracking-widest uppercase mb-3">Key Roles</p>
        <ul className="flex flex-col gap-1.5">
          {visibleRoles.map((role) => (
            <li key={role} className="flex items-center gap-2 text-white/60 text-sm">
              <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: accent }} />
              {role}
            </li>
          ))}
        </ul>
        {roles.length > 4 && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="mt-3 text-xs tracking-widest uppercase transition-colors duration-200"
            style={{ color: `${accent}99` }}
            onMouseEnter={(e) => (e.currentTarget.style.color = accent)}
            onMouseLeave={(e) => (e.currentTarget.style.color = `${accent}99`)}
          >
            {expanded ? 'Show Less' : `+${roles.length - 4} More Roles`}
          </button>
        )}
      </div>

      {tags && (
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="text-xs px-2.5 py-0.5 font-medium"
              style={{ backgroundColor: `${accent}15`, color: accent }}
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {highlight && (
        <p className="text-xs leading-relaxed italic" style={{ color: `${accent}aa` }}>
          {highlight}
        </p>
      )}
    </div>
  );
}

export default function ProfessionalServicesPage() {
  const navigate = useNavigate();
  const introRef = useScrollReveal(0, 0.15);
  const statsRef = useScrollReveal(0, 0.1);
  const techRef = useScrollReveal(0, 0.1);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-black min-h-screen">

      {/* Hero banner */}
      <div className="pt-32 pb-16 px-6 relative overflow-hidden bg-black">
        <div
          className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full blur-[140px] pointer-events-none"
          style={{ backgroundColor: 'rgba(74,32,0,0.8)' }}
        />
        <div
          className="absolute bottom-0 -left-20 w-[400px] h-[400px] rounded-full blur-[120px] pointer-events-none"
          style={{ backgroundColor: 'rgba(58,24,0,0.5)' }}
        />
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)',
            backgroundSize: '80px 80px',
          }}
        />
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black to-transparent pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex items-center gap-3 mb-5">
            <span className="w-8 h-px" style={{ backgroundColor: '#FBBF24' }} />
            <span className="text-xs font-semibold tracking-[0.3em] uppercase" style={{ color: '#FBBF24' }}>
              Specialist Practice
            </span>
          </div>

          <h1 className="text-[3.25rem] font-bold text-white tracking-tight mb-4 max-w-3xl leading-tight">
            Professional{' '}
            <span
              className="text-transparent bg-clip-text"
              style={{ backgroundImage: 'linear-gradient(120deg, #ffffff 30%, #FBBF24)' }}
            >
              Services
            </span>
          </h1>

          <p className="text-white/50 text-base md:text-lg max-w-2xl leading-relaxed mb-8">
            A specialist professional services recruitment business focused on the individuals who ensure technology
            delivers real-world value — from pre-sales solution design through to implementation, transformation and
            long-term customer success.
          </p>

          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => {
                navigate('/');
                setTimeout(() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }), 300);
              }}
              className="group flex items-center gap-3 px-8 py-4 text-sm font-bold tracking-widest uppercase transition-all duration-300 hover:opacity-90"
              style={{ backgroundColor: '#FBBF24', color: '#000' }}
            >
              Hire Services Talent
              <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
            </button>
            <button
              onClick={() => {
                navigate('/');
                setTimeout(() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }), 300);
              }}
              className="flex items-center gap-2 border border-white/20 text-white px-8 py-4 text-sm font-medium tracking-widest uppercase transition-all duration-300 hover:border-white/50 hover:bg-white/5"
            >
              Submit a Brief
            </button>
          </div>
        </div>
      </div>

      {/* Overview */}
      <div className="max-w-4xl mx-auto px-6 py-12 md:py-16 text-center">
        <div ref={introRef}>
          <div className="flex items-center justify-center gap-3 mb-5">
            <span className="w-8 h-px bg-white/20" />
            <span className="text-white/60 text-xs font-medium tracking-[0.3em] uppercase">Our Focus</span>
            <span className="w-8 h-px bg-white/20" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-6">
            The Full Services Lifecycle
          </h2>
          <p className="text-white/45 text-base md:text-lg leading-relaxed max-w-3xl mx-auto">
            We operate across the full services lifecycle — from pre-sales solution design through to implementation,
            transformation, delivery and long-term customer success. Our clients range from global consultancies and
            systems integrators to SaaS vendors and high-growth technology companies.
          </p>
          <p className="text-white/60 text-base leading-relaxed max-w-3xl mx-auto mt-5">
            Success in this space requires more than functional hiring expertise. It demands a deep understanding of
            how technology is deployed, how clients operate, and how delivery teams drive measurable business outcomes.
          </p>
        </div>
      </div>

      {/* Stats banner */}
      <div
        ref={statsRef}
        className="border-t border-white/[0.05] py-14 md:py-18 px-6"
        style={{ background: 'linear-gradient(135deg, #1a0d00 0%, #0d1a3a 50%, #1a0d00 100%)' }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {stats.map((s) => (
              <div key={s.label}>
                <div className="text-3xl md:text-4xl font-bold mb-2 tracking-tight" style={{ color: '#FBBF24' }}>
                  {s.value}
                </div>
                <div className="text-white/45 text-sm font-medium tracking-wide">{s.label}</div>
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
              <span className="text-white/60 text-xs font-medium tracking-[0.3em] uppercase">Specialisations</span>
              <span className="w-8 h-px bg-white/20" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-3">
              Professional Services Role Coverage
            </h2>
            <p className="text-white/40 text-base max-w-md mx-auto">
              From executive services leadership to forward deployed consultants
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {roleCategories.map((cat, i) => (
              <RoleCard key={cat.title} {...cat} delay={i * 80} />
            ))}
          </div>
        </div>
      </div>

      {/* Technology & Domain Focus */}
      <div className="py-12 md:py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div ref={techRef}>
            <div className="text-center mb-14">
              <div className="flex items-center justify-center gap-3 mb-5">
                <span className="w-8 h-px bg-white/20" />
                <span className="text-white/60 text-xs font-medium tracking-[0.3em] uppercase">
                  Technology & Domain
                </span>
                <span className="w-8 h-px bg-white/20" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-3">
                Our Technology Focus
              </h2>
              <p className="text-white/40 text-base max-w-lg mx-auto">
                Deep understanding of the technology stacks and industry verticals our clients operate in
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
                    style={{ color: '#FBBF24' }}
                  >
                    {stack.category}
                  </p>
                  <ul className="flex flex-col gap-2">
                    {stack.items.map((item) => (
                      <li key={item} className="text-white/55 text-sm flex items-center gap-2">
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
                Industry Domain Expertise
              </p>
              <div className="flex flex-wrap gap-3">
                {domains.map((domain) => (
                  <span
                    key={domain}
                    className="text-xs px-3 py-1.5 font-medium text-white/55"
                    style={{ backgroundColor: '#FBBF2415', border: '1px solid #FBBF2420' }}
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
      <div className="border-t border-white/[0.05] py-20 px-6 text-center relative overflow-hidden">
        <div
          className="absolute -top-40 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full blur-[140px] pointer-events-none opacity-20"
          style={{ backgroundColor: 'rgba(74,32,0,0.9)' }}
        />
        <div className="max-w-xl mx-auto relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-4">
            Build Your Services Capability
          </h2>
          <p className="text-white/45 text-base leading-relaxed mb-10">
            Whether you're scaling a delivery organisation or building a new services practice, let's design
            the right hiring approach for your goals.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => {
                navigate('/');
                setTimeout(() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }), 300);
              }}
              className="group inline-flex items-center gap-3 bg-white text-black px-8 py-4 text-sm font-bold tracking-widest uppercase transition-all duration-300 hover:bg-white/90 w-full sm:w-auto justify-center"
            >
              Start a Search
              <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-1" />
            </button>
            <button
              onClick={() => navigate('/engagement-models')}
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
