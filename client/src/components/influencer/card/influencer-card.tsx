import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { X, Instagram, Youtube } from "lucide-react";
import InfluencerAvgRating from "../ratings/influencer-avg-rating";
import { Link } from "react-router-dom";
import { ProfileImage } from "@/components/ui/profile-image";

type Platform = {
  name: "Instagram" | "Youtube" | "X";
  followers: string;
};

type InfluencerCardProps = {
  name: string;
  handle: string;
  profileImageSrc?: string;
  rating: number;
  platforms: Platform[];
  categories: string[];
};

const platformIcons: Record<string, JSX.Element> = {
  Instagram: <Instagram className="h-4 w-4 text-pink-500" />,
  Youtube: <Youtube className="h-4 w-4 text-red-500" />,
  X: <X className="h-4 w-4 text-blue-500" />,
};

export default function InfluencerCard({
  name,
  handle,
  profileImageSrc = "/avatar.jpg",
  rating,
  platforms,
  categories,
}: InfluencerCardProps) {
  return (
    <Link to={`/influencers/${name}`}>
      <Card className="relative rounded-xl py-4 shadow-md border border-gray-200 hover:shadow-xl transition-shadow duration-300 cursor-pointer bg-gradient-to-b to-[#fff4f4] from-white">
        <CardContent className="p-4 flex flex-col items-center text-center space-y-3">
          <div className="absolute top-5 right-5">
            <InfluencerAvgRating
              rating={rating}
              size="4"
              style="text-sm"
              isTitle={false}
            />
          </div>

          {/* Profile Image */}
          <ProfileImage
            style="w-25 h-25 shadow-2xl"
            userName="Shabbir"
            src={profileImageSrc}
            backgroundColor="bg-gray-200 text-xl"
          />

          {/* Name & Handle */}
          <div className="mb-5">
            <h3 className="text-lg font-semibold">{name}</h3>
            <p className="text-sm text-muted-foreground">@{handle}</p>
          </div>

          {/* Platforms */}
          <div className="flex flex-row flex-wrap justify-center items-center gap-1 text-sm text-muted-foreground">
            {platforms.map((platform, idx) => (
              <div
                key={idx}
                className="flex items-center gap-2 text-xs font-semibold px-2 py-1 rounded-sm bg-gray-100"
              >
                {platformIcons[platform.name]}
                {platform.followers}
              </div>
            ))}
          </div>

          {/* Categories */}
          <div className="flex flex-wrap gap-1 justify-center mt-2">
            {categories.map((cat, idx) => (
              <Badge
                key={idx}
                variant="outline"
                className="text-xs px-3 py-1 rounded-full text-gray-500 border-1 border-gray-200"
              >
                {cat}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
