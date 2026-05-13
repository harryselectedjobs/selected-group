import { useEffect, useRef } from 'react';
import { CheckCircle2 } from 'lucide-react';

const testimonials = [
  {
    stars: 5,
    quote:
      '"They helped us scale from 15 to 100 engineers in 18 months. Their understanding of our technical needs was exceptional."',
    name: 'Sarah Chen',
    role: 'VP Engineering, Celonis',
    accent: '#34D399',
  },
  {
    stars: 5,
    quote:
      '"Finding the right CPO was critical for our Series B. They delivered three exceptional candidates within weeks."',
    name: 'Michael Roberts',
    role: 'CEO, TechVenture',
    accent: '#A78BFA',
  },
  {
    stars: 5,
    quote:
      '"Their professional services team helped us build out our entire implementation practice. True specialists."',
    name: 'David Martinez',
    role: 'Head of Delivery, Oracle',
    accent: '#FBBF24',
  },
];

function TestimonialCard({ stars, quote, name, role, accent, delay }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.opacity = '0';
    el.style.transform = 'translateY(32px)';

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
      className="group relative bg-[#0d0d0d] border border-white/[0.07] p-8 flex flex-col gap-6 transition-all duration-500 hover:border-white/20 hover:-translate-y-1"
    >
      {/* Top accent line on hover */}
      <div
        className="absolute top-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ backgroundColor: accent }}
      />

      {/* Stars */}
      <div className="flex items-center gap-1.5">
        {Array.from({ length: stars }).map((_, i) => (
          <CheckCircle2 key={i} size={18} style={{ color: accent }} />
        ))}
      </div>

      {/* Quote */}
      <p className="text-white/70 text-base leading-relaxed flex-1">
        {quote}
      </p>

      {/* Attribution */}
      <div className="border-t border-white/[0.07] pt-5">
        <p className="text-white font-semibold text-sm tracking-tight">{name}</p>
        <p className="text-sm mt-0.5" style={{ color: accent }}>
          {role}
        </p>
      </div>
    </div>
  );
}

export default function Testimonials() {
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
    <section className="bg-black py-16 md:py-20 border-t border-white/[0.05]">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <div ref={headerRef} className="mb-14">
          <div className="flex items-center gap-3 mb-5">
            <span className="w-8 h-px bg-white/30" />
            <span className="text-white/60 text-xs font-medium tracking-[0.3em] uppercase">
              Client Testimonials
            </span>
          </div>

          <h2 className="text-[3.25rem] font-bold text-white leading-tight tracking-tight max-w-2xl">
            Don't take our word for it —{' '}
            <span className="text-white/50">hear from our customers</span>
          </h2>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-4">
          {testimonials.map((t, i) => (
            <TestimonialCard key={t.name} {...t} delay={i * 120} />
          ))}
        </div>

      </div>
    </section>
  );
}
