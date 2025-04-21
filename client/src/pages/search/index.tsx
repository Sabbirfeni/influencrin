import influencerApiService from "@/api/endpoints/influencer-api-service";
import ErrorSection from "@/components/error/error-section";
import InfluencerList from "@/components/influencer/influencer-list";
import InfluencerFilterSection from "@/components/search/filters/influencer-filter-section";
import InfluencerListSkeleton from "@/components/skeletons/influencer/influencer-list-skeleton";
import SectionWrappers from "@/components/wrappers/section-wrapper";
import { useApi } from "@/hooks";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

function SearchPage() {
  const [params, setParams] = useSearchParams();
  const [influencers, setInfluencers] = useState(null);

  const { request, loading, errorMessage } = useApi(
    influencerApiService.searchInfluencers
  );

  useEffect(() => {
    const loadInfluencers = async () => {
      const data = await request(params);
      if (data) setInfluencers(data.influencers);
    };

    loadInfluencers();
  }, [params]);

  return (
    <SectionWrappers style="pt-2 md:pt-6 flex flex-col gap-2">
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
        <>
          {params.toString() && (
            <div className="font-semibold flex items-center gap-1 text-sm">
              <span className="text-primary">{influencers.length}</span>{" "}
              Influencers found.
            </div>
          )}

          <InfluencerList influencers={influencers} />
        </>
      )}
    </SectionWrappers>
  );
}

export default SearchPage;
