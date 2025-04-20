import { Button } from "@/components/ui/button";
import ImpluencerPlaceholderBanner from "../../../../assets/images/influencer-placeholder-banner.jpg";

function InfluencerBanner() {
  return (
    <div className="relative w-full h-[20vh] md:h-[30vh]">
      <img
        src={ImpluencerPlaceholderBanner}
        className="w-full h-full object-cover"
        alt="impluencer banner"
      />
      <Button className="absolute bottom-3 right-3 shadow-2xl">
        Add Influencer
      </Button>
    </div>
  );
}

export default InfluencerBanner;
