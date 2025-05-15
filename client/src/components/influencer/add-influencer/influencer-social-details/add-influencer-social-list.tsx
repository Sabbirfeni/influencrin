import InputFieldError from "@/components/error/input-field-error";
import AddSocialMediaCard from "./add-social-media-card";
import AddInfluencerSocialCard from "./added-influencer-social-card";
import { ZodObject, ZodRawShape } from "zod";

type SocialPlatform = {
  platform_icon_url: string;
  follower_count: number;
  platform_profile_link: string;
  platform_id: string;
};

interface InfluencerSocialListProps {
  socialPlatforms: SocialPlatform[];
  setSocialPlatforms: React.Dispatch<React.SetStateAction<SocialPlatform[]>>;
  error?: string;
  setErrors: React.Dispatch<React.SetStateAction<string | undefined>>;
  influencerSchema: ZodObject<ZodRawShape>;
}

function AddInfluencerSocialList({
  socialPlatforms,
  setSocialPlatforms,
  error,
  setErrors,
  influencerSchema,
}: InfluencerSocialListProps) {
  return (
    <div className="mt-5 space-y-2">
      <h4 className="text-sm font-semibold">Add social media</h4>
      <div className="h-[fit-content] grid grid-cols-2 gap-3 md:gap-4">
        {socialPlatforms.map((socialPlatformInfo, index) => (
          <AddInfluencerSocialCard
            key={index}
            socialPlatformInfo={socialPlatformInfo}
            socialPlatforms={socialPlatforms}
            setSocialPlatforms={setSocialPlatforms}
          />
        ))}

        <AddSocialMediaCard
          socialPlatforms={socialPlatforms}
          setSocialPlatforms={setSocialPlatforms}
          setErrors={setErrors}
          influencerSchema={influencerSchema}
        />
      </div>
      {error && <InputFieldError errMessage={error} />}
    </div>
  );
}

export default AddInfluencerSocialList;
