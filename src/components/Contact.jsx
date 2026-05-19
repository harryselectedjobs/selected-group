import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function Contact() {
  return (
    <section
      id="contact"
      className="bg-[#0A0A0A] py-24 border-t border-white/[0.05]"
    >
      <div className="max-w-5xl mx-auto px-6 text-center">

        <div className="flex items-center justify-center gap-3 mb-6">
          <span className="w-8 h-px bg-white/30" />
          <span className="text-white/50 text-xs font-semibold tracking-[0.25em] uppercase">
            Get In Touch
          </span>
          <span className="w-8 h-px bg-white/30" />
        </div>

        <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tight leading-tight mb-6">
          Ready to Build Your Team?
        </h2>

        <p className="text-white/55 text-base md:text-lg leading-relaxed max-w-2xl mx-auto mb-12">
          Speak with Selected Group about GTM, Engineering,
          Product Management, and Professional Services recruitment.
        </p>

        <Link
          to="/contact"
          className="group inline-flex items-center gap-3 bg-white text-black px-8 py-4 text-sm font-bold tracking-widest uppercase transition-all duration-300 hover:bg-white/90"
        >
          Get In Touch

          <ArrowRight
            size={15}
            className="transition-transform duration-300 group-hover:translate-x-1"
          />
        </Link>

      </div>
    </section>
  );
}