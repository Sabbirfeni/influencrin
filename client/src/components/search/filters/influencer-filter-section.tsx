import FilterList from "../filter-list";
import { Button } from "../../ui/button";
import { Search } from "lucide-react";

function InfluencerFilterSection() {
  return (
    <div className="overflow-x-auto w-full pb-2 hide-scrollbar">
      <div className="flex items-center gap-3 whitespace-nowrap">
        <Button className="bg-muted text-primary border border-primary hover:bg-primary hover:text-white">
          <Search className="w-4 h-4 mr-1" strokeWidth={3} />
          Filter
        </Button>
        <FilterList />
      </div>
    </div>
  );
}

export default InfluencerFilterSection;
