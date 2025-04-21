import AddSocialMediaCard from "./add-social-media-card";
import InfluencerSocialCard from "./added-influencer-social-card";

type SocialPlatformList = {
  platform_icon_url: string;
  follower_count: number;
  platform_profile_link: string;
  platform_id: string;
}[];

interface InfluencerSocialListProps {
  socialPlatforms: SocialPlatformList;
}

function InfluencerSocialList({
  socialPlatforms,
  setSocialPlatforms,
}: InfluencerSocialListProps) {
  return (
    <div className="mt-5">
      <h4 className="text-sm font-semibold">Add social media</h4>
      <div className="h-[fit-content] grid grid-cols-2 gap-3 md:gap-4 mt-2">
        {socialPlatforms.map((socialPlatformInfo, index) => (
          <InfluencerSocialCard
            key={index}
            socialPlatformInfo={socialPlatformInfo}
          />
        ))}

        <AddSocialMediaCard setSocialPlatforms={setSocialPlatforms} />
      </div>
    </div>
  );
}

export default InfluencerSocialList;
