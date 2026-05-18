import { motion } from "framer-motion";
import { MapPin } from "lucide-react";

const locations = [
  {
    city: "New York",
    country: "United States",
    lat: 40.7128,
    lon: -74.006,
    placements: 287,
  },
  {
    city: "San Francisco",
    country: "United States",
    lat: 37.7749,
    lon: -122.4194,
    placements: 342,
  },
  {
    city: "London",
    country: "United Kingdom",
    lat: 51.5074,
    lon: -0.1278,
    placements: 198,
  },
  {
    city: "Berlin",
    country: "Germany",
    lat: 52.52,
    lon: 13.405,
    placements: 145,
  },
  {
    city: "Paris",
    country: "France",
    lat: 48.8566,
    lon: 2.3522,
    placements: 112,
  },
  {
    city: "Amsterdam",
    country: "Netherlands",
    lat: 52.3676,
    lon: 4.9041,
    placements: 89,
  },
  {
    city: "Stockholm",
    country: "Sweden",
    lat: 59.3293,
    lon: 18.0686,
    placements: 67,
  },
  {
    city: "Milan",
    country: "Italy",
    lat: 45.4642,
    lon: 9.19,
    placements: 54,
  },
];

export default function GlobalCoverage() {
  return (
    <section className="py-32 bg-[#0A0A0A] relative overflow-hidden">
      {/* Background Map */}
      <div className="absolute inset-0 opacity-20">
        <svg
          className="w-full h-full"
          viewBox="0 0 1200 600"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            <linearGradient
              id="mapGradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#C8A96B" stopOpacity="0.1" />
              <stop offset="100%" stopColor="#C8A96B" stopOpacity="0" />
            </linearGradient>
          </defs>

          <path
            d="M 0,300 Q 300,200 600,300 T 1200,300"
            stroke="url(#mapGradient)"
            strokeWidth="1"
            fill="none"
            opacity="0.3"
          />

          {locations.map((loc, index) => {
            const x = ((loc.lon + 180) / 360) * 1200;
            const y = ((90 - loc.lat) / 180) * 600;

            return (
              <g key={index}>
                <circle
                  cx={x}
                  cy={y}
                  r="4"
                  fill="#C8A96B"
                  opacity="0.6"
                />

                <circle
                  cx={x}
                  cy={y}
                  r="8"
                  fill="none"
                  stroke="#C8A96B"
                  strokeWidth="1"
                  opacity="0.3"
                >
                  <animate
                    attributeName="r"
                    from="8"
                    to="20"
                    dur="2s"
                    begin={`${index * 0.3}s`}
                    repeatCount="indefinite"
                  />

                  <animate
                    attributeName="opacity"
                    from="0.3"
                    to="0"
                    dur="2s"
                    begin={`${index * 0.3}s`}
                    repeatCount="indefinite"
                  />
                </circle>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <div className="uppercase text-xs tracking-[0.2em] text-[#C8A96B] mb-4">
            Global Reach
          </div>

          <h2 className="text-4xl lg:text-5xl font-bold text-[#F5F5F5] mb-6">
            International Coverage
          </h2>

          <p className="text-xl text-[#B0B0B0] max-w-3xl mx-auto">
            Delivering enterprise recruitment across North America and Europe
          </p>
        </motion.div>

        {/* Location Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {locations.map((location, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: index * 0.05,
              }}
              className="p-6 bg-[rgba(255,255,255,0.02)] backdrop-blur-xl border border-[rgba(255,255,255,0.08)] rounded-xl hover:bg-[rgba(255,255,255,0.04)] hover:border-[rgba(200,169,107,0.3)] transition-all duration-300 group"
            >
              <div className="flex items-start gap-3 mb-4">
                <MapPin className="w-5 h-5 text-[#C8A96B] mt-1 flex-shrink-0" />

                <div>
                  <div className="text-[#F5F5F5] font-bold mb-1">
                    {location.city}
                  </div>

                  <div className="text-sm text-[#B0B0B0]">
                    {location.country}
                  </div>
                </div>
              </div>

              <div className="text-2xl font-bold text-[#C8A96B]">
                {location.placements}
              </div>

              <div className="text-xs uppercase tracking-wide text-[#B0B0B0]">
                Placements
              </div>
            </motion.div>
          ))}
        </div>

        {/* Regions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <div className="inline-flex items-center gap-8 p-8 bg-[rgba(255,255,255,0.02)] backdrop-blur-xl border border-[rgba(255,255,255,0.08)] rounded-2xl">
            <div>
              <div className="text-3xl font-bold text-[#C8A96B] mb-2">
                North America
              </div>

              <div className="text-sm text-[#B0B0B0] uppercase tracking-wide">
                US & Canada
              </div>
            </div>

            <div className="w-px h-12 bg-[rgba(255,255,255,0.1)]" />

            <div>
              <div className="text-3xl font-bold text-[#C8A96B] mb-2">
                Europe
              </div>

              <div className="text-sm text-[#B0B0B0] uppercase tracking-wide">
                UK, DACH, Nordics, Southern Europe
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}