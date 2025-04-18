import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import JoinInfluncrInImage from "@/assets/images/join-influencrin-form-image.png";
import { ProfileImage } from "@/components/ui/profile-image";

export default function UpdateUserForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "flex flex-col gap-6 items-center justify-center",
        className
      )}
      {...props}
    >
      <Card className="w-full md:w-[500px] overflow-hidden p-0 border border-gray-200 shadow-none">
        <CardContent className="p-0">
          <form className="p-6 md:p-8">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center mb-3">
                <h1 className="text-lg md:text-2xl font-semibold">
                  Acccount Information
                </h1>
                <p className="text-xs text-muted-foreground mt-1">
                  Update your account information any time.
                </p>
              </div>

              <div className="grid gap-2 justify-center mb-5">
                <ProfileImage
                  style="w-28 h-28"
                  userName="Shabbir"
                  src="/avatar.jpg"
                  backgroundColor="bg-gray-300"
                />
                <Label htmlFor="profileImage" className="justify-center">
                  Profile Image
                </Label>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="fullname">Full Name</Label>
                <Input
                  id="fullname"
                  type="fullname"
                  placeholder="your name"
                  className="text-xs md:text-sm"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  className="text-xs md:text-sm"
                  disabled
                />
              </div>

              <Button type="submit" className="w-full">
                Update Account
              </Button>
            </div>
          </form>
          <div className="relative hidden bg-muted md:block">
            <img
              src={JoinInfluncrInImage}
              alt="Image"
              className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
