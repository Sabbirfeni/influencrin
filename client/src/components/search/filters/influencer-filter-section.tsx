import FilterList from "../filter-list";
import { Button } from "../../ui/button";
import { Search } from "lucide-react";

function InfluencerFilterSection() {
  return (
    <div className="overflow-x-auto w-full pb-2">
      <div className="flex items-center gap-3 whitespace-nowrap">
        <Button>
          <Search className="w-4 h-4 mr-1" />
          Search
        </Button>
        <FilterList />
      </div>
    </div>
  );
}

export default InfluencerFilterSection;
