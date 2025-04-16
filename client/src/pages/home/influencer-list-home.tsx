import InfluencerList from "@/components/influencer/influencer-list";
import { Button } from "@/components/ui/button";
import SectionWrappers from "@/components/wrappers/section-wrapper";

function InfluencerListHome() {
  return (
    <SectionWrappers style="bg-gradient-to-t to-[#ffe6e6] from-white">
      <div>
        <h1 className="text-[30px] md:text-[52px] mb-6 md:mb-12 text-center font-bold leading-tight">
          Rising Voices
        </h1>

        <InfluencerList />

        <div className="flex justify-center mt-6 md:mt-12">
          <Button className="md:px-6 md:py-5 md:text-base border border-primary bg-transparent hover:bg-primary text-primary hover:text-white">
            All Influencers
          </Button>
        </div>
      </div>
    </SectionWrappers>
  );
}

export default InfluencerListHome;
