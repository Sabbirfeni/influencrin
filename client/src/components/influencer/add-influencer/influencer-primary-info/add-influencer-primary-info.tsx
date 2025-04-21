import { Button } from "@/components/ui/button";
import { MapPin } from "lucide-react";
import { Pencil } from "lucide-react";
import InfluencerProfileImage from "./add-influencer-profile-image";

type Influencer = {
  fullname: string;
  handle: string;
  bio: string;
  location: string;
  profile_image: string;
};

interface AddInfluencerPrimaryInfoProps {
  influencerPrimaryInfo: Influencer;
  onInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
}

function AddInfluencerPrimaryInfo({
  influencerPrimaryInfo,
  onInputChange,
}: AddInfluencerPrimaryInfoProps) {
  const { profile_image, fullname, handle, bio, location } =
    influencerPrimaryInfo;

  const onImageSelect = (file) => {
    const profileImage = { target: { name: "profile_image", value: file } };
    console.log(file);
    onInputChange(profileImage);
  };

  return (
    <div className="flex-1">
      <InfluencerProfileImage
        profile_image={profile_image}
        fullname={fullname}
        onImageSelect={onImageSelect}
      />
      <div className="mt-5">
        {/* <h1 className="text-xl md:text-2xl font-bold">Edit Info</h1> */}
        <form className="space-y-4 mt-4">
          <div>
            <label className="block text-sm font-medium" htmlFor="fullname">
              Full Name
            </label>
            <input
              id="fullname"
              name="fullname"
              value={fullname}
              onChange={onInputChange}
              className="w-full mt-2 p-2 border rounded-md"
              placeholder="Full Name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium" htmlFor="handle">
              Handle
            </label>
            <input
              id="handle"
              name="handle"
              value={handle}
              onChange={onInputChange}
              className="w-full mt-2 p-2 border rounded-md"
              placeholder="Handle"
            />
          </div>

          <div>
            <label className="block text-sm font-medium" htmlFor="bio">
              Bio
            </label>
            <textarea
              id="bio"
              name="bio"
              value={bio}
              onChange={onInputChange}
              className="w-full mt-2 p-2 border rounded-md"
              placeholder="Bio"
              rows={4}
            />
          </div>

          <div>
            <label className="block text-sm font-medium" htmlFor="location">
              Location
            </label>
            <div className="flex items-center gap-1 mt-2">
              <MapPin className="w-4 h-4 text-primary" />
              <input
                id="location"
                name="location"
                value={location}
                onChange={onInputChange}
                className="w-full p-2 border rounded-md"
                placeholder="Location"
              />
            </div>
          </div>

          {/* <div className="flex justify-end">
            <Button
              type="button"
              onClick={handleFormSubmit}
              className="w-24 h-10 bg-primary text-white hover:bg-primary-dark"
            >
              Save
            </Button>
          </div> */}
        </form>
      </div>
      {/* <Button className="absolute right-6 md:right-16 w-10 h-8 flex items-center justify-center text-primary border border-primary bg-white hover:bg-primary hover:text-white shadow-lg">
        <Pencil className="w-4 h-4" />
      </Button> */}
    </div>
  );
}

export default AddInfluencerPrimaryInfo;
