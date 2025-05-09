import { useAuth } from "@/hooks/use-auth";
import HeroSection from "./hero-section";
import InfluencerListHome from "./influencer-list-home";
import ManageInfluencerSectionHome from "./manage-influencer-section-home";
import InfluecerAddRequestSection from "./influecer-add-request-section";

const Home = () => {
  return (
    <>
      <HeroSection />
      <InfluencerListHome />
      <InfluecerAddRequestSection />
    </>
  );
};

export default Home;
