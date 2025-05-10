import { useAuth } from "@/hooks/use-auth";
import HeroSection from "./hero-section";
import InfluencerListHome from "./influencer-list-home";
import ManageInfluencerSectionHome from "./manage-influencer-section-home";
import InfluecerAddRequestSection from "./influecer-add-request-section";
import { useEffect } from "react";
import { useApi } from "@/hooks";
import SiteVisitorApiServices from "@/api/endpoints/site-visitor-api-service";

const Home = () => {
  const { request } = useApi(SiteVisitorApiServices.trackVisitor);

  useEffect(() => {
    const trackVisitor = async () => {
      await request();
    };
    trackVisitor();
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
