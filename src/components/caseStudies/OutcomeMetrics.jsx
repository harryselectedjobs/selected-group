import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";

const metrics = [
  {
    value: "1000",
    label: "Placements",
    suffix: "+",
    animate: true,
  },
  {
    value: "94",
    label: "Offer Acceptance",
    suffix: "%",
    animate: true,
  },
  {
    value: "31",
    label: "Avg Time-to-Fill (Days)",
    suffix: "",
    animate: true,
  },
  {
    value: "4",
    label: "Continents Covered",
    suffix: "",
    animate: false,
  },
  {
    value: "Seed to IPO",
    label: "Company Stage",
    suffix: "",
    animate: false,
  },
  {
    value: "Retained & RPO",
    label: "Engagement Models",
    suffix: "",
    animate: false,
  },
];

function AnimatedCounter({ end, duration = 2 }) {
  const [count, setCount] = useState(0);

  const ref = useRef(null);

  const isInView = useInView(ref, {
    once: true,
  });

  useEffect(() => {
    if (!isInView) return;

    let startTime;
    let animationFrame;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;

      const progress = Math.min(
        (timestamp - startTime) / (duration * 1000),
        1
      );

      const easeOutQuart = 1 - Math.pow(1 - progress, 4);

      setCount(Math.floor(easeOutQuart * end));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration, isInView]);

  return <div ref={ref}>{count}</div>;
}

export default function OutcomeMetrics() {
  return (
    <section className="py-32 bg-[#0A0A0A] relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[rgba(200,169,107,0.03)] to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <div className="uppercase text-xs tracking-[0.2em] text-[#C8A96B] mb-4">
            Impact
          </div>

          <h2 className="text-4xl lg:text-5xl font-bold text-[#F5F5F5]">
            Measurable Outcomes
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {metrics.map((metric, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.6,
                delay: index * 0.1,
              }}
              className="relative p-8 bg-[rgba(255,255,255,0.02)] backdrop-blur-xl border border-[rgba(255,255,255,0.08)] rounded-2xl hover:bg-[rgba(255,255,255,0.04)] hover:border-[rgba(200,169,107,0.3)] transition-all duration-300 group"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#C8A96B] to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-t-2xl" />

              <div className="text-5xl lg:text-6xl font-bold text-[#C8A96B] mb-4 tracking-tight">
                {metric.animate &&
                typeof metric.value === "string" &&
                !isNaN(Number(metric.value)) ? (
                  <>
                    <AnimatedCounter end={Number(metric.value)} />
                    {metric.suffix}
                  </>
                ) : (
                  <>
                    {metric.value}
                    {metric.suffix}
                  </>
                )}
              </div>

              <div className="text-sm uppercase tracking-wide text-[#B0B0B0]">
                {metric.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}