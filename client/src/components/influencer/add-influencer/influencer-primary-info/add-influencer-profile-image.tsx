import { ProfileImage } from "@/components/ui/profile-image";
import { ProfileImageUpload } from "@/components/user/profile-image-upload";

type InfluencerProfileImageProps = {
  fullname: string;
  profile_image: string | File;
  onImageSelect: (file: File) => void;
};

function AddInfluencerProfileImage({
  profile_image,
  fullname,
  onImageSelect,
}: InfluencerProfileImageProps) {
  return (
    <div className="absolute -top-26 md:-top-32">
      {/* <ProfileImage
        style="w-35 h-35 md:w-45 md:h-45 shadow-2xl"
        fullname={fullname}
        src={profile_image}
        backgroundColor="bg-gray-200"
      /> */}
      <ProfileImageUpload
        style="w-35 h-35 md:w-45 md:h-45 shadow-2xl"
        defaultName={fullname}
        defaultImage={profile_image}
        onImageSelect={onImageSelect}
      />
    </div>
  );
}

export default AddInfluencerProfileImage;
