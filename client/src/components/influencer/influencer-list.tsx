// components/influencer/influencer-list.tsx or similar

import InfluencerCard from "./card/influencer-card";

type Platform = {
  name: "Instagram" | "Youtube" | "X";
  followers: string;
};

type Category = {
  category_name: string;
};

type Influencer = {
  fullname: string;
  handle: string;
  profile_image: string;
  rating: number;
  InfluencerSocialPlatforms: Platform[];
  InfluencerCategories: Category[];
};

type InfluencerListProps = {
  influencers: Influencer[];
};

function InfluencerList({ influencers }: InfluencerListProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4">
      {influencers.map((influencer) => (
        <InfluencerCard
          key={influencer.handle}
          fullname={influencer.fullname}
          handle={influencer.handle}
          rating={influencer.rating}
          profileImageSrc={influencer.profile_image}
          platforms={influencer.InfluencerSocialPlatforms}
          categories={influencer.InfluencerCategories.slice(0, 3)}
        />
      ))}
    </div>
  );
}

export default InfluencerList;
