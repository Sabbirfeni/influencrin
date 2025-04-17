import InfluencerList from "@/components/influencer/influencer-list";
import InfluencerFilterSection from "@/components/search/filters/influencer-filter-section";
import SectionWrappers from "@/components/wrappers/section-wrapper";

function SearchPage() {
  return (
    <SectionWrappers style="pt-2 md:pt-6 flex flex-col gap-4">
      <InfluencerFilterSection />
      <InfluencerList />
    </SectionWrappers>
  );
}

export default SearchPage;
