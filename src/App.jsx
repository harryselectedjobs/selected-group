import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Footer from './components/Footer';

import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Projects from './components/Projects';
import WhyChooseUs from './components/WhyChooseUs';
import Contact from './components/Contact';

import CRM from "./pages/CRM";

function Home() {
  return (
    <main>
      <Hero />
      <About />
      <Services />
      <Projects />
      <WhyChooseUs />
      <Contact />
    </main>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      {/* global layout */}
      <div className="noise bg-black min-h-screen">

        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/crm" element={<CRM />} />
        </Routes>

        <Footer />

      </div>
    </BrowserRouter>
  );
}
