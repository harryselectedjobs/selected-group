import { useEffect, useRef, useState } from "react";
import { Quote, ChevronDown } from "lucide-react";
import philippeImage from "../assets/images/philippe-mathieu.jpg";
import choleImage from "../assets/images/chloe-elliott.jpg";
import deliaImage from "../assets/images/delia-marinescu.jpg";

const testimonials = [
  {
    quote:
      "After receiving commendable feedback from my former associates at Oracle, I engaged with Selected during my tenure at Palantir. Assuming the role of President tasked with advancing our Private Sector initiatives, I sought a reputable agency capable of delivering impeccable service.",

    name: "Philippe Mathieu",

    role: "President EMEA",

    image: philippeImage,

    accent: "#34D399",

    details: {
      focus: "Product Leadership Recruitment",
      region: "Europe",
    },
  },

  {
    quote:
      "When it comes to Enterprise software sales recruitment Selected is a very strong recruitment partner to Oracle, they were involved in a large scale hiring campaign throughout 2017, road mapping and identifying hidden talent in some of our most challenging regions.",

    name: "Delia Marinescu",

    role: "VP of Talent EMEA",

    image: deliaImage,

    accent: "#FBBF24",

    details: {
      focus: "Product Director Search",
      region: "European Markets",
    },
  },

  {
    quote:
      "Harry and the staff at Selected work with laser focus precision to identify the market’s best talent and ensure thoroughness in their delivery at every stage through the process - be that market mapping, industry insights, candidate qualification, expectation setting, offer management etc. ",

    name: "Chloe Elliott",

    role: "Global Recruiting Leader",

    image: choleImage,

    accent: "#F87171",

    details: {
      focus: "Hypergrowth Enterprise Hiring",
      region: "UK & United States",
    },
  },
];

function TestimonialCard({ quote, name, role, image, accent, details, delay }) {
  const ref = useRef(null);

  const [expanded, setExpanded] = useState(false);

  const shortQuote = quote.length > 180 ? quote.slice(0, 180) + "..." : quote;

  useEffect(() => {
    const el = ref.current;

    if (!el) return;

    el.style.opacity = "0";
    el.style.transform = "translateY(24px)";

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            el.style.transition = "opacity 0.7s ease, transform 0.7s ease";

            el.style.opacity = "1";
            el.style.transform = "translateY(0)";
          }, delay);

          observer.disconnect();
        }
      },
      { threshold: 0.1 },
    );

    observer.observe(el);

    return () => observer.disconnect();
  }, [delay]);

  return (
    <div
      ref={ref}
      className="relative bg-[#0D0D0D] border border-white/[0.07] p-8 flex flex-col overflow-hidden transition-all duration-300"
    >
      {/* Accent Top Line */}
      <div
        className="absolute top-0 left-0 right-0 h-[2px]"
        style={{ backgroundColor: accent }}
      />

      {/* Header */}
      <div className="flex items-center gap-4 mb-7">
        <img
          src={image}
          alt={name}
          className="w-20 h-20 object-cover rounded-2xl border border-white/10"
        />

        <div>
          <h3 className="text-white text-lg font-semibold tracking-tight">
            {name}
          </h3>

          <p className="text-sm mt-1 font-medium" style={{ color: accent }}>
            {role}
          </p>
        </div>
      </div>

      {/* Quote Icon */}
      <Quote
        size={36}
        strokeWidth={1.6}
        className="mb-6 opacity-20"
        style={{ color: accent }}
      />

      {/* Quote */}
      <div className="flex-1">
        <p className="text-white/70 text-[15px] leading-[1.9]">
          “{expanded ? quote : shortQuote}”
        </p>

        {quote.length > 180 && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="mt-5 inline-flex items-center gap-2 text-xs uppercase tracking-[0.22em] transition-all duration-300"
            style={{ color: accent }}
          >
            {expanded ? "Show Less" : "Read More"}

            <ChevronDown
              size={14}
              className={`transition-transform duration-300 ${
                expanded ? "rotate-180" : ""
              }`}
            />
          </button>
        )}
      </div>

      {/* Footer */}
      <div className="border-t border-white/[0.06] pt-5 mt-8 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <span className="text-[11px] uppercase tracking-[0.2em] text-white/35">
            Focus
          </span>

          <span className="text-sm text-white/85">{details.focus}</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-[11px] uppercase tracking-[0.2em] text-white/35">
            Region
          </span>

          <span className="text-sm text-white/85">{details.region}</span>
        </div>
      </div>
    </div>
  );
}

export default function Testimonials() {
  const headerRef = useRef(null);

  useEffect(() => {
    const el = headerRef.current;

    if (!el) return;

    el.style.opacity = "0";
    el.style.transform = "translateY(24px)";

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.transition = "opacity 0.8s ease, transform 0.8s ease";

          el.style.opacity = "1";
          el.style.transform = "translateY(0)";

          observer.disconnect();
        }
      },
      { threshold: 0.2 },
    );

    observer.observe(el);

    return () => observer.disconnect();
  }, []);

  return (
    <section className="relative bg-black py-20 md:py-28 border-t border-white/[0.05] overflow-hidden">
      {/* Glow */}
      <div
        className="absolute left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full blur-[180px] opacity-[0.05]"
        style={{
          background: "rgba(200,169,107,0.22)",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Header */}
        <div ref={headerRef} className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <span className="w-8 h-px bg-[#C8A96B]" />

            <span className="text-[#C8A96B] text-xs font-medium tracking-[0.3em] uppercase">
              Client Testimonials
            </span>
          </div>

          <h2 className="text-[3rem] md:text-[4.5rem] font-bold text-white leading-[0.95] tracking-tight max-w-4xl">
            Trusted by Enterprise
            <span className="block text-white/40">Technology Leaders</span>
          </h2>

          <p className="text-white/55 text-lg mt-8 max-w-2xl leading-relaxed">
            Strategic hiring partnerships across enterprise software, SaaS, AI,
            and global technology organisations.
          </p>
        </div>

        {/* Cards */}
        <div className="grid lg:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <TestimonialCard key={t.name} {...t} delay={i * 120} />
          ))}
        </div>
      </div>
    </section>
  );
}
