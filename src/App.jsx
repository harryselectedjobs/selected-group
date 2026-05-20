import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Hero from "./components/Hero";
import TrustedBy from "./components/TrustedBy";
import PracticeAreas from "./components/PracticeAreas";
import HowWeWork from "./components/HowWeWork";
import Testimonials from "./components/Testimonials";
import EngagementModels from "./components/EngagementModels";
import WhyChooseUs from "./components/WhyChooseUs";
import Contact from "./components/Contact";

import SequenceDetail from "./components/sequenceDetail";
import SequenceList from "./components/sequenceList";
import CreateSequence from "./components/CreateSequence";

import CRM from "./pages/CRM";
import UseCasesPage from "./pages/UseCasesPage";
import AboutPage from "./pages/AboutPage";
import EngagementModelsPage from "./pages/EngagementModelsPage";
import EngineeringPage from "./pages/EngineeringPage";
import ProductManagementPage from "./pages/ProductManagementPage";
import ProfessionalServicesPage from "./pages/ProfessionalServicesPage";
import ContactPage from "./pages/ContactPage";
import GTMPage from "./pages/GTMPage";
import ResearchPage from "./pages/ResearchPage";
import OurExpertise from "./pages/OurExpertise";

import GTMCasesPage from "./pages/GTMCasesPage";
import ProductCasesPage from "./pages/ProductCasesPage";
import EngineeringCasesPage from "./pages/EngineeringCasesPage";
import ProfessionalServicesCasesPage from "./pages/ProfessionalServicesCasesPage";

import CaseStudiesLanding from "./pages/CaseStudies/CaseStudiesLanding";
import CelonisCaseStudy from "./pages/CaseStudies/CelonisCaseStudy";
import PalantirCaseStudy from "./pages/CaseStudies/PalantirCaseStudy";

function Home() {
  return (
    <main>
      <Hero />
      <TrustedBy />
      <PracticeAreas />
      <HowWeWork />
      <Testimonials />
      <EngagementModels />
      <WhyChooseUs />
      <Contact />
    </main>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <div className="noise bg-black min-h-screen">
        <Navbar />

        <Routes>
          {/* HOME */}
          <Route path="/" element={<Home />} />

          {/* USE CASES */}
          <Route path="/use-cases" element={<UseCasesPage />} />
          <Route path="/use-cases/gtm" element={<GTMCasesPage />} />
          <Route
            path="/use-cases/product-management"
            element={<ProductCasesPage />}
          />
          <Route
            path="/use-cases/engineering"
            element={<EngineeringCasesPage />}
          />
          <Route
            path="/use-cases/professional-services"
            element={<ProfessionalServicesCasesPage />}
          />

          {/* MAIN PAGES */}
          <Route path="/about" element={<AboutPage />} />
          <Route path="/engagement-models" element={<EngagementModelsPage />} />
          <Route path="/engineering" element={<EngineeringPage />} />
          <Route
            path="/product-management"
            element={<ProductManagementPage />}
          />
          <Route
            path="/professional-services"
            element={<ProfessionalServicesPage />}
          />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/gtm" element={<GTMPage />} />
          <Route path="/research" element={<ResearchPage />} />
          <Route path="/our-expertise" element={<OurExpertise />} />

          {/* CRM */}
          <Route path="/crm" element={<CRM />} />

          {/* SEQUENCES */}
          <Route path="/sequences" element={<SequenceList />} />
          <Route path="/sequences/:id" element={<SequenceDetail />} />
          <Route path="/sequences/create" element={<CreateSequence />} />

          {/* CASE STUDIES */}
          <Route path="/case-studies" element={<CaseStudiesLanding />} />

          <Route path="/case-studies/celonis" element={<CelonisCaseStudy />} />

          <Route
            path="/case-studies/palantir"
            element={<PalantirCaseStudy />}
          />
        </Routes>

        <Footer />
      </div>
    </BrowserRouter>
  );
}
