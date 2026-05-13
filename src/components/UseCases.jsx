import { useState, useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';

const cases = [
  {
    title: 'Scaling Engineering Teams',
    description:
      'Help high-growth startups scale from 10 to 100+ engineers while maintaining quality and culture fit.',
    accent: '#34D399',
  },
  {
    title: 'Executive Leadership Hiring',
    description:
      'Place CTOs, CPOs, and Chief Delivery Officers who transform technology organisations.',
    accent: '#4F9CF9',
  },
  {
    title: 'Building Product Functions',
    description:
      'Establish product management practices from the ground up, from first PM to full product org.',
    accent: '#A78BFA',
  },
  {
    title: 'Enterprise Transformation',
    description:
      'Staff large-scale implementation programmes with consultants who deliver enterprise software projects.',
    accent: '#FBBF24',
  },
];

function CaseCard({ title, description, accent, delay }) {
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
      className="group relative bg-[#0d0d0d] border border-white/[0.07] p-8 transition-all duration-300 hover:border-white/20 hover:-translate-y-1 hover:bg-[#111111]"
    >
      {/* Left accent bar */}
      <div
        className="absolute left-0 top-6 bottom-6 w-[3px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ backgroundColor: accent }}
      />

      <h3 className="text-white font-bold text-xl tracking-tight mb-3">
        {title}
      </h3>

      <p className="text-white/45 text-sm leading-relaxed">
        {description}
      </p>
    </div>
  );
}

export default function UseCases() {
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
    <section className="bg-black py-28 md:py-36 border-t border-white/[0.05]">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <div ref={headerRef} className="text-center mb-14">
          <div className="flex items-center justify-center gap-3 mb-5">
            <span className="w-8 h-px bg-white/20" />
            <span className="text-white/35 text-xs font-medium tracking-[0.3em] uppercase">
              Use Cases
            </span>
            <span className="w-8 h-px bg-white/20" />
          </div>

          <h2 className="text-[3.25rem] font-bold text-white tracking-tight mb-4">
            Proven Success Across Scenarios
          </h2>

          <p className="text-white/45 text-base md:text-lg max-w-md mx-auto leading-relaxed">
            See how we've helped companies like yours
          </p>
        </div>

        {/* 2×2 grid */}
        <div className="grid md:grid-cols-2 gap-4 mb-12">
          {cases.map((c, i) => (
            <CaseCard key={c.title} {...c} delay={i * 100} />
          ))}
        </div>

        {/* CTA */}
        <div className="flex justify-center">
          <button
            onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="group flex items-center gap-3 bg-white text-black px-10 py-4 text-sm font-bold tracking-widest uppercase transition-all duration-300 hover:bg-white/90"
          >
            View All Use Cases
            <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </div>

      </div>
    </section>
  );
}
