import { useEffect, useRef } from 'react';
import { ArrowUpRight } from 'lucide-react';

const projects = [
  {
    title: 'VP Sales Placement – Series C SaaS',
    category: 'Executive Search',
    image:
      'https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    title: 'Enterprise Account Executive Hiring (US Market)',
    category: 'GTM Talent Acquisition',
    image:
      'https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    title: 'New Logo Sales Team Buildout – SaaS Scaleup',
    category: 'Sales Team Scaling',
    image:
      'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    title: 'CRO Search – Enterprise Software Company',
    category: 'Leadership Hiring',
    image:
      'https://images.pexels.com/photos/325185/pexels-photo-325185.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    title: 'SDR Leadership Hiring – EU Expansion',
    category: 'Market Expansion Hiring',
    image:
      'https://images.pexels.com/photos/1427541/pexels-photo-1427541.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    title: 'Full GTM Team Build – Seed to Series B SaaS',
    category: 'End-to-End GTM Hiring',
    image:
      'https://images.pexels.com/photos/356040/pexels-photo-356040.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
];

function ProjectCard({ title, category, image, delay }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';

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
      { threshold: 0.05 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <div
      ref={ref}
      className="group relative aspect-[4/3] overflow-hidden cursor-pointer"
    >
      <img
        src={image}
        alt={title}
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 filter grayscale group-hover:grayscale-0"
      />

      <div className="absolute inset-0 bg-black/50 group-hover:bg-black/30 transition-colors duration-500" />

      <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-400 flex items-end">
        <div className="p-6 w-full">
          <div className="text-white/50 text-xs tracking-widest uppercase mb-2">
            {category}
          </div>

          <div className="flex items-center justify-between">
            <h3 className="text-white font-semibold text-base leading-tight max-w-[80%]">
              {title}
            </h3>
            <ArrowUpRight size={18} className="text-white flex-shrink-0" />
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-5 group-hover:opacity-0 transition-opacity duration-300">
        <div className="text-white/40 text-xs tracking-widest uppercase mb-1">
          {category}
        </div>
        <h3 className="text-white font-medium text-sm">{title}</h3>
      </div>
    </div>
  );
}

export default function Projects() {
  const headerRef = useRef(null);

  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;

    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)'; // ✅ FIXED

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
    <section id="projects" className="bg-[#0A0A0A] py-16 md:py-20 border-t border-white/[0.05]">
      <div className="max-w-7xl mx-auto px-6">

        <div
          ref={headerRef}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14"
        >
          <div className="max-w-xl">
            <div className="flex items-center gap-3 mb-6">
              <span className="w-8 h-px bg-white/30" />
              <span className="text-[#A0A0A0] text-xs font-medium tracking-[0.25em] uppercase">
                GTM Placements
              </span>
            </div>

            <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight tracking-tight">
              Leadership Hires & GTM Builds
            </h2>
          </div>

          <p className="text-[#A0A0A0] text-sm max-w-xs leading-relaxed">
            Executive search and GTM hiring across SaaS, enterprise software, and scaleups in US & Europe.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {projects.map((project, i) => (
            <ProjectCard key={project.title} {...project} delay={i * 80} />
          ))}
        </div>

      </div>
    </section>
  );
}
