import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import InfluencerReviewCard from "./influencer-review-card";

function InfluencerReviewSlider() {
  return (
    <Carousel className="mt-2">
      <div className="absolute right-14 -top-7 gap-0">
        <CarouselPrevious className="z-10 -left-7 hover:bg-primary hover:text-white hover:border-primary" />
        <CarouselNext className="z-10 hover:bg-primary hover:text-white hover:border-primary" />
      </div>

      <CarouselContent className="gap-0 pl-1 pb-5">
        <CarouselItem className="basis-1/2">
          <InfluencerReviewCard />
        </CarouselItem>
        <CarouselItem className="basis-1/2">
          <InfluencerReviewCard />
        </CarouselItem>
        <CarouselItem className="basis-1/2">
          <InfluencerReviewCard />
        </CarouselItem>
        <CarouselItem className="basis-1/2">
          <InfluencerReviewCard />
        </CarouselItem>
        <CarouselItem className="basis-1/2">
          <InfluencerReviewCard />
        </CarouselItem>
        <CarouselItem className="basis-1/2">
          <InfluencerReviewCard />
        </CarouselItem>
        <CarouselItem className="basis-1/2">
          <InfluencerReviewCard />
        </CarouselItem>
      </CarouselContent>
    </Carousel>
  );
}

export default InfluencerReviewSlider;
