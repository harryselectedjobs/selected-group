import { motion } from "framer-motion";
import {
  Search,
  TrendingUp,
  Users,
  Target,
  Handshake,
  Award,
  Globe,
  CheckCircle,
} from "lucide-react";

const steps = [
  {
    icon: Search,
    title: "Market Mapping",
    description: "Comprehensive talent landscape analysis",
  },
  {
    icon: TrendingUp,
    title: "Talent Intelligence",
    description: "Competitive insights and benchmarking",
  },
  {
    icon: Users,
    title: "Executive Outreach",
    description: "Direct engagement with top-tier candidates",
  },
  {
    icon: Target,
    title: "Technical Screening",
    description: "Rigorous capability assessment",
  },
  {
    icon: Handshake,
    title: "Stakeholder Alignment",
    description: "Multi-stage interview coordination",
  },
  {
    icon: Award,
    title: "Offer Management",
    description: "Compensation negotiation and closing",
  },
  {
    icon: Globe,
    title: "International Coordination",
    description: "Cross-border hiring execution",
  },
  {
    icon: CheckCircle,
    title: "Post-Hire Integration",
    description: "Onboarding support and success tracking",
  },
];

export default function HiringProcess() {
  return (
    <section className="py-32 bg-gradient-to-b from-[#0A0A0A] to-[#141414]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <div className="uppercase text-xs tracking-[0.2em] text-[#C8A96B] mb-4">
            Methodology
          </div>

          <h2 className="text-4xl lg:text-5xl font-bold text-[#F5F5F5] mb-6">
            Enterprise Hiring Process
          </h2>

          <p className="text-xl text-[#B0B0B0] max-w-3xl mx-auto">
            A systematic approach to identifying, assessing, and securing
            top-tier enterprise talent
          </p>
        </motion.div>

        <div className="relative">
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[rgba(200,169,107,0.3)] to-transparent hidden lg:block" />

          <div className="space-y-12">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isEven = index % 2 === 0;

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: isEven ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className={`relative flex items-center ${
                    isEven ? "lg:flex-row" : "lg:flex-row-reverse"
                  }`}
                >
                  <div
                    className={`flex-1 ${
                      isEven ? "lg:pr-12 lg:text-right" : "lg:pl-12"
                    }`}
                  >
                    <div
                      className={`inline-block p-6 bg-[rgba(255,255,255,0.04)] backdrop-blur-xl border border-[rgba(255,255,255,0.08)] rounded-xl hover:bg-[rgba(255,255,255,0.06)] hover:border-[rgba(200,169,107,0.3)] transition-all duration-300 ${
                        isEven ? "lg:float-right" : "lg:float-left"
                      }`}
                    >
                      <div
                        className={`flex items-start gap-4 ${
                          isEven ? "lg:flex-row-reverse" : ""
                        }`}
                      >
                        <div className="w-12 h-12 rounded-lg bg-[rgba(200,169,107,0.15)] flex items-center justify-center flex-shrink-0">
                          <Icon className="w-6 h-6 text-[#C8A96B]" />
                        </div>

                        <div className={isEven ? "lg:text-right" : ""}>
                          <h3 className="text-xl font-bold text-[#F5F5F5] mb-2">
                            {step.title}
                          </h3>

                          <p className="text-sm text-[#B0B0B0]">
                            {step.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-[#C8A96B] border-4 border-[#0A0A0A] z-10" />

                  <div className="flex-1" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}