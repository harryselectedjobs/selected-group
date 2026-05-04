import { useEffect, useRef } from 'react';

const stats = [
  { value: '1000+', label: 'GTM Placements Delivered' },
  { value: 'US & EU', label: 'Active Markets' },
  { value: 'Sales Leaders', label: 'Executive & IC Hiring' },
  { value: 'Stage-Based', label: 'GTM Talent Matching' },
];

function useScrollReveal(threshold = 0.15) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    el.style.opacity = '0';
    el.style.transform = 'translateY(40px)';

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
        observer.disconnect();
      }
    }, { threshold });

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return ref;
}

export default function About() {
  const leftRef = useScrollReveal();
  const rightRef = useScrollReveal(0.1);

  return (
    <section id="about" className="bg-[#0A0A0A] py-28 md:py-36">
      <div className="max-w-7xl mx-auto px-6">

        {/* Section Label */}
        <div className="flex items-center gap-3 mb-16">
          <span className="w-8 h-px bg-white/30" />
          <span className="text-[#A0A0A0] text-xs font-medium tracking-[0.25em] uppercase">
            GTM Recruitment Expertise
          </span>
        </div>

        <div className="grid md:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* Left */}
          <div ref={leftRef}>
            <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight tracking-tight mb-6">
              Building High-Performing
              <br />
              <span className="text-[#A0A0A0]">GTM Sales Teams</span>
            </h2>

            <p className="text-[#A0A0A0] text-base leading-relaxed mb-5">
              We are an enterprise software sales and go-to-market (GTM) recruitment specialist,
              focused on placing high-impact sales leaders and new logo acquisition talent
              across the US and European markets.
            </p>

            <p className="text-[#A0A0A0] text-base leading-relaxed mb-10">
              With over 1,000 successful placements, we help organisations scale by identifying
              and delivering top-performing individual contributors and aligning GTM leadership
              with the right stage of growth.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-6">
              {stats.map((stat) => (
                <div key={stat.label} className="border-l border-white/10 pl-4">
                  <div className="text-2xl md:text-3xl font-bold text-white mb-1">
                    {stat.value}
                  </div>
                  <div className="text-[#A0A0A0] text-xs tracking-wide uppercase">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right */}
          <div ref={rightRef} className="relative">
            <div className="relative aspect-[4/5] bg-[#111111] overflow-hidden">

              {/* Grid */}
              <div
                className="absolute inset-0 opacity-10"
                style={{
                  backgroundImage:
                    'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
                  backgroundSize: '40px 40px',
                }}
              />

              {/* Center text */}
              <div className="absolute inset-0 flex flex-col items-center justify-center p-10">
                <div className="w-20 h-px bg-white/20 mb-6" />

                <p className="text-white/10 text-5xl font-black tracking-tighter text-center leading-none select-none">
                  GTM<br />TALENT
                </p>

                <div className="w-20 h-px bg-white/20 mt-6" />
              </div>

              {/* Corners */}
              <div className="absolute top-4 left-4 w-8 h-8 border-t border-l border-white/20" />
              <div className="absolute top-4 right-4 w-8 h-8 border-t border-r border-white/20" />
              <div className="absolute bottom-4 left-4 w-8 h-8 border-b border-l border-white/20" />
              <div className="absolute bottom-4 right-4 w-8 h-8 border-b border-r border-white/20" />
            </div>

            <div className="absolute -bottom-3 -right-3 w-full h-full border border-white/5 -z-10" />
          </div>

        </div>
      </div>
    </section>
  );
}
