import { useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Download, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";

/* ─── animations ─── */
const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

/* ─── data ─── */
const stats = [
  { value: "10", label: "Strategic Hires" },
  { value: "UK + US", label: "Markets" },
  { value: "FinTech", label: "Industry" },
  { value: "6 Months", label: "Delivery Time" },
];

const mandateAreas = [
  "Enterprise Account Management",
  "Customer Success Hiring",
  "Technical Implementation",
  "Project Management Recruitment",
];

const placements = [
  "Account Managers",
  "Customer Success Specialists",
  "Implementation Project Managers",
  "Enterprise Aftercare Professionals",
  "Technical Client Engagement Talent",
  "Upsell & Cross-Sell Specialists",
];

const partnershipServices = [
  "Enterprise talent mapping",
  "Commercial hiring strategy",
  "Technical implementation recruitment",
  "Customer success hiring support",
  "Candidate assessment & qualification",
  "UK & North American hiring delivery",
];

function SectionLabel({ number, label }) {
  return (
    <div className="flex items-center gap-4 mb-10">
      <span className="text-[11px] font-mono text-[#C8A96B] opacity-60">
        {String(number).padStart(2, "0")}
      </span>

      <div className="h-px flex-1 bg-[rgba(255,255,255,0.08)]" />

      <span className="text-[11px] uppercase tracking-[0.25em] text-[#C8A96B]">
        {label}
      </span>
    </div>
  );
}

export default function BehavoxCaseStudy() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-[#080808] min-h-screen text-[#F0EDE8] overflow-x-hidden">

      {/* NAV */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between
        px-6 lg:px-12 py-5 bg-[rgba(8,8,8,0.85)] backdrop-blur-lg
        border-b border-[rgba(255,255,255,0.04)]"
      >
        <Link
          to="/case-studies"
          className="group inline-flex items-center gap-2 text-sm text-[#888]
          hover:text-[#C8A96B] transition-colors"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Case Studies
        </Link>

        <span className="text-[11px] uppercase tracking-[0.25em] text-[#C8A96B]">
          Behavox
        </span>
      </nav>

      {/* HERO */}
      <header className="relative min-h-screen flex flex-col justify-end overflow-hidden">

        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1551434678-e076c223a692?w=1800&q=80"
            alt=""
            className="w-full h-full object-cover"
          />

          <div className="absolute inset-0 bg-[#080808]/75" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-[#080808]/40 to-transparent" />
        </div>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 pb-20 pt-40 w-full"
        >
          <motion.div variants={fadeUp} className="flex items-center gap-3 mb-8">
            <div className="h-px w-12 bg-[#C8A96B]" />

            <span className="text-xs uppercase tracking-[0.3em] text-[#C8A96B]">
              Case Study
            </span>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="font-black leading-[0.88] tracking-[-0.03em] mb-8"
            style={{ fontSize: "clamp(4rem, 14vw, 12rem)" }}
          >
            Behavox
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="text-lg lg:text-xl text-[#A09A90] max-w-2xl mb-16 leading-relaxed"
          >
            Supporting Hypergrowth Through Strategic Enterprise Hiring
          </motion.p>

          {/* stats */}
          <motion.div
            variants={fadeUp}
            className="grid grid-cols-2 lg:grid-cols-4 border
            border-[rgba(255,255,255,0.1)] rounded-2xl overflow-hidden"
          >
            {stats.map((s, i) => (
              <div
                key={i}
                className={`relative px-8 py-10 bg-[rgba(255,255,255,0.02)]
                ${
                  i < stats.length - 1
                    ? "border-r border-[rgba(255,255,255,0.08)]"
                    : ""
                }
                ${
                  i < 2
                    ? "border-b border-[rgba(255,255,255,0.08)] lg:border-b-0"
                    : ""
                }`}
              >
                <div className="absolute top-0 left-0 w-6 h-px bg-[#C8A96B]" />
                <div className="absolute top-0 left-0 w-px h-6 bg-[#C8A96B]" />

                <div className="text-4xl lg:text-6xl font-black text-[#C8A96B] mb-3">
                  {s.value}
                </div>

                <div className="text-[11px] uppercase tracking-[0.22em] text-[#888]">
                  {s.label}
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </header>

      {/* OVERVIEW */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 py-28">
        <SectionLabel number={1} label="Overview" />

        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20">

          <div className="lg:col-span-5">
            <h2 className="text-4xl lg:text-5xl font-bold leading-tight">
              Scaling a{" "}
              <span className="text-[#C8A96B]">
                Hypergrowth FinTech Business
              </span>
            </h2>
          </div>

          <div className="lg:col-span-7 space-y-5 text-[#A09A90] text-lg leading-relaxed">
            <p>
              Behavox is an AI-driven technology company focused on behavioral
              analytics within financial workplace environments.
            </p>

            <p>
              During a rapid hypergrowth phase, the company required strategic
              enterprise hiring support across commercial, implementation,
              and customer-facing functions in both the UK and the United States.
            </p>

            <p>
              The challenge involved balancing highly technical implementation
              hiring alongside customer success and enterprise account management
              recruitment within a fast-moving FinTech environment.
            </p>
          </div>
        </div>
      </section>

      {/* MANDATE */}
      <section className="bg-[#0D0D0D] border-y border-[rgba(255,255,255,0.06)]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-28">

          <SectionLabel number={2} label="Selected's Mandate" />

          <div className="grid lg:grid-cols-12 gap-12 lg:gap-20">

            <div className="lg:col-span-4 space-y-4">
              <h2 className="text-3xl font-bold mb-8">
                Strategic Hypergrowth Hiring
              </h2>

              {mandateAreas.map((area, i) => (
                <div
                  key={i}
                  className="flex items-center gap-4 px-5 py-4 rounded-xl
                  border border-[rgba(200,169,107,0.18)]
                  bg-[rgba(200,169,107,0.05)]"
                >
                  <span className="text-[10px] font-mono text-[#C8A96B] opacity-50">
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  <span className="text-sm font-semibold text-[#C8A96B]">
                    {area}
                  </span>
                </div>
              ))}
            </div>

            <div className="lg:col-span-8 space-y-5 text-[#A09A90] text-lg leading-relaxed">
              <p>
                Selected partnered closely with Behavox leadership to support
                rapid enterprise growth through targeted hiring across both
                technical and commercial functions.
              </p>

              <p>
                The engagement included enterprise account management,
                implementation project management, customer success,
                and post-delivery client engagement recruitment.
              </p>

              <p>
                Through a flexible and fast-moving recruitment strategy,
                Selected helped Behavox scale key customer-facing operations
                without compromising hiring quality.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* OUTCOME */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 py-28">

        <SectionLabel number={3} label="Outcome / ROI" />

        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20">

          <div className="lg:col-span-4">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6 leading-tight">
              10 Strategic Hires Delivered
            </h2>

            <p className="text-[#A09A90] text-lg leading-relaxed mb-6">
              Selected successfully completed 10 enterprise hires across
              commercial and implementation functions within 6 months.
            </p>

            <p className="text-[#A09A90] text-lg leading-relaxed">
              The engagement supported Behavox’s operational readiness,
              customer retention strategy, and enterprise growth objectives
              during a critical expansion phase.
            </p>
          </div>

          <div className="lg:col-span-8">
            <p className="text-[11px] uppercase tracking-[0.25em]
            text-[#C8A96B] mb-6">
              Key Placements
            </p>

            <div className="space-y-3">
              {placements.map((item, i) => (
                <div
                  key={i}
                  className="group flex items-center gap-5 px-6 py-5 rounded-xl
                  border border-[rgba(255,255,255,0.07)]
                  bg-[rgba(255,255,255,0.02)]
                  hover:border-[rgba(200,169,107,0.25)]
                  hover:bg-[rgba(200,169,107,0.04)]
                  transition-all duration-300"
                >
                  <CheckCircle2 className="w-5 h-5 text-[#C8A96B]" />

                  <span className="font-medium text-[#F0EDE8]">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ───────────────────── DOWNLOAD ───────────────────── */}
            <section className="max-w-7xl mx-auto px-6 lg:px-12 pb-16">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="relative overflow-hidden rounded-2xl
                border border-[rgba(200,169,107,0.2)]
                bg-[rgba(200,169,107,0.04)]
                px-10 py-12 lg:px-16 lg:py-14
                flex flex-col lg:flex-row items-start lg:items-center
                gap-10 justify-between"
              >
                <div className="absolute top-0 left-0 w-24 h-px bg-[#C8A96B]" />
                <div className="absolute top-0 left-0 w-px h-24 bg-[#C8A96B]" />
      
                <div>
                  <p className="text-[11px] uppercase tracking-[0.3em] text-[#C8A96B] mb-4">
                    Download PDF
                  </p>
      
                  <h3 className="text-2xl lg:text-3xl font-bold mb-3">
                    Get the Full Case Study
                  </h3>
      
                  <p className="text-[#A09A90] max-w-xl leading-relaxed">
                    Access the complete Behavox case study including Product
                    hiring strategy, leadership placements, and transformation outcomes.
                  </p>
                </div>
      
                {/* button */}
              
      
                <a
                  href="/pdfs/Behavox Case Study.pdf"
                  download
                  className="group shrink-0 inline-flex items-center gap-3
                  px-8 py-4 rounded-xl bg-[#C8A96B]
                  text-[#0A0A0A] font-bold text-sm
                  hover:bg-[#D6B97A] transition-all duration-200"
                >
                  <Download className="w-4 h-4" />
                  Download PDF
                </a>
              </motion.div>
            </section>

      {/* PARTNERSHIP */}
      <section className="bg-[#0D0D0D] border-t border-[rgba(255,255,255,0.06)]">

        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-28">

          <SectionLabel number={4} label="Partnership Value" />

          <h2 className="text-3xl lg:text-4xl font-bold mb-14 max-w-2xl leading-tight">
            Selected supported Behavox by providing:
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {partnershipServices.map((service, i) => (
              <div
                key={i}
                className="group p-7 rounded-xl
                border border-[rgba(255,255,255,0.07)]
                bg-[rgba(255,255,255,0.02)]
                hover:border-[rgba(200,169,107,0.2)]
                hover:bg-[rgba(200,169,107,0.03)]
                transition-all duration-300"
              >
                <span className="text-[10px] font-mono text-[#C8A96B] opacity-40 block mb-5">
                  {String(i + 1).padStart(2, "0")}
                </span>

                <div className="w-8 h-[2px] bg-[#C8A96B] mb-5 group-hover:w-14 transition-all duration-300" />

                <p className="text-[#F0EDE8] font-medium leading-relaxed">
                  {service}
                </p>
              </div>
            ))}
          </div>

          <p className="mt-14 text-[#A09A90] text-lg leading-relaxed max-w-4xl">
            The partnership enabled Behavox to strengthen customer retention,
            improve operational scalability, and support long-term enterprise
            growth objectives during a period of accelerated expansion.
          </p>
        </div>
      </section>
    </div>
  );
}