import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { useApi } from "@/hooks";
import socialMediaPlatformApiServices from "@/api/endpoints/influencer-social-platforms-api-service";
import { z, ZodObject, ZodRawShape } from "zod";
import { Label } from "@/components/ui/label";
import InputFieldError from "@/components/error/input-field-error";

const platformSchema = z.object({
  platform_id: z.string({ required_error: "Select a platform" }),
  platform_icon_url: z.string(),
  platform_profile_link: z
    .string()
    .url("Profile link must be a valid URL")
    .min(1, "Insert a profile link"),
  follower_count: z
    .number({ invalid_type_error: "Follower count must be a number" })
    .min(1, "Follower count must be added"),
});

type Platform = {
  id: string;
  platform_name: string;
  platform_icon_url: string;
  domain_name: string;
};

type SocialPlatformCard = z.infer<typeof platformSchema>;

interface AddSocialMediaCardProps {
  socialPlatforms: SocialPlatformCard[];
  setSocialPlatforms: React.Dispatch<
    React.SetStateAction<SocialPlatformCard[]>
  >;
  setErrors: React.Dispatch<React.SetStateAction<Record<string, string>>>;
  influencerSchema: ZodObject<ZodRawShape>;
}

function AddSocialMediaCard({
  socialPlatforms,
  setSocialPlatforms,
  setErrors,
  influencerSchema,
}: AddSocialMediaCardProps) {
  const [open, setOpen] = useState(false);
  const [platforms, setPlatforms] = useState<Platform[]>([]);
  const [platformInfo, setPlatformInfo] = useState<Platform | null>(null);
  const [profileLink, setProfileLink] = useState("");
  const [followerCount, setFollowerCount] = useState("");
  const [platformErrors, setPlatformErrors] = useState<Record<string, string>>(
    {}
  );

  const nonSelectedPlatforms = platforms.filter(
    (platform) => !socialPlatforms.some((sp) => sp.platform_id === platform.id)
  );

  const handleAdd = () => {
    const newPlatform: SocialPlatformCard = {
      platform_id: platformInfo?.id || "",
      platform_icon_url: platformInfo?.platform_icon_url || "",
      platform_profile_link: profileLink.trim(),
      follower_count: Number(followerCount),
    };

    try {
      if (
        profileLink &&
        platformInfo &&
        !profileLink.includes(platformInfo.domain_name)
      ) {
        setPlatformErrors((prevError) => ({
          ...prevError,
          platform_profile_link:
            "This link is not valid with the selected platform",
        }));
        return;
      }

      platformSchema.parse(newPlatform); // Validate individual platform

      const updatedPlatforms = [...socialPlatforms, newPlatform];
      setSocialPlatforms(updatedPlatforms);

      // Reset
      setPlatformInfo(null);
      setProfileLink("");
      setFollowerCount("");
      setOpen(false);
      setPlatformErrors({});

      try {
        influencerSchema
          .pick({ socialPlatforms: true })
          .parse({ socialPlatforms: updatedPlatforms });

        setErrors((prev) => {
          const updated = { ...prev };
          delete updated["socialPlatforms"];
          return updated;
        });
      } catch {
        // Optional: handle full form validation error
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: Record<string, string> = {};
        error.errors.forEach((err) => {
          fieldErrors[err.path[0] as string] = err.message;
        });
        setPlatformErrors(fieldErrors);
      }
    }
  };

  const {
    request,
    // loading
  } = useApi(socialMediaPlatformApiServices.getAllSocialMediaPlatforms);

  useEffect(() => {
    const loadSocialPlatforms = async () => {
      const { data: response } = await request();
      if (response) {
        setPlatforms(response.socialMediaPlatforms);
      }
    };
    loadSocialPlatforms();
  }, []);

  return (
    <>
      <div
        className="w-full py-5 md:py-0 md:w-full h-full min-h-25 flex flex-col items-center justify-center gap-2 transition duration-300 text-gray-200 hover:text-gray-500 hover:shadow-md rounded-xl border border-gray-200 cursor-pointer"
        onClick={() => setOpen(true)}
      >
        <Plus className="w-8 h-8" strokeWidth={3} />
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Add Social Media</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Platform</Label>
              {/* {loading && <div>Loading...</div>} */}
              <Select
                value={platformInfo?.id || ""}
                onValueChange={(id: string) => {
                  const selected = platforms.find((p) => p.id === id) || null;
                  setPlatformInfo(selected);
                  setPlatformErrors((prev) => ({ ...prev, platform_id: "" }));
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select platform" />
                </SelectTrigger>
                <SelectContent>
                  {nonSelectedPlatforms.map((platform) => (
                    <SelectItem key={platform.id} value={platform.id}>
                      <div className="flex items-center gap-2">
                        <img
                          src={platform.platform_icon_url}
                          className="w-4 h-4"
                          alt=""
                        />
                        {platform.platform_name}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {platformErrors?.platform_id && (
                <InputFieldError errMessage={platformErrors.platform_id} />
              )}
            </div>

            <div className="space-y-2">
              <Label>Profile Link</Label>
              <Input
                type="text"
                value={profileLink}
                onChange={(e) => {
                  setProfileLink(e.target.value);
                  setPlatformErrors((prev) => ({
                    ...prev,
                    platform_profile_link: "",
                  }));
                }}
                className="text-xs md:text-sm border-none shadow-none bg-gray-100"
              />
              {platformErrors.platform_profile_link && (
                <InputFieldError
                  errMessage={platformErrors.platform_profile_link}
                />
              )}
            </div>

            <div className="space-y-2">
              <Label>Follower Count</Label>
              <Input
                type="number"
                value={followerCount}
                onChange={(e) => {
                  setFollowerCount(e.target.value);
                  setPlatformErrors((prev) => ({
                    ...prev,
                    follower_count: "",
                  }));
                }}
                className="text-xs md:text-sm border-none shadow-none bg-gray-100"
              />
              {platformErrors.follower_count && (
                <InputFieldError errMessage={platformErrors.follower_count} />
              )}
            </div>
          </div>

          <DialogFooter className="pt-4">
            <Button type="button" onClick={handleAdd}>
              Add
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default AddSocialMediaCard;
