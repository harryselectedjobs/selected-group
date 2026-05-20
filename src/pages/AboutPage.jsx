import { useEffect, useRef, useState } from 'react';
import {
  Users,
  Target,
  Award,
  Globe,
  TrendingUp,
  Shield,
  Zap,
  ChevronRight,
  Play,
  CheckCircle,
  ArrowRight,
} from 'lucide-react';

const useInView = (threshold = 0.15) => {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView];
};

const FadeIn = ({ children, delay = 0, className = '' }) => {
  const [ref, inView] = useInView();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(32px)',
        transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
      }}
    >
      {children}
    </div>
  );
};

const clients = [
  'Palantir','Apple','Oracle','Anthropic','Celonis','Behavox',
  'SentinelOne','Wiz','Darktrace','Snyk','Confluent','monday.com',
  'Plaid','Ramp','Rubrik','Pure Storage','Cohesity','WEKA',
  'Snowplow','ClickHouse','Odoo','Pipedrive','Freshworks','Flexera',
];

const industries = [
  { label: 'Artificial Intelligence', icon: Zap },
  { label: 'Cybersecurity', icon: Shield },
  { label: 'Cloud & Infrastructure', icon: Globe },
  { label: 'Data & Analytics', icon: TrendingUp },
  { label: 'ERP & Enterprise Applications', icon: Target },
  { label: 'CRM & SaaS Platforms', icon: Users },
  { label: 'FinTech', icon: Award },
  { label: 'Storage & Data Management', icon: CheckCircle },
];

const services = [
  { title: 'Contingency Recruitment', desc: 'Results-driven hiring with fees only on successful placement.' },
  { title: 'Retained Search', desc: 'Dedicated search engagements for senior and critical hires.' },
  { title: 'RPO', desc: 'End-to-end recruitment process outsourcing tailored to your scale.' },
  { title: 'Executive Talent Mapping', desc: 'Market intelligence to inform board and leadership decisions.' },
];

const specialisms = ['Go-To-Market (GTM)', 'Professional Services', 'Product', 'Engineering'];

const stats = [
  { value: '3,000+', label: 'Successful Placements' },
  { value: '10+', label: 'Years of Experience' },
  { value: '4', label: 'Core Specialisms' },
  { value: 'Global', label: 'Market Reach' },
];

const Counter = ({ value }) => {
  const [ref, inView] = useInView();
  return <span ref={ref} className="text-4xl font-bold text-white">{inView ? value : '—'}</span>;
};

export default function About() {
  const [videoHovered, setVideoHovered] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [tickerPos, setTickerPos] = useState(0);
  const tickerRef = useRef(null);

  useEffect(() => {
    let frame;
    const animate = () => {
      setTickerPos(p => {
        const el = tickerRef.current;
        if (!el) return p;
        const max = el.scrollWidth / 2;
        return p >= max ? 0 : p + 0.6;
      });
      frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, []);

  const founders = [
    {
      name: 'Steven Petty',
      role: 'Co-Founder',
      desc: 'With elite recruitment expertise developed under respected industry mentors, Steven co-built Selected Group on a foundation of relationships, trust, and genuine partnership.',
    },
    {
      name: 'Harry Brown',
      role: 'Co-Founder',
      desc: "Harry's commitment to creating environments where talent thrives long-term has been central to Selected Group's philosophy since day one.",
    },
  ];

  const tabContent = [
    {
      label: 'Mission',
      heading: 'Built to Scale Technology Businesses',
      body: 'Selected Group\'s mission is to help technology businesses scale successfully by combining exceptional recruitment execution with long-term strategic partnership. Recruitment should attract great talent and support the creation of environments where people can grow, perform, and build meaningful careers.',
    },
    {
      label: 'Vision',
      heading: 'Redefining What Recruitment Means',
      body: 'Selected Group envisions a world where recruitment is a genuine competitive advantage — not a transactional cost. By partnering closely with clients throughout every stage of their growth journey, the company aims to be the most trusted name in global technology talent.',
    },
    {
      label: 'Values',
      heading: 'A Simple Philosophy That Never Changes',
      body: 'Treat people how you would like to be treated, do what you say you will do, and always operate with honesty and integrity. These three principles have guided every relationship and decision at Selected Group since the very first day.',
    },
  ];

  return (
    <div className="bg-[#0a0c10] text-white min-h-screen font-sans">

      {/* ── HERO ── */}
      <section className="relative overflow-hidden pt-32 pb-24 px-6">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] rounded-full opacity-10"
            style={{ background: 'radial-gradient(ellipse, #3b82f6 0%, transparent 70%)' }} />
          <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full opacity-5"
            style={{ background: 'radial-gradient(ellipse, #60a5fa 0%, transparent 70%)' }} />
          {[...Array(28)].map((_, i) => (
            <div key={i}
              className="absolute w-px h-px bg-white rounded-full"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                opacity: Math.random() * 0.5 + 0.1,
                width: `${Math.random() * 2 + 1}px`,
                height: `${Math.random() * 2 + 1}px`,
              }}
            />
          ))}
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px w-10 bg-blue-400" />
            <span className="text-blue-400 tracking-[0.2em] text-xs font-medium uppercase">About Selected Group</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold leading-tight tracking-tight mb-8 max-w-4xl">
            Recruitment Built on{' '}
            <span className="text-transparent bg-clip-text"
              style={{ backgroundImage: 'linear-gradient(90deg, #60a5fa, #93c5fd)' }}>
              Relationships
            </span>
            , Not Transactions
          </h1>
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl leading-relaxed mb-12">
            A specialist technology recruitment business founded over ten years ago — partnering with software vendors,
            technology businesses, and consulting organisations to scale with purpose.
          </p>
          <div className="flex flex-wrap gap-4">
            <a href="#story"
              className="inline-flex items-center gap-2 bg-blue-500 hover:bg-blue-400 text-white px-7 py-3.5 text-sm font-medium tracking-wide transition-all duration-200 rounded-sm">
              Our Story <ArrowRight size={16} />
            </a>
            <a href="#services"
              className="inline-flex items-center gap-2 border border-white/15 hover:border-white/40 text-white px-7 py-3.5 text-sm font-medium tracking-wide transition-all duration-200 rounded-sm">
              Services <ChevronRight size={16} />
            </a>
          </div>
        </div>
      </section>

      {/* ── STATS BAR ── */}
      <section className="border-y border-white/8 bg-white/[0.02]">
        <div className="max-w-6xl mx-auto px-6 py-14 grid grid-cols-2 md:grid-cols-4 gap-10">
          {stats.map((s, i) => (
            <FadeIn key={s.label} delay={i * 0.1} className="text-center">
              <Counter value={s.value} />
              <p className="text-gray-500 text-xs tracking-[0.15em] uppercase mt-2">{s.label}</p>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* ── INTRO ── */}
      <section className="max-w-6xl mx-auto px-6 py-24 grid md:grid-cols-2 gap-16 items-center">
        <FadeIn>
          <div className="flex items-center gap-3 mb-5">
            <div className="h-px w-8 bg-blue-400" />
            <span className="text-blue-400 tracking-[0.2em] text-xs uppercase">Who We Are</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 leading-tight">
            More Than a Recruitment Firm
          </h2>
          <p className="text-gray-400 leading-relaxed mb-5">
            Selected Group is a specialist technology recruitment business that partners with businesses throughout every
            stage of their growth journey — launching into new markets, expanding existing teams, or building scalable
            functions across GTM, Professional Services, Product, and Engineering.
          </p>
          <p className="text-gray-400 leading-relaxed">
            What sets us apart is a consultative approach and relentless commitment to customer success. We believe
            sustainable growth comes from building cultures and career paths where top performers can thrive long-term.
          </p>
        </FadeIn>

        <FadeIn delay={0.15}>
          <div className="grid grid-cols-2 gap-4">
            {specialisms.map(s => (
              <div key={s}
                className="border border-white/10 bg-white/[0.03] p-5 rounded-sm hover:border-blue-500/40 hover:bg-blue-500/5 transition-all duration-300">
                <CheckCircle size={18} className="text-blue-400 mb-3" />
                <p className="text-sm font-medium">{s}</p>
              </div>
            ))}
          </div>
        </FadeIn>
      </section>

      {/* ── VIDEO / STORY ── */}
      <section id="story" className="bg-white/[0.02] border-y border-white/8 py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <FadeIn className="text-center mb-14">
            <div className="flex items-center justify-center gap-3 mb-5">
              <div className="h-px w-8 bg-blue-400" />
              <span className="text-blue-400 tracking-[0.2em] text-xs uppercase">Our Story</span>
              <div className="h-px w-8 bg-blue-400" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">The Story Behind Selected Group</h2>
            <p className="text-gray-400 max-w-xl mx-auto">
              Watch our AI-generated backstory — ten years of partnership, growth, and genuine impact.
            </p>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div
              className="relative rounded-sm overflow-hidden border border-white/10 cursor-pointer group max-w-4xl mx-auto"
              style={{ aspectRatio: '16/9', background: 'linear-gradient(135deg, #0f1520 0%, #0d1a2e 100%)' }}
              onMouseEnter={() => setVideoHovered(true)}
              onMouseLeave={() => setVideoHovered(false)}
            >
              {/* Placeholder visual */}
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className="absolute inset-0 overflow-hidden">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="absolute border border-blue-500/10 rounded-full"
                      style={{
                        width: `${(i + 1) * 160}px`,
                        height: `${(i + 1) * 160}px`,
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                      }}
                    />
                  ))}
                </div>
                <div
                  className="relative z-10 w-20 h-20 rounded-full border-2 border-white/20 bg-white/5 backdrop-blur flex items-center justify-center transition-all duration-300"
                  style={{ transform: videoHovered ? 'scale(1.12)' : 'scale(1)', borderColor: videoHovered ? 'rgba(96,165,250,0.6)' : undefined }}
                >
                  <Play size={28} className="text-white ml-1" fill="white" />
                </div>
                <p className="relative z-10 text-gray-500 text-sm mt-6 tracking-widest uppercase">
                  Video Coming Soon
                </p>
                <p className="relative z-10 text-gray-600 text-xs mt-2">
                  An AI-generated backstory of our ten-year journey
                </p>
              </div>

              <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/5">
                <div className="h-full bg-blue-500/50 w-0 group-hover:w-1/3 transition-all duration-[2s]" />
              </div>
            </div>
          </FadeIn>

          {/* Founder cards */}
          <div className="grid md:grid-cols-2 gap-6 mt-14 max-w-4xl mx-auto">
            {founders.map((f, i) => (
              <FadeIn key={f.name} delay={i * 0.12}>
                <div className="border border-white/10 bg-white/[0.03] p-7 rounded-sm hover:border-blue-500/30 transition-all duration-300">
                  <div className="w-10 h-10 rounded-full bg-blue-500/15 border border-blue-500/30 flex items-center justify-center mb-4">
                    <span className="text-blue-400 text-sm font-bold">{f.name.split(' ').map(n => n[0]).join('')}</span>
                  </div>
                  <h3 className="font-semibold text-lg mb-1">{f.name}</h3>
                  <p className="text-blue-400 text-xs tracking-widest uppercase mb-3">{f.role}</p>
                  <p className="text-gray-400 text-sm leading-relaxed">{f.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>

          <FadeIn delay={0.2} className="mt-12 max-w-4xl mx-auto">
            <div className="border border-blue-500/20 bg-blue-500/5 rounded-sm p-7">
              <p className="text-gray-300 leading-relaxed text-sm md:text-base italic">
                "One of our proudest achievements has been seeing former employees go on to achieve their own ambitions —
                some even building businesses larger than Selected Group itself. For us, that is what success truly means:
                helping people grow."
              </p>
              <p className="text-blue-400 text-xs tracking-widest uppercase mt-4">— Steven Petty & Harry Brown, Co-Founders</p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── MISSION / VISION / VALUES TABS ── */}
      <section className="max-w-6xl mx-auto px-6 py-24">
        <FadeIn className="mb-12">
          <div className="flex items-center gap-3 mb-5">
            <div className="h-px w-8 bg-blue-400" />
            <span className="text-blue-400 tracking-[0.2em] text-xs uppercase">Our Foundation</span>
          </div>
          <div className="flex gap-1 border-b border-white/10 w-fit">
            {tabContent.map((t, i) => (
              <button
                key={t.label}
                onClick={() => setActiveTab(i)}
                className="px-6 py-3 text-sm font-medium tracking-wide transition-all duration-200 relative"
                style={{ color: activeTab === i ? '#fff' : '#6b7280' }}
              >
                {t.label}
                {activeTab === i && (
                  <span className="absolute bottom-0 left-0 right-0 h-px bg-blue-400" />
                )}
              </button>
            ))}
          </div>
        </FadeIn>

        <div key={activeTab}
          style={{ opacity: 1, animation: 'fadeSlide 0.4s ease' }}
          className="grid md:grid-cols-2 gap-14 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-5 leading-tight">{tabContent[activeTab].heading}</h2>
            <p className="text-gray-400 leading-relaxed text-lg">{tabContent[activeTab].body}</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {['Accountability', 'Ambition', 'Integrity', 'Partnership'].map((v, i) => (
              <div key={v}
                className="border border-white/10 bg-white/[0.03] p-5 rounded-sm hover:border-blue-500/40 hover:bg-blue-500/5 transition-all duration-300 group">
                <div className="w-8 h-8 rounded-sm bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mb-3 group-hover:bg-blue-500/20 transition-colors">
                  <span className="text-blue-400 text-xs font-bold">0{i + 1}</span>
                </div>
                <p className="text-sm font-semibold">{v}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section id="services" className="bg-white/[0.02] border-y border-white/8 py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <FadeIn className="mb-14">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-8 bg-blue-400" />
              <span className="text-blue-400 tracking-[0.2em] text-xs uppercase">What We Do</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold">Tailored Recruitment Solutions</h2>
          </FadeIn>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {services.map((s, i) => (
              <FadeIn key={s.title} delay={i * 0.08}>
                <div className="border border-white/10 bg-white/[0.03] p-7 rounded-sm h-full hover:border-blue-500/40 hover:bg-blue-500/5 transition-all duration-300 group">
                  <div className="text-blue-400 text-xs tracking-widest uppercase mb-4">0{i + 1}</div>
                  <h3 className="font-semibold text-base mb-3 group-hover:text-blue-300 transition-colors">{s.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{s.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHAT MAKES US DIFFERENT ── */}
      <section className="max-w-6xl mx-auto px-6 py-24">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <FadeIn>
            <div className="flex items-center gap-3 mb-5">
              <div className="h-px w-8 bg-blue-400" />
              <span className="text-blue-400 tracking-[0.2em] text-xs uppercase">Our Difference</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 leading-tight">Why Clients Choose Selected Group</h2>
            <div className="space-y-4">
              {[
                'Deep technology market expertise',
                'Long-term relationship building',
                'Honest and transparent communication',
                'Relentless focus on customer success',
                'Commitment to sustainable scaling',
              ].map((item, i) => (
                <div key={item} className="flex items-start gap-3"
                  style={{ opacity: 1, transform: 'none', transition: `all 0.4s ease ${i * 0.07}s` }}>
                  <ChevronRight size={16} className="text-blue-400 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-300 text-sm">{item}</span>
                </div>
              ))}
            </div>
          </FadeIn>

          <FadeIn delay={0.15}>
            <div className="border border-white/10 bg-white/[0.03] rounded-sm p-8 space-y-6">
              <p className="text-gray-400 text-sm leading-relaxed">
                Rather than acting as a transactional recruitment provider, Selected Group partners closely with customers
                to understand their goals, organisational structure, culture, and long-term growth plans.
              </p>
              <div className="border-t border-white/8 pt-6 grid grid-cols-2 gap-5">
                {[
                  { label: 'Startups', icon: Zap },
                  { label: 'Mid-Market', icon: TrendingUp },
                  { label: 'Enterprise', icon: Globe },
                  { label: 'Consultancies', icon: Users },
                ].map(({ label, icon: Icon }) => (
                  <div key={label} className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-sm border border-white/10 bg-white/5 flex items-center justify-center">
                      <Icon size={14} className="text-blue-400" />
                    </div>
                    <span className="text-sm text-gray-400">{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── INDUSTRIES ── */}
      <section className="bg-white/[0.02] border-y border-white/8 py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <FadeIn className="mb-14 text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-px w-8 bg-blue-400" />
              <span className="text-blue-400 tracking-[0.2em] text-xs uppercase">Industries</span>
              <div className="h-px w-8 bg-blue-400" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold">Sectors We Operate In</h2>
          </FadeIn>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {industries.map(({ label, icon: Icon }, i) => (
              <FadeIn key={label} delay={i * 0.06}>
                <div className="border border-white/10 bg-white/[0.03] p-5 rounded-sm flex items-center gap-4 hover:border-blue-500/40 hover:bg-blue-500/5 transition-all duration-300 group">
                  <div className="w-9 h-9 rounded-sm bg-blue-500/10 border border-blue-500/20 flex items-center justify-center group-hover:bg-blue-500/20 transition-colors flex-shrink-0">
                    <Icon size={16} className="text-blue-400" />
                  </div>
                  <span className="text-sm font-medium">{label}</span>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── CLIENT TICKER ── */}
      <section className="py-20 px-6 overflow-hidden border-b border-white/8">
        <div className="max-w-6xl mx-auto mb-10">
          <FadeIn className="flex items-center gap-3">
            <div className="h-px w-8 bg-blue-400" />
            <span className="text-blue-400 tracking-[0.2em] text-xs uppercase">Trusted By</span>
          </FadeIn>
        </div>

        <div className="relative">
          <div className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
            style={{ background: 'linear-gradient(to right, #0a0c10, transparent)' }} />
          <div className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
            style={{ background: 'linear-gradient(to left, #0a0c10, transparent)' }} />

          <div ref={tickerRef} className="flex gap-8" style={{ transform: `translateX(-${tickerPos}px)`, width: 'max-content' }}>
            {[...clients, ...clients].map((c, i) => (
              <div key={i}
                className="border border-white/10 bg-white/[0.03] px-6 py-3 rounded-sm text-sm text-gray-400 whitespace-nowrap hover:border-blue-500/30 hover:text-white transition-all duration-200 cursor-default">
                {c}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-24 px-6">
        <FadeIn className="max-w-3xl mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="h-px w-8 bg-blue-400" />
            <span className="text-blue-400 tracking-[0.2em] text-xs uppercase">Get Started</span>
            <div className="h-px w-8 bg-blue-400" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-5 leading-tight">
            Ready to Build Your Next High-Performing Team?
          </h2>
          <p className="text-gray-400 mb-10 text-lg">
            Partner with Selected Group and access over a decade of specialist technology recruitment expertise.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a href="/contact"
              className="inline-flex items-center gap-2 bg-blue-500 hover:bg-blue-400 text-white px-8 py-4 text-sm font-medium tracking-wide transition-all duration-200 rounded-sm">
              Get in Touch <ArrowRight size={16} />
            </a>
            <a href="/engagement-models"
              className="inline-flex items-center gap-2 border border-white/15 hover:border-white/40 text-white px-8 py-4 text-sm font-medium tracking-wide transition-all duration-200 rounded-sm">
              View Engagement Models <ChevronRight size={16} />
            </a>
          </div>
        </FadeIn>
      </section>

      <style>{`
        @keyframes fadeSlide {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
