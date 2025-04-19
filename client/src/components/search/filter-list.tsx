import CategoryFilter from "./filters/category-fitler";
import FollowersFilter from "./filters/followers-filter";
import RatingFilter from "./filters/rating-filter";
import SocialPlatformFilter from "./filters/social-platform-filter";

type FilterListProps = {
  searchParams: URLSearchParams;
};

function FilterList({ searchParams }: FilterListProps) {
  return (
    <>
      <SocialPlatformFilter searchParams={searchParams} />
      <CategoryFilter searchParams={searchParams} />
      <RatingFilter searchParams={searchParams} />
      <FollowersFilter searchParams={searchParams} />
    </>
  );
}

export default FilterList;
