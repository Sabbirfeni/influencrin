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
import { z } from "zod";
import { Label } from "@/components/ui/label";
import influencerSocialPlatformApiService from "@/api/endpoints/influencer-social-platforms-api-service";
import { toast } from "sonner";
import InputFieldError from "@/components/error/input-field-error";
import ToastDescription from "@/components/toast/toast-description";
import { ParsedApiError } from "@/utils/handle-api-error";

function isParsedApiError(
  error: string | object | ParsedApiError
): error is ParsedApiError {
  return (
    typeof error === "object" &&
    error !== null &&
    "message" in error &&
    typeof (error as Record<string, unknown>).message === "string"
  );
}

// Zod validation
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

type PlatformFormType = z.infer<typeof platformSchema>;

type SocialMediaPlatform = {
  id: string;
  platform_name: string;
  platform_icon_url: string;
  domain_name: string;
};

type InfluencerSocialPlatform = {
  platform_id: string;
  platform_profile_link: string;
  follower_count: number;
  platform: SocialMediaPlatform;
};

type UpdateSocialMediaListBtnProps = {
  influencer: { id: string };
  influencerSocialPlatforms: InfluencerSocialPlatform[];
  setInfluencerSocialPlatforms: (value: InfluencerSocialPlatform[]) => void;
};

function UpdateSocialMediaListBtn({
  influencer,
  influencerSocialPlatforms,
  setInfluencerSocialPlatforms,
}: UpdateSocialMediaListBtnProps) {
  const [open, setOpen] = useState(false);
  const [platforms, setPlatforms] = useState<SocialMediaPlatform[]>([]);
  const [selectedPlatformId, setSelectedPlatformId] = useState<string>("");
  const [profileLink, setProfileLink] = useState<string>("");
  const [followerCount, setFollowerCount] = useState<string>("");
  const [platformErrors, setPlatformErrors] = useState<
    Partial<Record<keyof PlatformFormType, string>>
  >({});

  const platformInfo =
    platforms.find((p) => p.id === selectedPlatformId) || null;

  const nonSelectedPlatforms = platforms.filter(
    (platform) =>
      !influencerSocialPlatforms.some((sp) => sp.platform_id === platform.id)
  );

  const {
    request: socialMediaCreateRequest,
    loading: socialMediaCreateLoading,
  } = useApi(influencerSocialPlatformApiService.createPlatform);

  const handleAdd = async () => {
    const newPlatform: PlatformFormType = {
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

      platformSchema.parse(newPlatform);

      const { data: socialMediaCreateResponse, error: socialMediaCreateError } =
        await socialMediaCreateRequest(influencer.id, newPlatform);

      if (socialMediaCreateResponse) {
        const newSocialPlatform: InfluencerSocialPlatform = {
          ...socialMediaCreateResponse.influencerSocialPlatform,
          platform: platformInfo!,
        };
        const updatedPlatforms = [
          ...influencerSocialPlatforms,
          newSocialPlatform,
        ];
        setInfluencerSocialPlatforms(updatedPlatforms);
        toast.success(socialMediaCreateResponse.message);

        setSelectedPlatformId("");
        setProfileLink("");
        setFollowerCount("");
        setOpen(false);
        setPlatformErrors({});
      } else if (socialMediaCreateError) {
        if (socialMediaCreateError) {
          if (isParsedApiError(socialMediaCreateError)) {
            toast.error(socialMediaCreateError.message, {
              description: (
                <ToastDescription
                  description={socialMediaCreateError.description}
                />
              ),
            });
          } else if (typeof socialMediaCreateError === "string") {
            toast.error(socialMediaCreateError);
          } else {
            toast.error("Something went wrong");
          }
        }
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: Partial<Record<keyof PlatformFormType, string>> = {};
        error.errors.forEach((err) => {
          fieldErrors[err.path[0] as keyof PlatformFormType] = err.message;
        });
        setPlatformErrors(fieldErrors);
      }
    }
  };

  const { request, loading } = useApi(
    socialMediaPlatformApiServices.getAllSocialMediaPlatforms
  );

  useEffect(() => {
    const loadSocialPlatforms = async () => {
      const { data: socialPlatformsResponse } = await request();
      if (socialPlatformsResponse) {
        setPlatforms(socialPlatformsResponse.socialMediaPlatforms);
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
              {loading && <div>Platforms loading...</div>}
              <Select
                value={selectedPlatformId}
                onValueChange={(value) => {
                  setSelectedPlatformId(value);
                  setPlatformErrors((prev) => ({
                    ...prev,
                    platform_id: undefined,
                  }));
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select platform" />
                </SelectTrigger>
                <SelectContent>
                  {nonSelectedPlatforms.map((platform) => (
                    <SelectItem
                      key={platform.id}
                      value={platform.id}
                      className="cursor-pointer hover:bg-gray-100"
                    >
                      <img
                        src={platform.platform_icon_url}
                        className="w-4 h-4 inline-block mr-2"
                        alt=""
                      />
                      {platform.platform_name}
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
                    platform_profile_link: undefined,
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
                    follower_count: undefined,
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
              {socialMediaCreateLoading ? "Adding..." : "Add"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default UpdateSocialMediaListBtn;
