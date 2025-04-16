import { ExternalLink } from "lucide-react";
import { Edit } from "lucide-react";
import { Link } from "react-router-dom";

import SocialMediaDeleteBtn from "./social-media-delete-btn";

function InfluencerSocialCard({
  socialPlatformIcon,
}: {
  socialPlatformIcon: JSX.Element;
}) {
  return (
    <Link
      to="/"
      className="group relative flex items-center p-3 overflow-hidden hover:shadow-md transition duration-300 rounded-xl border border-gray-200 cursor-pointer"
    >
      {/* <SocialMediaDeleteBtn /> */}
      <Edit className="w-4 h-4 absolute top-2 left-2 md:top-3 md:left-3 opacity-100 md:opacity-0 transform scale-90 hover:scale-140 text-primary transition-all duration-300 group-hover:opacity-100 group-hover:scale-100" />
      <ExternalLink className="w-4 h-4 absolute top-2 right-2 md:top-3 md:right-3 opacity-100 md:opacity-0 transform scale-90 hover:scale-140 text-primary transition-all duration-300 group-hover:opacity-100 group-hover:scale-100" />
      <div className="flex-1 p-3 flex justify-center border-r border-gray-200 bg-white transition">
        <img
          src={socialPlatformIcon}
          alt="LinkedIn"
          className="w-8 md:w-14 h-8 md:h-14 object-contain"
        />
      </div>

      {/* Followers count */}
      <div className="flex-1 p-3 flex flex-row items-center justify-center gap-4">
        <div className="text-center">
          <h1 className="text-md md:text-2xl font-semibold">200K</h1>
          <p className="text-xs md:text-sm text-muted-foreground">Followers</p>
        </div>
      </div>
    </Link>
  );
}

export default InfluencerSocialCard;
