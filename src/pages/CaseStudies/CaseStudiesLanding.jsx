import React from "react";

import HeroSection from "../../components/caseStudies/HeroSection";
import FeaturedCaseStudies from "../../components/caseStudies/FeaturedCaseStudies";
import IndustryExpertise from "../../components/caseStudies/IndustryExpertise";
import HiringProcess from "../../components/caseStudies/HiringProcess";
import OutcomeMetrics from "../../components/caseStudies/OutcomeMetrics";
import ClientReferences from "../../components/caseStudies/ClientReferences";
import GlobalCoverage from "../../components/caseStudies/GlobalCoverage";
import FinalCTA from "../../components/caseStudies/FinalCTA";

export default function CaseStudiesLanding() {
  return (
    <main className="bg-[#0A0A0A] text-[#F5F5F5] overflow-hidden">
      
      {/* HERO */}
      <HeroSection />

      {/* FEATURED CASE STUDIES */}
      <FeaturedCaseStudies />

      {/* INDUSTRY EXPERTISE */}
      <IndustryExpertise />

      {/* HIRING PROCESS */}
      <HiringProcess />

      {/* OUTCOME METRICS */}
      <OutcomeMetrics />

      {/* CLIENT REFERENCES */}
      <ClientReferences />

      {/* GLOBAL COVERAGE */}
      <GlobalCoverage />

      {/* FINAL CTA */}
      <FinalCTA />
    </main>
  );
}