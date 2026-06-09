import { useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Download, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";
import carrieMiller from "../../assets/images/Carrie Miller.jfif";

/* ─── animation presets ─── */
const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
};
const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.9 } },
};
const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

/* ─── data ─── */
const stats = [
  { value: "12", label: "Hires Delivered" },
  { value: "EMEA", label: "Region" },
  { value: "Value", label: "Engineering" },
  { value: "GTM", label: "Leadership" },
];

const mandateAreas = [
  "Value Partner Roles",
  "Value Engineering",
  "Enterprise Sales",
  "Leadership Appointments",
];

const placements = [
  "Value Partners",
  "Senior Value Engineers",
  "Enterprise Account Executives",
  "Strategic Sales Professionals",
  "Leadership Hires across GTM Functions",
  "Enterprise Transformation Specialists",
];

const partnershipServices = [
  "Strategic market mapping",
  "Executive-level talent engagement",
  "Consultative hiring support",
  "Candidate qualification and assessment",
  "Offer management and process coordination",
  "Ongoing market insight across the enterprise SaaS landscape",
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

export default function CelonisCaseStudy() {
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
          Celonis
        </span>
      </nav>

      {/* ─────────────────────── HERO ─────────────────────── */}
      <header className="relative min-h-screen flex flex-col justify-end overflow-hidden">
        {/* bg image */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1800&q=80"
            alt=""
            className="w-full h-full object-cover"
          />
          {/* layered overlays */}
          <div className="absolute inset-0 bg-[#080808]/70" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-[#080808]/40 to-transparent" />
          {/* gold horizontal beam */}
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

          {/* company name — massive */}
          <motion.h1
            variants={fadeUp}
            className="font-black leading-[0.88] tracking-[-0.03em] mb-8"
            style={{ fontSize: "clamp(5rem, 16vw, 14rem)" }}
          >
            Celonis
          </motion.h1>

          {/* sub-headline */}
          <motion.p
            variants={fadeUp}
            className="text-lg lg:text-xl text-[#A09A90] max-w-2xl mb-16 leading-relaxed"
          >
            Enterprise SaaS &amp; Value Engineering Hiring Across EMEA
          </motion.p>

          {/* ── STATS: full-width bordered grid ── */}
          <motion.div
            variants={fadeUp}
            className="grid grid-cols-2 lg:grid-cols-4 border border-[rgba(255,255,255,0.1)] rounded-2xl overflow-hidden"
          >
            {stats.map((s, i) => (
              <div
                key={i}
                className={`relative px-8 py-10 bg-[rgba(255,255,255,0.02)]
                  ${i < stats.length - 1 ? "border-r border-[rgba(255,255,255,0.08)]" : ""}
                  ${i < 2 ? "border-b border-[rgba(255,255,255,0.08)] lg:border-b-0" : ""}`}
              >
                {/* accent corner */}
                <div className="absolute top-0 left-0 w-6 h-px bg-[#C8A96B]" />
                <div className="absolute top-0 left-0 w-px h-6 bg-[#C8A96B]" />

                <div className="text-5xl lg:text-7xl font-black text-[#C8A96B] leading-none mb-3 tracking-tight">
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
          {/* left pull text + portrait */}
          <motion.div
            variants={fadeUp}
            className="lg:col-span-5 flex flex-col gap-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold leading-tight text-[#F0EDE8]">
              The World's Leader in{" "}
              <span className="text-[#C8A96B]">Process Mining</span>
            </h2>

            {/* Carrie Miller */}
            <div className="flex items-center gap-5">
              <img
                src={carrieMiller}
                alt="Carrie Miller"
                className="w-20 h-20 rounded-full object-cover object-top flex-shrink-0 ring-1 ring-[rgba(200,169,107,0.35)]"
              />
              <div>
                <p className="text-[#F0EDE8] font-semibold text-base">
                  Carrie Miller
                </p>
                <p className="text-[#C8A96B] text-xs mt-1 tracking-wide leading-snug">
                  Global Talent Acquisition Leader — Celonis
                </p>
              </div>
            </div>
          </motion.div>

          {/* right body */}
          <motion.div
            variants={stagger}
            className="lg:col-span-7 space-y-5 text-[#A09A90] text-lg leading-relaxed"
          >
            <motion.p variants={fadeUp}>
              I have had the pleasure of partnering with Selected Group as a
              strategic recruitment partner supporting our hiring efforts across
              North America, and I can confidently recommend them to any
              organisation looking for a high-performing talent acquisition
              partner.
            </motion.p>
            <motion.p variants={fadeUp}>
              Throughout our partnership, the team at Selected Group has
              consistently demonstrated a deep understanding of our business,
              hiring requirements, and talent market dynamics. They have become
              a trusted extension of our Talent Acquisition function, providing
              high-quality candidates, valuable market intelligence, and
              exceptional responsiveness throughout the recruitment process.
              What has particularly impressed me is their ability to quickly
              understand complex hiring needs and deliver strong talent across a
              variety of functions and seniority levels. Their communication is
              proactive, their execution is reliable, and they continually focus
              on delivering results while maintaining an excellent candidate
              experience.
            </motion.p>
            <motion.p variants={fadeUp}>
              Beyond simply filling roles, Selected Group has built a genuine
              partnership with our team. They invest time in understanding our
              culture, challenge our thinking when appropriate, and consistently
              bring solutions that help us attract and secure top talent in a
              highly competitive market. I greatly value the relationship we
              have built and consider Selected Group one of our most trusted
              recruitment partners. I would have no hesitation in recommending
              them to organisations seeking a recruitment partner that combines
              professionalism, market expertise, and a true commitment to client
              success.
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
            {/* mandate pills — left col */}
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

            {/* body — right col */}
            <motion.div
              variants={stagger}
              className="lg:col-span-8 space-y-5 text-[#A09A90] text-lg leading-relaxed"
            >
              <motion.p variants={fadeUp}>
                Selected partnered with Celonis to support hiring across several
                key strategic business areas, including Value Partner roles,
                Value Engineering, Enterprise Sales, and Leadership
                appointments.
              </motion.p>
              <motion.p variants={fadeUp}>
                We were tasked with identifying and attracting high-calibre
                talent with expertise in enterprise SaaS, process
                transformation, consultative selling, and value realisation
                methodologies.
              </motion.p>
              <motion.p variants={fadeUp}>
                The search required extensive market mapping across highly
                competitive talent pools, alongside a consultative approach to
                candidate engagement and stakeholder management.
              </motion.p>
              <motion.p variants={fadeUp}>
                In addition to delivering hires, Selected supported Celonis with
                market intelligence, compensation benchmarking, and strategic
                hiring insight throughout the process.
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
              12 Strategic Hires Delivered
            </h2>
            <p className="text-[#A09A90] text-lg leading-relaxed mb-6">
              Selected successfully delivered 12 hires across multiple functions
              and regions, helping Celonis strengthen both its customer-facing
              and strategic leadership capabilities.
            </p>
            <p className="text-[#A09A90] text-lg leading-relaxed">
              By leveraging deep enterprise technology networks and a highly
              targeted search methodology, Selected reduced time-to-hire and
              consistently delivered candidates with the right combination of
              technical expertise, stakeholder engagement, and commercial
              influence.
            </p>
          </motion.div>

          {/* placements list */}
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
                  <span className="font-medium text-[#F0EDE8]">{item}</span>
                  <span className="ml-auto text-[11px] font-mono text-[#555]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
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
              Access the complete Celonis case study including Product hiring
              strategy, leadership placements, and transformation outcomes.
            </p>
          </div>

          {/* button */}

          <a
            // href="/pdfs/Celonis Case Study.pdf"
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
              Selected became a trusted recruitment partner to Celonis by
              providing:
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
              The partnership continues to demonstrate Selected's capability to
              deliver exceptional talent within complex, high-growth enterprise
              technology businesses.
            </motion.p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
