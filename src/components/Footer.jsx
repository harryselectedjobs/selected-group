import { Linkedin, Twitter, Instagram } from 'lucide-react';

const quickLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'GTM Expertise', href: '#services' },
  { label: 'Leadership Placements', href: '#projects' },
  { label: 'Contact', href: '#contact' },
];

const socialLinks = [
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
  { icon: Twitter, href: '#', label: 'X (Twitter)' },
  { icon: Instagram, href: '#', label: 'Instagram' },
];

export default function Footer() {
  const handleNavClick = (e, href) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-black border-t border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-14 lg:py-16">

        {/* TOP GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-12 mb-12">

          {/* Brand */}
          <div>
            <div className="flex flex-col mb-5">
              <span className="text-white font-semibold text-2xl tracking-tight leading-none">
                Selected
              </span>
              <span className="text-[#A0A0A0] font-light text-xs tracking-[0.35em] uppercase mt-1">
                Group
              </span>
            </div>

            <p className="text-[#9A9A9A] text-sm leading-relaxed max-w-sm">
              Enterprise GTM recruitment specialists helping software companies across the US
              and Europe hire high-performing sales leaders, account executives, and new logo talent.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-white text-[11px] font-semibold tracking-[0.18em] uppercase mb-5">
              GTM Navigation
            </h4>

            <ul className="flex flex-col gap-2.5">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="text-[#9A9A9A] text-sm hover:text-white transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white text-[11px] font-semibold tracking-[0.18em] uppercase mb-5">
              Executive Contact
            </h4>

            <div className="space-y-2 mb-5">
              <p className="text-[#9A9A9A] text-sm">
                hello@selectedgroup.com
              </p>
              <p className="text-[#9A9A9A] text-sm">
                Global GTM Talent Coverage
              </p>
            </div>

            <p className="text-[#7F7F7F] text-xs leading-relaxed mb-6 max-w-sm">
              Confidential hiring support for Series A–Enterprise SaaS companies.
              Response time within 24 business hours.
            </p>

            <div className="flex items-center gap-2">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 bg-white/[0.04] border border-white/[0.06] flex items-center justify-center text-white/40 hover:text-white hover:border-white/20 hover:bg-white/[0.08] transition-all duration-200 rounded"
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

        </div>

        {/* BOTTOM BAR */}
        <div className="border-t border-white/[0.06] pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">

          <p className="text-[#7A7A7A] text-xs text-center sm:text-left">
            &copy; {new Date().getFullYear()} Selected Group. GTM Recruitment Specialists.
          </p>

          <div className="flex items-center gap-5">
            <a
              href="#"
              className="text-[#7A7A7A] text-xs hover:text-white transition-colors duration-200"
            >
              Privacy
            </a>
            <a
              href="#"
              className="text-[#7A7A7A] text-xs hover:text-white transition-colors duration-200"
            >
              Compliance
            </a>
          </div>

        </div>

      </div>
    </footer>
  );
}
