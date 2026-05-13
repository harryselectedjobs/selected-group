import { Linkedin, Twitter, Instagram, Mail, Globe, ArrowRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/images/logo2.png';

const mainNav = [
  { label: 'Home',              href: '/',                   type: 'route' },
  { label: 'About',             href: '/about',              type: 'route' },
  { label: 'Use Cases',         href: '/use-cases',          type: 'route' },
  { label: 'Engagement Models', href: '/engagement-models',  type: 'route' },
  { label: 'Contact',           href: '/contact',            type: 'route' },
];

const practiceNav = [
  { label: 'GTM Talent',              href: '/',                       type: 'route', accent: '#4F9CF9' },
  { label: 'Engineering & Technology',href: '/engineering',            type: 'route', accent: '#34D399' },
  { label: 'Product Management',      href: '/product-management',     type: 'route', accent: '#A78BFA' },
  { label: 'Professional Services',   href: '/professional-services',  type: 'route', accent: '#FBBF24' },
];

const socialLinks = [
  { icon: Linkedin,  href: '#', label: 'LinkedIn'   },
  { icon: Twitter,   href: '#', label: 'X (Twitter)' },
  { icon: Instagram, href: '#', label: 'Instagram'  },
];

export default function Footer() {
  const navigate = useNavigate();

  const handleClick = (item) => {
    if (item.type === 'route') {
      navigate(item.href);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      if (window.location.pathname !== '/') {
        window.location.href = '/' + item.href;
      } else {
        document.querySelector(item.href)?.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const scrollToContact = () => {
    if (window.location.pathname !== '/') {
      window.location.href = '/#contact';
    } else {
      document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-[#050505]">

      {/* CTA Banner */}
      {/* <div className="border-t border-white/[0.06] border-b border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <p className="text-white/35 text-xs font-semibold tracking-[0.22em] uppercase mb-2">
              Ready to hire?
            </p>
            <h2 className="text-2xl md:text-3xl font-bold text-white leading-tight">
              Find exceptional specialist talent
              <br className="hidden md:block" /> with Selected Group.
            </h2>
          </div>
          <button
            onClick={scrollToContact}
            className="group flex-shrink-0 flex items-center gap-3 px-8 py-4 bg-white text-black text-sm font-bold tracking-widest uppercase hover:bg-white/90 transition-all duration-300"
          >
            Start a Search
            <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </div>
      </div> */}

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 pt-16 pb-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">

        {/* Brand — spans 4 cols */}
        <div className="lg:col-span-4">
          <Link to="/" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <img src={logo} alt="Selected Group" className="h-14 w-auto mb-6 hover:opacity-80 transition-opacity" />
          </Link>
          <p className="text-white/40 text-sm leading-relaxed mb-8 max-w-xs">
            Enterprise GTM recruitment specialists helping software companies across the US and Europe hire
            high-performing sales leaders, account executives, and technology talent.
          </p>
          <div className="flex items-center gap-2 mb-8">
            {socialLinks.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="w-10 h-10 border border-white/[0.1] flex items-center justify-center text-white/35 hover:text-white hover:border-white/30 hover:bg-white/5 transition-all duration-200"
              >
                <Icon size={15} />
              </a>
            ))}
          </div>
          <div className="flex flex-col gap-2">
            <a
              href="mailto:harry@selected.jobs"
              className="flex items-center gap-2.5 text-white/45 hover:text-white text-sm transition-colors duration-200"
            >
              <Mail size={14} />
              harry@selected.jobs
            </a>
            <div className="flex items-center gap-2.5 text-white/30 text-sm">
              <Globe size={14} />
              US &amp; European Markets
            </div>
          </div>
        </div>

        {/* Navigation — spans 3 cols */}
        <div className="lg:col-span-3 lg:pl-8">
          <h4 className="text-white text-[11px] font-bold tracking-[0.22em] uppercase mb-6">
            Navigation
          </h4>
          <ul className="flex flex-col gap-3">
            {mainNav.map((item) => (
              <li key={item.label}>
                <button
                  onClick={() => handleClick(item)}
                  className="text-white/45 text-sm hover:text-white transition-colors duration-200 text-left group flex items-center gap-2"
                >
                  <span className="w-0 h-px bg-white transition-all duration-300 group-hover:w-4" />
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Practice Areas — spans 3 cols */}
        <div className="lg:col-span-3">
          <h4 className="text-white text-[11px] font-bold tracking-[0.22em] uppercase mb-6">
            Practice Areas
          </h4>
          <ul className="flex flex-col gap-3">
            {practiceNav.map((item) => (
              <li key={item.label}>
                <button
                  onClick={() => handleClick(item)}
                  className="text-white/45 text-sm hover:text-white transition-colors duration-200 text-left group flex items-center gap-2"
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                    style={{ backgroundColor: item.accent }}
                  />
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Info — spans 2 cols */}
        <div className="lg:col-span-2">
          <h4 className="text-white text-[11px] font-bold tracking-[0.22em] uppercase mb-6">
            Compliance
          </h4>
          <ul className="flex flex-col gap-3">
            <li>
              <a href="#" className="text-white/45 text-sm hover:text-white transition-colors duration-200">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#" className="text-white/45 text-sm hover:text-white transition-colors duration-200">
                Terms of Service
              </a>
            </li>
            <li>
              <a href="#" className="text-white/45 text-sm hover:text-white transition-colors duration-200">
                GDPR
              </a>
            </li>
          </ul>
          <div className="mt-8 pt-6 border-t border-white/[0.06]">
            <p className="text-white/20 text-xs leading-relaxed">
              Confidential search. Response within 24 business hours.
            </p>
          </div>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/[0.05]">
        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-white/25 text-xs">
            &copy; {new Date().getFullYear()} Selected Group Ltd. All rights reserved.
          </p>
          <p className="text-white/15 text-xs">
            GTM Talent · Engineering · Product Management · Professional Services
          </p>
        </div>
      </div>

    </footer>
  );
}
