import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

function SearchPagination({
  totalInfluencers,
  offset,
  setOffset,
  searchParams,
  setParams,
}) {
  const newIncrementOffset = offset + 15;
  const isExceed = newIncrementOffset > totalInfluencers;

  const newDecrementOffset = offset - 15;
  const minOffset = newDecrementOffset < 0;

  const handlePrev = (e) => {
    if (minOffset) {
      e.preventDefault();
      return;
    }

    if (newDecrementOffset == 0) {
      searchParams.delete("offset");
      setParams(searchParams);
    } else {
      searchParams.set("offset", newDecrementOffset);
      setParams(searchParams);
    }
    setOffset(newDecrementOffset);
  };
  const handleNext = (e) => {
    if (isExceed) {
      e.preventDefault();
      return;
    }
    searchParams.set("offset", newIncrementOffset);
    setParams(searchParams);
    setOffset(newIncrementOffset);
  };

  return (
    <Pagination className="mt-5">
      <PaginationContent className="gap-4">
        <PaginationItem onClick={handlePrev}>
          <PaginationPrevious
            href="#"
            onClick={handlePrev}
            aria-disabled={minOffset}
            className={`${
              minOffset
                ? "pointer-events-none bg-gray-50 text-gray-300"
                : "bg-gray-100 hover:bg-gray-200"
            }`}
          />
        </PaginationItem>

        <PaginationItem>
          <PaginationNext
            href="#"
            onClick={handleNext}
            aria-disabled={isExceed}
            className={`${
              isExceed
                ? "pointer-events-none bg-gray-50 text-gray-300"
                : "bg-gray-100 hover:bg-gray-200"
            }`}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}

export default SearchPagination;
