import { useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import VideoPageHero from '../components/VideoPageHero';

const practices = [
  {
    id: 'gtm',
    number: '01',
    title: 'GTM Talent',
    subtitle: 'Enterprise sales, solutions engineering & revenue operations',
    description: 'We are an enterprise software sales and go-to-market recruitment specialist. From CRO search through to enterprise AEs, solutions engineers and revenue operations — we cover the full commercial function across US and European markets.',
    path: '/use-cases/gtm',
    stats: [
      { value: '1,000+', label: 'Placements' },
      { value: 'CRO → SDR', label: 'Seniority' },
      { value: 'US & EU', label: 'Markets' },
    ],
    roles: ['Chief Revenue Officer', 'VP Enterprise Sales', 'Enterprise Account Executive', 'Solutions Engineer', 'Revenue Operations', 'Customer Success'],
  },
  {
    id: 'product',
    number: '02',
    title: 'Product Management',
    subtitle: 'Executive product leadership through to specialist PMs and UX',
    description: 'Product management sits at the centre of every successful technology business. We operate across the full product lifecycle — from early-stage product-market fit through to scaling product organisations at Series C and beyond.',
    path: '/use-cases/product-management',
    stats: [
      { value: 'CPO → PM', label: 'Seniority' },
      { value: 'SaaS & AI', label: 'Specialisms' },
      { value: 'Seed to IPO', label: 'All stages' },
    ],
    roles: ['Chief Product Officer', 'VP Product', 'Head of Product', 'Senior PM', 'AI Product Manager', 'UX & Product Design'],
  },
  {
    id: 'engineering',
    number: '03',
    title: 'Engineering & Technology',
    subtitle: 'Full engineering spectrum from CTO to individual contributor',
    description: 'We partner with high-growth startups, scale-ups and enterprise technology businesses to build the engineering teams responsible for designing, developing, scaling and securing the products that drive innovation.',
    path: '/use-cases/engineering',
    stats: [
      { value: 'CTO → IC', label: 'Seniority' },
      { value: '7 Disciplines', label: 'Focus areas' },
      { value: 'All Stages', label: 'Coverage' },
    ],
    roles: ['Chief Technology Officer', 'VP Engineering', 'ML Engineer', 'Platform / DevOps', 'Security Engineer', 'Forward Deployed Engineer'],
  },
  {
    id: 'professional',
    number: '04',
    title: 'Professional Services',
    subtitle: 'Implementation, consulting and delivery talent globally',
    description: 'Professional services talent transforms technology from a product into a business outcome. We cover the full services lifecycle — from pre-sales and solution design through to implementation, transformation and long-term customer success.',
    path: '/use-cases/professional-services',
    stats: [
      { value: 'CSO → PM', label: 'Seniority' },
      { value: 'Global', label: 'Delivery' },
      { value: 'ERP & SaaS', label: 'Specialisms' },
    ],
    roles: ['Chief Services Officer', 'VP Professional Services', 'Programme Director', 'Implementation Consultant', 'Solutions Architect', 'Business Analyst'],
  },
];

const scenarios = [
  { title: 'Post-Funding Scale', description: 'Series A/B companies doubling or tripling team size in 12–18 months.', fit: 'RPO' },
  { title: 'First Leadership Hire', description: 'Startups hiring their first Head of Engineering, CPO, CRO or CDO.', fit: 'Retained' },
  { title: 'Building New Functions', description: 'Establishing product, data, engineering or professional services teams from zero.', fit: 'Retained + Contingency' },
  { title: 'Backfilling Critical Roles', description: 'Replacing senior engineers, PMs or sales leaders who have departed. Time-sensitive.', fit: 'Contingency' },
  { title: 'Project-Based Staffing', description: 'Contract hiring for implementation projects or consulting engagements.', fit: 'Contract / SoW' },
  { title: 'Enterprise Market Entry', description: 'Building the enterprise sales motion and solutions engineering capability from the ground up.', fit: 'Retained + Contingency' },
];

const sectionLabel = (text) => (
  <div className="flex items-center gap-3 mb-4">
    <span className="w-6 h-px bg-white/20" />
    <span className="text-white/38 text-[10px] sm:text-xs tracking-[0.3em] uppercase">{text}</span>
  </div>
);

export default function UseCasesPage() {
  const navigate = useNavigate();
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="bg-black min-h-screen">

      <VideoPageHero
        videoId="qz9ADlOqqs8"
        eyebrow="Use Cases"
        title="Expertise"
        titleAccent="in Practice"
        description="Full case studies, role breakdowns and reference networks across our four practice areas — GTM Talent, Product Management, Engineering & Technology, and Professional Services."
        stats={[
          { value: '4', label: 'Practice areas' },
          { value: 'Seed to IPO', label: 'All stages' },
          { value: 'US & EU', label: 'Markets' },
          { value: 'Retained & RPO', label: 'Engagements' },
        ]}
      />

      {/* Practice area cards */}
      <div className="px-5 sm:px-8 md:px-12 py-12 sm:py-16">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col gap-1">
            {practices.map((p) => (
              <div
                key={p.id}
                className="group border border-white/[0.06] bg-[#040404] hover:bg-[#070707] hover:border-white/[0.12] transition-all duration-300 cursor-pointer"
                onClick={() => navigate(p.path)}
              >
                <div className="p-6 sm:p-8 md:p-10">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 mb-6 sm:mb-8">
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-4">
                        <span className="text-white/20 text-xs font-mono tracking-wider">{p.number}</span>
                        <span className="w-6 h-px bg-white/15" />
                        <span className="text-white/35 text-[10px] sm:text-xs tracking-[0.2em] uppercase">{p.subtitle}</span>
                      </div>
                      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight mb-3">{p.title}</h2>
                      <p className="text-white/40 text-sm leading-relaxed max-w-2xl">{p.description}</p>
                    </div>

                    <div className="flex items-center gap-0 flex-shrink-0">
                      {p.stats.map((stat, i) => (
                        <div key={stat.label} className={`pr-5 sm:pr-6 ${i !== 0 ? 'pl-5 sm:pl-6 border-l border-white/10' : ''}`}>
                          <div className="text-sm sm:text-base font-bold text-white">{stat.value}</div>
                          <div className="text-white/30 text-[9px] sm:text-[10px] tracking-[0.18em] uppercase mt-0.5">{stat.label}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-5 sm:pt-6 border-t border-white/[0.05]">
                    <div className="flex flex-wrap gap-2">
                      {p.roles.map((role) => (
                        <span key={role} className="text-white/30 text-[10px] sm:text-xs px-2.5 sm:px-3 py-1 border border-white/[0.07] bg-black/40">{role}</span>
                      ))}
                    </div>
                    <button
                      onClick={(e) => { e.stopPropagation(); navigate(p.path); }}
                      className="group/btn flex items-center gap-2 text-white/50 text-[10px] sm:text-xs font-medium tracking-widest uppercase hover:text-white transition-colors duration-200 flex-shrink-0"
                    >
                      View Case Studies
                      <ArrowRight size={13} className="transition-transform duration-200 group-hover/btn:translate-x-1" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Common Hiring Scenarios */}
      <div className="border-t border-white/[0.05] bg-[#030303] py-12 sm:py-16 px-5 sm:px-8 md:px-12">
        <div className="max-w-7xl mx-auto">
          {sectionLabel('Scenarios')}
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight mb-2">Common Hiring Scenarios</h2>
          <p className="text-white/38 text-sm mb-10 max-w-xl">Patterns we see repeatedly across clients at different stages and sizes.</p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {scenarios.map((s) => (
              <div key={s.title} className="bg-[#070707] border border-white/[0.07] p-6 sm:p-7 hover:border-white/15 transition-all duration-300">
                <h4 className="text-white font-semibold text-sm tracking-tight mb-2">{s.title}</h4>
                <p className="text-white/38 text-xs leading-relaxed mb-4">{s.description}</p>
                <div className="flex items-center gap-2">
                  <span className="text-white/20 text-[10px] tracking-widest uppercase">Best fit:</span>
                  <span className="text-white/55 text-[10px] font-semibold tracking-wide">{s.fit}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="border-t border-white/[0.05] py-16 sm:py-20 px-5 sm:px-8 md:px-12 text-center">
        <div className="max-w-xl mx-auto">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight mb-4">
            Recognise Your Scenario?
          </h2>
          <p className="text-white/40 text-sm leading-relaxed mb-8 sm:mb-10">
            Let's discuss your specific hiring challenge and design the right approach for your stage, market and timeline.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => { navigate('/'); setTimeout(() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }), 300); }}
              className="group flex items-center gap-3 bg-white text-black px-7 sm:px-8 py-3.5 sm:py-4 text-xs font-bold tracking-widest uppercase hover:bg-white/90 transition-all duration-300 w-full sm:w-auto justify-center"
            >
              Discuss Your Needs
              <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
            </button>
            <button
              onClick={() => navigate('/engagement-models')}
              className="flex items-center justify-center px-7 sm:px-8 py-3.5 sm:py-4 text-xs font-medium tracking-widest uppercase border border-white/18 text-white/60 hover:border-white/40 hover:text-white transition-all duration-300 w-full sm:w-auto"
            >
              Compare Engagement Models
            </button>
          </div>
        </div>
      </div>

    </div>
  );
}
