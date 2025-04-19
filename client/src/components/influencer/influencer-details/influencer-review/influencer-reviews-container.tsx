import AddReviewForm from "@/components/forms/review/add-review-form";
import InfluencerAvgRating from "../../ratings/influencer-avg-rating";
import InfluencerReviewSlider from "./influencer-review-slider";
import TotalReviewCount from "./total-review-count";

// Define the expected shape of a review
type Review = {
  id: string;
  rating: number;
  comment: string;
  createdAt: string;
};

interface Props {
  reviews: Review[];
}

function InfluencerReviewsContainer({ reviews }: Props) {
  return (
    <div className="flex flex-col gap-2 mt-3 md:mt-4">
      <div className="flex items-center">
        <TotalReviewCount count={reviews.length} />
        <div className="flex items-center gap-2 pl-4">
          <InfluencerAvgRating
            size="5"
            style="text-sm md:text-xl"
            reviews={reviews}
            isTitle={true}
          />
        </div>
      </div>

      <InfluencerReviewSlider reviews={reviews} />
      <AddReviewForm />
    </div>
  );
}

export default InfluencerReviewsContainer;
