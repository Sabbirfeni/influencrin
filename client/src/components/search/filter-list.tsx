import CategoryFilter from "./filters/category-fitler";
import FollowersFilter from "./filters/followers-filter";
import RatingFilter from "./filters/rating-filter";
import SocialPlatformFilter from "./filters/social-platform-filter";

function FilterList() {
  return (
    <>
      <CategoryFilter />
      <SocialPlatformFilter />
      <RatingFilter />
      <FollowersFilter />
    </>
  );
}

export default FilterList;
