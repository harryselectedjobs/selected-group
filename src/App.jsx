import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Hero from "./components/Hero";
import About from "./components/About";
import Services from "./components/Services";
import Projects from "./components/Projects";
import WhyChooseUs from "./components/WhyChooseUs";
import Contact from "./components/Contact";

import SequenceDetail from "./components/sequenceDetail";
import SequenceList from "./components/sequenceList";
import CreateSequence from "./components/CreateSequence";

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

      {/* Sequences Section */}
      <SequenceList />
    </main>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <div className="noise bg-black min-h-screen">
        <Navbar />

        <Routes>
          {/* Homepage */}
          <Route path="/" element={<Home />} />

          {/* CRM Page */}
          <Route path="/crm" element={<CRM />} />

          {/* Sequences */}
          <Route
            path="/sequences"
            element={<SequenceList />}
          />

          {/* Sequence Detail */}
          <Route
            path="/sequences/:id"
            element={<SequenceDetail />}
          />
          <Route
  path="/sequences/create"
  element={<CreateSequence />}
/>
        </Routes>

        <Footer />
      </div>
    </BrowserRouter>
  );
}