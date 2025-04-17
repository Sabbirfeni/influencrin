import InfluencerPlaceholderProfileImage from "../../../../assets/images/influencer-placeholder-profile-image.jpg";
import { ProfileImage } from "@/components/ui/profile-image";

function InfluencerProfileImage() {
  return (
    <div className="absolute -top-26 md:-top-32">
      <ProfileImage
        style="w-35 h-35 md:w-45 md:h-45 shadow-2xl"
        userName="Shabbir"
        src={InfluencerPlaceholderProfileImage}
        backgroundColor="bg-gray-200"
      />
    </div>
  );
}

export default InfluencerProfileImage;
