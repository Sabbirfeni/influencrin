import AddSocialMediaCard from "./add-social-media-card";
import InfluencerSocialCard from "./influencer-social-card";

type SocialPlatform = {
  platform_icon_url: string;
};

type SocialPlatformList = {
  follower_count: number;
  platform_profile_link: string;
  platform: SocialPlatform;
}[];

interface InfluencerSocialListProps {
  socialPlatformList: SocialPlatformList;
}

function InfluencerSocialList({
  socialPlatformList,
}: InfluencerSocialListProps) {
  return (
    <div className="h-[fit-content] grid grid-cols-2 sm:grid-cols-3 gap-3 md:gap-4">
      {socialPlatformList.map((socialPlatformInfo, index) => (
        <InfluencerSocialCard
          key={index}
          socialPlatformInfo={socialPlatformInfo}
        />
      ))}

      <AddSocialMediaCard />
    </div>
  );
}

export default InfluencerSocialList;
