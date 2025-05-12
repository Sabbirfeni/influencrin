import { useState } from "react";
import influencerAddRequestApiService from "@/api/endpoints/influencer-add-request-service";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useApi } from "@/hooks";
import { toast } from "sonner";
import ToastDescription from "@/components/toast/toast-description";

function InfluencerAddRequestBtn({ className, title = "Request to Add" }) {
  const { request, loading } = useApi(
    influencerAddRequestApiService.requestToAddInfluencer
  );

  const [open, setOpen] = useState(false); // control Dialog open state
  const [profileLink, setProfileLink] = useState("");
  const [email, setEmail] = useState("");

  const sendRequest = async () => {
    if (!profileLink) {
      toast.error("Social profile link is required!");
      return;
    }

    try {
      new URL(profileLink);
    } catch {
      toast.error("Please enter a valid URL.");
      return;
    }

    const { data, error } = await request({
      platform_profile_link: profileLink,
      email: email || undefined,
    });

    if (data) {
      toast.success("Request Sent", {
        description: <ToastDescription description={data.message} />,
      });
      setProfileLink("");
      setEmail("");
      setOpen(false);
    } else if (error) {
      toast.error("Failed to send request", {
        description: (
          <ToastDescription
            description={error.message || "Something went wrong."}
          />
        ),
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className={className}>{title}</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] border-none">
        <DialogHeader>
          <DialogTitle className="text-sm">
            Request to Add Influencer
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="flex flex-col gap-1">
            <Label htmlFor="profileLink" className="text-right text-xs">
              Influencer's Profile Link
            </Label>
            <Input
              id="profileLink"
              type="text"
              value={profileLink}
              onChange={(e) => setProfileLink(e.target.value)}
              required
            />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={sendRequest} disabled={loading}>
            {loading ? "Sending..." : "Send Request"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default InfluencerAddRequestBtn;
