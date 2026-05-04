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
    // your JSX stays the same
    <footer className="bg-black border-t border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-6 py-16">

        <div className="grid md:grid-cols-3 gap-12 mb-14">

          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex flex-col mb-4">
              <span className="text-white font-bold text-2xl tracking-tight leading-none">
                Selected
              </span>
              <span className="text-[#A0A0A0] font-light text-sm tracking-[0.3em] uppercase">
                Group
              </span>
            </div>

            <p className="text-[#A0A0A0] text-sm leading-relaxed max-w-xs">
              We are an enterprise GTM recruitment specialist, helping software companies
              across the US and Europe hire high-performing sales leaders, account executives,
              and new logo acquisition talent.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-white text-xs font-semibold tracking-[0.2em] uppercase mb-5">
              GTM Navigation
            </h4>

            <ul className="flex flex-col gap-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="text-[#A0A0A0] text-sm hover:text-white transition-colors duration-300"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white text-xs font-semibold tracking-[0.2em] uppercase mb-5">
              Executive Contact
            </h4>

            <p className="text-[#A0A0A0] text-sm mb-2">
              hello@selectedgroup.com
            </p>
            <p className="text-[#A0A0A0] text-sm mb-6">
              Global GTM Talent Coverage
            </p>

            <p className="text-[#A0A0A0] text-xs leading-relaxed mb-6">
              Confidential hiring support for Series A–Enterprise SaaS companies.
              Response time: within 24 business hours.
            </p>

            <div className="flex items-center gap-3">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 bg-white/5 flex items-center justify-center text-white/40 hover:bg-white/10 hover:text-white transition-all duration-300"
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/[0.06] pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">

          <p className="text-[#A0A0A0] text-xs">
            &copy; {new Date().getFullYear()} Selected Group. GTM Recruitment Specialists.
          </p>

          <div className="flex items-center gap-6">
            <a
              href="#"
              className="text-[#A0A0A0] text-xs hover:text-white transition-colors duration-300"
            >
              Privacy
            </a>
            <a
              href="#"
              className="text-[#A0A0A0] text-xs hover:text-white transition-colors duration-300"
            >
              Compliance
            </a>
          </div>

        </div>

      </div>
    </footer>
  );
}


