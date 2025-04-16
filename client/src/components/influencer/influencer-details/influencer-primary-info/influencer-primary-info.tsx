import { Button } from "@/components/ui/button";

import { MapPin } from "lucide-react";
import { Pencil } from "lucide-react";
import InfluencerProfileImage from "./influencer-profile-image";

function InfluencerPrimaryInfo() {
  return (
    <div className="relative flex w-full px-5 md:px-16 pt-12 md:pt-18 pb-4 md:pb-6 rounded-b-2xl shadow-md">
      <InfluencerProfileImage />
      <div className="w-full md:w-2/3">
        <h1 className="text-xl md:text-2xl font-bold">Samantha Brooks</h1>
        <div className="text-sm">
          <p className="text-muted-foreground">@samantha_brooks</p>
          <p className="text-sm md:text-[15px] mt-3">
            Passionate content creator connecting with niche audiences through
            authentic storytelling • Always exploring new trends and creative
            ideas • Meaningful collaborations across platforms.
          </p>
          <div className="flex items-center gap-1 mt-3 md:mt-5">
            <MapPin className="w-3 h-3 text-primary" />
            <p className="text-xs text-muted-foreground"> Dhaka, BD</p>
          </div>
        </div>
      </div>

      <Button className="absolute right-6 md:right-16 w-10 h-8 flex items-center justify-center text-primary border border-primary bg-white hover:bg-primary  hover:text-white shadow-lg">
        <Pencil className="w-4 h-4" />
      </Button>
    </div>
  );
}

export default InfluencerPrimaryInfo;
