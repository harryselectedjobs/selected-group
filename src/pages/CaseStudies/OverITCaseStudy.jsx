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
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const stagger = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

/* ─── data ─── */
const stats = [
  { value: "US + EU", label: "Markets" },
  { value: "SDR → VP", label: "Hiring Scope" },
  { value: "FSM", label: "Technology" },
  { value: "SaaS", label: "Enterprise Focus" },
];

const mandateAreas = [
  "Enterprise Sales",
  "Presales & Consulting",
  "Marketing & Demand Gen",
  "Professional Services",
];

const placements = [
  "Sales Development Representatives",
  "Enterprise Account Executives",
  "Solutions Consultants",
  "Marketing Professionals",
  "Professional Services Talent",
  "VP-Level Commercial Leadership",
];

const services = [
  "International talent mapping",
  "Enterprise SaaS recruitment",
  "Leadership hiring support",
  "Candidate qualification & assessment",
  "Sales and GTM hiring strategy",
  "US & European market coverage",
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

export default function OverITCaseStudy() {
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
          OverIT
        </span>
      </nav>

      {/* HERO */}
      <header className="relative min-h-screen flex flex-col justify-end overflow-hidden">

        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?w=1800&q=80"
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
          <motion.div
            variants={fadeUp}
            className="flex items-center gap-3 mb-8"
          >
            <div className="h-px w-12 bg-[#C8A96B]" />

            <span className="text-xs uppercase tracking-[0.3em] text-[#C8A96B]">
              Case Study
            </span>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="font-black leading-[0.88] tracking-[-0.03em] mb-8"
            style={{ fontSize: "clamp(5rem, 16vw, 14rem)" }}
          >
            OverIT
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="text-lg lg:text-xl text-[#A09A90]
            max-w-2xl mb-16 leading-relaxed"
          >
            Building High-Performance Commercial Teams Across Europe & the US
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="grid grid-cols-2 lg:grid-cols-4
            border border-[rgba(255,255,255,0.1)]
            rounded-2xl overflow-hidden"
          >
            {stats.map((s, i) => (
              <div
                key={i}
                className={`px-8 py-10 bg-[rgba(255,255,255,0.02)]
                ${i < stats.length - 1
                    ? "border-r border-[rgba(255,255,255,0.08)]"
                    : ""
                  }
                ${i < 2
                    ? "border-b border-[rgba(255,255,255,0.08)] lg:border-b-0"
                    : ""
                  }`}
              >
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
              Scaling Enterprise
              <span className="text-[#C8A96B]"> Field Service Technology</span>
            </h2>
          </div>

          <div className="lg:col-span-7 space-y-5 text-[#A09A90] text-lg leading-relaxed">
            <p>
              OverIT is a leading innovator in Field Service Management
              technology, helping enterprises optimise field operations through
              advanced software solutions.
            </p>

            <p>
              As demand accelerated across Europe and the United States,
              OverIT required high-performing commercial and delivery teams
              capable of supporting international growth initiatives.
            </p>

            <p>
              The company needed experienced professionals across enterprise
              sales, presales, marketing, and professional services functions
              within complex SaaS environments.
            </p>
          </div>
        </div>
      </section>

      {/* MANDATE */}
      <section className="bg-[#0D0D0D] border-y border-[rgba(255,255,255,0.06)]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-28">

          <SectionLabel number={2} label="The Mandate" />

          <div className="grid lg:grid-cols-12 gap-12 lg:gap-20">

            <div className="lg:col-span-4 space-y-4">
              <h2 className="text-3xl font-bold mb-8">
                Strategic Hiring Areas
              </h2>

              {mandateAreas.map((item, i) => (
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
                    {item}
                  </span>
                </div>
              ))}
            </div>

            <div className="lg:col-span-8 space-y-5 text-[#A09A90] text-lg leading-relaxed">
              <p>
                Selected partnered closely with OverIT to support international
                expansion and scale high-performing commercial teams.
              </p>

              <p>
                The engagement focused on recruiting professionals with strong
                enterprise software backgrounds, commercial expertise, and
                industry-specific knowledge across SaaS environments.
              </p>

              <p>
                Hiring ranged from SDR-level appointments through to senior
                commercial leadership positions, including Vice Presidents of Sales.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* RESULTS */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 py-28">

        <SectionLabel number={3} label="Results" />

        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20">

          <div className="lg:col-span-4">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6 leading-tight">
              International Growth Support
            </h2>

            <p className="text-[#A09A90] text-lg leading-relaxed">
              Selected successfully helped OverIT strengthen sales, presales,
              marketing, and delivery capabilities across Europe and the US.
            </p>
          </div>

          <div className="lg:col-span-8 space-y-3">

            {placements.map((item, i) => (
              <div
                key={i}
                className="flex items-center gap-5 px-6 py-5 rounded-xl
                border border-[rgba(255,255,255,0.07)]
                bg-[rgba(255,255,255,0.02)]"
              >
                <CheckCircle2 className="w-5 h-5 text-[#C8A96B]" />

                <span className="font-medium">{item}</span>
              </div>
            ))}

          </div>

        </div>
      </section>

      {/* SERVICES */}
      <section className="bg-[#0D0D0D] border-t border-[rgba(255,255,255,0.06)]">

        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-28">

          <SectionLabel number={4} label="Partnership Value" />

          <h2 className="text-3xl lg:text-4xl font-bold mb-14 max-w-2xl leading-tight">
            Selected supported OverIT through:
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">

            {services.map((service, i) => (
              <div
                key={i}
                className="p-7 rounded-xl border border-[rgba(255,255,255,0.07)]
                bg-[rgba(255,255,255,0.02)]"
              >
                <span className="text-[10px] font-mono text-[#C8A96B] opacity-40 block mb-5">
                  {String(i + 1).padStart(2, "0")}
                </span>

                <div className="w-8 h-[2px] bg-[#C8A96B] mb-5" />

                <p className="font-medium leading-relaxed">
                  {service}
                </p>
              </div>
            ))}

          </div>

        </div>
      </section>

      {/* DOWNLOAD */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 py-20">

        <div
          className="rounded-2xl border border-[rgba(200,169,107,0.2)]
          bg-[rgba(200,169,107,0.04)] px-10 py-12"
        >
          <p className="text-[11px] uppercase tracking-[0.3em] text-[#C8A96B] mb-4">
            Download PDF
          </p>

          <h3 className="text-2xl lg:text-3xl font-bold mb-3">
            Get the Full OverIT Case Study
          </h3>

          <p className="text-[#A09A90] max-w-2xl mb-8">
            Access the complete case study document including hiring strategy,
            placements, and business outcomes.
          </p>

          <a
            href="/pdfs/OverIT Case Study.pdf"
            download
            className="inline-flex items-center gap-3 px-8 py-4 rounded-xl
            bg-[#C8A96B] text-[#0A0A0A] font-bold text-sm"
          >
            <Download className="w-4 h-4" />
            Download PDF
          </a>
        </div>

      </section>

    </div>
  );
}