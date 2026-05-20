import { useEffect } from 'react';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import VideoPageHero from '../components/VideoPageHero';
import LogoTileGrid from '../components/LogoTileGrid';

const roleCategories = [
  {
    category: 'Engineering Leadership',
    roles: ['Chief Technology Officer (CTO)', 'Chief Information Officer (CIO)', 'Chief Architect / Head of Architecture', 'VP Engineering / VP Technology', 'VP Platform / VP Infrastructure', 'VP Data Engineering / AI Engineering', 'CISO', 'Engineering Director', 'Head of Engineering', 'Head of Platform / Cloud / DevOps', 'Head of Data Engineering & ML'],
  },
  {
    category: 'Software Engineering',
    roles: ['Frontend Engineers (React, Angular, Vue)', 'Backend Engineers (Java, Python, Go, Node.js, .NET)', 'Full Stack Engineers', 'Mobile Engineers (iOS, Android, React Native, Flutter)', 'Technical Leads', 'Engineering Managers'],
  },
  {
    category: 'Platform, DevOps & Infrastructure',
    roles: ['DevOps Engineers', 'Site Reliability Engineers (SREs)', 'Platform Engineers', 'Cloud Engineers', 'Infrastructure Engineers', 'Build & Release Engineers'],
  },
  {
    category: 'Data Engineering, AI & ML',
    roles: ['Data Engineers', 'Machine Learning Engineers', 'AI Engineers', 'Analytics Engineers', 'Data Platform Engineers', 'MLOps Engineers'],
  },
  {
    category: 'Security Engineering',
    roles: ['Security Engineers', 'Application Security Engineers', 'Cloud Security Engineers', 'DevSecOps Engineers', 'Security Architects'],
  },
  {
    category: 'QA & Engineering Excellence',
    roles: ['QA Engineers', 'Test Automation Engineers', 'SDETs', 'Performance Test Engineers'],
  },
  {
    category: 'Forward Deployed Engineering',
    roles: ['Forward Deployed Engineers', 'Solutions Engineers', 'Implementation Engineers', 'Customer Engineers', 'Technical Consultants'],
  },
];

const caseStudies = [
  {
    index: '01', label: 'AI Platform Scale-up',
    title: 'Scaling an AI Engineering Organisation from 12 to 60',
    context: 'Series C · AI Infrastructure · US & UK',
    challenge: 'A rapidly growing AI-first platform company closed its Series C and needed to scale from 12 to 60 engineers in under six months. The technical bar was exceptionally high — spanning ML infrastructure, distributed systems and forward deployed engineering for enterprise deployments. The internal team had no dedicated recruiting function and the market for senior AI engineers was acutely competitive.',
    approach: 'We deployed an RPO model with a dedicated team of three specialist recruiters embedded alongside the founding team. We built structured, role-specific hiring processes for each engineering discipline, developed proactive outreach campaigns targeting passive candidates at competitor AI companies, and designed a technical assessment framework aligned to the company\'s engineering bar.',
    outcome: '48 engineers placed across ML engineering, platform infrastructure, backend and forward deployed roles in under five months. 95% first-year retention. The team scaled successfully to support 40+ enterprise customer deployments globally.',
    metrics: [{ value: '48', label: 'Engineers Placed' }, { value: '5 months', label: 'Delivered In' }, { value: '95%', label: 'Year-1 Retention' }],
  },
  {
    index: '02', label: 'Cybersecurity Scale-up',
    title: 'Engineering Buildout Ahead of Series C',
    context: 'Series B → C · Cloud Security · UK & US',
    challenge: 'A cloud-native cybersecurity company with strong product-market fit needed to more than double its engineering headcount from 40 to over 100 engineers across security engineering, platform and backend. The business had a fixed runway and needed to hire ahead of its Series C round.',
    approach: 'Retained executive search for a VP Engineering and Head of Security Engineering, followed by a structured contingency programme for individual contributors. We conducted extensive market mapping across UK and US security markets, ran confidential outreach to candidates at key competitor firms and designed multi-stage technical assessment processes calibrated to each role family.',
    outcome: '64 engineers placed in eight months, including VP Engineering, Head of Security Engineering, 18 security engineers and 44 platform and backend engineers. The programme completed ahead of schedule, enabling the company to raise its Series C on the original timeline.',
    metrics: [{ value: '64', label: 'Engineers Placed' }, { value: '8 months', label: 'Delivered In' }, { value: 'Series C', label: 'Unlocked' }],
  },
  {
    index: '03', label: 'Data Infrastructure',
    title: 'Building a Global Forward Deployed Engineering Function',
    context: 'Growth Stage · Data Infrastructure · Global',
    challenge: 'A data infrastructure company expanding into enterprise accounts needed to build a forward deployed engineering function from scratch. The business required engineers who combined deep technical expertise in data platforms with the ability to work directly inside complex client environments — a profile that sits at the intersection of engineering and customer success and is exceptionally rare.',
    approach: 'Specialist retained search focused exclusively on forward deployed and solutions engineering talent across data platform, AI infrastructure and enterprise SaaS. We mapped 200 target candidates globally, ran structured multi-touch outreach and built a capability assessment framework specifically for the forward deployed profile.',
    outcome: '8 Forward Deployed Engineers placed across the US and EMEA in 90 days. All eight identified through proactive market mapping — none were active candidates. The function enabled the company to accelerate enterprise onboarding significantly.',
    metrics: [{ value: '8', label: 'FDEs Placed' }, { value: '90 days', label: 'Delivered In' }, { value: 'US & EMEA', label: 'Coverage' }],
  },
];

const logoGroups = [
  {
    label: 'Artificial Intelligence & Machine Learning',
    logos: [
      { name: 'Anthropic', slug: 'anthropic' }, { name: 'Cognition AI', slug: 'cognition-ai' },
      { name: 'Adept AI', slug: 'adept-ai' }, { name: 'Relevance AI', slug: 'relevance-ai' },
      { name: 'Abnormal AI', slug: 'abnormal-ai' }, { name: 'Aisera', slug: 'aisera' },
      { name: 'Sierra', slug: 'sierra' }, { name: 'Moveworks', slug: 'moveworks' },
      { name: 'LangChain', slug: 'langchain' }, { name: 'CrewAI', slug: 'crewai' },
    ],
  },
  {
    label: 'Cybersecurity',
    logos: [
      { name: 'Darktrace', slug: 'darktrace' }, { name: 'SentinelOne', slug: 'sentinelone' },
      { name: 'Wiz', slug: 'wiz' }, { name: 'Orca', slug: 'orca' },
      { name: 'Lacework', slug: 'lacework' }, { name: 'Snyk', slug: 'snyk' },
      { name: 'Pentera', slug: 'pentera' }, { name: 'Cyera', slug: 'cyera' },
      { name: 'Semperis', slug: 'semperis' }, { name: 'Behavox', slug: 'behavox' },
    ],
  },
  {
    label: 'Data Platforms & Analytics',
    logos: [
      { name: 'Airbyte', slug: 'airbyte' }, { name: 'ClickHouse', slug: 'clickhouse' },
      { name: 'SingleStore', slug: 'singlestore' }, { name: 'Starburst', slug: 'starburst' },
      { name: 'Snowplow', slug: 'snowplow' }, { name: 'Monte Carlo', slug: 'montecarlo' },
      { name: 'Imply', slug: 'imply' }, { name: 'Fivetran', slug: 'fivetran' },
      { name: 'Confluent', slug: 'confluent' },
    ],
  },
  {
    label: 'Storage & Infrastructure',
    logos: [
      { name: 'MinIO', slug: 'minio' }, { name: 'WEKA', slug: 'weka' },
      { name: 'Hammerspace', slug: 'hammerspace' }, { name: 'Vast Data', slug: 'vastdata' },
      { name: 'Qumulo', slug: 'qumulo' }, { name: 'Backblaze', slug: 'backblaze' },
      { name: 'Wasabi', slug: 'wasabi' }, { name: 'Rubrik', slug: 'rubrik' },
      { name: 'Cohesity', slug: 'cohesity' }, { name: 'Pure Storage', slug: 'purestorage' },
    ],
  },
];

const techAreas = [
  { label: 'Languages', items: ['Python', 'Java', 'Go', 'TypeScript', 'C++', 'Rust', 'Scala'] },
  { label: 'Frameworks', items: ['React', 'Node.js', 'Spring', '.NET', 'FastAPI'] },
  { label: 'Cloud', items: ['AWS', 'Azure', 'Google Cloud'] },
  { label: 'DevOps', items: ['Kubernetes', 'Docker', 'Terraform', 'GitHub Actions', 'Jenkins'] },
  { label: 'Data & AI', items: ['Snowflake', 'BigQuery', 'Kafka', 'Spark', 'PyTorch', 'dbt'] },
  { label: 'Security', items: ['SAST / DAST', 'CSPM', 'Zero Trust', 'SIEM / SOAR'] },
];

const sectionLabel = (text) => (
  <div className="flex items-center gap-3 mb-4">
    <span className="w-6 h-px bg-white/20" />
    <span className="text-white/38 text-[10px] sm:text-xs tracking-[0.3em] uppercase">{text}</span>
  </div>
);

export default function EngineeringCasesPage() {
  const navigate = useNavigate();
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="bg-black min-h-screen">

      <VideoPageHero
        videoId="Hgg7M3kSqyE"
        breadcrumb={[{ label: 'Use Cases', path: '/use-cases' }, { label: 'Engineering & Technology' }]}
        eyebrow="Case Studies"
        title="Engineering &"
        titleAccent="Technology"
        description="We partner with high-growth startups, scale-ups and enterprise technology businesses to build the engineering teams responsible for designing, developing, scaling and securing the products that drive innovation — from CTO to individual contributor, across every engineering discipline."
        stats={[
          { value: 'CTO → IC', label: 'Full seniority' },
          { value: 'US & EU', label: 'Markets' },
          { value: '7 Disciplines', label: 'Focus areas' },
          { value: 'All Stages', label: 'Coverage' },
        ]}
      />

      {/* Role Coverage */}
      <div className="py-12 sm:py-16 px-5 sm:px-8 md:px-12 bg-[#030303] border-b border-white/[0.05]">
        <div className="max-w-7xl mx-auto">
          {sectionLabel('Coverage')}
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight mb-2">Roles We Cover</h2>
          <p className="text-white/38 text-sm mb-10 max-w-xl">From executive leadership through to the most technical individual contributor roles across all engineering disciplines.</p>
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
                  {[
                    { label: 'The Challenge', text: cs.challenge },
                    { label: 'Our Approach', text: cs.approach },
                    { label: 'Outcome', text: cs.outcome },
                  ].map(({ label, text }) => (
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
          <p className="text-white/38 text-sm mb-10 max-w-xl">A selection of the technology companies we have worked with, organised by sector.</p>
          <LogoTileGrid groups={logoGroups} />
        </div>
      </div>

      {/* Technology Ecosystem */}
      <div className="py-12 sm:py-16 px-5 sm:px-8 md:px-12 border-b border-white/[0.05]">
        <div className="max-w-7xl mx-auto">
          {sectionLabel('Technology Focus')}
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight mb-2">Technology Ecosystem</h2>
          <p className="text-white/38 text-sm mb-10 max-w-xl">Deep fluency across the technologies that define modern engineering organisations.</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {techAreas.map((area) => (
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
              {[{ label: 'GTM Talent', path: '/use-cases/gtm' }, { label: 'Product Management', path: '/use-cases/product-management' }, { label: 'Professional Services', path: '/use-cases/professional-services' }].map((link) => (
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
