import { Button } from "@/components/ui/button";
import ImpluencerPlaceholderBanner from "../../../../assets/images/influencer-placeholder-banner.jpg";

function InfluencerBanner() {
  return (
    <div className="relative w-full h-[15vh] md:h-[27vh]">
      <img
        src={ImpluencerPlaceholderBanner}
        className="w-full h-full object-cover"
        alt="impluencer banner"
      />
    </div>
  );
}

export default InfluencerBanner;
