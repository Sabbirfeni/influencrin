import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Plus, X } from "lucide-react";

type Props = {
  style?: string;
};

const categories = [
  "Beauty",
  "Lifestyle",
  "Beauty",
  "Lifestyle",
  "Lifestyle",
  "Beauty",
  "Lifestyle",
];
function InfluencerCategoryList({ style }: Props) {
  return (
    <div
      className={`p-4 ${style} flex-col gap-4 border border-gray-200 rounded-xl`}
    >
      {/* Categories card header */}
      <div className="flex items-start justify-between">
        <h4 className="text-sm font-semibold">Categories</h4>
        {/* <Button className="w-10 h-8 flex items-center justify-center shadow-none text-primary bg-white hover:bg-primary hover:text-white hover:shadow-lg"></Button> */}
        <Button className="w-8 h-6 flex items-center justify-center text-primary border border-primary bg-white hover:bg-primary  hover:text-white shadow-lg">
          <Plus className="w-3 h-3" />
        </Button>
      </div>
      {/* Category list */}
      <div className="flex flex-wrap gap-2">
        {categories.map((cat, idx) => (
          <Badge
            key={idx}
            variant="outline"
            className="group cursor-pointer flex items-center gap-1 text-xs px-3 py-1 rounded-full transition duration-300 bg-white text-primary border border-primary"
          >
            {cat}
            <X
              className="z-50 w-3 h-3 cursor-pointer group-hover:scale-150 transition duration-300"
              strokeWidth={3}
            />
          </Badge>
        ))}
      </div>
    </div>
  );
}

export default InfluencerCategoryList;
