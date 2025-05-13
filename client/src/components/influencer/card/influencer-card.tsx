import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import InfluencerAvgRating from "../ratings/influencer-avg-rating";
import { Link, useSearchParams } from "react-router-dom";
import { ProfileImage } from "@/components/ui/profile-image";
import formatFollowers from "@/utils/format-follwers";

type influencerSocialPlatformInfo = {
  platform_profile_link: string;
  follower_count: number;
  platform_name: string;
  platform_icon_url: string;
};

type Category = {
  category_name: string;
};

type InfluencerCardProps = {
  fullname: string;
  handle: string;
  profile_image?: string;
  avg_review_score: number;
  socialPlatforms: influencerSocialPlatformInfo[];
  categories: Category[];
};

export default function InfluencerCard({
  fullname,
  handle,
  profile_image = "/avatar.jpg",
  avg_review_score,
  socialPlatforms,
  categories,
}: InfluencerCardProps) {
  const [searchParams] = useSearchParams();

  let category = categories[0];
  const queriedCategories = searchParams.get("category_names")?.split(",");
  if (queriedCategories) {
    category = categories.find((cat) => queriedCategories?.includes(cat));
  }

  return (
    <Link to={`/influencers/${handle}`}>
      <Card className="relative rounded-xl py-2 md:py-3 shadow-md border border-gray-200 hover:shadow-xl transition-shadow duration-300 cursor-pointer bg-gradient-to-b to-[#fff4f4] from-white">
        <CardContent className="p-3 md:p-4 flex flex-col items-center text-center space-y-3">
          {/* Average rating */}
          {/* {avg_review_score > 0 && (
            <div className="absolute top-5 right-5">
              <InfluencerAvgRating
                avg_review_score={avg_review_score}
                size="4"
                style="text-sm"
                isTitle={false}
              />
            </div>
          )} */}

          {/* Profile Image */}
          <ProfileImage
            isInfluencer={true}
            style="w-18 h-18 md:w-25 md:h-25 shadow-2xl"
            fullname={fullname}
            src={profile_image}
            backgroundColor="bg-gray-200 text-xl"
          />

          {/* Name & Handle */}
          <div className="mb-3 md:mb-5">
            <h3 className="text-sm md:text-lg font-semibold">
              {fullname.length > 15 ? fullname.slice(0, 13) + "..." : fullname}
            </h3>
            <p className="text-xs text-gray-400">@{handle}</p>
          </div>

          {/* Platforms */}
          <div className="flex flex-row justify-center items-center gap-1 text-sm text-muted-foreground">
            {socialPlatforms.slice(0, 2).map((influencerSocialMedia, idx) => (
              <div
                key={idx}
                className="flex items-center gap-2 text-xs font-semibold px-2 py-1 rounded-sm bg-gray-100"
              >
                <img
                  className="w-4 h-4"
                  src={influencerSocialMedia.platform_icon_url}
                  alt=""
                />
                {formatFollowers(influencerSocialMedia.follower_count)}+
              </div>
            ))}
          </div>

          {/* Categories */}
          <div className="flex flex-wrap gap-1 justify-center mt-0 md:mt-2">
            <Badge
              variant="outline"
              className="text-[11px] px-3 py-1 rounded-full text-gray-500 border-1 border-gray-300"
            >
              {category}
            </Badge>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
