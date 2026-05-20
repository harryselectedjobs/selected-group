import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

/* ───────────────── COMPONENTS ───────────────── */
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

/* ───────────────── PAGES ───────────────── */
import CRM from "./pages/CRM";

import UseCasesPage from "./pages/UseCasesPage";

import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import ResearchPage from "./pages/ResearchPage";

import GTMPage from "./pages/GTMPage";
import GTMExpertisePage from "./pages/HeroPages/GTMExpertisePage";

import EngineeringPage from "./pages/EngineeringPage";
import ProductManagementPage from "./pages/ProductManagementPage";
import ProfessionalServicesPage from "./pages/ProfessionalServicesPage";
import ContactPage from "./pages/ContactPage";
import GTMPage from "./pages/GTMPage";
import ResearchPage from "./pages/ResearchPage";
import OurExpertise from "./pages/OurExpertise";
import EngagementModelsPage from "./pages/EngagementModelsPage";

/* ───────────────── USE CASE PAGES ───────────────── */
import GTMCasesPage from "./pages/GTMCasesPage";
import ProductCasesPage from "./pages/ProductCasesPage";
import EngineeringCasesPage from "./pages/EngineeringCasesPage";
import ProfessionalServicesCasesPage from "./pages/ProfessionalServicesCasesPage";

/* ───────────────── CASE STUDIES ───────────────── */
import CaseStudiesLanding from "./pages/CaseStudies/CaseStudiesLanding";

import CelonisCaseStudy from "./pages/CaseStudies/CelonisCaseStudy";
import AppleCaseStudy from "./pages/CaseStudies/AppleCaseStudy";
import PalantirCaseStudy from "./pages/CaseStudies/PalantirCaseStudy";
import AvivCaseStudy from "./pages/CaseStudies/AvivCaseStudy";
import BehavoxCaseStudy from "./pages/CaseStudies/BehavoxCaseStudy";
import OverITCaseStudy from "./pages/CaseStudies/OverITCaseStudy";
import OracleCaseStudy from "./pages/CaseStudies/OracleCaseStudy";

/* ───────────────── HOME PAGE ───────────────── */
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

/* ───────────────── APP ───────────────── */
export default function App() {
  return (
    <BrowserRouter>
      <div className="noise bg-black min-h-screen text-white overflow-x-hidden">

        {/* GLOBAL NAVBAR */}
        <Navbar />

        <Routes>

          {/* ───────────── HOME ───────────── */}
          <Route path="/" element={<Home />} />

          {/* ───────────── MAIN PAGES ───────────── */}
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/research" element={<ResearchPage />} />

          {/* ───────────── PRACTICE AREAS ───────────── */}
          <Route path="/gtm" element={<GTMPage />} />
          <Route path="/gtm-expertise" element={<GTMExpertisePage />} />

          <Route path="/engineering" element={<EngineeringPage />} />

          <Route
            path="/product-management"
            element={<ProductManagementPage />}
          />

          <Route
            path="/professional-services"
            element={<ProfessionalServicesPage />}
          />

          {/* ───────────── ENGAGEMENT MODELS ───────────── */}
          <Route
            path="/engagement-models"
            element={<EngagementModelsPage />}
          />

          {/* ───────────── USE CASES ───────────── */}
          <Route path="/use-cases" element={<UseCasesPage />} />

          <Route
            path="/use-cases/gtm"
            element={<GTMCasesPage />}
          />

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
          {/* ───────────── CASE STUDIES ───────────── */}
          <Route
            path="/case-studies"
            element={<CaseStudiesLanding />}
          />
          <Route
            path="/case-studies/celonis"
            element={<CelonisCaseStudy />}
          />

          <Route
            path="/case-studies/apple"
            element={<AppleCaseStudy />}
          />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/gtm" element={<GTMPage />} />
          <Route path="/research" element={<ResearchPage />} />
          <Route path="/our-expertise" element={<OurExpertise />} />

          <Route
            path="/case-studies/palantir"
            element={<PalantirCaseStudy />}
          />

          <Route
            path="/case-studies/aviv"
            element={<AvivCaseStudy />}
          />

          <Route
          path="/case-studies/overit"
          element={<OverITCaseStudy />}
          />
          <Route path="/case-studies/celonis" element={<CelonisCaseStudy />} />
          <Route
          path="/case-studies/oracle"
          element={<OracleCaseStudy />}
          />

          <Route
          path="/case-studies/behavox"
          element={<BehavoxCaseStudy />}
          />


          {/* ───────────── CRM ───────────── */}
          <Route path="/crm" element={<CRM />} />

          {/* ───────────── SEQUENCES ───────────── */}
          <Route
            path="/sequences"
            element={<SequenceList />}
          />

          <Route
            path="/sequences/create"
            element={<CreateSequence />}
          />

          <Route
            path="/sequences/:id"
            element={<SequenceDetail />}
          />

        </Routes>

        {/* GLOBAL FOOTER */}
        <Footer />

      </div>
    </BrowserRouter>
  );
}
