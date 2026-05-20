import { useEffect, useRef, useState } from 'react';
import { ArrowRight, TrendingUp, Users, Target, BarChart3, Handshake, Headphones, Zap, Crown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import VideoPageHero from '../components/VideoPageHero';

const stats = [
  { value: 'CRO',    label: 'Executive Level Hiring' },
  { value: '1,000+', label: 'GTM Placements Made' },
  { value: 'US & EU', label: 'Market Coverage' },
  { value: '92%',    label: '12-Month Retention Rate' },
];

const roleCategories = [
  {
    icon: Crown,
    accent: '#4F9CF9',
    title: 'Chief Revenue Officer & Executive GTM Leadership',
    description:
      'At the highest level, we specialise in placing revenue leaders who define commercial strategy, build and scale go-to-market organisations and drive sustainable top-line growth across global markets.',
    roles: [
      'Chief Revenue Officer (CRO)',
      'Chief Commercial Officer (CCO)',
      'SVP Sales / EVP Sales',
      'VP Sales / VP GTM',
      'VP Revenue / VP Commercial',
      'General Manager – Sales & Revenue',
      'President of Sales',
    ],
    highlight: 'These leaders set revenue targets, define GTM motion and build high-performing sales cultures across US and European markets.',
  },
  {
    icon: Target,
    accent: '#34D399',
    title: 'Enterprise & Strategic Sales',
    description:
      'Enterprise sales professionals are among the most in-demand talent in technology. We place individuals capable of managing complex, multi-stakeholder deals with long sales cycles and large contract values.',
    roles: [
      'Enterprise Account Executives',
      'Strategic Account Executives',
      'Global Account Managers',
      'Major Account Managers',
      'Named Account Executives',
      'Principal Account Executives',
    ],
    tags: ['Enterprise SaaS', 'MEDDIC', 'MEDDPICC', 'Complex Sales'],
  },
  {
    icon: TrendingUp,
    accent: '#A78BFA',
    title: 'Mid-Market & Commercial Sales',
    description:
      'Mid-market and commercial sales roles are the engine of revenue growth for many technology businesses — higher velocity deals with strong expansion potential.',
    roles: [
      'Mid-Market Account Executives',
      'Commercial Account Executives',
      'Regional Sales Managers',
      'Territory Account Managers',
      'Inside Sales Executives',
      'Sales Team Leads',
    ],
    tags: ['SaaS', 'Volume Sales', 'Pipeline Generation'],
  },
  {
    icon: Zap,
    accent: '#FBBF24',
    title: 'Sales Development & Pipeline Generation',
    description:
      'Sales development professionals are the foundation of any high-performing outbound sales function. We place individuals who combine tenacity with intelligence to build pipeline from scratch.',
    roles: [
      'Sales Development Representatives (SDRs)',
      'Business Development Representatives (BDRs)',
      'Outbound Sales Representatives',
      'Senior SDRs / Team Leads',
      'SDR Managers',
      'Head of Sales Development',
    ],
    highlight: 'Critical for new market entry, product launches and building outbound capability from zero.',
  },
  {
    icon: BarChart3,
    accent: '#F87171',
    title: 'Revenue Operations & Sales Enablement',
    description:
      'RevOps and enablement are increasingly strategic functions, responsible for aligning people, process and technology to maximise revenue efficiency and predictability.',
    roles: [
      'VP Revenue Operations',
      'Head of RevOps / Sales Operations',
      'Revenue Operations Managers',
      'CRM Administrators (Salesforce, HubSpot)',
      'Sales Enablement Managers',
      'Sales Enablement Directors',
      'Revenue Analysts',
    ],
    tags: ['Salesforce', 'HubSpot', 'Gong', 'Clari', 'Outreach'],
  },
  {
    icon: Users,
    accent: '#34D399',
    title: 'Sales Engineering & Pre-Sales',
    description:
      'Sales engineers and pre-sales consultants are a critical bridge between technical capability and commercial outcomes. We place professionals who can demonstrate complex solutions and win technical evaluations.',
    roles: [
      'Sales Engineers',
      'Pre-Sales Consultants',
      'Solutions Architects (pre-sales)',
      'Technical Account Managers',
      'Value Engineers',
      'Demo Specialists',
    ],
    highlight: 'Particularly critical in developer tools, data platforms, security and enterprise infrastructure.',
  },
  {
    icon: Headphones,
    accent: '#4F9CF9',
    title: 'Customer Success & Account Management',
    description:
      'Customer success talent drives net revenue retention, expansion and long-term partnership. We place professionals who protect and grow accounts through strategic relationships and product adoption.',
    roles: [
      'VP Customer Success',
      'Director of Customer Success',
      'Customer Success Managers (CSMs)',
      'Enterprise CSMs',
      'Account Managers (expansion focused)',
      'Renewal Managers',
      'Onboarding Specialists',
    ],
    tags: ['NRR', 'Expansion Revenue', 'Churn Prevention', 'SaaS'],
  },
  {
    icon: Handshake,
    accent: '#A78BFA',
    title: 'Partnerships, Alliances & Channel',
    description:
      'Partner-led and channel growth strategies require dedicated talent who can build ecosystems, manage alliances and drive indirect revenue at scale.',
    roles: [
      'VP Partnerships / VP Alliances',
      'Head of Channel',
      'Alliance Directors',
      'Channel Development Managers',
      'Partner Success Managers',
      'Business Development Directors',
    ],
  },
];

const gtmStack = [
  { category: 'CRM',             items: ['Salesforce', 'HubSpot', 'Pipedrive'] },
  { category: 'Sales Engagement', items: ['Outreach', 'Salesloft', 'Apollo.io'] },
  { category: 'Revenue Intel',    items: ['Gong', 'Chorus', 'Clari'] },
  { category: 'Data & Enrichment', items: ['ZoomInfo', 'LinkedIn Sales Nav', 'Lusha'] },
  { category: 'Analytics',        items: ['Tableau', 'Looker', 'Salesforce Analytics'] },
];

const markets = [
  { label: 'Enterprise SaaS & Cloud',          accent: '#4F9CF9' },
  { label: 'AI & Machine Learning Platforms',   accent: '#34D399' },
  { label: 'Cybersecurity',                    accent: '#A78BFA' },
  { label: 'Developer Tools & Infrastructure', accent: '#FBBF24' },
  { label: 'Fintech & Financial Services',     accent: '#F87171' },
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

      <p className="text-white/50 text-sm leading-relaxed">{description}</p>

      <div className="border-t border-white/[0.06] pt-4">
        <p className="text-white/50 text-xs font-medium tracking-widest uppercase mb-3">Key Roles</p>
        <ul className="flex flex-col gap-1.5">
          {visibleRoles.map((role) => (
            <li key={role} className="flex items-center gap-2 text-white/65 text-sm">
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

export default function GTMPage() {
  const navigate = useNavigate();
  const introRef = useScrollReveal(0, 0.15);
  const statsRef = useScrollReveal(0, 0.1);
  const techRef  = useScrollReveal(0, 0.1);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="bg-black min-h-screen">

      <VideoPageHero
        videoId="qz9ADlOqqs8"
        eyebrow="Specialist Practice"
        title="Go-To-Market"
        titleAccent="Talent"
        description="We are an enterprise software sales and go-to-market recruitment specialist, placing high-performing revenue leaders, enterprise sellers and GTM talent across US and European markets — with over 1,000 successful placements and a 92% 12-month retention rate."
        stats={[
          { value: 'CRO', label: 'Executive Level Hiring' },
          { value: '1,000+', label: 'GTM Placements Made' },
          { value: 'US & EU', label: 'Market Coverage' },
          { value: '92%', label: '12-Month Retention Rate' },
        ]}
        actions={[
          { label: 'Find GTM Talent', primary: true, onClick: () => { navigate('/'); setTimeout(() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }), 300); } },
          
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
            The Full GTM Revenue Motion
          </h2>
          <p className="text-white/55 text-base md:text-lg leading-relaxed max-w-3xl mx-auto">
            We operate across the full go-to-market spectrum — from CRO and VP Sales appointments
            through to enterprise account executives, sales development, revenue operations and
            customer success. Our clients range from Series A startups and scale-ups to global
            enterprise software businesses.
          </p>
          <p className="text-white/60 text-base leading-relaxed max-w-3xl mx-auto mt-5">
            What sets us apart is a genuine understanding of what good GTM talent looks like in
            practice — the methodologies, the motion, the metrics and the mindset required to
            close enterprise software business at scale.
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
              GTM Role Coverage
            </h2>
            <p className="text-white/55 text-base max-w-md mx-auto">
              From chief revenue officer to sales development — we cover every function in the go-to-market motion
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {roleCategories.map((cat, i) => (
              <RoleCard key={cat.title} {...cat} delay={i * 80} />
            ))}
          </div>
        </div>
      </div>

      {/* GTM Tech Stack */}
      <div className="py-12 md:py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div ref={techRef}>
            <div className="text-center mb-14">
              <div className="flex items-center justify-center gap-3 mb-5">
                <span className="w-8 h-px bg-white/20" />
                <span className="text-white/60 text-xs font-medium tracking-[0.3em] uppercase">
                  GTM Technology
                </span>
                <span className="w-8 h-px bg-white/20" />
              </div>
              <h2 className="text-[3.25rem] font-bold text-white tracking-tight mb-3">
                Revenue Tech Stack
              </h2>
              <p className="text-white/55 text-base max-w-lg mx-auto">
                We understand the tools and platforms modern GTM teams use to build, manage and scale revenue operations
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
              {gtmStack.map((stack) => (
                <div
                  key={stack.category}
                  className="bg-[#0d0d0d] border border-white/[0.07] p-6 hover:border-white/15 transition-all duration-300"
                >
                  <p className="text-xs font-bold tracking-widest uppercase mb-4" style={{ color: '#4F9CF9' }}>
                    {stack.category}
                  </p>
                  <ul className="flex flex-col gap-2">
                    {stack.items.map((item) => (
                      <li key={item} className="text-white/60 text-sm flex items-center gap-2">
                        <span className="w-1 h-1 rounded-full bg-white/25 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Market context */}
            <div className="text-center mb-8">
              <div className="flex items-center justify-center gap-3 mb-5 mt-10">
                <span className="w-8 h-px bg-white/20" />
                <span className="text-white/60 text-xs font-medium tracking-[0.3em] uppercase">
                  Markets We Serve
                </span>
                <span className="w-8 h-px bg-white/20" />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {markets.map((m) => (
                <div
                  key={m.label}
                  className="bg-[#0d0d0d] border border-white/[0.07] p-6 text-center hover:border-white/15 transition-all duration-300 group"
                >
                  <div
                    className="w-2 h-2 rounded-full mx-auto mb-4 transition-transform duration-300 group-hover:scale-125"
                    style={{ backgroundColor: m.accent }}
                  />
                  <p className="text-white/65 text-sm font-medium leading-snug">{m.label}</p>
                </div>
              ))}
            </div>

            {/* Methodology tags */}
            <div className="bg-[#0d0d0d] border border-white/[0.07] p-8 mt-4">
              <p className="text-white/55 text-xs font-bold tracking-widest uppercase mb-4">
                Sales Methodologies & Frameworks
              </p>
              <div className="flex flex-wrap gap-3">
                {[
                  'MEDDIC / MEDDPICC',
                  'Challenger Sale',
                  'SPIN Selling',
                  'Value Selling',
                  'Command of the Message',
                  'BANT',
                  'SPICED',
                  'Sandler Method',
                  'Solution Selling',
                ].map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-3 py-1.5 font-medium text-white/60"
                    style={{ backgroundColor: '#4F9CF915', border: '1px solid #4F9CF920' }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Why us — GTM specific callout */}
      <div className="border-t border-white/[0.05] bg-[#030303] py-12 md:py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                accent: '#4F9CF9',
                title: 'Deep GTM Network',
                body: 'Our consultants maintain active relationships with passive GTM talent — CROs, VP Sales and enterprise AEs who aren\'t on job boards but are open to the right opportunity.',
              },
              {
                accent: '#34D399',
                title: 'We Understand the Motion',
                body: 'We speak the language of SaaS sales — ARR, ACV, MEDDIC, win rates, ramp times. Our understanding lets us assess candidates accurately and advise clients as a credible partner.',
              },
              {
                accent: '#A78BFA',
                title: 'Track Record',
                body: 'Over 1,000 GTM placements across US and European markets. 92% of our placed candidates remain in role at 12 months — because we prioritise fit over speed.',
              },
            ].map((item) => (
              <div
                key={item.title}
                className="bg-[#0d0d0d] border border-white/[0.07] p-8 hover:border-white/15 transition-all duration-300 group relative"
              >
                <div
                  className="absolute top-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ backgroundColor: item.accent }}
                />
                <div className="w-8 h-px mb-6" style={{ backgroundColor: item.accent }} />
                <h4 className="text-white font-bold text-lg tracking-tight mb-3">{item.title}</h4>
                <p className="text-white/55 text-sm leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="border-t border-white/[0.05] py-20 px-6 text-center">
        <div className="max-w-xl mx-auto">
          <h2 className="text-[3.25rem] font-bold text-white tracking-tight mb-4">
            Build Your Revenue Team
          </h2>
          <p className="text-white/55 text-base leading-relaxed mb-10">
            Whether you're hiring your first enterprise AE or building a full GTM organisation
            from scratch — let's design the right search strategy for your stage.
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
