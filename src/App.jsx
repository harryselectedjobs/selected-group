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
import ReadyToBuild from "./components/ReadyToBuild";
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
<<<<<<< HEAD
import ResearchPage from "./pages/ResearchPage";
import CaseStudiesLanding from "./pages/CaseStudies/CaseStudiesLanding";
=======
import GTMCasesPage from "./pages/GTMCasesPage";
import ProductCasesPage from "./pages/ProductCasesPage";
import EngineeringCasesPage from "./pages/EngineeringCasesPage";
import ProfessionalServicesCasesPage from "./pages/ProfessionalServicesCasesPage";
>>>>>>> 9e95f8d0e37db94204ac2a78ec161f67862e2a21

function Home() {
  return (
    <main>
      <Hero />
      <TrustedBy />
      <PracticeAreas />
      <HowWeWork />
      <Testimonials />
      <EngagementModels />
      <ReadyToBuild />
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
          <Route path="/" element={<Home />} />
          <Route path="/use-cases" element={<UseCasesPage />} />
          <Route path="/use-cases/gtm" element={<GTMCasesPage />} />
          <Route path="/use-cases/product-management" element={<ProductCasesPage />} />
          <Route path="/use-cases/engineering" element={<EngineeringCasesPage />} />
          <Route path="/use-cases/professional-services" element={<ProfessionalServicesCasesPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/engagement-models" element={<EngagementModelsPage />} />
          <Route path="/engineering" element={<EngineeringPage />} />
          <Route path="/product-management" element={<ProductManagementPage />} />
          <Route path="/professional-services" element={<ProfessionalServicesPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/gtm" element={<GTMPage />} />
          <Route path="/crm" element={<CRM />} />
          <Route path="/sequences" element={<SequenceList />} />
          <Route path="/sequences/:id" element={<SequenceDetail />} />
          <Route path="/case-studies" element={<CaseStudiesLanding />} />
          <Route path="/sequences/create" element={<CreateSequence />} />
          
          <Route
          path="/research"
          element={<ResearchPage />}
        />
        </Routes>

        <Footer />
      </div>
    </BrowserRouter>
  );
}
