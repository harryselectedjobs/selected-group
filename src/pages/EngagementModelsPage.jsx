import { useEffect, useRef } from 'react';
import { DollarSign, Target, Lock, Users, FileText, Briefcase, CheckCircle2, XCircle, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const models = [
  {
    icon: DollarSign,
    accent: '#4F9CF9',
    title: 'Contingency',
    subtitle: 'No risk, pay on success',
    description: 'Only pay when we successfully place a candidate. Zero upfront cost, zero risk.',
    feeStructure: '15–25% of first year salary',
    paymentTiming: 'On candidate start date',
    bestFor: 'Individual mid-level hires, backfilling roles, testing a new recruiter',
    advantages: ['Zero upfront cost', 'No risk', 'Fast to start', 'Pay only for results'],
    considerations: ['Higher fee percentage', 'Less recruiter commitment', 'Competing with other agencies'],
  },
  {
    icon: Target,
    accent: '#A78BFA',
    title: 'Retained',
    subtitle: 'Dedicated executive search',
    description: 'Committed, exclusive partnership. Ideal for senior hires and hard-to-fill roles.',
    feeStructure: '25–35% of first year salary',
    paymentTiming: 'Staged: 1/3 upfront, 1/3 at shortlist, 1/3 on placement',
    bestFor: 'Executive roles (CTO, CPO), niche specialists, confidential searches',
    advantages: ['Exclusive focus', 'Deep market mapping', 'Higher quality', 'Guaranteed commitment'],
    considerations: ['Upfront investment', 'Higher total fee', 'Longer process'],
  },
  {
    icon: Lock,
    accent: '#34D399',
    title: 'Exclusive',
    subtitle: 'Priority without upfront cost',
    description: 'Contingency-style payment but with exclusivity. Best of both models.',
    feeStructure: '18–22% of first year salary',
    paymentTiming: 'On candidate start date',
    bestFor: 'Multiple hires in the same function, where exclusivity unlocks better candidates',
    advantages: ['No upfront cost', 'Dedicated focus', 'Better than standard contingency', 'Lower fee than retained'],
    considerations: ['Can only use one agency', 'Still dependent on placement', 'Less common model'],
  },
  {
    icon: Users,
    accent: '#FBBF24',
    title: 'RPO',
    subtitle: 'Scale hiring operations',
    description: 'Embedded recruiting team. We become your in-house recruiting function.',
    feeStructure: 'Monthly retainer + per-hire fee',
    paymentTiming: 'Monthly subscription model',
    bestFor: 'High-volume hiring (10+ hires/quarter), scaling teams, building hiring infrastructure',
    advantages: ['Predictable costs', 'Embedded in your team', 'Process improvement', 'Scalable'],
    considerations: ['Ongoing commitment', 'Higher minimum spend', 'Requires close collaboration'],
  },
  {
    icon: FileText,
    accent: '#F87171',
    title: 'Contract',
    subtitle: 'Project-based talent',
    description: 'Contractors and freelancers for project work. Flexible duration.',
    feeStructure: '5–15% margin on contractor rate',
    paymentTiming: 'Monthly or per-invoice',
    bestFor: 'Short-term projects, augmenting teams, covering gaps, specialist contractors',
    advantages: ['Flexible duration', 'Quick to hire', 'No long-term commitment', 'Easy to scale up/down'],
    considerations: ['Ongoing margin', 'Less candidate commitment', 'Limited to contract roles'],
  },
  {
    icon: Briefcase,
    accent: '#FB923C',
    title: 'Statement of Work (SoW)',
    subtitle: 'Outcome-based delivery',
    description: 'Fixed scope, fixed price. We deliver an agreed outcome (e.g., "hire 20 data engineers in Q1").',
    feeStructure: 'Fixed project fee',
    paymentTiming: 'Milestone-based',
    bestFor: 'Large hiring initiatives, enterprise programs, transformation projects',
    advantages: ['Predictable cost', 'Clear outcomes', 'Shared accountability', 'Enterprise preferred'],
    considerations: ['Less flexibility', 'Requires clear scope', 'Longer sales cycle'],
  },
];

const comparison = [
  { model: 'Contingency', upfront: 'None',            upfrontColor: '#34D399', risk: 'Zero',            riskColor: '#34D399', time: 'Immediate', timeColor: '#4F9CF9', commitment: 'Per hire' },
  { model: 'Retained',    upfront: '33% upfront',     upfrontColor: '#FBBF24', risk: 'Medium',          riskColor: '#FBBF24', time: '1–2 weeks',  timeColor: '#4F9CF9', commitment: 'Exclusive' },
  { model: 'Exclusive',   upfront: 'None',            upfrontColor: '#34D399', risk: 'Zero',            riskColor: '#34D399', time: 'Immediate', timeColor: '#4F9CF9', commitment: 'Exclusive' },
  { model: 'RPO',         upfront: 'Monthly retainer',upfrontColor: '#FBBF24', risk: 'Medium',          riskColor: '#FBBF24', time: '2–4 weeks',  timeColor: '#4F9CF9', commitment: '6–12 months' },
  { model: 'Contract',    upfront: 'None',            upfrontColor: '#34D399', risk: 'Low',             riskColor: '#34D399', time: 'Immediate', timeColor: '#4F9CF9', commitment: 'Per contractor' },
  { model: 'SoW',         upfront: 'Project deposit', upfrontColor: '#F87171', risk: 'Low (fixed price)',riskColor: '#34D399', time: '2–4 weeks',  timeColor: '#4F9CF9', commitment: 'Project duration' },
];

function ModelCard({ icon: Icon, accent, title, subtitle, description, feeStructure, paymentTiming, bestFor, advantages, considerations, delay }) {
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
      { threshold: 0.05 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <div
      ref={ref}
      className="bg-[#0d0d0d] border border-white/[0.07] p-7 flex flex-col gap-5 transition-all duration-300 hover:border-white/15 relative group"
    >
      <div
        className="absolute top-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ backgroundColor: accent }}
      />

      {/* Header */}
      <div className="flex items-center gap-4">
        <div
          className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{ backgroundColor: `${accent}20` }}
        >
          <Icon size={20} style={{ color: accent }} />
        </div>
        <div>
          <h3 className="text-white font-bold text-lg tracking-tight leading-tight">{title}</h3>
          <p className="text-sm font-medium mt-0.5" style={{ color: accent }}>{subtitle}</p>
        </div>
      </div>

      <p className="text-white/45 text-sm leading-relaxed">{description}</p>

      {/* Details */}
      <div className="border-t border-white/[0.06] pt-4 flex flex-col gap-3">
        <div>
          <p className="text-white/30 text-xs font-medium tracking-wide uppercase mb-1">Fee Structure</p>
          <p className="text-white/70 text-sm font-semibold">{feeStructure}</p>
        </div>
        <div>
          <p className="text-white/30 text-xs font-medium tracking-wide uppercase mb-1">Payment Timing</p>
          <p className="text-white/70 text-sm">{paymentTiming}</p>
        </div>
        <div>
          <p className="text-white/30 text-xs font-medium tracking-wide uppercase mb-1">Best For</p>
          <p className="text-sm leading-relaxed" style={{ color: accent }}>{bestFor}</p>
        </div>
      </div>

      {/* Advantages & Considerations */}
      <div className="border-t border-white/[0.06] pt-4 grid grid-cols-1 gap-4">
        <div>
          <p className="text-white/40 text-xs font-semibold tracking-wide uppercase mb-2">Advantages</p>
          <ul className="flex flex-col gap-1.5">
            {advantages.map((a) => (
              <li key={a} className="flex items-center gap-2">
                <CheckCircle2 size={13} className="text-[#34D399] flex-shrink-0" />
                <span className="text-white/55 text-xs">{a}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-white/40 text-xs font-semibold tracking-wide uppercase mb-2">Considerations</p>
          <ul className="flex flex-col gap-1.5">
            {considerations.map((c) => (
              <li key={c} className="flex items-center gap-2">
                <XCircle size={13} className="text-white/25 flex-shrink-0" />
                <span className="text-white/35 text-xs">{c}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default function EngagementModelsPage() {
  const navigate = useNavigate();
  const tableRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);

    // If redirected with #quick-comparison hash, scroll to table
    if (window.location.hash === '#quick-comparison') {
      setTimeout(() => {
        tableRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 400);
    }
  }, []);

  return (
    <div className="bg-black min-h-screen">

      {/* Hero */}
      <div className="pt-32 pb-16 px-6 relative overflow-hidden bg-black">
        <div
          className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full blur-[140px] pointer-events-none"
          style={{ backgroundColor: 'rgba(13,42,94,0.7)' }}
        />
        <div
          className="absolute bottom-0 -left-20 w-[400px] h-[400px] rounded-full blur-[120px] pointer-events-none"
          style={{ backgroundColor: 'rgba(45,27,105,0.4)' }}
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
            <span className="w-8 h-px bg-white/20" />
            <span className="text-white/35 text-xs font-medium tracking-[0.3em] uppercase">
              How We Work
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight mb-4 max-w-3xl leading-tight">
            Engagement{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/40">
              Models
            </span>
          </h1>
          <p className="text-white/50 text-base md:text-lg max-w-xl leading-relaxed mb-8">
            Choose the approach that fits your hiring needs. From no-risk contingency to embedded RPO partnerships.
          </p>
          <button
            onClick={() => tableRef.current?.scrollIntoView({ behavior: 'smooth' })}
            className="group inline-flex items-center gap-2 border border-white/20 text-white/60 hover:border-white/40 hover:text-white px-6 py-3 text-xs font-semibold tracking-widest uppercase transition-all duration-300"
          >
            Quick Comparison
            <ArrowRight size={13} className="transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </div>
      </div>

      {/* Model Cards */}
      <div className="max-w-7xl mx-auto px-6 py-12 md:py-16">
        <div className="grid md:grid-cols-2 gap-5">
          {models.map((m, i) => (
            <ModelCard key={m.title} {...m} delay={i * 80} />
          ))}
        </div>
      </div>

      {/* Quick Comparison Table */}
      <div
        ref={tableRef}
        id="quick-comparison"
        className="border-t border-white/[0.05] bg-[#030303] py-12 md:py-16 px-6"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-5">
              <span className="w-8 h-px bg-white/20" />
              <span className="text-white/35 text-xs font-medium tracking-[0.3em] uppercase">
                Side by Side
              </span>
              <span className="w-8 h-px bg-white/20" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-3">
              Quick Comparison
            </h2>
            <p className="text-white/40 text-base">Compare models side by side</p>
          </div>

          <div className="overflow-x-auto rounded-sm">
            <table className="w-full border-collapse">
              <thead>
                <tr style={{ background: 'linear-gradient(90deg, #0d1a3a 0%, #1a2a5e 100%)' }}>
                  {['Model', 'Upfront Cost', 'Risk Level', 'Time to Start', 'Commitment'].map((h) => (
                    <th
                      key={h}
                      className="text-left px-6 py-4 text-white/80 text-xs font-bold tracking-[0.2em] uppercase border-b border-white/[0.08]"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {comparison.map((row, i) => (
                  <tr
                    key={row.model}
                    className="border-b border-white/[0.05] transition-colors duration-200 hover:bg-white/[0.03]"
                    style={{ backgroundColor: i % 2 === 0 ? 'rgba(255,255,255,0.01)' : 'transparent' }}
                  >
                    <td className="px-6 py-4 text-white font-semibold text-sm">{row.model}</td>
                    <td className="px-6 py-4 text-sm font-medium" style={{ color: row.upfrontColor }}>{row.upfront}</td>
                    <td className="px-6 py-4 text-sm font-medium" style={{ color: row.riskColor }}>{row.risk}</td>
                    <td className="px-6 py-4 text-sm font-medium" style={{ color: row.timeColor }}>{row.time}</td>
                    <td className="px-6 py-4 text-white/50 text-sm">{row.commitment}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="border-t border-white/[0.05] py-16 px-6 text-center">
        <div className="max-w-xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-4">
            Not Sure Which Model Fits?
          </h2>
          <p className="text-white/45 text-base leading-relaxed mb-10">
            We'll help you choose the right approach based on your timeline, budget, and hiring goals.
          </p>
          <button
            onClick={() => {
              navigate('/');
              setTimeout(() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }), 300);
            }}
            className="group inline-flex items-center gap-3 bg-white text-black px-8 py-4 text-sm font-bold tracking-widest uppercase transition-all duration-300 hover:bg-white/90"
          >
            Talk to Us
            <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </div>
      </div>

    </div>
  );
}
