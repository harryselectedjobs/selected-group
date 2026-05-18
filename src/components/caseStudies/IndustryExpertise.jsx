import { motion } from "framer-motion";
import {
  Brain,
  Cloud,
  Shield,
  Database,
  DollarSign,
  Layers,
  Settings,
  Code,
} from "lucide-react";

const industries = [
  {
    icon: Brain,
    title: "AI & Machine Learning",
    description: "Deep learning, NLP, computer vision",
  },
  {
    icon: Layers,
    title: "Enterprise SaaS",
    description: "Cloud software, B2B platforms",
  },
  {
    icon: Shield,
    title: "Cybersecurity",
    description: "Threat intelligence, security operations",
  },
  {
    icon: Cloud,
    title: "Cloud Infrastructure",
    description: "DevOps, platform engineering",
  },
  {
    icon: DollarSign,
    title: "FinTech",
    description: "Payments, banking, crypto",
  },
  {
    icon: Database,
    title: "Data Platforms",
    description: "Analytics, data engineering",
  },
  {
    icon: Settings,
    title: "ERP & Transformation",
    description: "Enterprise systems, digital transformation",
  },
  {
    icon: Code,
    title: "Developer Tools",
    description: "IDEs, CI/CD, infrastructure tools",
  },
];

export default function IndustryExpertise() {
  return (
    <section className="py-32 bg-[#0A0A0A]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="uppercase text-xs tracking-[0.2em] text-[#C8A96B] mb-4">
            Expertise
          </div>

          <h2 className="text-4xl lg:text-5xl font-bold text-[#F5F5F5] mb-6">
            Industry Specialization
          </h2>

          <p className="text-xl text-[#B0B0B0] max-w-3xl mx-auto">
            Deep recruitment expertise across high-growth technology sectors
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {industries.map((industry, index) => {
            const Icon = industry.icon;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="group p-8 bg-[rgba(255,255,255,0.02)] backdrop-blur-xl border border-[rgba(255,255,255,0.05)] rounded-xl hover:bg-[rgba(255,255,255,0.04)] hover:border-[rgba(200,169,107,0.3)] transition-all duration-300 cursor-pointer"
              >
                <div className="w-12 h-12 rounded-lg bg-[rgba(200,169,107,0.1)] flex items-center justify-center mb-6 group-hover:bg-[rgba(200,169,107,0.15)] transition-colors">
                  <Icon className="w-6 h-6 text-[#C8A96B]" />
                </div>

                <h3 className="text-lg font-bold text-[#F5F5F5] mb-2">
                  {industry.title}
                </h3>

                <p className="text-sm text-[#B0B0B0] leading-relaxed">
                  {industry.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}