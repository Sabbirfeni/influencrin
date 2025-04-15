import SectionWrappers from "@/components/wrappers/section-wrapper";
import HeroImage from "../../../public/images/home-hero-image.png";
import { Button } from "@/components/ui/button";

function HeroSection() {
  return (
    <div className="w-full px-2 md:px-20 h-[91vh] bg-gradient-to-b to-[#ffe6e6] from-white flex flex-col md:flex-row items-center justify-center">
      <div className="w-full md:w-1/2 order-2 md:order-1 flex flex-col items-center md:items-start">
        <h1 className="text-[36px] md:text-[80px] text-center md:text-left font-bold leading-tight">
          <div className="text-primary">Meet Influencers</div>
          <div>in your niche &</div>
          <div className="text-primary"> Grow Together</div>
        </h1>
        <Button className="w-[fit-content] md:px-6 md:py-5 mt-5 md:text-base shadow-xl">
          Find Influencers
        </Button>
      </div>
      <div className="w-full md:w-1/2 order-1 md:order-2">
        <img src={HeroImage} alt="home hero image" className="w-full" />
      </div>
    </div>
  );
}

export default HeroSection;
