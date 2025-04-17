import { Link } from "react-router-dom";
import RelatedInfluencerCard from "./related-influencer-card";

function RelatedInfluencerList() {
  return (
    <div className="p-3 md:p-4 mt-6 md:mt-0 flex flex-col gap-4 border border-gray-200 rounded-xl">
      <p className="text-center mt-1 md:mt-0 md:text-left text-sm font-semibold">
        Influencers in similar categories
      </p>
      <div className="flex flex-col gap-2">
        <RelatedInfluencerCard />
        <RelatedInfluencerCard />
        <RelatedInfluencerCard />
        <RelatedInfluencerCard />
        <RelatedInfluencerCard />
        <RelatedInfluencerCard />
        <RelatedInfluencerCard />
        <Link
          to="/"
          className="text-center text-sm font-semibold mt-3 text-primary"
        >
          See All Influencers
        </Link>
      </div>
    </div>
  );
}

export default RelatedInfluencerList;
