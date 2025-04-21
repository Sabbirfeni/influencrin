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

function AddSocialMediaCard({ setSocialPlatforms }) {
  const [open, setOpen] = useState(false);
  const [platformInfo, setPlatformInfo] = useState(null);
  const [profileLink, setProfileLink] = useState("");
  const [followerCount, setFollowerCount] = useState("");

  const handleAdd = () => {
    const newPlatform = {
      platform_id: platformInfo.id,
      platform_icon_url: platformInfo.platform_icon_url,
      platform_profile_link: profileLink,
      follower_count: Number(followerCount),
    };
    setSocialPlatforms((prevPlatforms) => [...prevPlatforms, newPlatform]);
    console.log("New Social Platform:", newPlatform);

    // Reset and close
    setPlatformInfo(null);
    setProfileLink("");
    setFollowerCount("");
    setOpen(false);
  };

  const [platforms, setPlatforms] = useState(null);
  const { request, loading, errorMessage } = useApi(
    socialMediaPlatformApiServices.getAllSocialMediaPlatforms
  );
  useEffect(() => {
    const loadSocialPlatforms = async () => {
      const data = await request();
      if (data) {
        setPlatforms(data.socialMediaPlatforms);
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
        {/* <h1 className="text-md font-semibold">Add New</h1> */}
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Add Social Media</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Platform</label>
              {loading && <div>Platforms loading...</div>}
              {platforms && (
                <Select value={platformInfo} onValueChange={setPlatformInfo}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select platform" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={null}>Select platform</SelectItem>
                    {platforms.map((platform) => (
                      <SelectItem
                        value={platform}
                        className="cursor-pointer hover:bg-gray-100"
                      >
                        {platform.platform_name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Profile Link
              </label>
              <Input
                type="text"
                value={profileLink}
                onChange={(e) => setProfileLink(e.target.value)}
                placeholder="https://socialmedia.com/username"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Follower Count
              </label>
              <Input
                type="number"
                value={followerCount}
                onChange={(e) => setFollowerCount(e.target.value)}
                placeholder="1000"
              />
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
