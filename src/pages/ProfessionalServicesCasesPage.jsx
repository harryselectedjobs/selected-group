import { useEffect } from 'react';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import VideoPageHero from '../components/VideoPageHero';
import LogoTileGrid from '../components/LogoTileGrid';

const roleCategories = [
  { category: 'Executive Leadership', roles: ['Chief Services Officer', 'Chief Delivery Officer', 'Chief Consulting Officer', 'Chief Transformation Officer', 'Managing Director – Professional Services', 'VP Professional Services / VP Consulting / VP Delivery', 'Partner – Technology Consulting'] },
  { category: 'Senior Delivery Leadership', roles: ['Professional Services Directors', 'Consulting Directors', 'Delivery Directors', 'Practice Directors', 'Heads of Professional Services', 'Heads of Consulting / Delivery / Implementation', 'Heads of Customer Transformation'] },
  { category: 'Programme & Transformation', roles: ['Programme Directors', 'Programme Managers', 'Transformation Directors', 'Delivery Managers', 'Engagement Directors', 'Client Delivery Leads'] },
  { category: 'Consulting & Solution Delivery', roles: ['Principal Consultants', 'Senior Consultants', 'Technology Consultants', 'Implementation Consultants', 'Solutions Consultants', 'Functional Consultants (Salesforce, SAP, Workday, ServiceNow)'] },
  { category: 'Solutions Engineering & Pre-Sales', roles: ['Solutions Engineers', 'Pre-Sales Consultants', 'Sales Engineers', 'Technical Solution Architects'] },
  { category: 'Implementation & Customer Success', roles: ['Implementation Managers', 'Implementation Consultants', 'Customer Success Managers (technical)', 'Onboarding Specialists', 'Adoption & Training Consultants'] },
  { category: 'PMO, BA & Change Management', roles: ['Project Managers', 'PMO Managers & Analysts', 'Business Analysts', 'Technical Business Analysts', 'Change & Transformation Managers'] },
  { category: 'Forward Deployed & Embedded', roles: ['Forward Deployed Consultants', 'Embedded Engineers / Consultants', 'Field Engineers', 'Customer Engineers'] },
];

const caseStudies = [
  {
    index: '01', label: 'Global ERP Rollout',
    title: 'Staffing a 50-Consultant Enterprise ERP Implementation Programme',
    context: 'Enterprise · ERP Implementation · 6 Countries',
    challenge: 'A Fortune 500 financial services organisation was rolling out a new ERP platform across six countries and required 50+ implementation consultants within four months. The timeline was driven by a hard regulatory deadline — making speed and quality non-negotiable. The programme required functional specialists, technical consultants and project managers with domain expertise in financial services processes.',
    approach: 'A Statement of Work engagement with a dedicated sourcing team of four specialists. We segmented requirements by discipline and geography and ran parallel pipelines across UK, US, Germany, Australia and Singapore. We maintained a pre-qualified bench of ERP consultants and ran a streamlined two-stage assessment process to meet the compressed timeline, with an embedded onboarding coordinator to manage contractor mobilisation.',
    outcome: '52 consultants placed across six countries within the programme window. The platform launched on time. The client expanded the engagement to cover a parallel data migration programme directly following completion.',
    metrics: [{ value: '52', label: 'Consultants' }, { value: '4 months', label: 'Delivered In' }, { value: '6 Countries', label: 'Coverage' }],
  },
  {
    index: '02', label: 'SaaS Vendor Scale-up',
    title: 'Building a Professional Services Practice from Zero',
    context: 'Series C · Enterprise SaaS · UK & US',
    challenge: 'An enterprise SaaS company needed to internalise its professional services function — transitioning from partner-led implementation to a direct-delivery capability. The business needed to hire a VP Professional Services and a founding team of 12 implementation consultants and CSMs. No existing services infrastructure, process or team existed.',
    approach: 'Retained executive search for the VP Professional Services, focused specifically on candidates who had previously built services organisations within SaaS businesses rather than running established practices. Once the VP was placed, we moved into a contingency programme for individual contributors, using the VP\'s domain knowledge to sharpen candidate profiles and assessment criteria.',
    outcome: 'VP Professional Services placed within nine weeks. Over five months, 12 consultants and CSMs placed across UK and US. The services organisation contributed to a 28% improvement in net revenue retention in the first full year of operation.',
    metrics: [{ value: '13', label: 'Hires Made' }, { value: '9 weeks', label: 'VP Time to Hire' }, { value: '+28% NRR', label: 'Year-1 Impact' }],
  },
  {
    index: '03', label: 'Data Platform',
    title: 'Scaling a Global Forward Deployed Consulting Function',
    context: 'Growth Stage · Data Platform · US & EMEA',
    challenge: 'A data infrastructure platform with rapidly expanding enterprise customers needed to build a forward deployed consulting function. The business required consultants combining deep data platform expertise with the ability to manage complex customer relationships and deliver bespoke integrations — a profile at the intersection of technical delivery and consulting that is among the rarest in the professional services market.',
    approach: 'Specialist retained search for forward deployed and embedded consulting profiles across enterprise data platform, AI infrastructure and SaaS. We built a market map of 180 target candidates across US and EMEA, using direct outreach, referral networks and community engagement. Assessment was structured to evaluate both technical depth and client engagement capability.',
    outcome: '10 forward deployed consultants placed across US and EMEA over four months. All ten identified through proactive outreach — none were active candidates. The function directly supported a 40% increase in enterprise customer onboarding velocity.',
    metrics: [{ value: '10', label: 'Consultants' }, { value: '4 months', label: 'Duration' }, { value: '+40%', label: 'Onboarding Velocity' }],
  },
];

const logoGroups = [
  {
    label: 'ERP & Business Applications',
    logos: [
      { name: 'Acumatica', slug: 'acumatica' }, { name: 'Deltek', slug: 'deltek' },
      { name: 'Unit4', slug: 'unit4' }, { name: 'Oracle', slug: 'oracle' },
      { name: 'Odoo', slug: 'odoo' }, { name: 'Rootstock', slug: 'rootstock' },
      { name: 'Priority Software', slug: 'priority-software' }, { name: 'Certinia', slug: 'certinia' },
      { name: 'Syspro', slug: 'syspro' }, { name: 'Plex', slug: 'plex' },
    ],
  },
  {
    label: 'Product Lifecycle & Manufacturing',
    logos: [
      { name: 'Arena Solutions', slug: 'arena-solutions' }, { name: 'Propel', slug: 'propel' },
      { name: 'Centric Software', slug: 'centric-software' }, { name: 'Aras', slug: 'aras' },
      { name: 'OpenBOM', slug: 'openbom' }, { name: 'Specright', slug: 'specright' },
      { name: 'Razorleaf', slug: 'razorleaf' },
    ],
  },
  {
    label: 'IT Asset & Service Management',
    logos: [
      { name: 'Lansweeper', slug: 'lansweeper' }, { name: 'Device42', slug: 'device42' },
      { name: 'Snow Software', slug: 'snow-software' }, { name: 'Asset Panda', slug: 'asset-panda' },
      { name: 'Snipe-IT', slug: 'snipe-it' }, { name: 'CloudHealth', slug: 'cloudhealth' },
      { name: 'Torii', slug: 'torii' }, { name: 'Zylo', slug: 'zylo' },
    ],
  },
];

const technologyAreas = [
  { label: 'Enterprise Platforms', items: ['Salesforce', 'SAP', 'Workday', 'ServiceNow', 'Oracle ERP', 'Microsoft Dynamics'] },
  { label: 'Cloud & Infrastructure', items: ['AWS', 'Azure', 'Google Cloud', 'Terraform', 'Kubernetes'] },
  { label: 'Data & Analytics', items: ['Snowflake', 'Databricks', 'Power BI', 'Tableau', 'dbt'] },
  { label: 'Domain Sectors', items: ['Financial Services', 'Healthcare', 'Retail & eCommerce', 'Public Sector', 'Manufacturing', 'Telecoms'] },
];

const sectionLabel = (text) => (
  <div className="flex items-center gap-3 mb-4">
    <span className="w-6 h-px bg-white/20" />
    <span className="text-white/38 text-[10px] sm:text-xs tracking-[0.3em] uppercase">{text}</span>
  </div>
);

export default function ProfessionalServicesCasesPage() {
  const navigate = useNavigate();
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="bg-black min-h-screen">

      <VideoPageHero
        videoId="AHJVDFop9sU"
        breadcrumb={[{ label: 'Use Cases', path: '/use-cases' }, { label: 'Professional Services' }]}
        eyebrow="Case Studies"
        title="Professional"
        titleAccent="Services"
        description="Professional services talent transforms technology from a product into a business outcome. We operate across the full services lifecycle — from pre-sales and solution design through to implementation, transformation, delivery and long-term customer success. Our clients range from global consultancies to SaaS vendors building their first services function."
        stats={[
          { value: 'CSO → PM', label: 'Full seniority' },
          { value: 'Global', label: 'Delivery coverage' },
          { value: 'ERP & SaaS', label: 'Core specialisms' },
          { value: 'Contract & Perm', label: 'Engagement types' },
        ]}
      />

      {/* Role Coverage */}
      <div className="py-12 sm:py-16 px-5 sm:px-8 md:px-12 bg-[#030303] border-b border-white/[0.05]">
        <div className="max-w-7xl mx-auto">
          {sectionLabel('Coverage')}
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight mb-2">Roles We Cover</h2>
          <p className="text-white/38 text-sm mb-10 max-w-xl">The full professional services spectrum — from Chief Services Officer through to implementation consultants, forward deployed engineers and business analysts.</p>
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
          <p className="text-white/38 text-sm mb-10 max-w-xl">Enterprise software and services companies we have worked with, spanning ERP, PLM, IT management and services delivery.</p>
          <LogoTileGrid groups={logoGroups} />
        </div>
      </div>

      {/* Technology Focus */}
      <div className="py-12 sm:py-16 px-5 sm:px-8 md:px-12 border-b border-white/[0.05]">
        <div className="max-w-7xl mx-auto">
          {sectionLabel('Context')}
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight mb-2">Technology & Domain Focus</h2>
          <p className="text-white/38 text-sm mb-10 max-w-xl">Deep understanding of the platforms, technologies and industry sectors that define professional services environments.</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {technologyAreas.map((area) => (
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
              {[{ label: 'GTM Talent', path: '/use-cases/gtm' }, { label: 'Engineering & Technology', path: '/use-cases/engineering' }, { label: 'Product Management', path: '/use-cases/product-management' }].map((link) => (
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
