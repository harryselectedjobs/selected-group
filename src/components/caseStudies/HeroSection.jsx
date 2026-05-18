import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function HeroSection() {
  const navigate = useNavigate();

  const metrics = [
    { value: "1,000+", label: "Placements" },
    { value: "US & Europe", label: "Coverage" },
    { value: "Seed to IPO", label: "Growth Stage" },
    { value: "94%", label: "Offer Acceptance" },
  ];

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-[#0A0A0A]">

      {/* Background Image */}
    <div className="absolute inset-0 overflow-hidden">
  {/* Background Video */}
  <video
    autoPlay
    muted
    loop
    playsInline
    className="w-full h-full object-cover"
  >
    <source
      src="https://videos.pexels.com/video-files/3195394/3195394-uhd_2560_1440_25fps.mp4"
      type="video/mp4"
    />
  </video>

  {/* Dark Overlay */}
  <div className="absolute inset-0 bg-black/70" />
</div>

      {/* Gradient Fade */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0A0A0A]" />

      {/* Blur Orbs */}
      <div
        className="absolute top-[-250px] right-[-150px] w-[700px] h-[700px] rounded-full blur-[160px] opacity-30"
        style={{
          background: "rgba(200,169,107,0.12)",
        }}
      />

      <div
        className="absolute bottom-[-200px] left-[-150px] w-[500px] h-[500px] rounded-full blur-[140px] opacity-20"
        style={{
          background: "rgba(94,123,255,0.12)",
        }}
      />

      {/* Grid Overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-12 py-32">

        <div className="grid lg:grid-cols-2 gap-20 items-center">

          {/* Left */}
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Label */}
            <div className="flex items-center gap-4 mb-8">
              <span className="w-10 h-px bg-[#C8A96B]" />

              <span className="uppercase tracking-[0.28em] text-xs text-[#C8A96B] font-medium">
                Case Studies
              </span>
            </div>

            {/* Heading */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight text-[#F5F5F5] max-w-3xl mb-8">
              Enterprise Hiring Built for
              <span className="block text-white/45">
                High-Growth Technology Companies
              </span>
            </h1>

            {/* Paragraph */}
            <p className="text-lg md:text-xl text-[#B0B0B0] leading-relaxed max-w-2xl mb-12">
              Detailed recruitment case studies across enterprise sales,
              engineering, AI, product management and professional services.
            </p>

            {/* Buttons */}
            <div className="flex flex-wrap gap-4">

              <button
                onClick={() =>
                  document
                    .getElementById("featured-case-studies")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="group px-8 py-4 bg-[#C8A96B] text-[#0A0A0A] font-semibold rounded-xl transition-all duration-300 hover:bg-[#D6B87A] flex items-center gap-3"
              >
                Explore Case Studies

                <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
              </button>

              <button
                onClick={() => navigate("/contact")}
                className="px-8 py-4 border border-white/[0.12] bg-white/[0.03] backdrop-blur-md rounded-xl text-[#F5F5F5] hover:bg-white/[0.06] transition-all duration-300"
              >
                Discuss Your Hiring Needs
              </button>
            </div>
          </motion.div>

          {/* Right Metrics */}
          <motion.div
            initial={{ opacity: 0, x: 35 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid grid-cols-2 gap-5"
          >
            {metrics.map((metric, index) => (
              <motion.div
                key={metric.label}
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.6,
                  delay: 0.35 + index * 0.08,
                }}
                className="relative overflow-hidden rounded-2xl p-7 bg-[rgba(255,255,255,0.04)] backdrop-blur-xl border border-[rgba(255,255,255,0.08)] hover:bg-[rgba(255,255,255,0.06)] transition-all duration-300"
              >
                {/* Glow */}
                <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#C8A96B] to-transparent opacity-60" />

                <div className="text-3xl lg:text-4xl font-bold text-[#C8A96B] mb-3 tracking-tight">
                  {metric.value}
                </div>

                <div className="text-sm uppercase tracking-[0.16em] text-[#B0B0B0]">
                  {metric.label}
                </div>
              </motion.div>
            ))}
          </motion.div>

        </div>
      </div>
    </section>
  );
}