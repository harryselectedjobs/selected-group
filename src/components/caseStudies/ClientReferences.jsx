import React from "react";
import { motion } from "framer-motion";
import { Quote, Linkedin } from "lucide-react";

const references = [
  {
    quote:
      "When it comes to Enterprise software sales recruitment Selected is a very strong recruitment partner to Oracle. They were involved in a large scale hiring campaign throughout 2017, road mapping and identifying hidden talent in some of our most challenging regions. Through Selected we managed to hire 10 Enterprise class AE’s and when the need arises in future I will not hesitate to use Selected as our go-to agency of choice.",

    client: "Delia Marinescu",

    title: "VP of Talent EMEA",

    company: "Oracle",

    image:
      "/speakers/delia-marinescu.jpg",

    details: {
      role: "Enterprise Account Executives",
      region: "Benelux",
      timeline: "10 hires in 8 months",
      stage: "European expansion",
    },
  },

  {
    quote:
      "Securing a recruitment partner capable of navigating the complexities of an enterprise software company like OverIT is a rare find, but Selected exceeded our expectations. Their proficiency across Sales, Account Management, and post-Delivery teams streamlined our operations significantly.",

    client: "Alejandro Nestares-Matoses",

    title: "VP & GM",

    company: "OverIT",

    image:
      "/speakers/alejandro-nestares.jpg",

    details: {
      role: "Sales, Marketing & Professional Services",
      region: "Europe & US",
      timeline: "Rapid growth phase",
      stage: "Global expansion",
    },
  },

  {
    quote:
      "Selected has truly proven to be an indispensable ally in our hiring endeavours. Their team’s expertise and support were pivotal in not only meeting but surpassing our hiring targets while significantly reducing time spent on applicant screening.",

    client: "Alessandro Masi",

    title: "Chief Revenue Officer",

    company: "OverIT",

    image:
      "/speakers/alessandro-masi.jpg",

    details: {
      role: "Enterprise Software Hiring",
      region: "Global",
      timeline: "Strategic hiring partnership",
      stage: "Scaling commercial teams",
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
            Testimonials from enterprise software and technology leaders
            across global hiring engagements and strategic growth initiatives.
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

                {/* LEFT SIDE */}
                <div className="relative">

                  {/* Speaker Profile */}
                  <div className="flex items-center gap-5 mb-8">

                    <div className="relative">
                      <img
                        src={ref.image}
                        alt={ref.client}
                        className="w-20 h-20 rounded-2xl object-cover border border-white/10"
                      />

                      <div className="absolute inset-0 rounded-2xl ring-1 ring-[#C8A96B]/20" />
                    </div>

                    <div>
                      <div className="text-xl font-semibold text-[#F5F5F5]">
                        {ref.client}
                      </div>

                      <div className="text-sm text-[#C8A96B] mt-1">
                        {ref.title}
                      </div>

                      <div className="text-sm text-[#8A8A8A] mt-1">
                        {ref.company}
                      </div>
                    </div>
                  </div>

                  {/* Quote */}
                  <Quote className="w-14 h-14 text-[#C8A96B] opacity-20 mb-8" />

                  <blockquote className="text-lg lg:text-xl leading-relaxed italic text-[#F5F5F5] mb-10">
                    “{ref.quote}”
                  </blockquote>

                </div>

                {/* RIGHT SIDE */}
                <div>

                  <div className="uppercase text-xs tracking-[0.25em] text-[#C8A96B] mb-8">
                    Hiring Breakdown
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">

                    {/* Role */}
                    <div className="p-5 rounded-2xl bg-[rgba(255,255,255,0.03)] border border-white/[0.06]">
                      <div className="text-[11px] uppercase tracking-[0.2em] text-[#B0B0B0] mb-3">
                        Focus Area
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

                  {/* Optional CTA */}
                  <div className="mt-8 pt-6 border-t border-white/[0.06]">
                    <button
                      className="inline-flex items-center gap-2 text-sm text-[#C8A96B] hover:text-[#D8BC82] transition-colors"
                    >
                      <Linkedin className="w-4 h-4" />
                      View Leadership Profile
                    </button>
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