import AddSocialMediaCard from "./add-social-media-card";
import InfluencerSocialCard from "./influencer-social-card";

function InfluencerSocialList() {
  return (
    <div className="h-[fit-content] grid grid-cols-2 sm:grid-cols-3 gap-3 md:gap-4">
      <InfluencerSocialCard socialPlatformIcon="https://cdn-icons-png.flaticon.com/512/3046/3046121.png" />
      <InfluencerSocialCard socialPlatformIcon="https://cdn-icons-png.flaticon.com/512/2111/2111463.png" />
      <InfluencerSocialCard socialPlatformIcon="https://cdn-icons-png.flaticon.com/512/145/145807.png" />
      <InfluencerSocialCard socialPlatformIcon="https://cdn-icons-png.flaticon.com/512/733/733646.png" />
      <AddSocialMediaCard />
    </div>
  );
}

export default InfluencerSocialList;
