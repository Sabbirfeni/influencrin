import influencerApiService from "@/api/endpoints/influencer-api-service";
import ErrorSection from "@/components/error/error-section";
import InfluencerList from "@/components/influencer/influencer-list";
import InfluencerFilterSection from "@/components/search/filters/influencer-filter-section";
import InfluencerListSkeleton from "@/components/skeletons/influencer/influencer-list-skeleton";
import SectionWrappers from "@/components/wrappers/section-wrapper";
import { useApi } from "@/hooks";
import { useEffect, useState } from "react";

function SearchPage() {
  const [influencers, setInfluencers] = useState(null);
  const { request, loading, errorMessage } = useApi(
    influencerApiService.searchInfluencers
  );

  useEffect(() => {
    const loadInfluencers = async () => {
      const data = await request();
      if (data) setInfluencers(data.influencers);
    };

    loadInfluencers();
  }, []);

  return (
    <SectionWrappers style="pt-2 md:pt-6 flex flex-col gap-4">
      {/* Filters Section */}
      <InfluencerFilterSection />

      {/* Handle Loading State */}
      {loading && <InfluencerListSkeleton length={15} />}

      {/* Handle Error State */}
      {!loading && errorMessage && (
        <ErrorSection
          sectionHeight="50vh"
          errorHeading="Failed to load influencers"
          errorMessage={errorMessage}
        />
      )}

      {/* Handle Data Display */}
      {!loading && !errorMessage && influencers && (
        <InfluencerList influencers={influencers} />
      )}
    </SectionWrappers>
  );
}

export default SearchPage;
