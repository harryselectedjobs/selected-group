import React from "react";
import { motion } from "framer-motion";
import { Quote } from "lucide-react";

const references = [
  {
    quote:
      "Selected Group demonstrated exceptional depth in identifying forward deployed engineering talent with both technical excellence and client-facing capabilities. Their understanding of our unique requirements across US and European markets was outstanding.",

    client: "VP Engineering",

    company: "Palantir Technologies",

    details: {
      role: "Forward Deployed Engineer",
      region: "Germany & UK",
      timeline: "29 days avg",
      stage: "Post-IPO expansion",
    },
  },

  {
    quote:
      "The calibre of enterprise sales leadership candidates presented by Selected Group was remarkable. Their market intelligence and understanding of the European SaaS ecosystem enabled us to build a world-class commercial team across five countries.",

    client: "Chief Revenue Officer",

    company: "Oracle Cloud",

    details: {
      role: "Enterprise Account Executive",
      region: "France, Germany, Netherlands",
      timeline: "24 placements in 5 months",
      stage: "European expansion",
    },
  },

  {
    quote:
      "Selected Group's discretion and ability to identify senior product and engineering leaders who could operate at the highest standards was essential to our confidential hiring initiatives. Their executive search capability is truly world-class.",

    client: "Senior Director",

    company: "Apple",

    details: {
      role: "VP Engineering & Product Leadership",
      region: "Global (US, UK, Singapore)",
      timeline: "Executive search mandate",
      stage: "Confidential new initiatives",
    },
  },
];

export default function ClientReferences() {
  return (
    <section className="relative py-28 lg:py-36 bg-gradient-to-b from-[#0A0A0A] to-[#141414] overflow-hidden">

      {/* Background Glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full blur-[180px] opacity-10"
        style={{
          background: "rgba(200,169,107,0.15)",
        }}
      />

      {/* Grid Overlay */}
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-20"
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <span className="w-10 h-px bg-[#C8A96B]" />

            <span className="uppercase text-xs tracking-[0.25em] text-[#C8A96B] font-medium">
              Client References
            </span>

            <span className="w-10 h-px bg-[#C8A96B]" />
          </div>

          <h2 className="text-4xl lg:text-6xl font-bold tracking-tight text-[#F5F5F5] mb-6">
            Trusted by Enterprise
            <span className="block text-white/45">
              Technology Leaders
            </span>
          </h2>

          <p className="text-lg lg:text-xl text-[#B0B0B0] leading-relaxed max-w-3xl mx-auto">
            Feedback from enterprise software companies, AI organisations and
            global technology teams we’ve partnered with across the US and
            European markets.
          </p>
        </motion.div>

        {/* Testimonials */}
        <div className="space-y-10">

          {references.map((ref, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-120px" }}
              transition={{
                duration: 0.75,
                delay: index * 0.12,
              }}
              className="group relative overflow-hidden rounded-3xl border border-white/[0.08] bg-[rgba(255,255,255,0.03)] backdrop-blur-2xl hover:border-[rgba(200,169,107,0.18)] hover:bg-[rgba(255,255,255,0.05)] transition-all duration-500"
            >
              {/* Top Glow Line */}
              <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#C8A96B] to-transparent opacity-50" />

              <div className="grid lg:grid-cols-2 gap-10 p-8 lg:p-14">

                {/* Left */}
                <div className="relative">

                  <Quote className="w-14 h-14 text-[#C8A96B] opacity-20 mb-8" />

                  <blockquote className="text-xl lg:text-2xl leading-relaxed italic text-[#F5F5F5] mb-10">
                    “{ref.quote}”
                  </blockquote>

                  <div className="border-t border-white/[0.08] pt-6">
                    <div className="text-lg font-semibold text-[#F5F5F5]">
                      {ref.client}
                    </div>

                    <div className="text-sm tracking-wide text-[#C8A96B] mt-1">
                      {ref.company}
                    </div>
                  </div>
                </div>

                {/* Right */}
                <div>

                  <div className="uppercase text-xs tracking-[0.25em] text-[#C8A96B] mb-8">
                    Hiring Breakdown
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">

                    {/* Role */}
                    <div className="p-5 rounded-2xl bg-[rgba(255,255,255,0.03)] border border-white/[0.06]">
                      <div className="text-[11px] uppercase tracking-[0.2em] text-[#B0B0B0] mb-3">
                        Role
                      </div>

                      <div className="text-[#F5F5F5] font-medium leading-relaxed">
                        {ref.details.role}
                      </div>
                    </div>

                    {/* Region */}
                    <div className="p-5 rounded-2xl bg-[rgba(255,255,255,0.03)] border border-white/[0.06]">
                      <div className="text-[11px] uppercase tracking-[0.2em] text-[#B0B0B0] mb-3">
                        Region
                      </div>

                      <div className="text-[#F5F5F5] font-medium leading-relaxed">
                        {ref.details.region}
                      </div>
                    </div>

                    {/* Timeline */}
                    <div className="p-5 rounded-2xl bg-[rgba(255,255,255,0.03)] border border-white/[0.06]">
                      <div className="text-[11px] uppercase tracking-[0.2em] text-[#B0B0B0] mb-3">
                        Timeline
                      </div>

                      <div className="text-[#F5F5F5] font-medium leading-relaxed">
                        {ref.details.timeline}
                      </div>
                    </div>

                    {/* Stage */}
                    <div className="p-5 rounded-2xl bg-[rgba(255,255,255,0.03)] border border-white/[0.06]">
                      <div className="text-[11px] uppercase tracking-[0.2em] text-[#B0B0B0] mb-3">
                        Hiring Stage
                      </div>

                      <div className="text-[#F5F5F5] font-medium leading-relaxed">
                        {ref.details.stage}
                      </div>
                    </div>

                  </div>
                </div>

              </div>
            </motion.div>
          ))}

        </div>
      </div>
    </section>
  );
}