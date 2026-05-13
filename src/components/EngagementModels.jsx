import { useState, useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const models = [
  {
    title: 'Contingency',
    description: 'No risk, pay on success',
    detail: 'Only pay when you hire. Ideal for active roles where speed and flexibility matter most.',
  },
  {
    title: 'Retained',
    description: 'Dedicated executive search',
    detail: 'A committed, structured search process for senior and business-critical appointments.',
  },
  {
    title: 'RPO',
    description: 'Scale hiring operations',
    detail: 'Embedded recruitment support that scales with your growth — fully integrated with your team.',
  },
  {
    title: 'Contract',
    description: 'Project-based talent',
    detail: 'Flexible interim and contract professionals to fill capability gaps quickly and effectively.',
  },
  {
    title: 'SoW',
    description: 'Outcome-based delivery',
    detail: 'Statement of Work engagements where delivery is tied to defined milestones and outcomes.',
  },
];

function ModelCard({ title, description, detail, delay, active, onHover, onLeave }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.opacity = '0';
    el.style.transform = 'translateY(28px)';

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
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      className={`relative p-7 cursor-default transition-all duration-300 flex flex-col gap-3
        ${active
          ? 'bg-[#131313] border border-white/25 -translate-y-1'
          : 'bg-[#0d0d0d] border border-white/[0.07] hover:border-white/15'
        }`}
    >
      {/* Accent top bar */}
      <div
        className={`absolute top-0 left-0 right-0 h-[2px] bg-white transition-opacity duration-300 ${active ? 'opacity-100' : 'opacity-0'}`}
      />

      <h3 className="text-white font-bold text-lg tracking-tight">{title}</h3>

      <p className={`text-sm font-medium transition-colors duration-300 ${active ? 'text-white/65' : 'text-white/35'}`}>
        {description}
      </p>

      {/* Expanded detail on hover */}
      <div
        className="overflow-hidden transition-all duration-300"
        style={{ maxHeight: active ? '80px' : '0px', opacity: active ? 1 : 0 }}
      >
        <p className="text-white/55 text-xs leading-relaxed pt-1">{detail}</p>
      </div>
    </div>
  );
}

export default function EngagementModels() {
  const [active, setActive] = useState(-1);
  const headerRef = useRef(null);
  const navigate = useNavigate();

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
    <section className="bg-[#050505] py-16 md:py-20 border-t border-white/[0.05]">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <div ref={headerRef} className="text-center mb-14">
          <div className="flex items-center justify-center gap-3 mb-5">
            <span className="w-8 h-px bg-white/20" />
            <span className="text-white/60 text-xs font-medium tracking-[0.3em] uppercase">
              Engagement Models
            </span>
            <span className="w-8 h-px bg-white/20" />
          </div>

          <h2 className="text-[3.25rem] font-bold text-white tracking-tight mb-4">
            Flexible Engagement Models
          </h2>

          <p className="text-white/45 text-base md:text-lg max-w-lg mx-auto leading-relaxed">
            Choose the approach that fits your hiring needs
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
          {models.map((model, i) => (
            <ModelCard
              key={model.title}
              {...model}
              delay={i * 80}
              active={active === i}
              onHover={() => setActive(i)}
              onLeave={() => setActive(-1)}
            />
          ))}
        </div>

        {/* CTA */}
        <div className="flex justify-center mt-12">
          <button
            onClick={() => {
              navigate('/engagement-models#quick-comparison');
              setTimeout(() => {
                document.getElementById('quick-comparison')?.scrollIntoView({ behavior: 'smooth' });
              }, 400);
            }}
            className="group flex items-center gap-3 bg-white text-black px-10 py-4 text-sm font-bold tracking-widest uppercase transition-all duration-300 hover:bg-white/90"
          >
            Compare Engagement Models
            <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </div>

      </div>
    </section>
  );
}
