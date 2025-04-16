import InfluencerBanner from "@/components/influencer/influencer-details/influencer-primary-info/influencer-banner";
import InfluencerSocialList from "@/components/influencer/influencer-details/influencer-social-details/influencer-social-list";
import SectionWrappers from "@/components/wrappers/section-wrapper";
import InfluencerCategoriesContainer from "@/components/influencer/influencer-details/influencer-categories-container/influencer-categories-container";
import InfluencerPrimaryInfo from "@/components/influencer/influencer-details/influencer-primary-info/influencer-primary-info";
import InfluencerReviewsContainer from "@/components/influencer/influencer-details/influencer-review/influencer-reviews-container";

function InfluencerDetails() {
  return (
    <SectionWrappers style="pt-2 md:pt-6 mb-56">
      <div className="flex flex-col gap-4">
        <div>
          <InfluencerBanner />
          <InfluencerPrimaryInfo />
        </div>

        <div className="w-full flex gap-4">
          <div className="w-full md:w-2/3 flex flex-col gap-4">
            <InfluencerSocialList />
            <InfluencerReviewsContainer />
          </div>

          {/* <InfluencerCategoriesContainer /> */}
        </div>
      </div>
    </SectionWrappers>
  );
}

export default InfluencerDetails;
