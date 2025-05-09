import { useAuth } from "@/hooks/use-auth";
import HeroSection from "./hero-section";
import InfluencerListHome from "./influencer-list-home";
import ManageInfluencerSectionHome from "./manage-influencer-section-home";
import InfluecerAddRequestSection from "./influecer-add-request-section";
import { useEffect } from "react";

const Home = () => {
  useEffect(() => {
    const loadVisitor = async () => {
      const response = await fetch("http://localhost:3000/api/visitors", {
        method: "POST",
      });
      const data = await response.json();
    };

    loadVisitor();
  }, []);
  return (
    <>
      <HeroSection />
      <InfluencerListHome />
      <InfluecerAddRequestSection />
    </>
  );
};

export default Home;
