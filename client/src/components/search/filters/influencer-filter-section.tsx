import FilterList from "../filter-list";
import { Button } from "../../ui/button";
import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

function InfluencerFilterSection() {
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const filterInfluencers = () => {
    navigate(`/search?${searchParams.toString()}`, { replace: false });
  };
  return (
    <div className="overflow-x-auto w-full pb-2 hide-scrollbar">
      <div className="flex items-center gap-3 whitespace-nowrap">
        <Button
          onClick={filterInfluencers}
          className="bg-muted text-primary border border-primary hover:bg-primary hover:text-white"
        >
          <Search className="w-4 h-4 mr-1" strokeWidth={3} />
          Filter
        </Button>
        <FilterList searchParams={searchParams} />
        <Button
          variant="outline"
          onClick={() => {
            navigate("/search");
          }}
          className="ml-4 hover:bg-primary hover:text-white"
        >
          Reset
        </Button>
      </div>
    </div>
  );
}

export default InfluencerFilterSection;
