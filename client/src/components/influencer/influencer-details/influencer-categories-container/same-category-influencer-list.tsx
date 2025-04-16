import { Link } from "react-router-dom";
import RelatedInfluencerCard from "./related-influencer-card";

function SameCategoryInfluencerList() {
  return (
    <div className="shadow-md p-4 flex flex-col gap-4 border border-gray-100 rounded-xl">
      <p className="text-sm font-semibold">Influencer in similar categories</p>
      <div className="flex flex-col gap-2">
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

export default SameCategoryInfluencerList;
