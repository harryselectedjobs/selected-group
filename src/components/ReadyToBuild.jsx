import { useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';

export default function ReadyToBuild() {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
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
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="relative bg-black py-4 md:py-6">
      {/* Full-width gradient banner */}
      <div
        className="relative overflow-hidden py-20 md:py-28 px-6 bg-[#080808]"
      >
        {/* Subtle grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)',
            backgroundSize: '80px 80px',
          }}
        />

        {/* Glow orbs */}
        <div className="absolute -top-20 -left-20 w-96 h-96 rounded-full blur-[130px] opacity-25 pointer-events-none"
          style={{ backgroundColor: 'rgba(13,42,94,0.9)' }} />
        <div className="absolute -bottom-20 -right-20 w-80 h-80 rounded-full blur-[120px] opacity-20 pointer-events-none"
          style={{ backgroundColor: 'rgba(45,27,105,0.7)' }} />

        {/* Content */}
        <div ref={ref} className="relative z-10 text-center max-w-2xl mx-auto">
          <h2 className="text-[3.25rem] font-bold text-white tracking-tight mb-4">
            Ready to Build Your Team?
          </h2>

          <p className="text-white/70 text-base md:text-lg leading-relaxed mb-10 max-w-md mx-auto">
            Let's discuss your hiring needs and find the right approach for your organisation.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            {/* Primary */}
            <button
              onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="group flex items-center gap-3 bg-white text-black px-8 py-4 text-sm font-bold tracking-widest uppercase transition-all duration-300 hover:bg-white/90 w-full sm:w-auto justify-center"
            >
              Build Your Team
              <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-1" />
            </button>

            {/* Secondary */}
            <button
              onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="flex items-center justify-center gap-2 px-8 py-4 text-sm font-bold tracking-widest uppercase border border-white/20 text-white/70 hover:border-white/50 hover:text-white transition-all duration-300 w-full sm:w-auto"
            >
              Talk to an Expert
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
