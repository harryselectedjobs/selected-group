import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../assets/images/logo2.png";

const navLinks = [
  { label: "Home",      href: "#home",    route: null },
  { label: "About",     href: null,       route: "/about" },
  { label: "Use Cases",          href: null, route: "/use-cases" },
  { label: "Engagement Models", href: null, route: "/engagement-models" },
  { label: "Contact",   href: null,       route: "/contact" },
];

const practiceLinks = [
  { label: "Engineering & Technology", route: "/engineering",           accent: "#34D399" },
  { label: "Product Management",       route: "/product-management",    accent: "#A78BFA" },
  { label: "Professional Services",    route: "/professional-services", accent: "#FBBF24" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("Home");

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Sync active state with current route
  useEffect(() => {
    if (location.pathname === "/use-cases") setActive("Use Cases");
    else if (location.pathname === "/about") setActive("About");
    else if (location.pathname === "/engagement-models") setActive("Engagement Models");
    else if (location.pathname === "/contact") setActive("Contact");
    else if (location.pathname === "/") setActive("Home");
  }, [location.pathname]);

  const handleNav = (label, href, route) => {
    setActive(label);
    setMenuOpen(false);

    // Route-based navigation (e.g. Use Cases page)
    if (route) {
      navigate(route);
      return;
    }

    // Scroll-based navigation
    if (location.pathname !== "/") {
      window.location.href = "/" + href;
      return;
    }

    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      {/* Navbar */}
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-black/90 backdrop-blur-xl border-b border-white/10"
            : "bg-black/40 backdrop-blur-sm"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-10 flex items-center justify-between h-20">

          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img
              src={logo}
              alt="Selected Group Logo"
              className="h-16 w-auto object-contain hover:scale-105 transition"
            />
          </Link>

          {/* Desktop Menu */}
          <ul className="hidden md:flex items-center gap-10">

            {/* Landing links */}
            {navLinks.map(({ label, href, route }) => (
              <li key={label}>
                <button
                  onClick={() => handleNav(label, href, route)}
                  className={`text-sm tracking-widest uppercase transition ${
                    active === label
                      ? "text-white"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  {label}
                </button>
              </li>
            ))}

            <li>
  <Link
    to="/crm"
    onClick={() => {
      if (window.location.pathname === "/crm") {
        window.location.reload();
      }
    }}
    className="text-sm tracking-widest uppercase text-gray-400 hover:text-white transition"
  >
    CRM
  </Link>
</li>

          </ul>

          {/* Mobile Button */}
          <button
            className="md:hidden text-white"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center gap-10"
          >

            {navLinks.map(({ label, href, route }, i) => (
              <motion.button
                key={label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                onClick={() => handleNav(label, href, route)}
                className="text-3xl text-white"
              >
                {label}
              </motion.button>
            ))}

            {/* 🔥 CRM mobile */}
            <Link
              to="/crm"
              onClick={() => setMenuOpen(false)}
              className="text-3xl text-white"
            >
              CRM
            </Link>

          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
