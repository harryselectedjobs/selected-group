import { useEffect } from 'react';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import VideoPageHero from '../components/VideoPageHero';
import LogoTileGrid from '../components/LogoTileGrid';

const roleCategories = [
  { category: 'Executive Product Leadership', roles: ['Chief Product Officer (CPO)', 'Chief Digital Officer (CDO)', 'Chief Experience Officer (CXO)', 'Chief Product & Technology Officer (CPTO)', 'VP Product / VP Product Management', 'VP Product Strategy / VP Growth Product', 'VP Product Design'] },
  { category: 'Product Leadership & Strategy', roles: ['Product Directors', 'Heads of Product', 'Group Product Managers', 'Principal Product Managers', 'Lead Product Managers', 'Heads of Product Strategy', 'Heads of Product Operations', 'Heads of Growth Product', 'Heads of Data or AI Product'] },
  { category: 'Core Product Management', roles: ['Product Managers', 'Senior Product Managers', 'Technical Product Managers', 'Platform Product Managers', 'Digital Product Managers', 'Growth Product Managers', 'Data & AI Product Managers'] },
  { category: 'Product Ownership & Agile', roles: ['Product Owners', 'Scrum Product Owners', 'Agile Product Specialists'] },
  { category: 'Product Operations & Enablement', roles: ['Product Operations Managers', 'Product Operations Directors', 'Product Analysts', 'Product Enablement Specialists'] },
  { category: 'Product Design, UX & Research', roles: ['UX Designers', 'Product Designers', 'UX Researchers', 'Service Designers', 'Interaction Designers'] },
  { category: 'Platform, Data & AI Product', roles: ['Platform Product Managers', 'API Product Managers', 'Data Product Managers', 'AI / ML Product Managers'] },
];

const caseStudies = [
  {
    index: '01', label: 'Developer Tools',
    title: 'Establishing a Product Function in an Engineering-Led Company',
    context: 'Series B · Developer Tools · UK',
    challenge: 'An engineering-led developer tools company had no dedicated product management function. With its Series B closed and an enterprise go-to-market motion beginning, it needed its first Head of Product — someone who could establish product culture, introduce roadmap discipline and build a team from scratch without alienating a technically sophisticated founding team.',
    approach: 'Retained executive search focused on candidates who had previously established product functions within engineering-led environments. We mapped individuals at the intersection of engineering and product — often from developer infrastructure companies — and ran a structured assessment covering product vision, stakeholder management and cultural fit.',
    outcome: 'Head of Product placed within 11 weeks through proactive outreach. Within 12 months: 5 additional PMs hired, quarterly roadmap process introduced, two major features launched directly credited with accelerating enterprise pipeline growth.',
    metrics: [{ value: '11 weeks', label: 'Time to Hire' }, { value: '5 PMs', label: 'Team Built' }, { value: 'Series C', label: 'Next Milestone' }],
  },
  {
    index: '02', label: 'Enterprise SaaS',
    title: 'Scaling a Product Organisation Post-Series C',
    context: 'Series C · Enterprise SaaS · US & UK',
    challenge: 'A high-growth enterprise SaaS business needed to scale its product organisation from three to twenty product managers across multiple product lines including core platform, data, integrations and a newly prioritised AI product area. AI product talent was in extremely short supply in the market.',
    approach: 'A blended engagement combining retained search for senior roles (Head of Product, Head of AI Product) and contingency for individual contributors. For AI product roles we specifically targeted candidates with engineering backgrounds who had transitioned into product — individuals who could credibly own AI roadmaps and work directly with ML engineering teams.',
    outcome: '17 product managers placed over nine months, including Head of Product, Head of AI Product and 15 PMs across core and specialist tracks. The AI product line shipped its first three features within two quarters of the team being assembled.',
    metrics: [{ value: '17', label: 'PMs Placed' }, { value: '9 months', label: 'Programme' }, { value: '3 AI Features', label: 'Shipped in Q1' }],
  },
  {
    index: '03', label: 'AI-First Platform',
    title: 'CPO Search at a Hypergrowth AI Business',
    context: 'Series C · AI Platform · US',
    challenge: 'A hypergrowth AI business needed its first Chief Product Officer ahead of an enterprise go-to-market push. The search was confidential and time-sensitive ahead of a major funding announcement. The CPO needed to translate AI capabilities into a structured product portfolio and build a product organisation from scratch.',
    approach: 'Fully retained executive search with a defined six-week shortlist commitment. We mapped CPO and VP Product profiles at AI-native companies, enterprise SaaS scale-ups and developer platform businesses. Structured reference and assessment processes ran on all final candidates.',
    outcome: 'CPO placed within eight weeks from brief. Within six months the CPO had defined the company\'s product vision, restructured the product organisation and built a team of eight PMs. Immediate credibility with both the board and prospective enterprise customers.',
    metrics: [{ value: '8 weeks', label: 'Search Duration' }, { value: 'CPO', label: 'Role Level' }, { value: '8 PMs', label: 'Team Built' }],
  },
];

const logoGroups = [
  {
    label: 'SaaS & Enterprise Software',
    logos: [
      { name: 'monday.com', slug: 'monday' }, { name: 'Freshworks', slug: 'freshworks' },
      { name: 'Celonis', slug: 'celonis' }, { name: 'Apptio', slug: 'apptio' },
      { name: 'Flexera', slug: 'flexera' }, { name: 'Palantir', slug: 'palantir' },
      { name: 'Confluent', slug: 'confluent' }, { name: 'Fivetran', slug: 'fivetran' },
    ],
  },
  {
    label: 'Fintech & Commercial Platforms',
    logos: [
      { name: 'Brex', slug: 'brex' }, { name: 'Ramp', slug: 'ramp' },
      { name: 'Airwallex', slug: 'airwallex' }, { name: 'Mercury', slug: 'mercury' },
      { name: 'Marqeta', slug: 'marqeta' }, { name: 'Plaid', slug: 'plaid' },
      { name: 'Mambu', slug: 'mambu' }, { name: 'Sardine', slug: 'sardine' },
    ],
  },
  {
    label: 'AI & Intelligent Platforms',
    logos: [
      { name: 'Anthropic', slug: 'anthropic' }, { name: 'Cognition AI', slug: 'cognition-ai' },
      { name: 'Relevance AI', slug: 'relevance-ai' }, { name: 'Aisera', slug: 'aisera' },
      { name: 'Sierra', slug: 'sierra' }, { name: 'Moveworks', slug: 'moveworks' },
      { name: 'Adept AI', slug: 'adept-ai' }, { name: 'Abnormal AI', slug: 'abnormal-ai' },
    ],
  },
];

const contextAreas = [
  { label: 'Product Environments', items: ['SaaS & Enterprise Software', 'AI & ML Platforms', 'Fintech', 'Developer Tools', 'Data & Analytics', 'Marketplace & Consumer'] },
  { label: 'Methodologies', items: ['Agile & Scrum', 'Product-Led Growth', 'Jobs-to-be-Done', 'OKRs', 'Continuous Discovery', 'Dual-Track Agile'] },
  { label: 'Tools & Platforms', items: ['Jira / Linear', 'Figma / Miro', 'Amplitude / Mixpanel', 'Productboard', 'Segment', 'LaunchDarkly'] },
];

const sectionLabel = (text) => (
  <div className="flex items-center gap-3 mb-4">
    <span className="w-6 h-px bg-white/20" />
    <span className="text-white/38 text-[10px] sm:text-xs tracking-[0.3em] uppercase">{text}</span>
  </div>
);

export default function ProductCasesPage() {
  const navigate = useNavigate();
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="bg-black min-h-screen">

      <VideoPageHero
        videoId="zwUsFN__jtE"
        breadcrumb={[{ label: 'Use Cases', path: '/use-cases' }, { label: 'Product Management' }]}
        eyebrow="Case Studies"
        title="Product"
        titleAccent="Management"
        description="Product management sits at the centre of every successful technology business — connecting customer needs, commercial strategy and engineering execution. We operate across the full product lifecycle, from early-stage product-market fit through to scaling product organisations at Series C and beyond."
        stats={[
          { value: 'CPO → PM', label: 'Full seniority' },
          { value: 'US & EU', label: 'Markets' },
          { value: 'SaaS & AI', label: 'Core specialisms' },
          { value: 'Seed to IPO', label: 'All stages' },
        ]}
      />

      {/* Role Coverage */}
      <div className="py-12 sm:py-16 px-5 sm:px-8 md:px-12 bg-[#030303] border-b border-white/[0.05]">
        <div className="max-w-7xl mx-auto">
          {sectionLabel('Coverage')}
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight mb-2">Roles We Cover</h2>
          <p className="text-white/38 text-sm mb-10 max-w-xl">Across the full product spectrum — from executive leadership through to specialist PMs and UX professionals.</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {roleCategories.map((cat) => (
              <div key={cat.category} className="bg-[#0a0a0a] border border-white/[0.07] p-5 sm:p-6">
                <h3 className="text-white font-semibold text-sm tracking-wide mb-4 pb-3 border-b border-white/[0.07]">{cat.category}</h3>
                <ul className="space-y-2">
                  {cat.roles.map((role) => (
                    <li key={role} className="text-white/38 text-xs leading-relaxed flex items-start gap-2">
                      <span className="text-white/18 mt-0.5 flex-shrink-0">—</span>{role}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Case Studies */}
      <div className="py-12 sm:py-16 px-5 sm:px-8 md:px-12 border-b border-white/[0.05]">
        <div className="max-w-7xl mx-auto">
          {sectionLabel('Case Studies')}
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight mb-10">Engagements in Detail</h2>
          <div className="flex flex-col gap-10 sm:gap-12">
            {caseStudies.map((cs) => (
              <div key={cs.index} className="border border-white/[0.07] bg-[#050505]">
                <div className="p-6 sm:p-8 border-b border-white/[0.05] flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-white/20 text-xs font-mono">{cs.index}</span>
                      <span className="w-5 h-px bg-white/15" />
                      <span className="text-white/38 text-[10px] tracking-widest uppercase">{cs.label}</span>
                    </div>
                    <h3 className="text-white font-bold text-lg sm:text-xl md:text-2xl tracking-tight mb-1">{cs.title}</h3>
                    <p className="text-white/28 text-xs tracking-wide">{cs.context}</p>
                  </div>
                  <div className="flex items-center gap-0 flex-shrink-0">
                    {cs.metrics.map((m, i) => (
                      <div key={m.label} className={`pr-5 ${i !== 0 ? 'pl-5 border-l border-white/10' : ''}`}>
                        <div className="text-base sm:text-lg font-bold text-white">{m.value}</div>
                        <div className="text-white/28 text-[9px] tracking-[0.18em] uppercase mt-0.5">{m.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="grid sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-white/[0.05]">
                  {[{ label: 'The Challenge', text: cs.challenge }, { label: 'Our Approach', text: cs.approach }, { label: 'Outcome', text: cs.outcome }].map(({ label, text }) => (
                    <div key={label} className="p-6 sm:p-8">
                      <p className="text-white/60 text-[10px] font-semibold tracking-[0.2em] uppercase mb-3">{label}</p>
                      <p className="text-white/42 text-xs sm:text-sm leading-relaxed">{text}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Reference Companies */}
      <div className="py-12 sm:py-16 px-5 sm:px-8 md:px-12 bg-[#030303] border-b border-white/[0.05]">
        <div className="max-w-7xl mx-auto">
          {sectionLabel('Reference Companies')}
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight mb-2">Companies in Our Network</h2>
          <p className="text-white/38 text-sm mb-10 max-w-xl">Product talent we have placed and networks we maintain, spanning SaaS, fintech, AI and data platforms.</p>
          <LogoTileGrid groups={logoGroups} />
        </div>
      </div>

      {/* Context */}
      <div className="py-12 sm:py-16 px-5 sm:px-8 md:px-12 border-b border-white/[0.05]">
        <div className="max-w-7xl mx-auto">
          {sectionLabel('Context')}
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight mb-2">Industry & Methodology Context</h2>
          <p className="text-white/38 text-sm mb-10 max-w-xl">Understanding how product functions operate — their methodologies, tools and environments.</p>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {contextAreas.map((area) => (
              <div key={area.label}>
                <p className="text-white/48 text-xs font-semibold tracking-[0.2em] uppercase mb-3">{area.label}</p>
                <div className="flex flex-wrap gap-2">
                  {area.items.map((item) => (
                    <span key={item} className="text-white/38 text-xs px-3 py-1.5 border border-white/[0.07] bg-[#0a0a0a]">{item}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer nav */}
      <div className="py-12 sm:py-16 px-5 sm:px-8 md:px-12">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div>
            <p className="text-white/28 text-[10px] tracking-widest uppercase mb-3">Explore Other Practices</p>
            <div className="flex flex-wrap gap-2 sm:gap-3">
              {[{ label: 'GTM Talent', path: '/use-cases/gtm' }, { label: 'Engineering & Technology', path: '/use-cases/engineering' }, { label: 'Professional Services', path: '/use-cases/professional-services' }].map((link) => (
                <button key={link.label} onClick={() => navigate(link.path)}
                  className="text-[10px] sm:text-xs text-white/38 border border-white/[0.07] px-3 sm:px-4 py-2 hover:border-white/22 hover:text-white/60 transition-all duration-200 tracking-wide">
                  {link.label}
                </button>
              ))}
            </div>
          </div>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <button onClick={() => navigate('/use-cases')}
              className="flex items-center gap-2 text-white/38 text-[10px] sm:text-xs tracking-widest uppercase hover:text-white/65 transition-colors duration-200">
              <ArrowLeft size={12} /> All Use Cases
            </button>
            
          </div>
        </div>
      </div>

    </div>
  );
}
