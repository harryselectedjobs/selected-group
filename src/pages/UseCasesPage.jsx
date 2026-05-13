import { useEffect, useRef } from 'react';
import { TrendingUp, Crown, Layers, Building2, Clock, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

/* ── Success stories ── */
const stories = [
  {
    icon: TrendingUp,
    accent: '#34D399',
    title: 'Scaling Engineering Teams Fast',
    tags: ['Series B SaaS Company', '18 months'],
    problem:
      'High-growth startup needs to scale from 10 to 100+ engineers in 18 months without compromising quality or culture.',
    solution:
      'RPO engagement with dedicated recruiting team. Structured hiring process, employer branding, and candidate pipeline management.',
    outcome:
      '87 engineers hired across frontend, backend, data, and platform. 92% retention after 1 year. Maintained high technical bar.',
  },
  {
    icon: Crown,
    accent: '#4F9CF9',
    title: 'Hiring Executive Leadership',
    tags: ['Enterprise SaaS Scale-up', '12 weeks'],
    problem:
      'Series B company needs a Chief Product Officer to lead product strategy and build out the product organisation.',
    solution:
      'Retained executive search. Deep market mapping, confidential outreach to passive candidates, comprehensive assessment process.',
    outcome:
      'CPO hired from FAANG background. Built product team from 3 to 25 PMs. Led company to Series C.',
  },
  {
    icon: Layers,
    accent: '#A78BFA',
    title: 'Building Product Function from Scratch',
    tags: ['Developer Tools Startup', '6 months'],
    problem:
      'Engineering-led company needs to establish its first product management function. Zero product hiring experience.',
    solution:
      'Consultative retained search for Head of Product, followed by contingency for PM team build-out. Hiring process design included.',
    outcome:
      'Hired Head of Product and first 5 PMs. Established product culture, roadmap process, and PM career framework.',
  },
  {
    icon: Building2,
    accent: '#FBBF24',
    title: 'Enterprise Transformation Program',
    tags: ['Fortune 500 Financial Services', '4 months'],
    problem:
      'Large enterprise rolling out Salesforce globally needs 50+ implementation consultants across 6 countries in 4 months.',
    solution:
      'Statement of Work engagement. Dedicated sourcing team, local market expertise, streamlined assessment and onboarding.',
    outcome:
      '52 consultants hired (mix of employees and contractors). Programme launched on time. Client expanded engagement.',
  },
  {
    icon: Clock,
    accent: '#F87171',
    title: 'Rapid Contract Hiring for Projects',
    tags: ['Technology Consulting Firm', '2 weeks'],
    problem:
      'Consulting firm wins major client project starting in 3 weeks. Needs 10 contract data engineers immediately.',
    solution:
      'Emergency contract search leveraging existing contractor network. Daily candidate submissions, expedited interviews.',
    outcome:
      '10 data engineers placed within 2 weeks. Project kicked off on schedule. 8 contractors extended for 12+ months.',
  },
];

/* ── Common hiring scenarios ── */
const scenarios = [
  {
    title: 'Post-Funding Scale',
    description: 'Series A/B companies doubling or tripling team size in 12–18 months.',
    fit: 'RPO',
  },
  {
    title: 'First Leadership Hire',
    description: 'Startups hiring their first Head of Engineering, CPO, or CDO.',
    fit: 'Retained',
  },
  {
    title: 'Building New Functions',
    description: 'Establishing product, data, or platform teams from zero.',
    fit: 'Retained + Contingency',
  },
  {
    title: 'Backfilling Critical Roles',
    description: 'Replacing senior engineers or PMs who departed. Time-sensitive.',
    fit: 'Contingency',
  },
  {
    title: 'Project-Based Staffing',
    description: 'Contract hiring for implementation projects or consulting engagements.',
    fit: 'Contract / SoW',
  },
  {
    title: 'Building Services Org',
    description: 'Software companies adding professional services or implementation arms.',
    fit: 'Mixed',
  },
];

/* ── Story card ── */
function StoryCard({ icon: Icon, accent, title, tags, problem, solution, outcome, index }) {
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
          }, index * 100);
          observer.disconnect();
        }
      },
      { threshold: 0.08 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [index]);

  return (
    <div ref={ref} className="relative pl-6 border-l-2 py-2" style={{ borderColor: accent }}>
      {/* Header row */}
      <div className="flex items-center gap-4 mb-4">
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{ backgroundColor: `${accent}18` }}
        >
          <Icon size={22} style={{ color: accent }} />
        </div>
        <div>
          <h3 className="text-white font-bold text-xl tracking-tight">{title}</h3>
          <div className="flex flex-wrap items-center gap-2 mt-1.5">
            {tags.map((tag, i) => (
              <span
                key={tag}
                className={`text-xs px-2.5 py-0.5 rounded-full font-medium ${
                  i === 0
                    ? 'bg-white/[0.07] text-white/50'
                    : 'text-xs font-semibold'
                }`}
                style={i === 1 ? { backgroundColor: `${accent}20`, color: accent } : {}}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* PSO columns */}
      <div className="grid md:grid-cols-3 gap-6 mt-6">
        {[
          { label: 'Problem', text: problem },
          { label: 'Solution', text: solution },
          { label: 'Outcome', text: outcome },
        ].map(({ label, text }) => (
          <div key={label}>
            <p className="text-white/80 font-semibold text-sm mb-2">{label}</p>
            <p className="text-white/45 text-sm leading-relaxed">{text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Scenario card ── */
function ScenarioCard({ title, description, fit, delay }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
          }, delay);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <div
      ref={ref}
      className="group bg-[#0d0d0d] border border-white/[0.07] p-7 transition-all duration-300 hover:border-white/20 hover:-translate-y-0.5"
    >
      <h4 className="text-white font-bold text-base tracking-tight mb-2">{title}</h4>
      <p className="text-white/40 text-sm leading-relaxed mb-4">{description}</p>
      <button className="flex items-center gap-1.5 text-xs font-semibold tracking-wide text-[#4F9CF9] hover:text-[#7ab8fb] transition-colors duration-200">
        Best fit: {fit}
        <ArrowRight size={12} />
      </button>
    </div>
  );
}

/* ── Page ── */
export default function UseCasesPage() {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-black min-h-screen">

      {/* Hero banner */}
      <div className="pt-32 pb-16 px-6 relative overflow-hidden bg-black">
        {/* Atmospheric orbs — matches the site's hero style */}
        <div
          className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full blur-[140px] pointer-events-none"
          style={{ backgroundColor: 'rgba(13,42,94,0.7)' }}
        />
        <div
          className="absolute bottom-0 -left-20 w-[400px] h-[400px] rounded-full blur-[120px] pointer-events-none"
          style={{ backgroundColor: 'rgba(45,27,105,0.4)' }}
        />

        {/* Subtle grid */}
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)',
            backgroundSize: '80px 80px',
          }}
        />

        {/* Bottom edge fade */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black to-transparent pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Label */}
          <div className="flex items-center gap-3 mb-5">
            <span className="w-8 h-px bg-white/20" />
            <span className="text-white/35 text-xs font-medium tracking-[0.3em] uppercase">
              Use Cases
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight mb-4 max-w-2xl leading-tight">
            Use Cases &amp;{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/40">
              Success Stories
            </span>
          </h1>

          <p className="text-white/50 text-base md:text-lg max-w-xl leading-relaxed">
            Real-world hiring scenarios and how we helped companies solve them.
          </p>
        </div>
      </div>

      {/* Stories */}
      <div className="max-w-7xl mx-auto px-6 py-12 md:py-16 flex flex-col gap-14">
        {stories.map((story, i) => (
          <StoryCard key={story.title} {...story} index={i} />
        ))}
      </div>

      {/* Common Hiring Scenarios */}
      <div className="border-t border-white/[0.05] bg-[#030303] py-12 md:py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-3">
              Common Hiring Scenarios
            </h2>
            <p className="text-white/40 text-base">Patterns we see across our clients</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {scenarios.map((s, i) => (
              <ScenarioCard key={s.title} {...s} delay={i * 80} />
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="border-t border-white/[0.05] py-20 px-6 text-center">
        <div className="max-w-xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-4">
            Recognise Your Scenario?
          </h2>
          <p className="text-white/45 text-base leading-relaxed mb-10">
            Let's discuss your specific hiring challenge and design the right approach.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => { navigate('/'); setTimeout(() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }), 300); }}
              className="group flex items-center gap-3 bg-white text-black px-8 py-4 text-sm font-bold tracking-widest uppercase transition-all duration-300 hover:bg-white/90 w-full sm:w-auto justify-center"
            >
              Discuss Your Needs
              <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-1" />
            </button>
            <button
              onClick={() => { navigate('/'); setTimeout(() => document.querySelector('#engagement-models')?.scrollIntoView({ behavior: 'smooth' }), 300); }}
              className="flex items-center justify-center px-8 py-4 text-sm font-medium tracking-widest uppercase border border-white/20 text-white/70 hover:border-white/50 hover:text-white transition-all duration-300 w-full sm:w-auto"
            >
              Compare Engagement Models
            </button>
          </div>
        </div>
      </div>

    </div>
  );
}
