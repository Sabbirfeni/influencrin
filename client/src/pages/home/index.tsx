import Footer from "@/components/ui/footer/footer";
import AddInfluencerSectionHome from "./add-influencer-section-home";
import HeroSection from "./hero-section";
import InfluencerListHome from "./influencer-list-home";

const Home = () => {
  return (
    <>
      <HeroSection />
      <InfluencerListHome />
      <AddInfluencerSectionHome />
      <Footer />
    </>
  );
};

export default Home;
