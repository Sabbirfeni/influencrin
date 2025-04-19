import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import RatingStars from "../../ratings/rating-starts";
import { ProfileImage } from "@/components/ui/profile-image";

function InfluencerReviewCard() {
  return (
    <div className="h-full border border-gray-200 bg-gradient-to-b to-[#fff5f5] from-white rounded-lg p-6 transition duration-300 hover:shadow-md cursor-pointer">
      <div className="flex justify-between">
        <div className="flex items-center gap-3">
          <ProfileImage
            style="w-12 h-12"
            fullname="Shabbir"
            src=""
            backgroundColor="bg-gray-100"
          />
          <div>
            <h4 className="text-sm font-semibold">Amdad Shabbir</h4>
            <RatingStars rating={4} />
          </div>
        </div>

        {/* Review time */}
        <p className="text-xs text-gray-400">May 21, 2025</p>
      </div>
      <p className="mt-4 text-[13px] text-muted-foreground leading-5 select-none">
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text ever
        since the 1500s, when an unknown printer took a galley of type and
        scrambled it to make a type specimen book.
      </p>
    </div>
  );
}

export default InfluencerReviewCard;
