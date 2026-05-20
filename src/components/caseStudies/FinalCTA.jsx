import { motion } from "framer-motion";
import { ArrowRight, Calendar } from "lucide-react";
import { Link } from "react-router-dom";

export default function FinalCTA() {
  return (
    <section className="relative py-32 overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "linear-gradient(rgba(10, 10, 10, 0.9), rgba(10, 10, 10, 0.9)), url('https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=1920&q=80')",
        }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-[#0A0A0A]" />

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 lg:px-12 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="uppercase text-xs tracking-[0.2em] text-[#C8A96B] mb-6">
            Ready to Build Your Team?
          </div>

          <h2 className="text-4xl lg:text-6xl font-bold text-[#F5F5F5] mb-8 leading-tight">
            Building Teams That Scale Enterprise Technology Businesses
          </h2>

          <p className="text-xl text-[#B0B0B0] mb-12 max-w-3xl mx-auto leading-relaxed">
            From first leadership hires through to international scaling projects.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {/* Primary CTA */}
<Link to="/contact">
  <button
    className="group px-8 py-5 bg-[#C8A96B] text-[#0A0A0A] font-medium rounded-lg hover:bg-[#D4B77C] transition-all duration-300 flex items-center justify-center gap-2"
  >
    <Calendar className="w-5 h-5" />

    Schedule Consultation

    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
  </button>
</Link>

{/* Secondary CTA */}
<Link to="/engagement-models">
  <button
    className="px-8 py-5 border border-[rgba(255,255,255,0.15)] text-[#F5F5F5] font-medium rounded-lg hover:bg-[rgba(255,255,255,0.04)] transition-all duration-300"
  >
    View Engagement Models
  </button>
</Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}