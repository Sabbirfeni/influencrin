import { useLocation, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce"; // <-- Add this package
import influencerApiService from "@/api/endpoints/influencer-api-service";
import ErrorSection from "@/components/error/error-section";
import InfluencerList from "@/components/influencer/influencer-list";
import InfluencerFilterSection from "@/components/search/filters/influencer-filter-section";
import InfluencerListSkeleton from "@/components/skeletons/influencer/influencer-list-skeleton";
import SectionWrappers from "@/components/wrappers/section-wrapper";
import { useApi } from "@/hooks";
import InfluencersNotFound from "@/components/not-found/influencers-not-found";
import InfluencerSearchCountApiServices from "@/api/endpoints/influencer-search/influencer-search-count";
import SearchPagination from "@/components/search/search-pagination";

function SearchPage() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const [params, setParams] = useSearchParams();
  const [influencers, setInfluencers] = useState([]);

  const [totalInfluencers, setTotalInfluencers] = useState(0);
  const currentOffset = searchParams.get("offset");

  const [offset, setOffset] = useState(Number(currentOffset) || 0);
  const debouncedParamsString = useDebounce(params.toString(), 1000); // ⏳ debounce 1000ms
  const isStale = params.toString() !== debouncedParamsString[0];

  const {
    request: influencerSearchRequest,
    loading: influencerLoading,
    error: influencerSearchError,
  } = useApi(influencerApiService.searchInfluencers);

  const { request: influencerSearchCountRequest } = useApi(
    InfluencerSearchCountApiServices.incrementInfluencerSearchCount
  );

  useEffect(() => {
    const loadInfluencers = async () => {
      const queryParams = new URLSearchParams(debouncedParamsString[0]);
      const { data } = await influencerSearchRequest(queryParams);
      if (data) {
        setTotalInfluencers(data.total);
        setInfluencers(data.influencers);
      }
    };

    const countInfluencerSearch = async () => {
      await influencerSearchCountRequest();
    };

    loadInfluencers();
    countInfluencerSearch();
  }, [debouncedParamsString[0]]);

  return (
    <SectionWrappers style="pt-2 md:pt-6 flex flex-col gap-2">
      <InfluencerFilterSection
        searchParams={searchParams}
        setParams={setParams}
        setOffset={setOffset}
      />

      {influencerLoading && <InfluencerListSkeleton length={15} />}

      {!influencerLoading && influencerSearchError && (
        <ErrorSection
          sectionHeight="50vh"
          errorHeading="Failed to load influencers"
          errorMessage={influencerSearchError.message}
        />
      )}

      {!influencerLoading &&
        !influencerSearchError &&
        influencers.length == 0 && (
          <InfluencersNotFound message="No influnecer found." />
        )}

      {!influencerLoading &&
        !influencerSearchError &&
        influencers.length > 0 && (
          <>
            {debouncedParamsString && (
              <div className="font-semibold flex items-center gap-1 text-md">
                <span className="text-primary">{totalInfluencers}</span>{" "}
                Influencers
              </div>
            )}
            <InfluencerList influencers={influencers} />
            <SearchPagination
              totalInfluencers={totalInfluencers}
              offset={offset}
              setOffset={setOffset}
              searchParams={searchParams}
              setParams={setParams}
            />
          </>
        )}
    </SectionWrappers>
  );
}

export default SearchPage;
