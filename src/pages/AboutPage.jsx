import { useEffect, useRef } from 'react';
import { Target, Handshake, Star, TrendingUp, ArrowRight, Zap, Users, Search, MessageSquare } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

/* ── What Drives Us cards ── */
const drives = [
  {
    icon: Target,
    accent: '#4F9CF9',
    title: 'Specialist Focus',
    description:
      'We work exclusively within technology and go-to-market talent. No generalist sprawl — deep expertise in the roles and markets that matter to you.',
  },
  {
    icon: Handshake,
    accent: '#34D399',
    title: 'Partnership',
    description:
      'We embed ourselves in your hiring process. Your success is our success — we act as an extension of your team, not a transactional vendor.',
  },
  {
    icon: Star,
    accent: '#A78BFA',
    title: 'Quality',
    description:
      'Every candidate we present is rigorously assessed. We\'d rather send three exceptional people than ten mediocre ones.',
  },
  {
    icon: TrendingUp,
    accent: '#FBBF24',
    title: 'Outcomes',
    description:
      'We measure ourselves by long-term retention and business impact, not just placements made. Our track record of 92% 12-month retention speaks for itself.',
  },
];

/* ── What Makes Us Different items ── */
const differences = [
  {
    icon: Zap,
    accent: '#4F9CF9',
    title: 'We Understand Technology',
    description:
      'Our consultants have backgrounds in tech and have worked alongside engineers, PMs, and GTM teams. We speak your language and can genuinely evaluate candidates.',
  },
  {
    icon: Search,
    accent: '#34D399',
    title: 'We Access Passive Talent',
    description:
      'The best candidates aren\'t on job boards. Our deep networks and proactive outreach reach the top 10% who aren\'t actively looking — but are open to the right opportunity.',
  },
  {
    icon: Zap,
    accent: '#A78BFA',
    title: 'We Move Fast',
    description:
      'Speed matters in competitive hiring markets. Our average time to first qualified candidate is 7 days. We run tight, efficient processes without cutting corners.',
  },
  {
    icon: MessageSquare,
    accent: '#FBBF24',
    title: "We're Consultative",
    description:
      'We don\'t just fill briefs — we challenge them when needed. If your hiring spec won\'t get you the outcome you need, we\'ll tell you and help you redesign it.',
  },
];

/* ── Stats ── */
const stats = [
  { value: '500+', label: 'Placements Made' },
  { value: '150+', label: 'Clients Served' },
  { value: '92%', label: '12-Month Retention' },
  { value: '7 Days', label: 'Avg. Time to First Candidate' },
];

/* ── Reusable scroll-reveal hook ── */
function useScrollReveal(delay = 0, threshold = 0.1) {
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

/* ── Drive card ── */
function DriveCard({ icon: Icon, accent, title, description, delay }) {
  const ref = useScrollReveal(delay);
  return (
    <div
      ref={ref}
      className="group bg-[#0d0d0d] border border-white/[0.07] p-7 flex flex-col gap-4 transition-all duration-300 hover:border-white/20 hover:-translate-y-1 hover:bg-[#111111] relative"
    >
      <div
        className="absolute top-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ backgroundColor: accent }}
      />
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center"
        style={{ backgroundColor: `${accent}18` }}
      >
        <Icon size={22} style={{ color: accent }} />
      </div>
      <div>
        <h3 className="text-white font-bold text-lg tracking-tight mb-2">{title}</h3>
        <p className="text-white/45 text-sm leading-relaxed">{description}</p>
      </div>
    </div>
  );
}

/* ── Difference card ── */
function DifferenceCard({ icon: Icon, accent, title, description, delay }) {
  const ref = useScrollReveal(delay);
  return (
    <div
      ref={ref}
      className="bg-[#0a0a0a] border border-white/[0.07] p-8 transition-all duration-300 hover:border-white/15"
    >
      <div className="flex items-start gap-4">
        <div
          className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
          style={{ backgroundColor: `${accent}18` }}
        >
          <Icon size={18} style={{ color: accent }} />
        </div>
        <div>
          <h4 className="text-white font-bold text-base tracking-tight mb-2">{title}</h4>
          <p className="text-white/40 text-sm leading-relaxed">{description}</p>
        </div>
      </div>
    </div>
  );
}

/* ── Page ── */
export default function AboutPage() {
  const navigate = useNavigate();
  const missionRef = useScrollReveal(0, 0.2);
  const statsRef = useScrollReveal(0, 0.15);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-black min-h-screen">

      {/* Hero banner */}
      <div className="pt-32 pb-16 px-6 relative overflow-hidden bg-black">
        <div
          className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full blur-[140px] pointer-events-none"
          style={{ backgroundColor: 'rgba(13,42,94,0.7)' }}
        />
        <div
          className="absolute bottom-0 -left-20 w-[400px] h-[400px] rounded-full blur-[120px] pointer-events-none"
          style={{ backgroundColor: 'rgba(45,27,105,0.4)' }}
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
            <span className="w-8 h-px bg-white/20" />
            <span className="text-white/35 text-xs font-medium tracking-[0.3em] uppercase">
              About Us
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight mb-4 max-w-2xl leading-tight">
            About{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/40">
              Selected Group
            </span>
          </h1>

          <p className="text-white/50 text-base md:text-lg max-w-xl leading-relaxed">
            A specialist technology recruitment partner built for the companies shaping the future of software.
          </p>
        </div>
      </div>

      {/* Our Mission */}
      <div className="max-w-4xl mx-auto px-6 py-12 md:py-16 text-center">
        <div ref={missionRef}>
          <div className="flex items-center justify-center gap-3 mb-5">
            <span className="w-8 h-px bg-white/20" />
            <span className="text-white/35 text-xs font-medium tracking-[0.3em] uppercase">
              Our Mission
            </span>
            <span className="w-8 h-px bg-white/20" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-6">
            Connecting exceptional talent with companies building the future
          </h2>
          <p className="text-white/45 text-base md:text-lg leading-relaxed max-w-3xl mx-auto">
            Selected Group was founded on a simple belief: hiring exceptional technology talent requires exceptional
            expertise. We exist to bridge the gap between the world's best technology companies and the talent that
            will define their next chapter — with rigour, honesty, and genuine partnership.
          </p>
          <p className="text-white/35 text-base leading-relaxed max-w-3xl mx-auto mt-5">
            We work exclusively across engineering, product, go-to-market, and professional services talent within
            the technology sector. This focus isn't a limitation — it's our edge.
          </p>
        </div>
      </div>

      {/* What Drives Us */}
      <div className="border-t border-white/[0.05] bg-[#030303] py-12 md:py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <div className="flex items-center justify-center gap-3 mb-5">
              <span className="w-8 h-px bg-white/20" />
              <span className="text-white/35 text-xs font-medium tracking-[0.3em] uppercase">
                Our Values
              </span>
              <span className="w-8 h-px bg-white/20" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-3">
              What Drives Us
            </h2>
            <p className="text-white/40 text-base max-w-md mx-auto">
              The principles that guide every search and every partnership
            </p>
          </div>

          <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-4">
            {drives.map((d, i) => (
              <DriveCard key={d.title} {...d} delay={i * 100} />
            ))}
          </div>
        </div>
      </div>

      {/* What Makes Us Different */}
      <div className="py-12 md:py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <div className="flex items-center justify-center gap-3 mb-5">
              <span className="w-8 h-px bg-white/20" />
              <span className="text-white/35 text-xs font-medium tracking-[0.3em] uppercase">
                Our Approach
              </span>
              <span className="w-8 h-px bg-white/20" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-3">
              What Makes Us Different
            </h2>
            <p className="text-white/40 text-base max-w-md mx-auto">
              Why technology companies choose to work with us
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {differences.map((d, i) => (
              <DifferenceCard key={d.title} {...d} delay={i * 80} />
            ))}
          </div>
        </div>
      </div>

      {/* Stats banner */}
      <div
        ref={statsRef}
        className="border-t border-white/[0.05] py-16 md:py-20 px-6"
        style={{ background: 'linear-gradient(135deg, #0d1a3a 0%, #111827 50%, #0d1a3a 100%)' }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 text-center">
            {stats.map((s) => (
              <div key={s.label}>
                <div className="text-3xl md:text-4xl font-bold text-white mb-2 tracking-tight">
                  {s.value}
                </div>
                <div className="text-white/45 text-sm font-medium tracking-wide">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="border-t border-white/[0.05] py-20 px-6 text-center">
        <div className="max-w-xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-4">
            Ready to Work Together?
          </h2>
          <p className="text-white/45 text-base leading-relaxed mb-10">
            Whether you're scaling a team or finding a single critical hire, let's start a conversation.
          </p>
          <button
            onClick={() => {
              navigate('/');
              setTimeout(() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }), 300);
            }}
            className="group inline-flex items-center gap-3 bg-white text-black px-8 py-4 text-sm font-bold tracking-widest uppercase transition-all duration-300 hover:bg-white/90"
          >
            Get in Touch
            <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </div>
      </div>

    </div>
  );
}
