import { Star } from "lucide-react";
interface InfluencerAvgRatingProps {
  rating: number;
  size?: number | string;
  textSize?: number | string; // Define the size type if you'll use it later
}
function InfluencerAvgRating({
  rating,
  size,
  textSize,
}: InfluencerAvgRatingProps) {
  return (
    <div className="flex items-center gap-1">
      <Star className={`w-${size} h-${size}`} fill="#0a66c2" stroke="none" />
      <span className={`text-${textSize} text-primary`}>{rating}</span>
    </div>
  );
}

export default InfluencerAvgRating;
