import { Star } from "lucide-react";
interface InfluencerAvgRatingProps {
  rating: number;
  size?: number | string; // Define the size type if you'll use it later
}
function InfluencerAvgRating({ rating, size }: InfluencerAvgRatingProps) {
  return (
    <div className="flex items-center gap-0.5">
      <span className="text-xs text-primary">{rating}</span>
      <Star className={`w-${size} h-${size}`} fill="#0a66c2" stroke="none" />
    </div>
  );
}

export default InfluencerAvgRating;
