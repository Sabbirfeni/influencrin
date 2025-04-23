import ErrorSection from "@/components/error/error-section";
import RelatedInfluencerListSkeleton from "@/components/skeletons/influencer/related-influencer-list-skeleton";
import RelatedInfluencerCard from "./related-influencer-card";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import influencerApiService from "@/api/endpoints/influencer-api-service";
import { useApi } from "@/hooks";

interface Category {
  id: string;
  category_name: string;
  influencer_id: string;
}

interface Influencer {
  id: string;
  fullname: string;
  handle: string;
  profileImage?: string;
  category?: string;
}

interface RelatedInfluencerListProps {
  categories: Category[];
}

function RelatedInfluencerList({ categories }: RelatedInfluencerListProps) {
  const [influencers, setInfluencers] = useState<Influencer[] | null>(null);
  const { request, loading, errorMessage } = useApi(
    influencerApiService.searchInfluencers
  );

  useEffect(() => {
    const loadInfluencers = async () => {
      const data = await request();
      if (data) setInfluencers(data.influencers);
    };

    loadInfluencers();
  }, [categories]);

  return (
    <>
      {loading && <RelatedInfluencerListSkeleton />}

      {errorMessage && (
        <ErrorSection
          sectionHeight="20vh"
          errorHeading="Failed to load related influencers"
          errorMessage={errorMessage}
        />
      )}

      {!loading && influencers && (
        <div className="p-3 md:p-4 mt-6 md:mt-0 flex flex-col gap-4 border border-gray-200 rounded-xl">
          <p className="text-center mt-1 md:mt-0 md:text-left text-sm font-semibold">
            Influencers in similar categories
          </p>

          <div className="flex flex-col gap-2">
            {influencers.slice(0, 7).map((influencer, idx) => (
              <RelatedInfluencerCard key={idx} influencer={influencer} />
            ))}

            <Link
              to="/"
              className="text-center text-sm font-semibold mt-3 text-primary"
            >
              See All Influencers
            </Link>
          </div>
        </div>
      )}
    </>
  );
}

export default RelatedInfluencerList;
