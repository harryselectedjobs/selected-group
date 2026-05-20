import { useEffect } from "react";
import { motion } from "framer-motion";
import {
    ArrowLeft,
    Download,
    CheckCircle2,
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
    { value: "20", label: "Enterprise Hires" },
    { value: "Europe", label: "Markets Covered" },
    { value: "B2B", label: "Expansion Focus" },
    { value: "Public Sector", label: "Sales Capability" },
];

const mandateAreas = [
    "Enterprise Software Sales",
    "Partner Management",
    "Public Sector Hiring",
    "Field Marketing Leadership",
];

const placements = [
    "Public Sector Leads",
    "Major Accounts Leads",
    "Partner Managers",
    "Field Marketing Leaders",
    "Enterprise Presales Professionals",
    "Financial Services Account Leads",
];

const partnershipServices = [
    "Strategic enterprise talent mapping",
    "Candidate qualification and assessment",
    "European market intelligence",
    "Interview process management",
    "Enterprise B2B search assignments",
    "Hiring trend and talent advisory support",
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

export default function AppleCaseStudy() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="bg-[#080808] min-h-screen text-[#F0EDE8] overflow-x-hidden">

            {/* ───────────────── NAV ───────────────── */}

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
                    Apple
                </span>
            </nav>

            {/* ───────────────── HERO ───────────────── */}

            <header className="relative min-h-screen flex flex-col justify-end overflow-hidden">

                <div className="absolute inset-0">
                    <img
                        src="https://images.unsplash.com/photo-1496171367470-9ed9a91ea931?q=80&w=1800&auto=format&fit=crop"
                        alt=""
                        className="w-full h-full object-cover"
                    />

                    <div className="absolute inset-0 bg-[#080808]/75" />

                    <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-[#080808]/40 to-transparent" />

                    <div className="absolute bottom-[38%] left-0 right-0 h-px bg-[#C8A96B]/20" />
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
                        style={{
                            fontSize: "clamp(5rem, 16vw, 14rem)",
                        }}
                    >
                        Apple
                    </motion.h1>

                    <motion.p
                        variants={fadeUp}
                        className="text-lg lg:text-xl text-[#A09A90] max-w-2xl mb-16 leading-relaxed"
                    >
                        Scaling Enterprise B2B Sales Hiring Across Europe
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
                ${i < stats.length - 1 ? "border-r border-[rgba(255,255,255,0.08)]" : ""}
                ${i < 2 ? "border-b border-[rgba(255,255,255,0.08)] lg:border-b-0" : ""}`}
                            >

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

            {/* ───────────────── OVERVIEW ───────────────── */}

            <section className="max-w-7xl mx-auto px-6 lg:px-12 py-28">

                <SectionLabel
                    number={1}
                    label="Overview"
                />

                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={stagger}
                    className="grid lg:grid-cols-12 gap-12 lg:gap-20"
                >

                    <motion.div
                        variants={fadeUp}
                        className="lg:col-span-5"
                    >
                        <h2 className="text-4xl lg:text-5xl font-bold leading-tight text-[#F0EDE8]">
                            Enterprise Expansion Through{" "}
                            <span className="text-[#C8A96B]">
                                Strategic Hiring
                            </span>
                        </h2>
                    </motion.div>

                    <motion.div
                        variants={stagger}
                        className="lg:col-span-7 space-y-5 text-[#A09A90] text-lg leading-relaxed"
                    >

                        <motion.p variants={fadeUp}>
                            Apple has historically dominated the consumer technology market through a highly successful B2C sales model.
                        </motion.p>

                        <motion.p variants={fadeUp}>
                            As enterprise demand evolved, Apple expanded aggressively into enterprise B2B sales through strategic partnerships with organisations including SAP, Cisco, and IBM.
                        </motion.p>

                        <motion.p variants={fadeUp}>
                            This transition required experienced enterprise sales professionals capable of driving growth across public sector, financial services, and systems integrator environments throughout Europe.
                        </motion.p>

                        <motion.p variants={fadeUp}>
                            Selected supported Apple during a major enterprise hiring phase focused on strengthening B2B sales capability, partner engagement, and field marketing leadership.
                        </motion.p>

                    </motion.div>
                </motion.div>
            </section>

            {/* ───────────────── MANDATE ───────────────── */}

            <section className="bg-[#0D0D0D] border-y border-[rgba(255,255,255,0.06)]">

                <div className="max-w-7xl mx-auto px-6 lg:px-12 py-28">

                    <SectionLabel
                        number={2}
                        label="Selected's Mandate"
                    />

                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={stagger}
                        className="grid lg:grid-cols-12 gap-12 lg:gap-20"
                    >

                        <motion.div
                            variants={fadeUp}
                            className="lg:col-span-4 space-y-4"
                        >

                            <h2 className="text-3xl font-bold mb-8 text-[#F0EDE8]">
                                Enterprise Hiring Support
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

                        </motion.div>

                        <motion.div
                            variants={stagger}
                            className="lg:col-span-8 space-y-5 text-[#A09A90] text-lg leading-relaxed"
                        >

                            <motion.p variants={fadeUp}>
                                Selected partnered closely with Apple’s recruitment and leadership teams to support enterprise hiring across the UK, Benelux, France, and Germany.
                            </motion.p>

                            <motion.p variants={fadeUp}>
                                The assignment focused on enterprise software sales, partner management, public sector hiring, field marketing leadership, and enterprise presales functions.
                            </motion.p>

                            <motion.p variants={fadeUp}>
                                In addition to recruitment delivery, Selected provided market intelligence, candidate engagement support, interview coordination, and strategic hiring advisory throughout the engagement.
                            </motion.p>

                            <motion.p variants={fadeUp}>
                                By combining proactive search methodologies with deep enterprise recruitment expertise, Selected delivered talent across several critical business functions during a period of accelerated growth.
                            </motion.p>

                        </motion.div>

                    </motion.div>
                </div>
            </section>

            {/* ───────────────── OUTCOME ───────────────── */}

            <section className="max-w-7xl mx-auto px-6 lg:px-12 py-28">

                <SectionLabel
                    number={3}
                    label="Outcome / ROI"
                />

                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={stagger}
                    className="grid lg:grid-cols-12 gap-12 lg:gap-20"
                >

                    <motion.div
                        variants={fadeUp}
                        className="lg:col-span-4"
                    >

                        <h2 className="text-3xl lg:text-4xl font-bold mb-6 text-[#F0EDE8] leading-tight">
                            Accelerating B2B Growth Across Europe
                        </h2>

                        <p className="text-[#A09A90] text-lg leading-relaxed mb-6">
                            Selected successfully delivered hires across multiple European regions while improving hiring efficiency and candidate quality.
                        </p>

                        <p className="text-[#A09A90] text-lg leading-relaxed">
                            The partnership strengthened Apple’s enterprise sales capabilities and supported expansion into strategic B2B sales channels and partner ecosystems.
                        </p>

                    </motion.div>

                    <motion.div
                        variants={stagger}
                        className="lg:col-span-8"
                    >

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
                  border border-[rgba(255,255,255,0.07)]
                  bg-[rgba(255,255,255,0.02)]
                  hover:border-[rgba(200,169,107,0.25)]
                  hover:bg-[rgba(200,169,107,0.04)]
                  transition-all duration-300"
                                >

                                    <CheckCircle2 className="w-5 h-5 text-[#C8A96B] shrink-0 opacity-80" />

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

            {/* ───────────────── DOWNLOAD ───────────────── */}

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

                    {/* decorative corners */}
                    <div className="absolute top-0 left-0 w-24 h-px bg-[#C8A96B]" />
                    <div className="absolute top-0 left-0 w-px h-24 bg-[#C8A96B]" />

                    <div className="absolute bottom-0 right-0 w-24 h-px bg-[#C8A96B]/40" />
                    <div className="absolute bottom-0 right-0 w-px h-24 bg-[#C8A96B]/40" />

                    {/* text */}
                    <div>
                        <p className="text-[11px] uppercase tracking-[0.3em] text-[#C8A96B] mb-4">
                            Download PDF
                        </p>

                        <h3 className="text-2xl lg:text-3xl font-bold text-[#F0EDE8] mb-3">
                            Get the Full Case Study
                        </h3>

                        <p className="text-[#A09A90] max-w-xl leading-relaxed">
                            Access the complete Apple enterprise hiring case study including
                            recruitment strategy, delivered roles, and business outcomes.
                        </p>
                    </div>

                    {/* button */}
                    <a
                        href="/pdfs/Apple Case Study.pdf"
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

            {/* ───────────────── PARTNERSHIP ───────────────── */}

            <section className="bg-[#0D0D0D] border-t border-[rgba(255,255,255,0.06)]">

                <div className="max-w-7xl mx-auto px-6 lg:px-12 py-28">

                    <SectionLabel
                        number={4}
                        label="Partnership Value"
                    />

                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={stagger}
                    >

                        <motion.h2
                            variants={fadeUp}
                            className="text-3xl lg:text-4xl font-bold mb-14 max-w-2xl
              text-[#F0EDE8] leading-tight"
                        >
                            Selected supported Apple through:
                        </motion.h2>

                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">

                            {partnershipServices.map((service, i) => (
                                <motion.div
                                    key={i}
                                    variants={fadeUp}
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

                                </motion.div>
                            ))}

                        </div>

                        <motion.p
                            variants={fadeUp}
                            className="mt-14 text-[#A09A90] text-lg leading-relaxed max-w-4xl"
                        >
                            The engagement demonstrated Selected’s capability to deliver enterprise technology talent across highly competitive European markets while supporting large-scale B2B transformation initiatives.
                        </motion.p>

                    </motion.div>
                </div>
            </section>

        </div>
    );
}