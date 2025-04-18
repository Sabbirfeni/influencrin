// import { useLoaderData } from "react-router-dom";
import InfluencerList from "@/components/influencer/influencer-list";
import { Button } from "@/components/ui/button";
import SectionWrappers from "@/components/wrappers/section-wrapper";
import { Link } from "react-router-dom";
import { Suspense, useEffect, useState } from "react";
import { useApi } from "@/hooks";
import influencerApiService from "@/api/endpoints/influencer-api-service";

function InfluencerListHome() {
  const [influencers, setInfluencers] = useState([]);
  const { request, loading, error } = useApi(
    influencerApiService.searchInfluencers
  );
  console.log(influencers);
  useEffect(() => {
    const loadInfluencers = async () => {
      const data = await request();
      if (data) setInfluencers(data.influencers);
    };
    loadInfluencers();
  }, []);

  return (
    <SectionWrappers style="bg-gradient-to-t to-[#ffe6e6] from-white">
      <div>
        <h1 className="text-[30px] md:text-[52px] mb-6 md:mb-12 text-center font-bold leading-tight">
          Rising Voices
        </h1>

        {loading && <div>Loading...</div>}
        {error && <div>{error}</div>}

        <InfluencerList influencers={influencers} />

        <div className="flex justify-center mt-6 md:mt-12">
          <Link to="/search">
            <Button className="md:px-6 md:py-5 md:text-base border border-primary bg-transparent hover:bg-primary text-primary hover:text-white">
              All Influencers
            </Button>
          </Link>
        </div>
      </div>
    </SectionWrappers>
  );
}

export default InfluencerListHome;
