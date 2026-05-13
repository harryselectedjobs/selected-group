import { useState, useRef, useEffect } from 'react';
import { Send, Mail, MapPin, Phone } from 'lucide-react';

const contactInfo = [
  { icon: Mail,  label: 'Email',   value: 'harry@selected.jobs',          href: 'mailto:harry@selected.jobs' },
  { icon: Phone, label: 'Phone',   value: '0203 005 2908',                href: 'tel:02030052908' },
  { icon: MapPin,label: 'Office',  value: '3 Manor Royal, Crawley RH10 9LU', href: null },
];

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
          el.style.opacity = '1';
          el.style.transform = 'translateY(0)';
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1200);
  };

  return (
    <section id="contact" className="bg-[#0A0A0A] py-16 md:py-20 border-t border-white/[0.05]">
      <div className="max-w-7xl mx-auto px-6">
        <div ref={sectionRef}>

          {/* Header */}
          <div className="max-w-2xl mb-16">
            <div className="flex items-center gap-3 mb-6">
              <span className="w-8 h-px bg-white/30" />
              <span className="text-white/65 text-xs font-medium tracking-[0.25em] uppercase">
                Executive GTM Recruitment
              </span>
            </div>

            <h2 className="text-[3.25rem] font-bold text-white leading-tight tracking-tight mb-4">
              Let’s Build Your <br />
              <span className="text-white/65">GTM Team</span>
            </h2>

            <p className="text-white/65 text-base leading-relaxed">
              We partner with enterprise software companies to place high-performing sales leaders,
              account executives, and GTM talent across US and European markets.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-14 lg:gap-24">

            {/* Contact Info */}
            <div>
              <div className="flex flex-col gap-8 mb-12">
                {contactInfo.map(({ icon: Icon, label, value, href }) => (
                  <div key={label} className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-white/5 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Icon size={16} className="text-white/50" />
                    </div>
                    <div>
                      <div className="text-white/65 text-xs tracking-widest uppercase mb-1">
                        {label}
                      </div>
                      {href ? (
                        <a href={href} className="text-white text-sm font-medium hover:text-white/70 transition-colors">
                          {value}
                        </a>
                      ) : (
                        <div className="text-white text-sm font-medium">{value}</div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-white/[0.06] pt-8">
                <p className="text-white/65 text-xs tracking-wide leading-relaxed">
                  All conversations are confidential. We support hiring decisions for
                  growth-stage to enterprise GTM teams. Response time: 24 hours.
                </p>
              </div>
            </div>

            {/* Form */}
            <div>
              {submitted ? (
                <div className="h-full flex flex-col justify-center py-8">
                  <div className="w-12 h-px bg-white/30 mb-6" />
                  <h3 className="text-white text-2xl font-semibold mb-3">
                    Request Received
                  </h3>
                  <p className="text-white/65 text-sm leading-relaxed">
                    Our GTM recruitment team will review your requirement and respond shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-6">

  {/* Full Name */}
  <div>
    <label className="block text-white/65 text-xs tracking-widest uppercase mb-2">
      Full Name
    </label>
    <input
      type="text"
      required
      value={form.name}
      onChange={(e) => setForm({ ...form, name: e.target.value })}
      placeholder="John Smith"
      className="w-full bg-[#141414] border border-white/15 text-white placeholder-white/30 px-4 py-3.5 text-sm 
                 focus:outline-none focus:border-white focus:bg-[#1a1a1a] 
                 transition-all duration-300"
    />
  </div>

  {/* Email */}
  <div>
    <label className="block text-white/65 text-xs tracking-widest uppercase mb-2">
      Work Email
    </label>
    <input
      type="email"
      required
      value={form.email}
      onChange={(e) => setForm({ ...form, email: e.target.value })}
      placeholder="name@company.com"
      className="w-full bg-[#141414] border border-white/15 text-white placeholder-white/30 px-4 py-3.5 text-sm 
                 focus:outline-none focus:border-white focus:bg-[#1a1a1a] 
                 transition-all duration-300"
    />
  </div>

  {/* Message */}
  <div>
    <label className="block text-white/65 text-xs tracking-widest uppercase mb-2">
      Requirement
    </label>
    <textarea
      rows={5}
      required
      value={form.message}
      onChange={(e) => setForm({ ...form, message: e.target.value })}
      placeholder="Tell us about your hiring needs..."
      className="w-full bg-[#141414] border border-white/15 text-white placeholder-white/30 px-4 py-3.5 text-sm resize-none 
                 focus:outline-none focus:border-white focus:bg-[#1a1a1a] 
                 transition-all duration-300"
    />
  </div>

  {/* Button */}
  <button
    type="submit"
    disabled={loading}
    className="group flex items-center gap-3 bg-white text-black px-8 py-4 text-sm font-semibold uppercase tracking-wide
               transition-all duration-300 hover:bg-[#E5E5E5] disabled:opacity-60"
  >
    {loading ? (
      <span className="flex items-center gap-2">
        <span className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
        Processing...
      </span>
    ) : (
      <>
        Submit Requirement
        <Send size={14} className="transition-transform group-hover:translate-x-1" />
      </>
    )}
  </button>

</form>

              )}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
