import { useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const stats = [
  { value: "12", label: "Hires Delivered" },
  { value: "EMEA", label: "Region" },
  { value: "6+", label: "Role Functions" },
  { value: "GTM", label: "Leadership Focus" },
];

const placements = [
  "Value Partners",
  "Senior Value Engineers",
  "Enterprise Account Executives",
  "Strategic Sales Professionals",
  "Leadership Hires across GTM Functions",
  "Enterprise Transformation Specialists",
];

const mandateAreas = [
  "Value Partner Roles",
  "Value Engineering",
  "Enterprise Sales",
  "Leadership Appointments",
];

const partnershipServices = [
  "Strategic market mapping",
  "Executive-level talent engagement",
  "Consultative hiring support",
  "Candidate qualification and assessment",
  "Offer management and process coordination",
  "Ongoing market insight across the enterprise SaaS landscape",
];

export default function CelonisCaseStudy() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  return (
    <div className="bg-[#0A0A0A] min-h-screen text-[#F5F5F5]">

      {/* ── BACK NAV ── */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 pt-10">
        <Link
          to="/case-studies"
          className="group inline-flex items-center gap-2 text-sm text-[#B0B0B0] hover:text-[#C8A96B] transition-colors"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Case Studies
        </Link>
      </div>

      {/* ── HERO ── */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=1800&q=80"
            alt="Celonis"
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A] via-transparent to-[#0A0A0A]" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 pt-24 pb-28">
          <motion.div initial="hidden" animate="visible" variants={stagger}>

            <motion.div variants={fadeUp} className="flex items-center gap-3 mb-6">
              <div className="h-px w-10 bg-[#C8A96B]" />
              <span className="text-xs uppercase tracking-[0.25em] text-[#C8A96B]">Case Study</span>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="text-7xl lg:text-[9rem] font-bold leading-none tracking-tight text-[#F5F5F5] mb-6"
            >
              Celonis
            </motion.h1>

            <motion.p variants={fadeUp} className="text-xl lg:text-2xl text-[#B0B0B0] mb-16 max-w-2xl">
              Enterprise Value &amp; Commercial Talent Across EMEA
            </motion.p>

            {/* ── STATS — large grid ── */}
            <motion.div
              variants={fadeUp}
              className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-[rgba(255,255,255,0.07)] rounded-2xl overflow-hidden"
            >
              {stats.map((s, i) => (
                <div key={i} className="bg-[#0F0F0F] px-8 py-10 flex flex-col gap-2">
                  <span className="text-5xl lg:text-6xl font-bold text-[#C8A96B] leading-none">
                    {s.value}
                  </span>
                  <span className="text-sm text-[#B0B0B0] uppercase tracking-widest">
                    {s.label}
                  </span>
                </div>
              ))}
            </motion.div>

          </motion.div>
        </div>
      </section>

      {/* ── OVERVIEW ── */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 py-24 border-t border-[rgba(255,255,255,0.06)]">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
          className="grid lg:grid-cols-12 gap-12"
        >
          <motion.div variants={fadeUp} className="lg:col-span-4">
            <div className="text-xs uppercase tracking-[0.2em] text-[#C8A96B] mb-3">Overview</div>
            <h2 className="text-3xl font-bold text-[#F5F5F5]">The Context</h2>
          </motion.div>

          <motion.div variants={stagger} className="lg:col-span-8 space-y-5 text-[#B0B0B0] text-lg leading-relaxed">
            <motion.p variants={fadeUp}>
              As the global leader in Process Mining and Execution Management, Celonis has experienced rapid growth as enterprises increasingly prioritise operational efficiency, digital transformation, and data-driven decision making.
            </motion.p>
            <motion.p variants={fadeUp}>
              With expansion across EMEA and increasing demand for value-led customer engagement, Celonis required high-performing commercial and consulting talent capable of operating in a complex enterprise software environment — individuals who could combine technical credibility with commercial acumen, particularly within Value Engineering and strategic customer-facing functions.
            </motion.p>
            <motion.p variants={fadeUp}>
              Celonis' growth strategy required professionals who could engage senior stakeholders, articulate measurable business value, and support enterprise customers through large-scale transformation initiatives across multiple industries.
            </motion.p>
          </motion.div>
        </motion.div>
      </section>

      {/* ── MANDATE ── */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 py-24 border-t border-[rgba(255,255,255,0.06)]">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
          className="grid lg:grid-cols-12 gap-12"
        >
          <motion.div variants={fadeUp} className="lg:col-span-4">
            <div className="text-xs uppercase tracking-[0.2em] text-[#C8A96B] mb-3">Selected's Mandate</div>
            <h2 className="text-3xl font-bold text-[#F5F5F5] mb-8">What We Were Asked to Deliver</h2>
            <div className="space-y-3">
              {mandateAreas.map((area, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 px-5 py-3 bg-[rgba(200,169,107,0.07)] border border-[rgba(200,169,107,0.15)] rounded-lg"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-[#C8A96B] shrink-0" />
                  <span className="text-sm text-[#C8A96B] font-medium">{area}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div variants={stagger} className="lg:col-span-8 space-y-5 text-[#B0B0B0] text-lg leading-relaxed">
            <motion.p variants={fadeUp}>
              Selected partnered with Celonis to identify and attract high-calibre talent with expertise in enterprise SaaS, process transformation, consultative selling, and value realisation methodologies.
            </motion.p>
            <motion.p variants={fadeUp}>
              The search required extensive market mapping across highly competitive talent pools, alongside a consultative approach to candidate engagement and stakeholder management.
            </motion.p>
            <motion.p variants={fadeUp}>
              In addition to delivering hires, Selected supported Celonis with market intelligence, compensation benchmarking, and strategic hiring insight throughout the process.
            </motion.p>
          </motion.div>
        </motion.div>
      </section>

      {/* ── OUTCOME ── */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 py-24 border-t border-[rgba(255,255,255,0.06)]">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
          className="grid lg:grid-cols-12 gap-12"
        >
          <motion.div variants={fadeUp} className="lg:col-span-4">
            <div className="text-xs uppercase tracking-[0.2em] text-[#C8A96B] mb-3">Outcome / ROI</div>
            <h2 className="text-3xl font-bold text-[#F5F5F5] mb-6">12 Hires. Multiple Functions. Real Impact.</h2>
            <p className="text-[#B0B0B0] leading-relaxed">
              Selected successfully delivered 12 hires across multiple functions and regions, helping Celonis strengthen both its customer-facing and strategic leadership capabilities. By leveraging deep enterprise technology networks and a highly targeted search methodology, Selected reduced time-to-hire and consistently delivered candidates with the right balance of technical expertise, stakeholder engagement, and commercial influence.
            </p>
          </motion.div>

          <motion.div variants={stagger} className="lg:col-span-8">
            <motion.div variants={fadeUp} className="text-xs uppercase tracking-[0.2em] text-[#C8A96B] mb-6">
              Key Placements
            </motion.div>
            <div className="space-y-3">
              {placements.map((p, i) => (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  className="flex items-center gap-4 p-5 bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.07)] rounded-xl hover:border-[rgba(200,169,107,0.2)] transition-colors duration-300"
                >
                  <CheckCircle2 className="w-5 h-5 text-[#C8A96B] shrink-0" />
                  <span className="text-[#F5F5F5] font-medium">{p}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* ── PARTNERSHIP ── */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 py-24 border-t border-[rgba(255,255,255,0.06)]">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
        >
          <motion.div variants={fadeUp} className="text-xs uppercase tracking-[0.2em] text-[#C8A96B] mb-3">
            Partnership Value
          </motion.div>
          <motion.h2 variants={fadeUp} className="text-3xl font-bold text-[#F5F5F5] mb-12 max-w-xl">
            Selected became a trusted recruitment partner to Celonis by providing:
          </motion.h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {partnershipServices.map((s, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className="p-6 bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.07)] rounded-xl"
              >
                <div className="w-6 h-0.5 bg-[#C8A96B] mb-4" />
                <p className="text-[#F5F5F5] font-medium leading-snug">{s}</p>
              </motion.div>
            ))}
          </div>

          <motion.p variants={fadeUp} className="mt-10 text-[#B0B0B0] text-lg leading-relaxed max-w-3xl">
            The partnership continues to demonstrate Selected's capability to deliver exceptional talent within complex, high-growth enterprise technology businesses.
          </motion.p>
        </motion.div>
      </section>

      
    </div>
  );
}