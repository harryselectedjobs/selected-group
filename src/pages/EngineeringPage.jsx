import { useEffect, useRef, useState } from 'react';
import { ArrowRight, Code2, Server, Database, Shield, TestTube, Users, Cpu, Layers } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const stats = [
  { value: 'CTO', label: 'Executive Level Hiring' },
  { value: 'Full Stack', label: 'Engineering Coverage' },
  { value: 'AI & Cloud', label: 'Specialisms' },
  { value: 'Global', label: 'Talent Networks' },
];

const roleCategories = [
  {
    icon: Layers,
    accent: '#34D399',
    title: 'Engineering Leadership & Architecture',
    description:
      'At the most senior level, we specialise in hiring technical leaders responsible for defining engineering vision, building teams and driving long-term technology strategy.',
    roles: [
      'Chief Technology Officer (CTO)',
      'Chief Information Officer (CIO)',
      'Chief Architect / Head of Architecture',
      'VP Engineering / VP Technology',
      'VP Platform / VP Infrastructure',
      'VP Data Engineering / AI Engineering',
      'Chief Information Security Officer (CISO)',
      'Engineering Directors & Heads of Engineering',
    ],
  },
  {
    icon: Code2,
    accent: '#4F9CF9',
    title: 'Software Engineering',
    description:
      'Core software engineering remains at the centre of any technology organisation. We recruit across all layers of application development, from user interface through to backend systems and APIs.',
    roles: [
      'Frontend Developers (React, Angular, Vue)',
      'Backend Engineers (Java, Python, Go, Node.js, .NET)',
      'Full Stack Engineers',
      'Mobile Engineers (iOS, Android, React Native, Flutter)',
      'Technical Leads and Engineering Managers',
    ],
    tags: ['Frontend', 'Backend', 'Mobile', 'Full Stack'],
  },
  {
    icon: Server,
    accent: '#A78BFA',
    title: 'Platform Engineering, DevOps & Infrastructure',
    description:
      'Modern engineering teams rely heavily on scalable infrastructure and automation. We specialise in engineers who build and maintain the platforms that enable development teams to operate efficiently.',
    roles: [
      'DevOps Engineers',
      'Site Reliability Engineers (SREs)',
      'Platform Engineers',
      'Cloud Engineers (AWS, Azure, GCP)',
      'Infrastructure Engineers',
      'Build and Release Engineers',
    ],
    tags: ['AWS', 'Azure', 'GCP', 'Kubernetes', 'Terraform'],
  },
  {
    icon: Database,
    accent: '#FBBF24',
    title: 'Data Engineering, AI & Machine Learning',
    description:
      'Data has become a core competitive advantage. We work with organisations building advanced data platforms and AI-driven products, recruiting the specialists who design, deploy and scale them.',
    roles: [
      'Data Engineers',
      'Machine Learning Engineers',
      'AI Engineers',
      'Analytics Engineers',
      'Data Platform Engineers',
      'MLOps Engineers',
    ],
    tags: ['Python', 'Spark', 'Snowflake', 'TensorFlow', 'PyTorch'],
  },
  {
    icon: Shield,
    accent: '#F87171',
    title: 'Security Engineering',
    description:
      'With increasing regulatory and cyber risk pressures, security has become a core function within engineering. We place specialists who embed security across the development lifecycle.',
    roles: [
      'Security Engineers',
      'Application Security Engineers',
      'Cloud Security Engineers',
      'DevSecOps Engineers',
      'Security Architects',
    ],
  },
  {
    icon: TestTube,
    accent: '#34D399',
    title: 'QA, Testing & Engineering Excellence',
    description:
      'High-performing engineering teams prioritise quality and reliability. We recruit specialists who ensure software is robust, scalable and production-ready.',
    roles: [
      'QA Engineers',
      'Test Automation Engineers',
      'Software Development Engineers in Test (SDET)',
      'Performance Test Engineers',
    ],
  },
  {
    icon: Users,
    accent: '#4F9CF9',
    title: 'Forward Deployed & Customer-Facing Engineers',
    description:
      'An increasingly important area — engineers who work directly with customers to implement, customise and optimise technology in real-world environments.',
    roles: [
      'Forward Deployed Engineers',
      'Solutions Engineers',
      'Implementation Engineers',
      'Customer Engineers',
      'Technical Consultants',
    ],
    highlight: 'Particularly critical in AI, enterprise SaaS, developer tools and deep tech.',
  },
  {
    icon: Cpu,
    accent: '#A78BFA',
    title: 'Emerging & Specialist Areas',
    description:
      'We stay ahead of the market by covering emerging disciplines that require niche expertise and global talent networks.',
    roles: [
      'Blockchain / Web3 Engineering',
      'AR/VR and Spatial Computing',
      'Edge Computing and IoT',
      'Robotics and Embedded Systems',
      'High-performance and low-latency systems',
    ],
  },
];

const techStack = [
  { category: 'Languages', items: ['Python', 'Java', 'Go', 'JavaScript/TypeScript', 'C++', 'Rust'] },
  { category: 'Frameworks', items: ['React', 'Node.js', 'Spring', '.NET'] },
  { category: 'Cloud', items: ['AWS', 'Azure', 'GCP'] },
  { category: 'Data & AI', items: ['Snowflake', 'BigQuery', 'Kafka', 'TensorFlow', 'PyTorch'] },
  { category: 'DevOps', items: ['Kubernetes', 'Docker', 'Terraform', 'GitHub Actions'] },
];

function useScrollReveal(delay = 0, threshold = 0.08) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.opacity = '0';
    el.style.transform = 'translateY(24px)';
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
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [delay, threshold]);
  return ref;
}

function RoleCard({ icon: Icon, accent, title, description, roles, tags, highlight, delay }) {
  const ref = useScrollReveal(delay);
  const [expanded, setExpanded] = useState(false);
  const visibleRoles = expanded ? roles : roles.slice(0, 4);

  return (
    <div
      ref={ref}
      className="group bg-[#0d0d0d] border border-white/[0.07] p-7 flex flex-col gap-4 transition-all duration-300 hover:border-white/20 hover:-translate-y-1 relative"
    >
      <div
        className="absolute top-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ backgroundColor: accent }}
      />

      <div className="flex items-center gap-4">
        <div
          className="w-11 h-11 flex items-center justify-center flex-shrink-0"
          style={{ backgroundColor: `${accent}18` }}
        >
          <Icon size={20} style={{ color: accent }} />
        </div>
        <h3 className="text-white font-bold text-lg tracking-tight leading-tight">{title}</h3>
      </div>

      <p className="text-white/45 text-sm leading-relaxed">{description}</p>

      <div className="border-t border-white/[0.06] pt-4">
        <p className="text-white/50 text-xs font-medium tracking-widest uppercase mb-3">Key Roles</p>
        <ul className="flex flex-col gap-1.5">
          {visibleRoles.map((role) => (
            <li key={role} className="flex items-center gap-2 text-white/60 text-sm">
              <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: accent }} />
              {role}
            </li>
          ))}
        </ul>
        {roles.length > 4 && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="mt-3 text-xs tracking-widest uppercase transition-colors duration-200"
            style={{ color: `${accent}99` }}
            onMouseEnter={(e) => (e.currentTarget.style.color = accent)}
            onMouseLeave={(e) => (e.currentTarget.style.color = `${accent}99`)}
          >
            {expanded ? 'Show Less' : `+${roles.length - 4} More Roles`}
          </button>
        )}
      </div>

      {tags && (
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="text-xs px-2.5 py-0.5 font-medium"
              style={{ backgroundColor: `${accent}15`, color: accent }}
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {highlight && (
        <p className="text-xs leading-relaxed italic" style={{ color: `${accent}aa` }}>
          {highlight}
        </p>
      )}
    </div>
  );
}

export default function EngineeringPage() {
  const navigate = useNavigate();
  const introRef = useScrollReveal(0, 0.15);
  const statsRef = useScrollReveal(0, 0.1);
  const techRef = useScrollReveal(0, 0.1);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-black min-h-screen">

      {/* Hero banner */}
      <div className="pt-32 pb-16 px-6 relative overflow-hidden bg-black">
        <div
          className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full blur-[140px] pointer-events-none"
          style={{ backgroundColor: 'rgba(13,58,31,0.8)' }}
        />
        <div
          className="absolute bottom-0 -left-20 w-[400px] h-[400px] rounded-full blur-[120px] pointer-events-none"
          style={{ backgroundColor: 'rgba(10,45,24,0.5)' }}
        />
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)',
            backgroundSize: '80px 80px',
          }}
        />
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black to-transparent pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex items-center gap-3 mb-5">
            <span className="w-8 h-px" style={{ backgroundColor: '#34D399' }} />
            <span className="text-xs font-semibold tracking-[0.3em] uppercase" style={{ color: '#34D399' }}>
              Specialist Practice
            </span>
          </div>

          <h1 className="text-[3.25rem] font-bold text-white tracking-tight mb-4 max-w-3xl leading-tight">
            Engineering &{' '}
            <span
              className="text-transparent bg-clip-text"
              style={{ backgroundImage: 'linear-gradient(120deg, #ffffff 30%, #34D399)' }}
            >
              Technology
            </span>
          </h1>

          <p className="text-white/50 text-base md:text-lg max-w-2xl leading-relaxed mb-8">
            A specialist engineering recruitment business operating at the heart of modern technology organisations —
            building the teams responsible for designing, developing, scaling and securing the products that drive
            innovation and growth.
          </p>

          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => {
                navigate('/');
                setTimeout(() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }), 300);
              }}
              className="group flex items-center gap-3 px-8 py-4 text-sm font-bold tracking-widest uppercase transition-all duration-300 hover:opacity-90"
              style={{ backgroundColor: '#34D399', color: '#000' }}
            >
              Hire Engineering Talent
              <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
            </button>
            <button
              onClick={() => {
                navigate('/contact');
                setTimeout(() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }), 300);
              }}
              className="flex items-center gap-2 border border-white/20 text-white px-8 py-4 text-sm font-medium tracking-widest uppercase transition-all duration-300 hover:border-white/50 hover:bg-white/5"
            >
              Submit a Brief
            </button>
          </div>
        </div>
      </div>

      {/* Overview */}
      <div className="max-w-4xl mx-auto px-6 py-12 md:py-16 text-center">
        <div ref={introRef}>
          <div className="flex items-center justify-center gap-3 mb-5">
            <span className="w-8 h-px bg-white/20" />
            <span className="text-white/60 text-xs font-medium tracking-[0.3em] uppercase">Our Focus</span>
            <span className="w-8 h-px bg-white/20" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-6">
            Full Engineering Lifecycle Coverage
          </h2>
          <p className="text-white/45 text-base md:text-lg leading-relaxed max-w-3xl mx-auto">
            Our focus spans the full engineering lifecycle — from architecture and platform design through to product
            delivery, infrastructure, data and security. We partner with high-growth startups, scale-ups and enterprise
            technology businesses to identify and secure talent ranging from senior technical leadership through to
            highly skilled individual contributors.
          </p>
          <p className="text-white/60 text-base leading-relaxed max-w-3xl mx-auto mt-5">
            What differentiates a true specialist in this space is not just role coverage, but a deep understanding of
            the technologies, environments and challenges that define modern engineering organisations.
          </p>
        </div>
      </div>

      {/* Stats banner */}
      <div
        ref={statsRef}
        className="border-t border-white/[0.05] py-14 md:py-18 px-6"
        style={{ background: 'linear-gradient(135deg, #0a1f0f 0%, #0d1a3a 50%, #0a1f0f 100%)' }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {stats.map((s) => (
              <div key={s.label}>
                <div className="text-3xl md:text-4xl font-bold mb-2 tracking-tight" style={{ color: '#34D399' }}>
                  {s.value}
                </div>
                <div className="text-white/45 text-sm font-medium tracking-wide">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Role Categories */}
      <div className="border-t border-white/[0.05] bg-[#030303] py-12 md:py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <div className="flex items-center justify-center gap-3 mb-5">
              <span className="w-8 h-px bg-white/20" />
              <span className="text-white/60 text-xs font-medium tracking-[0.3em] uppercase">Specialisations</span>
              <span className="w-8 h-px bg-white/20" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-3">
              Engineering Role Coverage
            </h2>
            <p className="text-white/40 text-base max-w-md mx-auto">
              From executive leadership to deeply technical individual contributors
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {roleCategories.map((cat, i) => (
              <RoleCard key={cat.title} {...cat} delay={i * 80} />
            ))}
          </div>
        </div>
      </div>

      {/* Technology Ecosystem */}
      <div className="py-12 md:py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div ref={techRef}>
            <div className="text-center mb-14">
              <div className="flex items-center justify-center gap-3 mb-5">
                <span className="w-8 h-px bg-white/20" />
                <span className="text-white/60 text-xs font-medium tracking-[0.3em] uppercase">
                  Technology Ecosystem
                </span>
                <span className="w-8 h-px bg-white/20" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-3">
                Our Technology Focus
              </h2>
              <p className="text-white/40 text-base max-w-lg mx-auto">
                Deep expertise across modern technology stacks enables us to accurately assess candidates and advise
                clients as a credible technical partner
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {techStack.map((stack) => (
                <div
                  key={stack.category}
                  className="bg-[#0d0d0d] border border-white/[0.07] p-6 hover:border-white/15 transition-all duration-300"
                >
                  <p
                    className="text-xs font-bold tracking-widest uppercase mb-4"
                    style={{ color: '#34D399' }}
                  >
                    {stack.category}
                  </p>
                  <ul className="flex flex-col gap-2">
                    {stack.items.map((item) => (
                      <li key={item} className="text-white/55 text-sm flex items-center gap-2">
                        <span className="w-1 h-1 rounded-full bg-white/20 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="border-t border-white/[0.05] py-20 px-6 text-center relative overflow-hidden">
        <div
          className="absolute -top-40 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full blur-[140px] pointer-events-none opacity-30"
          style={{ backgroundColor: 'rgba(13,58,31,0.9)' }}
        />
        <div className="max-w-xl mx-auto relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-4">
            Build Your Engineering Team
          </h2>
          <p className="text-white/45 text-base leading-relaxed mb-10">
            Whether you're scaling a product team or hiring a CTO, let's find the right engineers for your
            organisation.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => {
                navigate('/');
                setTimeout(() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }), 300);
              }}
              className="group inline-flex items-center gap-3 bg-white text-black px-8 py-4 text-sm font-bold tracking-widest uppercase transition-all duration-300 hover:bg-white/90 w-full sm:w-auto justify-center"
            >
              Start a Search
              <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-1" />
            </button>
            <button
              onClick={() => navigate('/engagement-models')}
              className="flex items-center justify-center px-8 py-4 text-sm font-medium tracking-widest uppercase border border-white/20 text-white/70 hover:border-white/50 hover:text-white transition-all duration-300 w-full sm:w-auto"
            >
              View Engagement Models
            </button>
          </div>
        </div>
      </div>

    </div>
  );
}
