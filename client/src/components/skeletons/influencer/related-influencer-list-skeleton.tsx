function RelatedInfluencerListSkeleton() {
  return (
    <div className="flex flex-col gap-2">
      {[...Array(5)].map((_, index) => (
        <RelatedInfluencerCardSkeleton key={index} />
      ))}
    </div>
  );
}

export default RelatedInfluencerListSkeleton;

function RelatedInfluencerCardSkeleton() {
  return (
    <div className="flex items-center justify-between flex-wrap gap-4 bg-gray-100 px-3 py-4 rounded-xl animate-pulse">
      <div className="flex items-center gap-2 md:gap-3">
        {/* Profile Image Skeleton */}
        <div className="w-9 h-9 md:w-12 md:h-12 rounded-full bg-gray-300" />

        <div className="flex flex-col gap-1">
          {/* Name Skeleton */}
          <div className="w-24 h-3 md:h-4 bg-gray-300 rounded" />
          {/* Handle Skeleton */}
          <div className="w-20 h-2 md:h-3 bg-gray-200 rounded" />
        </div>
      </div>

      {/* Badge Skeleton */}
      <div className="h-[20px] w-24 bg-gray-300 rounded-full" />
    </div>
  );
}
