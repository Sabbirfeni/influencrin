import InfluencerBanner from "@/components/influencer/influencer-details/influencer-primary-info/influencer-banner";
import InfluencerDetails from "../influencer-details";
import JoinInfluencrInPage from "../join-influencrin";
import InfluencerPrimaryInfo from "@/components/influencer/influencer-details/influencer-primary-info/influencer-primary-info";
import InfluencerSocialList from "@/components/influencer/influencer-details/influencer-social-details/influencer-social-list";
import InfluencerCategoryList from "@/components/influencer/influencer-details/influencer-categories/influencer-category-list";
import SectionWrappers from "@/components/wrappers/section-wrapper";
import InfluencerManagementWrapper from "@/components/wrappers/influencer-managment-wrapper";

function AddInfluencerPage() {
  const influencer = {
    fullname: "",
    handle: "",
    bio: "",
    location: "",
    profile_image: "",
  };
  return (
    <InfluencerManagementWrapper>
      <div className="flex flex-col gap-3 md:gap-4">
        <div className="border border-gray-200 rounded-xl overflow-hidden">
          <InfluencerBanner />
          <InfluencerPrimaryInfo influencer={influencer} />
        </div>

        <div className="w-full flex flex-col md:flex-row gap-3 md:gap-4">
          <div className="w-full md:w-2/3 flex flex-col gap-3 md:gap-4">
            {/* <InfluencerSocialList /> */}
          </div>

          <div className="w-full md:w-1/3 flex flex-col gap-4">
            {/* <InfluencerCategoryList style="hidden md:flex" /> */}
          </div>
        </div>
      </div>
    </InfluencerManagementWrapper>
  );
}

export default AddInfluencerPage;
