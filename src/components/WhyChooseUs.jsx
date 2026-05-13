import { useEffect, useRef } from 'react';
import { Shield, Gem, Zap, Users } from 'lucide-react';

const features = [
  {
    icon: Shield,
    title: 'Trusted Executive Search Partner',
    description:
      'We work with SaaS and enterprise companies to hire critical GTM talent, trusted with confidential leadership and revenue-critical hiring mandates across US and EU markets.',
  },
  {
    icon: Gem,
    title: 'Precision Talent Matching',
    description:
      'Every candidate is rigorously evaluated for performance, cultural fit, and stage alignment — ensuring only high-impact GTM professionals are introduced.',
  },
  {
    icon: Zap,
    title: 'Fast, High-Impact Hiring',
    description:
      'We reduce time-to-hire for critical sales roles by leveraging deep GTM networks across enterprise SaaS, scaleups, and high-growth startups.',
  },
  {
    icon: Users,
    title: 'Embedded GTM Expertise',
    description:
      'We operate as an extension of your hiring team, understanding revenue goals, sales motion, and organizational structure to deliver the right talent fit.',
  },
];

function FeatureBlock({ icon: Icon, title, description, index }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          el.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
          el.style.opacity = '1';
          el.style.transform = 'translateY(0)';
        }, index * 120);

        observer.disconnect();
      }
    }, { threshold: 0.1 });

    observer.observe(el);
    return () => observer.disconnect();
  }, [index]);

  return (
    <div ref={ref} className="flex gap-5 group">
      <div className="flex-shrink-0 mt-1">
        <div className="w-10 h-10 bg-white/5 flex items-center justify-center group-hover:bg-white/10 transition-colors duration-300">
          <Icon size={18} className="text-white/50 group-hover:text-white/80" />
        </div>
      </div>

      <div>
        <h3 className="text-white font-semibold text-base mb-2 tracking-tight">
          {title}
        </h3>
        <p className="text-white/65 text-sm leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
}

export default function WhyChooseUs() {
  const leftRef = useRef(null);

  useEffect(() => {
    const el = leftRef.current;
    if (!el) return;

    el.style.opacity = '0';
    el.style.transform = 'translateX(-30px)';

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        el.style.opacity = '1';
        el.style.transform = 'translateX(0)';
        observer.disconnect();
      }
    }, { threshold: 0.2 });

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="bg-black py-16 md:py-20 border-t border-white/[0.05]">
      <div className="max-w-7xl mx-auto px-6">

        <div className="grid md:grid-cols-2 gap-16 lg:gap-28 items-start">

          {/* Left */}
          <div ref={leftRef}>

            <div className="flex items-center gap-3 mb-6">
              <span className="w-8 h-px bg-white/30" />
              <span className="text-white/65 text-xs font-medium tracking-[0.25em] uppercase">
                GTM Recruitment Advantage
              </span>
            </div>

            <h2 className="text-[3.25rem] font-bold text-white leading-tight tracking-tight mb-6">
              Why Top SaaS Companies
              <br />
              <span className="text-white/65">Choose Us</span>
            </h2>

            <p className="text-white/65 text-base leading-relaxed mb-10">
              We specialize in placing high-performing GTM talent — from sales leaders to
              enterprise account executives — helping companies scale revenue teams with precision.
            </p>

            <div className="border-l-2 border-white/10 pl-6">
              <p className="text-white/60 text-sm italic leading-relaxed">
                "They consistently delivered high-caliber GTM talent that matched both our growth stage and sales motion."
              </p>
              <p className="text-white/65 text-xs mt-3 tracking-wide uppercase">
                — VP Sales, Enterprise SaaS Client
              </p>
            </div>

          </div>

          {/* Right */}
          <div className="flex flex-col gap-8">
            {features.map((feature, i) => (
              <FeatureBlock key={feature.title} {...feature} index={i} />
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
