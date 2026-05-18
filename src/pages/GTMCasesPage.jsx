import { useEffect } from 'react';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import VideoPageHero from '../components/VideoPageHero';
import LogoTileGrid from '../components/LogoTileGrid';

const roleCategories = [
  { category: 'Executive GTM Leadership', roles: ['Chief Revenue Officer (CRO)', 'Chief Commercial Officer (CCO)', 'Chief Growth Officer (CGO)', 'VP Sales / VP Enterprise Sales', 'VP Revenue / VP Growth', 'VP EMEA / VP Americas', 'VP Sales Engineering', 'VP Customer Success'] },
  { category: 'Enterprise & Strategic Sales', roles: ['Enterprise Account Executive', 'Strategic Account Executive', 'Global Account Manager', 'Regional Sales Director', 'Mid-Market Account Executive', 'Named Account Executive'] },
  { category: 'Sales Development & Pipeline Generation', roles: ['Head of Sales Development', 'SDR / BDR Manager', 'Senior Sales Development Representative', 'Business Development Representative', 'Inside Sales Representative'] },
  { category: 'Solutions Engineering & Pre-Sales', roles: ['VP Solutions Engineering', 'Head of Pre-Sales', 'Enterprise Solutions Engineer', 'Sales Engineer', 'Pre-Sales Consultant', 'Technical Account Manager'] },
  { category: 'Revenue Operations', roles: ['VP Revenue Operations', 'Head of RevOps', 'Sales Operations Manager', 'Revenue Analyst', 'CRM Administrator', 'GTM Systems Manager'] },
  { category: 'Customer Success & Retention', roles: ['VP Customer Success', 'Customer Success Director', 'Enterprise Customer Success Manager', 'Technical Customer Success Manager', 'Renewal Manager', 'Expansion Manager'] },
  { category: 'Partnerships & Alliances', roles: ['VP Partnerships', 'VP Alliances', 'Alliance Manager', 'Channel Sales Director', 'Partner Development Manager'] },
  { category: 'GTM Leadership & Marketing', roles: ['Chief Marketing Officer (CMO)', 'VP Marketing', 'VP Demand Generation', 'Head of Product Marketing', 'VP Field Marketing', 'Head of GTM Strategy'] },
];

const caseStudies = [
  {
    index: '01', label: 'Enterprise SaaS',
    title: 'Building the Enterprise Sales Motion from Seed',
    context: 'Series B · Enterprise SaaS · UK & US',
    challenge: 'An enterprise SaaS business had achieved strong product-market fit in the mid-market but needed to build an enterprise sales motion from scratch to support its Series B growth plan. The business required a VP Enterprise Sales capable of defining the enterprise strategy and an initial team of four Enterprise Account Executives who could credibly navigate complex, multi-stakeholder sales processes. No enterprise infrastructure existed — no playbook, no named accounts, no enterprise positioning.',
    approach: 'Retained executive search for the VP Enterprise Sales, focused specifically on candidates who had built enterprise motions within SaaS businesses at similar stages — not individuals who had managed established enterprise teams. The search required mapping across the UK and US to find candidates with the right combination of commercial pedigree, startup operating experience and the ability to attract and develop an enterprise team. Once the VP was placed, a targeted contingency search for Enterprise AEs followed, leveraging the VP\'s network and role criteria.',
    outcome: 'VP Enterprise Sales placed within eight weeks. Four Enterprise AEs placed within three months of the VP joining. The team closed the company\'s first $1M+ enterprise contract within six months of being assembled, directly supporting the company\'s successful Series C raise.',
    metrics: [{ value: '5 hires', label: 'VP + 4 AEs' }, { value: '8 weeks', label: 'VP Time to Hire' }, { value: 'Series C', label: 'Unlocked' }],
  },
  {
    index: '02', label: 'AI Platform',
    title: 'CRO Search and Full GTM Buildout at a Hypergrowth AI Company',
    context: 'Series C · AI Platform · US & EMEA',
    challenge: 'A hypergrowth AI platform company had grown to $12M ARR on the back of founder-led sales and needed to bring in a Chief Revenue Officer to build and scale its entire commercial function. The CRO would need to hire a complete GTM team across enterprise sales, solutions engineering, customer success and revenue operations — in both US and EMEA markets — within a 12-month window and ahead of a planned Series D.',
    approach: 'A fully retained CRO search with a six-week shortlist commitment. We mapped the market for CRO and VP Sales profiles at AI-native companies and high-growth enterprise SaaS businesses, running confidential outreach to the most relevant candidates globally. Following the CRO placement, we transitioned into an RPO engagement to support the broader GTM buildout — deploying two dedicated recruiters embedded alongside the newly appointed CRO to build pipelines across all GTM disciplines simultaneously.',
    outcome: 'CRO placed within seven weeks. Over the following nine months, 22 GTM hires were made, including VP Enterprise Sales (US), VP EMEA, four Solutions Engineers, eight Enterprise AEs, VP Customer Success, and a Head of RevOps. The GTM buildout contributed directly to the company tripling ARR in twelve months.',
    metrics: [{ value: '23', label: 'GTM Hires' }, { value: '3× ARR', label: 'Year-1 Growth' }, { value: 'US & EMEA', label: 'Coverage' }],
  },
  {
    index: '03', label: 'Technical SaaS',
    title: 'Building a World-Class Solutions Engineering Team',
    context: 'Series C · Developer Infrastructure · US',
    challenge: 'A developer infrastructure company was winning deals on technical merit but losing them at the evaluation stage due to an under-resourced solutions engineering function. The business needed to build a high-calibre team of Solutions Engineers capable of running complex technical evaluations, building proof-of-concepts and engaging with enterprise architects and security teams. The profile required a rare combination of deep technical credibility and commercial communication — candidates who could operate at the level of senior engineers while also navigating procurement and executive stakeholders.',
    approach: 'Specialist retained search for a Head of Solutions Engineering followed by a contingency programme for individual contributors. We mapped the market specifically for candidates with backgrounds in developer tooling, infrastructure and open-source ecosystems — targeting individuals who had made the transition from engineering or technical consulting into pre-sales roles. Assessment was structured around both technical evaluation (live POC scoping exercises) and commercial demonstration skills.',
    outcome: 'Head of Solutions Engineering placed in six weeks. Seven Solutions Engineers placed across the US over the following four months. The expanded team enabled a reduction in sales cycle length of 22% and improved technical win rates by 34% within two quarters.',
    metrics: [{ value: '8 hires', label: 'Head + 7 SEs' }, { value: '–22%', label: 'Sales Cycle Length' }, { value: '+34%', label: 'Technical Win Rate' }],
  },
];

const logoGroups = [
  {
    label: 'CRM & Sales Technology',
    logos: [
      { name: 'Attio', slug: 'attio' }, { name: 'Copper', slug: 'copper' },
      { name: 'Creatio', slug: 'creatio' }, { name: 'Close', slug: 'close' },
      { name: 'Capsule CRM', slug: 'capsulecrm' }, { name: 'Nutshell', slug: 'nutshell' },
      { name: 'Pipedrive', slug: 'pipedrive' }, { name: 'Alloy', slug: 'alloy' },
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
];

const gtmContext = [
  { label: 'Sales Methodologies', items: ['MEDDIC / MEDDPICC', 'Challenger Sale', 'Solution Selling', 'Command of the Message', 'Sandler', 'Value Selling'] },
  { label: 'GTM Technology Stack', items: ['Salesforce', 'HubSpot', 'Outreach', 'Salesloft', 'Gong', 'Clari', 'ZoomInfo', 'Apollo', 'LinkedIn Sales Navigator'] },
  { label: 'Market Segments', items: ['Enterprise SaaS', 'AI & Machine Learning Platforms', 'Developer Tools & Infrastructure', 'Fintech & Financial Services', 'Cybersecurity', 'Data & Analytics'] },
  { label: 'GTM Motions', items: ['Product-Led Growth (PLG)', 'Sales-Led Growth (SLG)', 'Hybrid PLG + SLG', 'Partner & Channel-Led', 'Community-Led Growth'] },
];

const sectionLabel = (text) => (
  <div className="flex items-center gap-3 mb-4">
    <span className="w-6 h-px bg-white/20" />
    <span className="text-white/38 text-[10px] sm:text-xs tracking-[0.3em] uppercase">{text}</span>
  </div>
);

export default function GTMCasesPage() {
  const navigate = useNavigate();
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="bg-black min-h-screen">

      <VideoPageHero
        videoId="qz9ADlOqqs8"
        breadcrumb={[{ label: 'Use Cases', path: '/use-cases' }, { label: 'GTM Talent' }]}
        eyebrow="Case Studies"
        title="GTM"
        titleAccent="Talent"
        description="We are an enterprise software sales and go-to-market recruitment specialist, placing high-performing sales leaders and new logo acquisition talent across the US and European markets. From CRO search through to solutions engineering and revenue operations, we cover the full commercial function for high-growth technology businesses."
        stats={[
          { value: '1,000+', label: 'Placements made' },
          { value: 'CRO → SDR', label: 'Full seniority' },
          { value: 'US & EU', label: 'Markets covered' },
          { value: 'Enterprise SaaS', label: 'Core specialism' },
        ]}
      />

      {/* Role Coverage */}
      <div className="py-12 sm:py-16 px-5 sm:px-8 md:px-12 bg-[#030303] border-b border-white/[0.05]">
        <div className="max-w-7xl mx-auto">
          {sectionLabel('Coverage')}
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight mb-2">Roles We Cover</h2>
          <p className="text-white/38 text-sm mb-10 max-w-xl">The complete go-to-market function — from Chief Revenue Officer and VP Sales through to enterprise AEs, solutions engineers and revenue operations.</p>
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
          <p className="text-white/38 text-sm mb-10 max-w-xl">CRM platforms, commercial SaaS and fintech companies where we source and place GTM talent.</p>
          <LogoTileGrid groups={logoGroups} />
        </div>
      </div>

      {/* GTM Context */}
      <div className="py-12 sm:py-16 px-5 sm:px-8 md:px-12 border-b border-white/[0.05]">
        <div className="max-w-7xl mx-auto">
          {sectionLabel('Context')}
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight mb-2">GTM Context & Methodology</h2>
          <p className="text-white/38 text-sm mb-10 max-w-xl">We operate with deep knowledge of GTM motions, sales methodologies and the technology stacks that define high-performing commercial organisations.</p>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
            {gtmContext.map((area) => (
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
              {[
                { label: 'Engineering & Technology', path: '/use-cases/engineering' },
                { label: 'Product Management', path: '/use-cases/product-management' },
                { label: 'Professional Services', path: '/use-cases/professional-services' },
              ].map((link) => (
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
            <button onClick={() => { navigate('/'); setTimeout(() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }), 300); }}
              className="group flex items-center gap-3 bg-white text-black px-6 sm:px-8 py-3.5 sm:py-4 text-xs font-bold tracking-widest uppercase hover:bg-white/90 transition-all duration-300">
              Discuss a Brief <ArrowRight size={13} className="transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </div>
        </div>
      </div>

    </div>
  );
}
