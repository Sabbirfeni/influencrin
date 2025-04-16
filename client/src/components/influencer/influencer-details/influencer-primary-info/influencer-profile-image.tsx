import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import InfluencerPlaceholderProfileImage from "../../../../assets/images/influencer-placeholder-profile-image.jpg";

function InfluencerProfileImage() {
  return (
    <Avatar className="cursor-pointer w-35 h-35 md:w-45 md:h-45 absolute -top-26 md:-top-32  object-cover rounded-full shadow-xl">
      <AvatarImage
        src={InfluencerPlaceholderProfileImage}
        className="object-cover"
        alt="inpluencer-profile-image"
      />
      <AvatarFallback>U</AvatarFallback>
    </Avatar>
  );
}

export default InfluencerProfileImage;
