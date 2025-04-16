import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import RatingStars from "../../ratings/rating-starts";

function InfluencerReviewCard() {
  return (
    <div className="h-full border border-gray-100 bg-[#fff5f5] rounded-lg p-6 transition duration-300 hover:shadow-md cursor-pointer">
      <div>
        <div className="flex items-center gap-3">
          <Avatar className="cursor-pointer w-12 h-12">
            <AvatarImage sizes="4" src="/avatar.jpg" alt="User" />
            <AvatarFallback className="bg-gray-200">U</AvatarFallback>
          </Avatar>
          <div>
            <h4 className="text-sm font-semibold">Amdad Shabbir</h4>
            <RatingStars rating={4} />
          </div>
        </div>
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
