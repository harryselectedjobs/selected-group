import { useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Download, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";

/* ─── animation presets ─── */
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
  { value: "Europe", label: "Region" },
  { value: "Enterprise", label: "Sales Hiring" },
  { value: "GTM", label: "Expansion" },
  { value: "Private", label: "Sector Growth" },
];

const mandateAreas = [
  "Enterprise Sales",
  "Management Consulting",
  "Go-To-Market Hiring",
  "Commercial Expansion",
];

const placements = [
  "Enterprise Sales Professionals",
  "Management Consultants",
  "Presales Specialists",
  "Marketing Professionals",
  "Professional Services Talent",
  "Enterprise Leadership Hires",
];

const partnershipServices = [
  "Strategic market mapping",
  "Executive-level talent engagement",
  "Go-To-Market hiring support",
  "Candidate qualification and assessment",
  "Enterprise leadership recruitment",
  "Commercial growth strategy support",
];

/* ─── shared section label ─── */
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

export default function PalantirCaseStudy() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-[#080808] min-h-screen text-[#F0EDE8] overflow-x-hidden">

      {/* ─────────────────────── NAV ─────────────────────── */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 lg:px-12 py-5
        bg-[rgba(8,8,8,0.85)] backdrop-blur-lg border-b border-[rgba(255,255,255,0.04)]"
      >
        <Link
          to="/case-studies"
          className="group inline-flex items-center gap-2 text-sm text-[#888] hover:text-[#C8A96B] transition-colors"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Case Studies
        </Link>

        <span className="text-[11px] uppercase tracking-[0.25em] text-[#C8A96B]">
          Palantir
        </span>
      </nav>

      {/* ─────────────────────── HERO ─────────────────────── */}
      <header className="relative min-h-screen flex flex-col justify-end overflow-hidden">

        {/* background image */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1800&q=80"
            alt=""
            className="w-full h-full object-cover"
          />

          <div className="absolute inset-0 bg-[#080808]/70" />

          <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-[#080808]/40 to-transparent" />

          <div className="absolute bottom-[38%] left-0 right-0 h-px bg-[#C8A96B]/20" />
        </div>

        {/* content */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 pb-20 pt-40 w-full"
        >

          {/* eyebrow */}
          <motion.div
            variants={fadeUp}
            className="flex items-center gap-3 mb-8"
          >
            <div className="h-px w-12 bg-[#C8A96B]" />

            <span className="text-xs uppercase tracking-[0.3em] text-[#C8A96B]">
              Case Study
            </span>
          </motion.div>

          {/* title */}
          <motion.h1
            variants={fadeUp}
            className="font-black leading-[0.88] tracking-[-0.03em] mb-8"
            style={{ fontSize: "clamp(4.5rem, 16vw, 13rem)" }}
          >
            Palantir
          </motion.h1>

          {/* subtitle */}
          <motion.p
            variants={fadeUp}
            className="text-lg lg:text-xl text-[#A09A90] max-w-2xl mb-16 leading-relaxed"
          >
            Building a Go-To-Market Function for Private Sector Expansion
          </motion.p>

          {/* stats */}
          <motion.div
            variants={fadeUp}
            className="grid grid-cols-2 lg:grid-cols-4 border border-[rgba(255,255,255,0.1)] rounded-2xl overflow-hidden"
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

                <div className="text-4xl lg:text-6xl font-black text-[#C8A96B] leading-none mb-3 tracking-tight">
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

      {/* ─────────────────────── OVERVIEW ─────────────────────── */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 py-28">

        <SectionLabel number={1} label="Overview" />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
          className="grid lg:grid-cols-12 gap-12 lg:gap-20"
        >

          {/* left */}
          <motion.div variants={fadeUp} className="lg:col-span-5">
            <h2 className="text-4xl lg:text-5xl font-bold leading-tight text-[#F0EDE8]">
              Expanding Into The{" "}
              <span className="text-[#C8A96B]">Private Sector</span>
            </h2>
          </motion.div>

          {/* right */}
          <motion.div
            variants={stagger}
            className="lg:col-span-7 space-y-5 text-[#A09A90] text-lg leading-relaxed"
          >
            <motion.p variants={fadeUp}>
              Palantir Technologies is globally recognised for delivering
              advanced data analytics platforms across government and enterprise
              environments.
            </motion.p>

            <motion.p variants={fadeUp}>
              While the company had achieved significant success within the
              public sector, expanding deeper into private enterprise markets
              required a new commercial Go-To-Market strategy.
            </motion.p>

            <motion.p variants={fadeUp}>
              Palantir required experienced enterprise sales and consulting
              professionals capable of engaging large commercial organisations
              and supporting long-term enterprise growth initiatives across
              Europe.
            </motion.p>
          </motion.div>
        </motion.div>
      </section>

      {/* ─────────────────────── MANDATE ─────────────────────── */}
      <section className="bg-[#0D0D0D] border-y border-[rgba(255,255,255,0.06)]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-28">

          <SectionLabel number={2} label="Selected's Mandate" />

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="grid lg:grid-cols-12 gap-12 lg:gap-20"
          >

            {/* left */}
            <motion.div variants={fadeUp} className="lg:col-span-4 space-y-4">
              <h2 className="text-3xl font-bold mb-8 text-[#F0EDE8]">
                Strategic Hiring Support
              </h2>

              {mandateAreas.map((area, i) => (
                <div
                  key={i}
                  className="flex items-center gap-4 px-5 py-4 rounded-xl
                  border border-[rgba(200,169,107,0.18)] bg-[rgba(200,169,107,0.05)]"
                >
                  <span className="text-[10px] font-mono text-[#C8A96B] opacity-50">
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  <span className="text-sm font-semibold text-[#C8A96B]">
                    {area}
                  </span>
                </div>
              ))}
            </motion.div>

            {/* right */}
            <motion.div
              variants={stagger}
              className="lg:col-span-8 space-y-5 text-[#A09A90] text-lg leading-relaxed"
            >
              <motion.p variants={fadeUp}>
                Selected was engaged to help Palantir establish a scalable
                private sector Go-To-Market function across Europe.
              </motion.p>

              <motion.p variants={fadeUp}>
                The mandate focused on identifying and securing high-performing
                enterprise sales professionals, management consultants, and
                customer-facing commercial talent capable of operating within
                complex enterprise environments.
              </motion.p>

              <motion.p variants={fadeUp}>
                The project required strategic talent mapping, executive-level
                engagement, and targeted outreach across highly competitive
                enterprise technology markets.
              </motion.p>

              <motion.p variants={fadeUp}>
                By combining deep enterprise hiring expertise with consultative
                recruitment support, Selected helped Palantir strengthen its
                commercial expansion strategy within the private sector.
              </motion.p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ─────────────────────── OUTCOME ─────────────────────── */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 py-28">

        <SectionLabel number={3} label="Outcome / ROI" />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
          className="grid lg:grid-cols-12 gap-12 lg:gap-20"
        >

          {/* left */}
          <motion.div variants={fadeUp} className="lg:col-span-4">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6 text-[#F0EDE8] leading-tight">
              Enterprise GTM Capability Delivered
            </h2>

            <p className="text-[#A09A90] text-lg leading-relaxed mb-6">
              Selected supported Palantir’s commercial expansion by building
              high-performing enterprise-facing teams across Europe.
            </p>

            <p className="text-[#A09A90] text-lg leading-relaxed">
              The engagement strengthened Palantir’s ability to engage private
              sector organisations while accelerating the development of its
              enterprise Go-To-Market infrastructure.
            </p>
          </motion.div>

          {/* right */}
          <motion.div variants={stagger} className="lg:col-span-8">
            <motion.p
              variants={fadeUp}
              className="text-[11px] uppercase tracking-[0.25em] text-[#C8A96B] mb-6"
            >
              Key Placements
            </motion.p>

            <div className="space-y-3">
              {placements.map((item, i) => (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  className="group flex items-center gap-5 px-6 py-5 rounded-xl
                  border border-[rgba(255,255,255,0.07)] bg-[rgba(255,255,255,0.02)]
                  hover:border-[rgba(200,169,107,0.25)] hover:bg-[rgba(200,169,107,0.04)]
                  transition-all duration-300"
                >
                  <CheckCircle2 className="w-5 h-5 text-[#C8A96B] shrink-0 opacity-80 group-hover:opacity-100 transition-opacity" />

                  <span className="font-medium text-[#F0EDE8]">
                    {item}
                  </span>

                  <span className="ml-auto text-[11px] font-mono text-[#555]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* ─────────────────────── DOWNLOAD ─────────────────────── */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 pb-16">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="relative overflow-hidden rounded-2xl border border-[rgba(200,169,107,0.2)]
          bg-[rgba(200,169,107,0.04)] px-10 py-12 lg:px-16 lg:py-14
          flex flex-col lg:flex-row items-start lg:items-center gap-10 justify-between"
        >

          <div className="absolute top-0 left-0 w-24 h-px bg-[#C8A96B]" />
          <div className="absolute top-0 left-0 w-px h-24 bg-[#C8A96B]" />
          <div className="absolute bottom-0 right-0 w-24 h-px bg-[#C8A96B]/40" />
          <div className="absolute bottom-0 right-0 w-px h-24 bg-[#C8A96B]/40" />

          <div>
            <p className="text-[11px] uppercase tracking-[0.3em] text-[#C8A96B] mb-4">
              Download PDF
            </p>

            <h3 className="text-2xl lg:text-3xl font-bold text-[#F0EDE8] mb-3">
              Get the Full Case Study
            </h3>

            <p className="text-[#A09A90] max-w-xl leading-relaxed">
              Access the complete Palantir case study document including hiring
              strategy, delivered roles, and partnership outcomes.
            </p>
          </div>

          <a
            href="/Palantir Case Study.pdf"
            download
            className="group shrink-0 inline-flex items-center gap-3 px-8 py-4 rounded-xl
            bg-[#C8A96B] text-[#0A0A0A] font-bold text-sm
            hover:bg-[#D6B97A] active:scale-95 transition-all duration-200"
          >
            <Download className="w-4 h-4" />
            Download PDF
          </a>
        </motion.div>
      </section>

      {/* ─────────────────────── PARTNERSHIP ─────────────────────── */}
      <section className="bg-[#0D0D0D] border-t border-[rgba(255,255,255,0.06)]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-28">

          <SectionLabel number={4} label="Partnership Value" />

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
          >

            <motion.h2
              variants={fadeUp}
              className="text-3xl lg:text-4xl font-bold mb-14 max-w-2xl text-[#F0EDE8] leading-tight"
            >
              Selected became a trusted recruitment partner to Palantir by providing:
            </motion.h2>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {partnershipServices.map((service, i) => (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  className="group p-7 rounded-xl border border-[rgba(255,255,255,0.07)]
                  bg-[rgba(255,255,255,0.02)] hover:border-[rgba(200,169,107,0.2)]
                  hover:bg-[rgba(200,169,107,0.03)] transition-all duration-300"
                >
                  <span className="text-[10px] font-mono text-[#C8A96B] opacity-40 block mb-5">
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  <div className="w-8 h-[2px] bg-[#C8A96B] mb-5 group-hover:w-14 transition-all duration-300" />

                  <p className="text-[#F0EDE8] font-medium leading-relaxed">
                    {service}
                  </p>
                </motion.div>
              ))}
            </div>

            <motion.p
              variants={fadeUp}
              className="mt-14 text-[#A09A90] text-lg leading-relaxed max-w-4xl"
            >
              The partnership demonstrated Selected’s ability to support
              complex enterprise hiring initiatives while helping scale
              commercial Go-To-Market functions within high-growth technology
              businesses.
            </motion.p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}