import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ProfileImage } from "@/components/ui/profile-image";

function RelatedInfluencerCard() {
  return (
    <div className="flex items-center justify-between bg-gray-100 px-3 py-4 rounded-xl">
      <div className="flex items-center gap-3">
        <ProfileImage
          style="w-10 h-10 md:w-12 md:h-12"
          userName="Shabbir"
          src=""
          backgroundColor="bg-gray-200 text-sm"
        />
        <div>
          <h4 className="text-sm font-semibold">Amdad Shabbir</h4>
          <p className="text-xs text-muted-foreground">@amdad_shabbir</p>
        </div>
      </div>

      {/* Category badge */}
      <Badge
        variant="outline"
        className="h-[fit-content] text-[10px] md:text-xs px-2 md:px-3 py-1 rounded-full text-primary border-1 border-primary"
      >
        Personal Branding
      </Badge>
    </div>
  );
}

export default RelatedInfluencerCard;
