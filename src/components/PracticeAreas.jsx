import { useEffect, useRef } from 'react';
import { ArrowRight, Code2, Briefcase, Layers, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const practices = [
  {
    icon: Users,
    accent: '#4F9CF9',
    title: 'GTM Talent Recruitment',
    description:
      'Place the revenue leaders who drive growth. From CROs to enterprise AEs, we find go-to-market talent that closes and scales.',
    link: 'Learn more',
    route: null,
  },
  {
    icon: Code2,
    accent: '#34D399',
    title: 'Engineering Recruitment',
    description:
      'Build the teams that build your product. From frontend to infrastructure, we find engineers who ship.',
    link: 'Learn more',
    route: '/engineering',
  },
  {
    icon: Briefcase,
    accent: '#FBBF24',
    title: 'Professional Services Recruitment',
    description:
      'Deliver, implement and scale technology. Implementation experts who drive transformation.',
    link: 'Learn more',
    route: '/professional-services',
  },
  {
    icon: Layers,
    accent: '#A78BFA',
    title: 'Product Management Recruitment',
    description:
      'Define, prioritise and drive product success. Product leaders who balance vision with execution.',
    link: 'Learn more',
    route: '/product-management',
  },
];

function PracticeCard({ icon: Icon, accent, title, description, link, route, delay }) {
  const navigate = useNavigate();
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
            el.style.transition = 'opacity 0.65s ease, transform 0.65s ease';
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
      className="group relative bg-[#0d0d0d] border border-white/[0.07] p-8 flex flex-col gap-5 transition-all duration-300 hover:border-white/20 hover:-translate-y-1 hover:bg-[#111111]"
    >
      {/* Accent top line */}
      <div
        className="absolute top-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ backgroundColor: accent }}
      />

      {/* Icon */}
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:-translate-y-0.5"
        style={{ backgroundColor: `${accent}18` }}
      >
        <Icon size={22} style={{ color: accent }} />
      </div>

      {/* Text */}
      <div className="flex-1">
        <h3 className="text-white font-bold text-xl tracking-tight mb-3">{title}</h3>
        <p className="text-white/45 text-sm leading-relaxed">{description}</p>
      </div>

      {/* Learn more */}
      <button
        onClick={() => route ? navigate(route) : document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
        className="flex items-center gap-1.5 text-sm font-semibold transition-colors duration-200 mt-1"
        style={{ color: accent }}
      >
        {link}
        <ArrowRight size={14} className="transition-transform duration-200 group-hover:translate-x-1" />
      </button>
    </div>
  );
}

export default function PracticeAreas() {
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
    <section id="practice-areas" className="bg-black py-16 md:py-20 border-t border-white/[0.05]">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <div ref={headerRef} className="text-center mb-14">
          <div className="flex items-center justify-center gap-3 mb-5">
            <span className="w-8 h-px bg-white/20" />
            <span className="text-white/60 text-xs font-medium tracking-[0.3em] uppercase">
              Specialist Practices
            </span>
            <span className="w-8 h-px bg-white/20" />
          </div>

          <h2 className="text-[3.25rem] font-bold text-white tracking-tight mb-4">
            Our Specialist Practice Areas
          </h2>

          <p className="text-white/45 text-base md:text-lg max-w-md mx-auto leading-relaxed">
            Deep expertise across the technology talent landscape
          </p>
        </div>

        {/* Cards — 2×2 on md, 4-col on xl */}
        <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {practices.map((p, i) => (
            <PracticeCard key={p.title} {...p} delay={i * 100} />
          ))}
        </div>

      </div>
    </section>
  );
}
