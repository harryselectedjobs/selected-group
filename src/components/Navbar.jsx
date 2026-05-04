import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import logo from "../assets/images/logo2.png";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("Home");

  const location = useLocation(); // 🔥 detect current page

  // Scroll effect
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Handle scroll navigation (ONLY for home page)
  const handleNav = (label, href) => {
    setActive(label);
    setMenuOpen(false);

    // if not on homepage → go to homepage first
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
            ? "bg-black/80 backdrop-blur-xl border-b border-white/10"
            : "bg-transparent"
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
            {navLinks.map(({ label, href }) => (
              <li key={label}>
                <button
                  onClick={() => handleNav(label, href)}
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

            {/* 🔥 CRM LINK */}
            <li>
              <Link
                to="/crm"
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

            {navLinks.map(({ label, href }, i) => (
              <motion.button
                key={label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                onClick={() => handleNav(label, href)}
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
