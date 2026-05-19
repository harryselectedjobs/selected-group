import { motion } from "framer-motion";
import { ArrowRight, Building2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";


const caseStudies = [
  {
    company: "Palantir",
    headline:
      "Building a Go-To-Market Function for Private Sector Expansion",
    narrative:
      "Selected partnered with Palantir to help build its private sector Go-To-Market capability across Europe. The mandate focused on assembling high-performing enterprise sales, consulting, presales, marketing and professional services teams capable of supporting large-scale commercial expansion beyond the public sector.",
    metrics: [
      "Enterprise GTM",
      "Private sector expansion",
      "Europe-wide hiring",
      "Commercial growth",
    ],
    roles: [
      "Enterprise Sales",
      "Management Consultant",
      "Presales Specialist",
      "Marketing Professional",
      "Professional Services",
      "Enterprise Leader",
    ],
    imageUrl:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&q=80",
  },

  {
    company: "Oracle",
    headline:
      "Enterprise Sales Hiring Across the Benelux Market",
    narrative:
      "Oracle engaged Selected to support strategic enterprise sales hiring across the Benelux region during a major European expansion initiative. The project focused on rebuilding market perception, reducing attrition and securing high-performing enterprise sales talent within one of Oracle’s most challenging hiring markets.",
    metrics: [
      "10 hires",
      "8 months",
      "Benelux region",
      "Reduced attrition",
    ],
    roles: [
      "Enterprise AE",
      "Sales Director",
      "Enterprise Sales",
      "Commercial Leadership",
    ],
    imageUrl:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&q=80",
  },

  {
    company: "Apple",
    headline:
      "Scaling Enterprise B2B Sales & Partner Teams Across Europe",
    narrative:
      "Apple partnered with Selected during a major expansion of its B2B enterprise sales operations across Europe. The mandate included hiring across enterprise sales, SI teams, partner management, public sector and field marketing functions while supporting Apple’s transition into enterprise-focused commercial growth.",
    metrics: [
      "20 positions",
      "UK & Europe",
      "Enterprise B2B",
      "2.3 placements/month",
    ],
    roles: [
      "Partner Manager",
      "Major Accounts Lead",
      "Public Sector Lead",
      "Field Marketing Lead",
      "Enterprise Sales",
      "Presales",
    ],
    imageUrl:
      "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=1200&q=80",
  },

  {
    company: "Behavox",
    headline:
      "Supporting Hypergrowth Through Strategic Enterprise Hiring",
    narrative:
      "Behavox partnered with Selected during a rapid hypergrowth phase to scale account management, customer success and implementation teams across the UK and US markets. The project supported customer retention, delivery capability and long-term operational growth within the FinTech sector.",
    metrics: [
      "10 hires",
      "6 months",
      "UK & US",
      "Low attrition",
    ],
    roles: [
      "Account Manager",
      "Customer Success",
      "Implementation Project Manager",
      "Enterprise Delivery",
      "Post-Sales Consultant",
    ],
    imageUrl:
      "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=1200&q=80",
  },

  {
    company: "Aviv",
    headline:
      "Building Product Leadership Teams Across Europe",
    narrative:
      "Selected supported AVIV Group’s strategic marketplace transformation initiative by recruiting high-performing Product professionals across Europe. The engagement focused on building leadership capability to support digital innovation, platform consolidation and customer experience transformation.",
    metrics: [
      "Product leadership",
      "European hiring",
      "Marketplace transformation",
      "Digital growth",
    ],
    roles: [
      "Product Director",
      "Product Leadership",
      "Product Strategy",
      "Digital Product",
      "Technology Leadership",
    ],
    imageUrl:
      "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=1200&q=80",
  },

  {
    company: "OverIT",
    headline:
      "Scaling Commercial & Professional Services Teams Internationally",
    narrative:
      "OverIT partnered with Selected to build enterprise software sales, presales, marketing and professional services teams across Europe and the US. The project supported the company’s international growth strategy within the Field Service Management technology market.",
    metrics: [
      "Europe & US",
      "Enterprise software",
      "Commercial hiring",
      "Professional services",
    ],
    roles: [
      "SDR",
      "VP Sales",
      "Presales Consultant",
      "Marketing Professional",
      "Professional Services",
      "Enterprise Sales",
    ],
    imageUrl:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200&q=80",
  },

  {
    company: "Celonis",
    headline:
      "Enterprise Value & Commercial Talent Across EMEA",
    narrative:
      "As the global leader in Process Mining and Execution Management, Celonis partnered with Selected Group to attract high-calibre commercial and consulting talent capable of combining technical credibility with commercial acumen. Selected supported hiring across Value Engineering, Enterprise Sales and strategic GTM leadership while delivering market intelligence and compensation benchmarking across EMEA.",
    metrics: [
      "12 hires",
      "EMEA expansion",
      "Enterprise SaaS",
      "GTM leadership",
    ],
    roles: [
      "Value Partner",
      "Senior Value Engineer",
      "Enterprise Account Executive",
      "Strategic Sales",
      "GTM Leadership",
      "Enterprise Transformation",
    ],
    imageUrl:
      "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=1200&q=80",
  },
];

export default function FeaturedCaseStudies() {
    const navigate = useNavigate();
  return (
    <section className="py-32 bg-[#0A0A0A]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <div className="uppercase text-xs tracking-[0.2em] text-[#C8A96B] mb-4">
            Featured Work
          </div>

          <h2 className="text-4xl lg:text-5xl font-bold text-[#F5F5F5]">
            Enterprise Recruitment Case Studies
          </h2>
        </motion.div>

        <div className="space-y-32">
          {caseStudies.map((study, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="grid lg:grid-cols-2 gap-12 items-center"
            >
              {/* IMAGE */}
              <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                <div className="relative group overflow-hidden rounded-2xl">
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent z-10" />

                  <img
                    src={study.imageUrl}
                    alt={study.company}
                    className="w-full h-[500px] object-cover group-hover:scale-105 transition-transform duration-700"
                  />

                  <div className="absolute top-6 left-6 z-20 px-4 py-2 bg-[rgba(10,10,10,0.8)] backdrop-blur-md border border-[rgba(255,255,255,0.1)] rounded-lg">
                    <div className="flex items-center gap-2">
                      <Building2 className="w-5 h-5 text-[#C8A96B]" />
                      <span className="text-[#F5F5F5] font-medium">
                        {study.company}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* CONTENT */}
              <div className={index % 2 === 1 ? "lg:order-1" : ""}>
                <h3 className="text-3xl lg:text-4xl font-bold text-[#F5F5F5] mb-6 leading-tight">
                  {study.headline}
                </h3>

                <p className="text-lg text-[#B0B0B0] mb-8 leading-relaxed">
                  {study.narrative}
                </p>

                <div className="flex flex-wrap gap-3 mb-8">
                  {study.metrics.map((metric, i) => (
                    <div
                      key={i}
                      className="px-4 py-2 bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.08)] rounded-lg text-sm text-[#B0B0B0]"
                    >
                      {metric}
                    </div>
                  ))}
                </div>

                <div className="mb-8">
                  <div className="text-sm uppercase tracking-wide text-[#C8A96B] mb-4">
                    Roles Delivered
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {study.roles.map((role, i) => (
                      <div
                        key={i}
                        className="px-4 py-2 bg-[rgba(200,169,107,0.1)] border border-[rgba(200,169,107,0.2)] rounded-lg text-sm text-[#C8A96B]"
                      >
                        {role}
                      </div>
                    ))}
                  </div>
                </div>

                {study.company === "Celonis" ? (
  <Link
    to="/case-studies/celonis"
    className="group flex items-center gap-2 text-[#C8A96B] hover:text-[#D4B77C] transition-colors font-medium"
  >
    View Full Case Study

    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
  </Link>
) : (
  <button className="group flex items-center gap-2 text-[#C8A96B] hover:text-[#D4B77C] transition-colors font-medium">
    View Full Case Study

    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
  </button>
)}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}