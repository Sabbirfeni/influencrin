import InfluencerCategoryList from "./influencer-category-list";
import SameCategoryInfluencerList from "./same-category-influencer-list";

function InfluencerCategoriesContainer() {
  return (
    <div className="w-1/3 flex flex-col gap-4">
      <InfluencerCategoryList />
      <SameCategoryInfluencerList />
    </div>
  );
}

export default InfluencerCategoriesContainer;
