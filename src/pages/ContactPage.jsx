import { useState, useEffect } from "react";
import {
  Send,
  Mail,
  Phone,
  MapPin,
  Clock,
  ArrowRight,
  CheckCircle,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const API_BASE = "https://www.selected.jobs/api";

const contactDetails = [
  {
    icon: Mail,
    label: "Business Email",
    value: "harry@selected.jobs",
    href: "mailto:harry@selected.jobs",
    accent: "#4F9CF9",
  },
  {
    icon: Phone,
    label: "Contact Phone",
    value: "02038656229",
    href: "tel:02038656229",
    accent: "#34D399",
  },
  {
    icon: MapPin,
    label: "Office Address",
    value: "3 Manor Royal",
    sub: "Crawley RH10 9LU",
    href: "https://maps.google.com/?q=3+Manor+Royal+Crawley+RH10+9LU",
    accent: "#A78BFA",
  },
  {
    icon: Clock,
    label: "Response Time",
    value: "Within 24 hours",
    sub: "Monday – Friday",
    href: null,
    accent: "#FBBF24",
  },
];

const nextSteps = [
  { n: "01", text: "We review your requirement" },
  { n: "02", text: "Discovery call to understand your needs" },
  { n: "03", text: "Tailored candidate shortlist" },
  { n: "04", text: "First CVs typically within one week" },
];

const practiceOptions = [
  "GTM Talent Recruitment",
  "Engineering Recruitment",
  "Product Management Recruitment",
  "Professional Services Recruitment",
  "Executive Search",
  "Other",
];

export default function ContactPage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    practice: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // =========================
  // SUBMIT API INTEGRATION
  // =========================
  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      const response = await fetch(`${API_BASE}/contact-us/add`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          full_name: form.name,
          company_name: form.company,
          work_email: form.email,
          phone_number: form.phone,
          practice_area: form.practice,
          hiring_brief: form.message,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.message || "Failed to submit form");
      }

      setSubmitted(true);

      // reset form
      setForm({
        name: "",
        email: "",
        company: "",
        phone: "",
        practice: "",
        message: "",
      });
    } catch (err) {
      console.error(err);
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-black min-h-screen">
      {/* Hero banner */}
      <div className="relative pt-32 pb-20 px-6 overflow-hidden">
        <div
          className="absolute -top-40 -right-40 w-[700px] h-[700px] rounded-full blur-[160px] pointer-events-none opacity-40"
          style={{ backgroundColor: "rgba(79,156,249,0.3)" }}
        />

        <div
          className="absolute bottom-0 -left-20 w-[500px] h-[500px] rounded-full blur-[130px] pointer-events-none opacity-30"
          style={{ backgroundColor: "rgba(167,139,250,0.3)" }}
        />

        <div
          className="absolute inset-0 opacity-[0.025] pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />

        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black to-transparent pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex items-center gap-3 mb-6">
            <span className="w-8 h-px bg-white/30" />

            <span className="text-white/40 text-xs font-semibold tracking-[0.3em] uppercase">
              Get In Touch
            </span>
          </div>

          <h1 className="text-[3.25rem] font-bold text-white tracking-tight mb-5 max-w-2xl leading-tight">
            Let's Find Your{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/40">
              Next Hire
            </span>
          </h1>

          <p className="text-white/50 text-base md:text-lg max-w-xl leading-relaxed">
            Specialist recruitment across GTM, Engineering, Product Management
            and Professional Services. All conversations are strictly
            confidential.
          </p>
        </div>
      </div>

      {/* Contact detail cards */}
      <div className="max-w-7xl mx-auto px-6 pb-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {contactDetails.map(
            ({ icon: Icon, label, value, sub, href, accent }) => (
              <div
                key={label}
                className="group bg-[#0d0d0d] border border-white/[0.07] p-6 hover:border-white/20 transition-all duration-300 hover:-translate-y-0.5"
              >
                <div
                  className="w-10 h-10 flex items-center justify-center mb-4"
                  style={{ backgroundColor: `${accent}18` }}
                >
                  <Icon size={18} style={{ color: accent }} />
                </div>

                <p className="text-white/60 text-[10px] font-semibold tracking-[0.25em] uppercase mb-2">
                  {label}
                </p>

                {href ? (
                  <a
                    href={href}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel="noreferrer"
                    className="text-white text-sm font-semibold hover:opacity-70 transition-opacity"
                  >
                    {value}
                  </a>
                ) : (
                  <p className="text-white text-sm font-semibold">{value}</p>
                )}

                {sub && <p className="text-white/40 text-xs mt-0.5">{sub}</p>}
              </div>
            ),
          )}
        </div>
      </div>

      {/* Main Layout */}
      <div className="max-w-7xl mx-auto px-6 py-16 grid lg:grid-cols-5 gap-12 lg:gap-16">
        {/* Left */}
        <div className="lg:col-span-2 flex flex-col gap-10">
          <div>
            <h2 className="text-white text-xl font-bold tracking-tight mb-4">
              Working With Us
            </h2>

            <p className="text-white/45 text-sm leading-relaxed mb-4">
              Selected Group is a specialist technology recruitment business
              operating across GTM, Engineering, Product Management and
              Professional Services.
            </p>

            <p className="text-white/60 text-sm leading-relaxed">
              All hiring mandates are treated with the strictest
              confidentiality.
            </p>
          </div>

          {/* Next Steps */}
          <div>
            <h3 className="text-white/60 text-[11px] font-bold tracking-[0.22em] uppercase mb-5">
              What Happens Next
            </h3>

            <div className="flex flex-col gap-4">
              {nextSteps.map(({ n, text }) => (
                <div key={n} className="flex items-start gap-4">
                  <span className="text-white/45 text-xs font-mono font-bold pt-0.5 flex-shrink-0">
                    {n}
                  </span>

                  <div className="flex-1 border-b border-white/[0.05] pb-4">
                    <p className="text-white/65 text-sm leading-relaxed">
                      {text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Practice Areas */}
          <div className="border border-white/[0.07] p-6">
            <h3 className="text-white/60 text-[11px] font-bold tracking-[0.22em] uppercase mb-4">
              Our Practice Areas
            </h3>

            <div className="flex flex-col gap-2">
              {[
                {
                  label: "GTM Talent",
                  route: "/",
                  accent: "#4F9CF9",
                },
                {
                  label: "Engineering & Technology",
                  route: "/engineering",
                  accent: "#34D399",
                },
                {
                  label: "Product Management",
                  route: "/product-management",
                  accent: "#A78BFA",
                },
                {
                  label: "Professional Services",
                  route: "/professional-services",
                  accent: "#FBBF24",
                },
              ].map((p) => (
                <button
                  key={p.label}
                  onClick={() => navigate(p.route)}
                  className="flex items-center gap-2 text-white/50 text-sm hover:text-white transition-colors duration-200 text-left group py-1"
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                    style={{ backgroundColor: p.accent }}
                  />

                  {p.label}

                  <ArrowRight
                    size={12}
                    className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Form */}
        <div className="lg:col-span-3">
          <div className="bg-[#0d0d0d] border border-white/[0.07] p-8 md:p-10">
            {submitted ? (
              <div className="flex flex-col items-center justify-center py-16 text-center gap-5">
                <div className="w-16 h-16 rounded-full bg-[#34D399]/10 flex items-center justify-center">
                  <CheckCircle size={32} className="text-[#34D399]" />
                </div>

                <div>
                  <h3 className="text-white text-2xl font-bold mb-2">
                    Message Received
                  </h3>

                  <p className="text-white/45 text-sm leading-relaxed max-w-sm">
                    Thank you for reaching out. Harry and the team will review
                    your brief and be in touch within 24 hours.
                  </p>
                </div>

                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-2 text-white/40 text-xs tracking-widest uppercase hover:text-white transition-colors"
                >
                  Send Another
                </button>
              </div>
            ) : (
              <>
                <div className="mb-8">
                  <h2 className="text-white text-2xl font-bold tracking-tight mb-1">
                    Send Us a Brief
                  </h2>

                  <p className="text-white/60 text-sm">
                    Fill in the details below and we'll be in touch within 24
                    hours.
                  </p>
                </div>

                {/* ERROR */}
                {error && (
                  <div className="mb-5 border border-red-500/20 bg-red-500/10 text-red-300 text-sm px-4 py-3">
                    {error}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                  {/* Name + Company */}
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-white/60 text-[10px] font-semibold tracking-[0.22em] uppercase mb-2">
                        Full Name *
                      </label>

                      <input
                        type="text"
                        required
                        value={form.name}
                        onChange={(e) =>
                          setForm({
                            ...form,
                            name: e.target.value,
                          })
                        }
                        placeholder="Your name"
                        className="w-full bg-[#141414] border border-white/[0.1] text-white placeholder-white/25 px-4 py-3.5 text-sm focus:outline-none focus:border-white/40 transition-colors duration-200"
                      />
                    </div>

                    <div>
                      <label className="block text-white/60 text-[10px] font-semibold tracking-[0.22em] uppercase mb-2">
                        Company *
                      </label>

                      <input
                        type="text"
                        required
                        value={form.company}
                        onChange={(e) =>
                          setForm({
                            ...form,
                            company: e.target.value,
                          })
                        }
                        placeholder="Company name"
                        className="w-full bg-[#141414] border border-white/[0.1] text-white placeholder-white/25 px-4 py-3.5 text-sm focus:outline-none focus:border-white/40 transition-colors duration-200"
                      />
                    </div>
                  </div>

                  {/* Email + Phone */}
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-white/60 text-[10px] font-semibold tracking-[0.22em] uppercase mb-2">
                        Work Email *
                      </label>

                      <input
                        type="email"
                        required
                        value={form.email}
                        onChange={(e) =>
                          setForm({
                            ...form,
                            email: e.target.value,
                          })
                        }
                        placeholder="name@company.com"
                        className="w-full bg-[#141414] border border-white/[0.1] text-white placeholder-white/25 px-4 py-3.5 text-sm focus:outline-none focus:border-white/40 transition-colors duration-200"
                      />
                    </div>

                    <div>
                      <label className="block text-white/60 text-[10px] font-semibold tracking-[0.22em] uppercase mb-2">
                        Phone Number
                      </label>

                      <input
                        type="tel"
                        value={form.phone}
                        onChange={(e) =>
                          setForm({
                            ...form,
                            phone: e.target.value,
                          })
                        }
                        placeholder="+44 ..."
                        className="w-full bg-[#141414] border border-white/[0.1] text-white placeholder-white/25 px-4 py-3.5 text-sm focus:outline-none focus:border-white/40 transition-colors duration-200"
                      />
                    </div>
                  </div>

                  {/* Practice */}
                  <div>
                    <label className="block text-white/60 text-[10px] font-semibold tracking-[0.22em] uppercase mb-2">
                      Practice Area *
                    </label>

                    <select
                      required
                      value={form.practice}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          practice: e.target.value,
                        })
                      }
                      className="w-full bg-[#141414] border border-white/[0.1] text-white px-4 py-3.5 text-sm focus:outline-none focus:border-white/40 transition-colors duration-200 appearance-none cursor-pointer"
                    >
                      <option value="" disabled>
                        Select a practice area
                      </option>

                      {practiceOptions.map((o) => (
                        <option key={o} value={o} className="bg-[#141414]">
                          {o}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-white/60 text-[10px] font-semibold tracking-[0.22em] uppercase mb-2">
                      Hiring Brief *
                    </label>

                    <textarea
                      rows={5}
                      required
                      value={form.message}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          message: e.target.value,
                        })
                      }
                      placeholder="Tell us about your hiring needs..."
                      className="w-full bg-[#141414] border border-white/[0.1] text-white placeholder-white/25 px-4 py-3.5 text-sm resize-none focus:outline-none focus:border-white/40 transition-colors duration-200"
                    />
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="group flex items-center justify-center gap-3 bg-white text-black px-8 py-4 text-sm font-bold tracking-widest uppercase transition-all duration-300 hover:bg-white/90 disabled:opacity-60 mt-2"
                  >
                    {loading ? (
                      <span className="flex items-center gap-2">
                        <span className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                        Sending...
                      </span>
                    ) : (
                      <>
                        Submit Brief
                        <Send
                          size={14}
                          className="transition-transform group-hover:translate-x-1"
                        />
                      </>
                    )}
                  </button>

                  <p className="text-white/45 text-xs text-center leading-relaxed">
                    By submitting this form you agree that your details may be
                    used to contact you about our services.
                  </p>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
