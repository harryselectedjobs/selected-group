import { useEffect, useRef } from 'react';
import { Target, Network, MessagesSquare, TrendingUp } from 'lucide-react';

const steps = [
  {
    icon: Target,
    accent: '#4F9CF9',
    title: 'Specialist Expertise',
    description:
      'Deep domain knowledge across GTM, Product Management, Engineering and Professional Services — we speak the language of every discipline we recruit for.',
  },
  {
    icon: Network,
    accent: '#A78BFA',
    title: 'Deep Networks',
    description:
      'Access to passive and active talent pools built over years of specialist technology recruitment, spanning startups, scale-ups and global enterprise organisations.',
  },
  {
    icon: MessagesSquare,
    accent: '#34D399',
    title: 'Consultative Approach',
    description:
      'We operate as an extension of your team — understanding your operating model, growth stage and culture before introducing a single candidate.',
  },
  {
    icon: TrendingUp,
    accent: '#FBBF24',
    title: 'Outcome-Driven',
    description:
      'Every placement is measured against your business outcomes. From revenue targets to product milestones, we align hiring to what matters most.',
  },
];

function StepCard({ icon: Icon, accent, title, description, delay }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.opacity = '0';
    el.style.transform = 'translateY(36px)';

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
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <div
      ref={ref}
      className="group flex flex-col items-center text-center px-4"
    >
      {/* Icon box */}
      <div
        className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-transform duration-300 group-hover:-translate-y-1"
        style={{ backgroundColor: `${accent}20`, border: `1px solid ${accent}30` }}
      >
        <Icon size={28} style={{ color: accent }} />
      </div>

      {/* Connector line (hidden on last item) */}
      <h3 className="text-white font-bold text-lg tracking-tight mb-3">
        {title}
      </h3>

      <p className="text-white/45 text-sm leading-relaxed max-w-[220px]">
        {description}
      </p>
    </div>
  );
}

export default function HowWeWork() {
  const headerRef = useRef(null);

  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;
    el.style.opacity = '0';
    el.style.transform = 'translateY(24px)';

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
    <section id="how-we-work" className="bg-[#050505] py-16 md:py-20 border-t border-white/[0.05]">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <div ref={headerRef} className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-5">
            <span className="w-8 h-px bg-white/20" />
            <span className="text-white/35 text-xs font-medium tracking-[0.3em] uppercase">
              Our Approach
            </span>
            <span className="w-8 h-px bg-white/20" />
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-4">
            How We Work
          </h2>

          <p className="text-white/45 text-base md:text-lg max-w-xl mx-auto leading-relaxed">
            Our consultative approach to hiring excellence across every specialist practice.
          </p>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-14 gap-x-4 relative">

          {/* Horizontal connector line (desktop only) */}
          <div className="absolute top-8 left-[12.5%] right-[12.5%] h-px bg-white/[0.06] hidden lg:block pointer-events-none" />

          {steps.map((step, i) => (
            <StepCard key={step.title} {...step} delay={i * 100} />
          ))}
        </div>

        {/* Bottom divider / CTA strip */}
        <div className="mt-20 pt-12 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-6">
          <p className="text-white/40 text-sm max-w-md text-center sm:text-left">
            Across GTM Talent, Product Management, Engineering & Technology, and Professional Services — one consistent standard of delivery.
          </p>
          <button
            onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="flex-shrink-0 px-8 py-3.5 bg-white text-black text-sm font-bold tracking-widest uppercase transition-all duration-300 hover:bg-white/90"
          >
            Start a Search
          </button>
        </div>

      </div>
    </section>
  );
}
