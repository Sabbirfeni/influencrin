import InfluencerBanner from "@/components/influencer/influencer-details/influencer-primary-info/influencer-banner";
import InfluencerSocialList from "@/components/influencer/influencer-details/influencer-social-details/influencer-social-list";
import SectionWrappers from "@/components/wrappers/section-wrapper";
import InfluencerPrimaryInfo from "@/components/influencer/influencer-details/influencer-primary-info/influencer-primary-info";
import InfluencerReviewsContainer from "@/components/influencer/influencer-details/influencer-review/influencer-reviews-container";
import InfluencerCategoryList from "@/components/influencer/influencer-details/influencer-categories/influencer-category-list";
import RelatedInfluencerList from "@/components/influencer/influencer-details/related-influencer/related-influencer-list";

function InfluencerDetails() {
  return (
    <SectionWrappers style="pt-2 md:pt-6">
      <div className="flex flex-col gap-3 md:gap-4">
        <div className="border border-gray-200 rounded-xl overflow-hidden">
          <InfluencerBanner />
          <InfluencerPrimaryInfo />
        </div>

        <div className="w-full flex flex-col md:flex-row gap-3 md:gap-4">
          <div className="w-full md:w-2/3 flex flex-col gap-3 md:gap-4">
            <InfluencerSocialList />
            <InfluencerCategoryList style="flex md:hidden" />
            <InfluencerReviewsContainer />
          </div>

          <div className="w-full md:w-1/3 flex flex-col gap-4">
            <InfluencerCategoryList style="hidden md:flex" />
            <RelatedInfluencerList />
          </div>
        </div>
      </div>
    </SectionWrappers>
  );
}

export default InfluencerDetails;
