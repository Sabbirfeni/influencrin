import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

function RelatedInfluencerCard() {
  return (
    <div className="flex items-center justify-between bg-gray-100 px-3 py-4 rounded-xl">
      <div className="flex items-center gap-3">
        <Avatar className="cursor-pointer w-12 h-12">
          <AvatarImage sizes="4" src="/avatar.jpg" alt="User" />
          <AvatarFallback className="bg-gray-200">U</AvatarFallback>
        </Avatar>
        <div>
          <h4 className="text-sm font-semibold">Amdad Shabbir</h4>
          <p className="text-xs text-muted-foreground">@amdad_shabbir</p>
        </div>
      </div>

      {/* category */}
      <Badge
        variant="outline"
        className="h-[fit-content] text-xs px-3 py-1 rounded-full text-primary border-1 border-primary"
      >
        Personal Branding
      </Badge>
    </div>
  );
}

export default RelatedInfluencerCard;
