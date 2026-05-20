import { useEffect, useRef, useState } from 'react';
import { ArrowRight, Crown, Layers, Settings, BarChart3, Palette, TrendingUp, Database, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import VideoPageHero from '../components/VideoPageHero';

const stats = [
  { value: 'CPO', label: 'Executive Level Hiring' },
  { value: 'Full Stack', label: 'Product Teams' },
  { value: 'SaaS & AI', label: 'Specialisms' },
  { value: 'Global', label: 'Talent Networks' },
];

const roleCategories = [
  {
    icon: Crown,
    accent: '#A78BFA',
    title: 'Executive Product Leadership',
    description:
      'At the most senior level, we support the appointment of product leaders responsible for defining company-wide product strategy and aligning it with business objectives.',
    roles: [
      'Chief Product Officer (CPO)',
      'Chief Digital Officer (CDO)',
      'Chief Experience Officer (CXO)',
      'Chief Product & Technology Officer (CPTO)',
      'VP Product / VP Product Management',
      'VP Product Strategy / VP Growth Product',
      'VP Product Design',
    ],
    highlight: 'We also support board and non-executive appointments where deep product expertise is required.',
  },
  {
    icon: Layers,
    accent: '#4F9CF9',
    title: 'Product Leadership & Strategy',
    description:
      'Below executive level, we work extensively with senior product leaders responsible for translating vision into execution and owning product portfolios.',
    roles: [
      'Product Directors',
      'Heads of Product',
      'Group Product Managers',
      'Principal Product Managers',
      'Lead Product Managers',
      'Heads of Product Strategy',
      'Heads of Product Operations',
      'Heads of Growth Product',
    ],
  },
  {
    icon: Settings,
    accent: '#34D399',
    title: 'Core Product Management',
    description:
      'At the core of the function are product managers responsible for day-to-day product development, delivery and iteration — aligning user needs with business goals.',
    roles: [
      'Product Managers',
      'Senior Product Managers',
      'Technical Product Managers',
      'Platform Product Managers',
      'Digital Product Managers',
      'Growth Product Managers',
      'Data and AI Product Managers',
    ],
    tags: ['B2B SaaS', 'Consumer', 'Enterprise', 'API-first'],
  },
  {
    icon: Zap,
    accent: '#FBBF24',
    title: 'Product Ownership & Agile Delivery',
    description:
      'In agile environments, product ownership is a distinct discipline focused on delivery execution — managing backlogs, prioritising features and ensuring efficient sprint delivery.',
    roles: [
      'Product Owners',
      'Scrum Product Owners',
      'Agile Product Specialists',
    ],
  },
  {
    icon: BarChart3,
    accent: '#F87171',
    title: 'Product Operations & Enablement',
    description:
      'As product organisations scale, product operations becomes increasingly important in driving efficiency, consistency and performance across product teams.',
    roles: [
      'Product Operations Managers',
      'Product Operations Directors',
      'Product Analysts',
      'Product Enablement Specialists',
    ],
  },
  {
    icon: Palette,
    accent: '#A78BFA',
    title: 'Product Design, UX & Research',
    description:
      'Product management is closely linked with design and user experience. We recruit talent that ensures products are intuitive, user-centric and aligned with real customer needs.',
    roles: [
      'UX Designers',
      'Product Designers',
      'UX Researchers',
      'Service Designers',
      'Interaction Designers',
    ],
  },
  {
    icon: TrendingUp,
    accent: '#4F9CF9',
    title: 'Growth, Experimentation & Data-Driven Product',
    description:
      'Modern product organisations increasingly rely on data and experimentation to drive growth and optimisation, particularly in SaaS, marketplace and consumer applications.',
    roles: [
      'Growth Product Managers',
      'Experimentation Leads',
      'Product Analysts',
      'Data Product Managers',
    ],
    tags: ['A/B Testing', 'Analytics', 'Metrics', 'Funnel Optimisation'],
  },
  {
    icon: Database,
    accent: '#34D399',
    title: 'Platform, Data & AI Product',
    description:
      'A highly specialised and fast-growing area — product roles requiring deeper technical understanding, responsible for internal platforms, developer tools, data infrastructure or AI-driven features.',
    roles: [
      'Platform Product Managers',
      'API Product Managers',
      'Data Product Managers',
      'AI / Machine Learning Product Managers',
    ],
    highlight: 'Particularly critical in data platforms, AI-first businesses, and developer tooling organisations.',
  },
];

const industries = [
  { label: 'SaaS & Enterprise Software', accent: '#A78BFA' },
  { label: 'AI & Machine Learning Platforms', accent: '#4F9CF9' },
  { label: 'Fintech & Financial Services', accent: '#34D399' },
  { label: 'Marketplaces & Consumer Digital', accent: '#FBBF24' },
  { label: 'Data & Analytics Platforms', accent: '#F87171' },
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

export default function ProductManagementPage() {
  const navigate = useNavigate();
  const introRef = useScrollReveal(0, 0.15);
  const statsRef = useScrollReveal(0, 0.1);
  const industriesRef = useScrollReveal(0, 0.1);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-black min-h-screen">

      <VideoPageHero
        videoId="zwUsFN__jtE"
        eyebrow="Specialist Practice"
        title="Product"
        titleAccent="Management"
        description="Product management sits at the centre of every successful technology business — connecting customer needs, commercial strategy and engineering execution. We operate across the full product lifecycle, from early-stage discovery through to scaling mature product organisations."
        stats={[
          { value: 'CPO', label: 'Executive Level Hiring' },
          { value: 'Full Stack', label: 'Product Teams' },
          { value: 'SaaS & AI', label: 'Specialisms' },
          { value: 'Global', label: 'Talent Networks' },
        ]}
        actions={[
          { label: 'Hire Product Talent', primary: true, onClick: () => { navigate('/'); setTimeout(() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }), 300); } },
         ]}
      />

      {/* Overview */}
      <div className="max-w-4xl mx-auto px-6 py-12 md:py-16 text-center">
        <div ref={introRef}>
          <div className="flex items-center justify-center gap-3 mb-5">
            <span className="w-8 h-px bg-white/20" />
            <span className="text-white/60 text-xs font-medium tracking-[0.3em] uppercase">Our Focus</span>
            <span className="w-8 h-px bg-white/20" />
          </div>
          <h2 className="text-[3.25rem] font-bold text-white tracking-tight mb-6">
            The Full Product Lifecycle
          </h2>
          <p className="text-white/45 text-base md:text-lg leading-relaxed max-w-3xl mx-auto">
            What differentiates a true specialist in this space is a deep understanding of how product functions
            operate, how they interact with engineering and go-to-market teams, and how great product leaders balance
            customer insight with commercial outcomes.
          </p>
          <p className="text-white/60 text-base leading-relaxed max-w-3xl mx-auto mt-5">
            Our clients range from venture-backed startups and scale-ups to global SaaS platforms and enterprise
            technology businesses — at every stage of the product journey.
          </p>
        </div>
      </div>

      {/* Stats banner */}
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
            <h2 className="text-[3.25rem] font-bold text-white tracking-tight mb-3">
              Product Role Coverage
            </h2>
            <p className="text-white/40 text-base max-w-md mx-auto">
              From executive product leadership to hands-on product managers and designers
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {roleCategories.map((cat, i) => (
              <RoleCard key={cat.title} {...cat} delay={i * 80} />
            ))}
          </div>
        </div>
      </div>

      {/* Industry & Technology Context */}
      <div className="py-12 md:py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div ref={industriesRef}>
            <div className="text-center mb-14">
              <div className="flex items-center justify-center gap-3 mb-5">
                <span className="w-8 h-px bg-white/20" />
                <span className="text-white/60 text-xs font-medium tracking-[0.3em] uppercase">
                  Industry Context
                </span>
                <span className="w-8 h-px bg-white/20" />
              </div>
              <h2 className="text-[3.25rem] font-bold text-white tracking-tight mb-3">
                Where We Work
              </h2>
              <p className="text-white/40 text-base max-w-lg mx-auto">
                A specialist product recruitment business must understand not just product roles, but the environments
                in which they operate
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-12">
              {industries.map((ind) => (
                <div
                  key={ind.label}
                  className="bg-[#0d0d0d] border border-white/[0.07] p-6 text-center hover:border-white/15 transition-all duration-300 group"
                >
                  <div
                    className="w-2 h-2 rounded-full mx-auto mb-4 transition-transform duration-300 group-hover:scale-125"
                    style={{ backgroundColor: ind.accent }}
                  />
                  <p className="text-white/65 text-sm font-medium leading-snug">{ind.label}</p>
                </div>
              ))}
            </div>

            <div className="bg-[#0d0d0d] border border-white/[0.07] p-8">
              <p className="text-white/60 text-xs font-bold tracking-widest uppercase mb-4">
                Methodologies & Tools
              </p>
              <div className="flex flex-wrap gap-3">
                {[
                  'Agile & Scrum',
                  'Product-Led Growth',
                  'OKRs & KPIs',
                  'A/B Experimentation',
                  'Data Analytics',
                  'User Research',
                  'Roadmap Management',
                  'API-first',
                  'Jobs-to-be-Done',
                ].map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-3 py-1.5 font-medium text-white/55"
                    style={{ backgroundColor: '#A78BFA15', border: '1px solid #A78BFA20' }}
                  >
                    {tag}
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
          <h2 className="text-[3.25rem] font-bold text-white tracking-tight mb-4">
            Build Your Product Organisation
          </h2>
          <p className="text-white/45 text-base leading-relaxed mb-10">
            From your first product hire to scaling a global product team — let's find the right talent
            for your stage and ambition.
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
