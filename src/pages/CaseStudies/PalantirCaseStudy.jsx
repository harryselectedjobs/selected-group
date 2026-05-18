import React from "react";
import { motion } from "framer-motion";

export default function PalantirCaseStudy() {
  return (
    <main className="bg-[#0A0A0A] text-white min-h-screen pt-32 pb-20">
      <div className="max-w-5xl mx-auto px-6 lg:px-10">

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <p className="uppercase tracking-[0.25em] text-xs text-[#C8A96B] mb-4">
            Case Study
          </p>

          <h1 className="text-5xl lg:text-7xl font-bold leading-tight mb-8">
            Palantir Technologies
          </h1>

          <p className="text-xl text-[#B0B0B0] leading-relaxed mb-16 max-w-4xl">
            Scaling enterprise sales and management consulting teams across Europe
            to accelerate private sector growth initiatives.
          </p>
        </motion.div>

        {/* Company Overview */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold mb-6 text-[#F5F5F5]">
            Company Overview
          </h2>

          <p className="text-[#B0B0B0] text-lg leading-relaxed">
            Palantir Technologies, established in 2003 by a team including
            Peter Thiel and Alex Karp, is a leading data analytics and enterprise
            software company specializing in large-scale data integration,
            operational intelligence, and AI-driven decision making.
          </p>
        </section>

        {/* Selected Mandate */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold mb-6 text-[#F5F5F5]">
            Selected Mandate
          </h2>

          <div className="bg-white/[0.03] border border-white/[0.08] rounded-2xl p-8">
            <p className="text-[#B0B0B0] text-lg leading-relaxed">
              Palantir faced challenges expanding into the private sector due to
              the absence of a dedicated Go-To-Market strategy. Selected Group
              was tasked with building a high-performing enterprise sales and
              management consulting organization capable of engaging Fortune 250
              private sector companies across Europe.
            </p>
          </div>
        </section>

        {/* Outcomes */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold mb-10 text-[#F5F5F5]">
            Outcomes & ROI
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              "Strategic GTM hiring initiative",
              "Enterprise sales expansion across Europe",
              "High-performing leadership placements",
            ].map((item, index) => (
              <div
                key={index}
                className="p-6 rounded-2xl bg-white/[0.03] border border-white/[0.08]"
              >
                <p className="text-[#C8A96B] font-medium leading-relaxed">
                  {item}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Client Quote */}
        <section className="mb-20">
          <div className="border-l-2 border-[#C8A96B] pl-8">
            <p className="text-2xl leading-relaxed text-[#F5F5F5] italic mb-6">
              “Selected surpassed our aspirations by presenting an abundance of
              outstanding talent.”
            </p>

            <div>
              <div className="font-semibold text-white">
                Philippe Mathieu
              </div>

              <div className="text-[#B0B0B0]">
                President EMEA, Palantir
              </div>
            </div>
          </div>
        </section>

      </div>
    </main>
  );
}