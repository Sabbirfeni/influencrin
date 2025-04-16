import { Star } from "lucide-react";
interface InfluencerAvgRatingProps {
  rating: number;
  size?: number | string;
  style?: string;
  isTitle: boolean; // Define the size type if you'll use it later
}
function InfluencerAvgRating({
  rating,
  size,
  style,
  isTitle,
}: InfluencerAvgRatingProps) {
  return (
    <>
      <div className="flex items-center gap-1">
        <Star className={`w-${size} h-${size}`} fill="#0a66c2" stroke="none" />
        <span className={`${style} font-semibold text-primary`}>{rating}</span>
      </div>
      {isTitle && (
        <h2 className="text-sm md:text-md font-semibold">Average Rating</h2>
      )}
    </>
  );
}

export default InfluencerAvgRating;
