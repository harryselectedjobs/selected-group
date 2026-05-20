import { useEffect } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  Play,
} from "lucide-react";

import { Link } from "react-router-dom";

/* ───────────────── animations ───────────────── */

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

/* ───────────────── data ───────────────── */

const stats = [
  { value: "10+", label: "Years Experience" },
  { value: "3000+", label: "Placements" },
  { value: "Global", label: "Technology Clients" },
  { value: "GTM", label: "Product & Engineering" },
];

const services = [
  "Contingency Recruitment",
  "Retained Search",
  "Recruitment Process Outsourcing",
  "Executive Talent Mapping",
];

const specialisms = [
  "Go-To-Market (GTM)",
  "Professional Services",
  "Product",
  "Engineering",
];

const values = [
  "Relationship-first recruitment partnerships",
  "Deep technology market expertise",
  "Honest and transparent communication",
  "Long-term customer success focus",
  "Strategic scaling support",
  "Sustainable hiring and retention mindset",
];

const achievements = [
  "3,000+ successful placements globally",
  "Trusted by startups to enterprise organisations",
  "Partnerships across AI, SaaS, Cybersecurity & FinTech",
  "Over a decade of technology recruitment expertise",
  "Global delivery across Europe and North America",
  "Long-standing relationships with world-class technology businesses",
];

const clients = [
  "Palantir",
  "Apple",
  "Oracle",
  "Anthropic",
  "Celonis",
  "Behavox",
  "SentinelOne",
  "Wiz",
  "Darktrace",
  "Snyk",
  "Confluent",
  "monday.com",
  "Plaid",
  "Ramp",
  "Rubrik",
  "Pure Storage",
];

/* ───────────────── section label ───────────────── */

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

export default function AboutPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-[#080808] min-h-screen text-[#F0EDE8] overflow-x-hidden">

      {/* ───────────────── HERO ───────────────── */}

      <section className="relative min-h-screen flex items-center overflow-hidden">

        {/* background */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?q=80&w=1800&auto=format&fit=crop"
            alt=""
            className="w-full h-full object-cover"
          />

          <div className="absolute inset-0 bg-[#080808]/80" />

          <div className="absolute inset-0 bg-gradient-to-b from-[#080808]/50 to-[#080808]" />
        </div>

        {/* content */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 pt-40 pb-24 w-full"
        >

          <motion.div
            variants={fadeUp}
            className="flex items-center gap-3 mb-8"
          >
            <div className="h-px w-12 bg-[#C8A96B]" />

            <span className="text-xs uppercase tracking-[0.3em] text-[#C8A96B]">
              About Selected Group
            </span>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="font-black leading-[0.9] tracking-[-0.04em] mb-8"
            style={{
              fontSize: "clamp(4rem, 13vw, 10rem)",
            }}
          >
            Building
            <br />
            Teams That
            <br />
            Scale
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="text-lg lg:text-xl text-[#A09A90] max-w-3xl leading-relaxed mb-16"
          >
            Selected Group is a specialist technology recruitment business
            helping software vendors, technology companies, and consulting
            organisations scale across Go-To-Market, Professional Services,
            Product, and Engineering functions globally.
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

                <div className="text-5xl lg:text-7xl font-black text-[#C8A96B] leading-none mb-3">
                  {s.value}
                </div>

                <div className="text-[11px] uppercase tracking-[0.22em] text-[#888]">
                  {s.label}
                </div>

              </div>
            ))}

          </motion.div>
        </motion.div>
      </section>

      {/* ───────────────── STORY ───────────────── */}

      <section className="max-w-7xl mx-auto px-6 lg:px-12 py-28">

        <SectionLabel
          number={1}
          label="Our Story"
        />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
          className="grid lg:grid-cols-12 gap-14 lg:gap-20"
        >

          <motion.div
            variants={fadeUp}
            className="lg:col-span-5"
          >
            <h2 className="text-4xl lg:text-5xl font-bold leading-tight">
              Built On
              <span className="text-[#C8A96B]"> Trust, Partnership & Results</span>
            </h2>
          </motion.div>

          <motion.div
            variants={stagger}
            className="lg:col-span-7 space-y-6 text-[#A09A90] text-lg leading-relaxed"
          >

            <motion.p variants={fadeUp}>
              Selected Group was founded over ten years ago by Steven Petty and
              Harry Brown after a successful partnership during their time at
              Abika Consulting.
            </motion.p>

            <motion.p variants={fadeUp}>
              The business was built on a simple philosophy — recruitment should
              go far beyond filling vacancies. It should create long-term value,
              scalable growth, and genuine partnerships.
            </motion.p>

            <motion.p variants={fadeUp}>
              Over the past decade, Selected Group has helped software vendors,
              consulting firms, and technology organisations scale strategically
              across GTM, Product, Engineering, and Professional Services.
            </motion.p>

            <motion.p variants={fadeUp}>
              Today, the company partners with some of the world’s most
              innovative technology businesses, supporting expansion into new
              markets while helping clients build cultures where exceptional
              people can thrive long-term.
            </motion.p>

          </motion.div>
        </motion.div>
      </section>

      {/* ───────────────── VIDEO SECTION ───────────────── */}

      <section className="bg-[#0D0D0D] border-y border-[rgba(255,255,255,0.06)]">

        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-28">

          <SectionLabel
            number={2}
            label="Founder Story"
          />

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="relative overflow-hidden rounded-3xl border border-[rgba(255,255,255,0.08)]"
          >

            {/* VIDEO */}
            <video
              className="w-full h-[600px] object-cover"
              autoPlay
              muted
              loop
              playsInline
            >
              <source
                src="/videos/selected-story.mp4"
                type="video/mp4"
              />
            </video>

            {/* overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-[#080808]/20 to-transparent" />

            {/* content */}
            <div className="absolute bottom-0 left-0 p-8 lg:p-14 max-w-3xl">

              <div className="flex items-center gap-3 mb-5">
                <div className="w-12 h-12 rounded-full bg-[#C8A96B] flex items-center justify-center">
                  <Play className="w-5 h-5 text-black fill-black" />
                </div>

                <span className="text-sm uppercase tracking-[0.25em] text-[#C8A96B]">
                  AI Generated Founder Story
                </span>
              </div>

              <h3 className="text-3xl lg:text-5xl font-bold leading-tight mb-5">
                The Journey Behind
                <br />
                Selected Group
              </h3>

              <p className="text-[#CFC7BC] text-lg leading-relaxed">
                Discover how Steven Petty and Harry Brown built Selected Group
                into a trusted technology recruitment partner focused on
                long-term relationships, customer success, and helping
                businesses scale globally.
              </p>

            </div>
          </motion.div>
        </div>
      </section>

      {/* ───────────────── SERVICES ───────────────── */}

      <section className="max-w-7xl mx-auto px-6 lg:px-12 py-28">

        <SectionLabel
          number={3}
          label="Services & Expertise"
        />

        <div className="grid lg:grid-cols-2 gap-16">

          {/* services */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
          >

            <motion.h2
              variants={fadeUp}
              className="text-3xl font-bold mb-10"
            >
              Recruitment Services
            </motion.h2>

            <div className="space-y-4">
              {services.map((service, i) => (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  className="flex items-center gap-4 p-5 rounded-xl
                  border border-[rgba(255,255,255,0.08)]
                  bg-[rgba(255,255,255,0.02)]"
                >
                  <CheckCircle2 className="w-5 h-5 text-[#C8A96B]" />

                  <span className="text-[#F0EDE8] font-medium">
                    {service}
                  </span>
                </motion.div>
              ))}
            </div>

          </motion.div>

          {/* expertise */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
          >

            <motion.h2
              variants={fadeUp}
              className="text-3xl font-bold mb-10"
            >
              Specialist Areas
            </motion.h2>

            <div className="space-y-4">
              {specialisms.map((item, i) => (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  className="flex items-center gap-4 p-5 rounded-xl
                  border border-[rgba(200,169,107,0.18)]
                  bg-[rgba(200,169,107,0.05)]"
                >
                  <CheckCircle2 className="w-5 h-5 text-[#C8A96B]" />

                  <span className="text-[#F0EDE8] font-medium">
                    {item}
                  </span>
                </motion.div>
              ))}
            </div>

          </motion.div>
        </div>
      </section>

      {/* ───────────────── VALUES ───────────────── */}

      <section className="bg-[#0D0D0D] border-y border-[rgba(255,255,255,0.06)]">

        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-28">

          <SectionLabel
            number={4}
            label="What Makes Us Different"
          />

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">

            {values.map((value, i) => (
              <motion.div
                key={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="p-8 rounded-2xl
                border border-[rgba(255,255,255,0.08)]
                bg-[rgba(255,255,255,0.02)]"
              >

                <span className="text-[10px] font-mono text-[#C8A96B] opacity-40 block mb-5">
                  {String(i + 1).padStart(2, "0")}
                </span>

                <div className="w-10 h-[2px] bg-[#C8A96B] mb-5" />

                <p className="text-[#F0EDE8] text-lg leading-relaxed">
                  {value}
                </p>

              </motion.div>
            ))}

          </div>
        </div>
      </section>

      {/* ───────────────── ACHIEVEMENTS ───────────────── */}

      <section className="max-w-7xl mx-auto px-6 lg:px-12 py-28">

        <SectionLabel
          number={5}
          label="Achievements"
        />

        <div className="space-y-4">

          {achievements.map((item, i) => (
            <motion.div
              key={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="flex items-center gap-5 px-6 py-6 rounded-xl
              border border-[rgba(255,255,255,0.07)]
              bg-[rgba(255,255,255,0.02)]"
            >

              <CheckCircle2 className="w-5 h-5 text-[#C8A96B]" />

              <span className="text-[#F0EDE8] text-lg">
                {item}
              </span>

            </motion.div>
          ))}

        </div>
      </section>

      {/* ───────────────── CLIENTS ───────────────── */}

      <section className="bg-[#0D0D0D] border-t border-[rgba(255,255,255,0.06)]">

        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-28">

          <SectionLabel
            number={6}
            label="Trusted By"
          />

          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="text-3xl lg:text-5xl font-bold leading-tight max-w-4xl mb-16"
          >
            Trusted by some of the world’s leading technology businesses
          </motion.h2>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4">

            {clients.map((client, i) => (
              <motion.div
                key={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="h-28 rounded-2xl border border-[rgba(255,255,255,0.08)]
                bg-[rgba(255,255,255,0.02)]
                flex items-center justify-center"
              >

                <span className="text-xl font-semibold text-[#F0EDE8]">
                  {client}
                </span>

              </motion.div>
            ))}

          </div>
        </div>
      </section>

      {/* ───────────────── CTA ───────────────── */}

      <section className="max-w-7xl mx-auto px-6 lg:px-12 py-28">

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="relative overflow-hidden rounded-3xl
          border border-[rgba(200,169,107,0.2)]
          bg-[rgba(200,169,107,0.05)]
          p-10 lg:p-16"
        >

          <div className="absolute top-0 left-0 w-24 h-px bg-[#C8A96B]" />
          <div className="absolute top-0 left-0 w-px h-24 bg-[#C8A96B]" />

          <div className="max-w-3xl">

            <p className="text-[11px] uppercase tracking-[0.3em] text-[#C8A96B] mb-5">
              Let's Build Together
            </p>

            <h2 className="text-4xl lg:text-6xl font-bold leading-tight mb-8">
              Helping Technology
              <br />
              Businesses Scale Globally
            </h2>

            <p className="text-[#A09A90] text-lg leading-relaxed mb-10">
              Whether you are entering a new market, building leadership teams,
              or scaling enterprise functions, Selected Group partners with you
              to deliver exceptional talent and long-term growth.
            </p>

            <Link
              to="/contact"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-xl
              bg-[#C8A96B] text-black font-bold hover:bg-[#D8BC80]
              transition-all duration-300"
            >
              Speak With Our Team

              <ArrowRight className="w-5 h-5" />
            </Link>

          </div>
        </motion.div>
      </section>

    </div>
  );
}