import { useLocation } from "react-router-dom";
import ProfessionalExpertise from "../components/OurExpertise/ProfessionalExpertise";
import EngineeringExpertise from "../components/OurExpertise/EngineeringExpertise";
import ExecutiveExpertise from "../components/OurExpertise/ExecutiveExpertise";
import ProductExpertise from "../components/OurExpertise/ProductExpertise";
import GTMExpertise from "../components/OurExpertise/GTMExpertise";

const OurExpertise = () => {
  const location = useLocation();
  const { page } = location.state || { page: "professional" };

  console.log(page);

  const renderExpertise = () => {
    switch (page) {
      case "professional":
        return <ProfessionalExpertise />;
      case "engineering":
        return <EngineeringExpertise />;
      case "executive":
        return <ExecutiveExpertise />;
      case "product":
        return <ProductExpertise />;
      case "gtm":
        return <GTMExpertise />;
      default:
        return <ProfessionalExpertise />;
    }
  };

  return <>{renderExpertise()}</>;
};

export default OurExpertise;
