import InfluencerAddRequestBtn from "@/components/influencer/add-request/influencer-add-request-btn";
import SectionWrappers from "@/components/wrappers/section-wrapper";
import { HeartHandshake, Share2, UserCheck } from "lucide-react";

function InfluecerAddRequestSection() {
  return (
    <SectionWrappers style="py-10 md:py-16">
      <div className="flex items-center justify-center flex-col gap-8 md:gap-12 rounded-2xl min-h-[60vh] px-6 py-12 md:p-12 bg-gradient-to-t to-[#ffe6e6] from-white">
        <div className="space-y-3 md:space-y-5">
          <h1 className="text-center text-[28px] md:text-[35px] font-bold leading-tight">
            We only add influencers <br />
            <span className="text-primary">Who</span>
          </h1>
          <div className="flex items-center flex-col md:flex-row gap-2 md:gap-4">
            <div className="shadow-xl flex flex-col items-center justify-center border gap-3 rounded-md p-8">
              <UserCheck className="text-primary w-7 h-7" />
              <p className="font-bold text-[14px] text-primary">
                Active Online
              </p>
            </div>
            <div className="shadow-xl flex flex-col items-center justify-center border gap-3 rounded-md p-8">
              <Share2 className="text-primary w-7 h-7" />
              <p className="font-bold text-[14px] text-primary">Share Values</p>
            </div>
            <div className="shadow-xl flex flex-col items-center justify-center border gap-3 rounded-md p-8">
              <HeartHandshake className="text-primary w-7 h-7" />
              <p className="font-bold text-[14px] text-primary">
                Support Others
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-5">
          <h1 className="text-center text-[28px] md:text-[35px] font-bold leading-tight">
            Are you one of them?
          </h1>
          <div className="flex justify-center">
            <InfluencerAddRequestBtn title="Request to Add" />
          </div>
        </div>
      </div>
    </SectionWrappers>
  );
}

export default InfluecerAddRequestSection;
