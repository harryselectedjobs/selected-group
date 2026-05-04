import { useEffect, useRef } from 'react';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Hero() {
  const headlineRef = useRef(null);
  const subtextRef = useRef(null);
  const ctaRef = useRef(null);
  const badgeRef = useRef(null);

  const navigate = useNavigate();

  useEffect(() => {
    const elements = [
      badgeRef.current,
      headlineRef.current,
      subtextRef.current,
      ctaRef.current,
    ];

    elements.forEach((el, i) => {
      if (!el) return;

      el.style.opacity = '0';
      el.style.transform = 'translateY(30px)';

      setTimeout(() => {
        el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      }, 200 + i * 180);
    });
  }, []);

  const scrollToAbout = () => {
    document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col items-center justify-center bg-black overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-white/[0.03] rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>

      {/* Grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage:
            'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
          backgroundSize: '80px 80px',
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">

        {/* Badge */}
        <div ref={badgeRef} className="inline-flex items-center gap-2 mb-8">
          <span className="w-6 h-px bg-[#A0A0A0]" />
          <span className="text-[#A0A0A0] text-xs font-medium tracking-[0.25em] uppercase">
            GTM Recruitment Specialists
          </span>
          <span className="w-6 h-px bg-[#A0A0A0]" />
        </div>

        {/* Heading */}
        <h1
          ref={headlineRef}
          className="text-5xl md:text-7xl lg:text-8xl font-bold text-white leading-[1.05] tracking-tight mb-6"
        >
          Hiring the Best
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#E0E0E0] to-[#A0A0A0]">
            GTM Talent
          </span>
        </h1>

        {/* Subtext */}
        <p
          ref={subtextRef}
          className="text-[#A0A0A0] text-lg md:text-xl font-light max-w-2xl mx-auto leading-relaxed mb-12"
        >
          We are an enterprise software sales and go-to-market recruitment specialist,
          placing high-performing sales leaders and new logo acquisition talent across
          the US and European markets with over 1,000 successful placements.
        </p>

        {/* CTA Buttons */}
        <div
          ref={ctaRef}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          {/* Primary */}
          <button
            onClick={() =>
              document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })
            }
            className="group flex items-center gap-2 bg-white text-black px-8 py-4 text-sm font-semibold tracking-wide uppercase transition-all duration-300 hover:bg-[#E0E0E0]"
          >
            Find GTM Talent
            <ArrowRight
              size={16}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </button>

          {/* Secondary */}
          <button
            onClick={() =>
              document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' })
            }
            className="flex items-center gap-2 border border-white/20 text-white px-8 py-4 text-sm font-medium tracking-wide uppercase transition-all duration-300 hover:border-white/50 hover:bg-white/5"
          >
            Our Expertise
          </button>

          {/* 🔥 NEW CRM BUTTON */}
          <button
            onClick={() => navigate('/crm')}
            className="flex items-center gap-2 border border-white/10 text-white px-8 py-4 text-sm font-medium tracking-wide uppercase transition-all duration-300 hover:border-white hover:bg-white/10"
          >
            Open CRM
          </button>
        </div>
      </div>

      {/* Scroll indicator */}
      <button
        onClick={scrollToAbout}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/30 hover:text-white/60 transition-colors duration-300 animate-bounce"
        aria-label="Scroll down"
      >
        <ChevronDown size={24} />
      </button>
    </section>
  );
}
