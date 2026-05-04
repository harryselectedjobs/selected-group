import { useEffect, useRef } from 'react';
import { BarChart3, Layers, Settings, Globe } from 'lucide-react';

const services = [
  {
    icon: BarChart3,
    title: 'Executive GTM Search',
    description:
      'We identify and place high-performing sales leaders, CROs, and VP-level talent across enterprise SaaS and high-growth startups in US and European markets.',
  },
  {
    icon: Layers,
    title: 'Sales Team Buildouts',
    description:
      'End-to-end hiring of SDRs, Account Executives, and Sales Engineers — designed to scale revenue teams from Seed to Enterprise stage.',
  },
  {
    icon: Settings,
    title: 'Leadership Hiring',
    description:
      'Precision search for GTM leadership roles including CRO, VP Sales, and Head of Revenue Operations aligned with company growth stage.',
  },
  {
    icon: Globe,
    title: 'Market Expansion Hiring',
    description:
      'We support global expansion by building regional sales teams and sourcing talent for new market entry across US, UK, and EU regions.',
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
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);

  return ref;
}

function ServiceCard({ icon: Icon, title, description, delay }) {
  const ref = useScrollReveal(delay);

  return (
    <div
      ref={ref}
      className="group relative bg-[#111111] border border-white/[0.06] p-8 transition-all duration-500 hover:border-white/20 hover:bg-[#161616] hover:-translate-y-1"
    >
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="mb-6">
        <div className="w-12 h-12 bg-white/5 flex items-center justify-center mb-6 group-hover:bg-white/10 transition-colors duration-300">
          <Icon size={22} className="text-white/60 group-hover:text-white" />
        </div>

        <h3 className="text-white font-semibold text-lg mb-3 tracking-tight">
          {title}
        </h3>

        <p className="text-[#A0A0A0] text-sm leading-relaxed">
          {description}
        </p>
      </div>

      <div className="flex items-center gap-2 text-white/30 group-hover:text-white/60 transition-colors duration-300">
        <span className="text-xs tracking-widest uppercase font-medium">
          Explore
        </span>
        <span className="w-6 h-px bg-current transition-all duration-300 group-hover:w-10" />
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
        <div ref={headerRef} className="max-w-2xl mb-16">
          <div className="flex items-center gap-3 mb-6">
            <span className="w-8 h-px bg-white/30" />
            <span className="text-[#A0A0A0] text-xs font-medium tracking-[0.25em] uppercase">
              GTM Recruitment Services
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight tracking-tight mb-4">
            Built for Revenue
            <br />
            Team Growth
          </h2>

          <p className="text-[#A0A0A0] text-base leading-relaxed">
            We specialize in hiring high-impact GTM talent that drives revenue,
            accelerates market expansion, and builds scalable sales organizations.
          </p>
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {services.map((service, i) => (
            <ServiceCard
              key={service.title}
              {...service}
              delay={i * 100}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
