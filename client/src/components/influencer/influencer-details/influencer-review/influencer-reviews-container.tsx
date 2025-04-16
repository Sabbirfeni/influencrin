import InfluencerAvgRating from "../../ratings/influencer-avg-rating";
import InfluencerReviewSlider from "./influencer-review-slider";

import TotalReviewCount from "./total-review-count";
function InfluencerReviewsContainer() {
  return (
    <div className="flex flex-col gap-2 mt-5">
      <div className="flex items-center">
        <TotalReviewCount />
        <div className="text-md font-semibold flex items-center gap-2 pl-4">
          <InfluencerAvgRating size="5" textSize="xl" rating={4.8} />
          Average Rating
        </div>
      </div>

      <InfluencerReviewSlider />
    </div>
  );
}

export default InfluencerReviewsContainer;
