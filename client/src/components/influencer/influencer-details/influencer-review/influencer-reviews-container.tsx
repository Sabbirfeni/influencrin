import AddReviewForm from "@/components/forms/review/add-review-form";
import InfluencerAvgRating from "../../ratings/influencer-avg-rating";
import InfluencerReviewSlider from "./influencer-review-slider";

import TotalReviewCount from "./total-review-count";
function InfluencerReviewsContainer() {
  return (
    <div className="flex flex-col gap-2 mt-3 md:mt-5">
      <div className="flex items-center">
        <TotalReviewCount />
        <div className="flex items-center gap-2 pl-4">
          <InfluencerAvgRating
            size="5"
            style="text-sm md:text-xl"
            rating={4.8}
            isTitle={true}
          />
        </div>
      </div>

      <InfluencerReviewSlider />
      <AddReviewForm />
    </div>
  );
}

export default InfluencerReviewsContainer;
