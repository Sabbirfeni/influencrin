import { useState } from "react";
import InfluencerManagementWrapper from "@/components/wrappers/influencer-managment-wrapper";
import AddInfluencerBanner from "@/components/influencer/add-influencer/influencer-primary-info/add-influencer-banner";
import AddInfluencerPrimaryInfo from "@/components/influencer/add-influencer/influencer-primary-info/add-influencer-primary-info";
import AddInfluencerCategoryList from "@/components/influencer/add-influencer/influencer-categories/add-influencer-category-list";
import AddInfluencerSocialList from "@/components/influencer/add-influencer/influencer-social-details/add-influencer-social-list";
import { useApi } from "@/hooks";
import influencerApiService from "@/api/endpoints/influencer-api-service";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

function AddInfluencerPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullname: "",
    handle: "",
    bio: "",
    location: "",
    profile_image: "",
  });

  const [socialPlatforms, setSocialPlatforms] = useState([]);
  const [categories, setCategories] = useState([]);

  // Handle input change
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const { request, loading, errorMessage } = useApi(
    influencerApiService.createInfluencer
  );
  // Handle form submission
  const handleFormSubmit = async () => {
    if (socialPlatforms.length > 0 && categories.length > 0) {
      // Add dynamic fields to your object
      formData.socialPlatforms = socialPlatforms;
      formData.categories = categories;

      // Convert the JS object to a FormData instance
      const formDataToSend = new FormData();

      // Loop through the object and append fields
      Object.entries(formData).forEach(([key, value]) => {
        if (key === "socialPlatforms" || key === "categories") {
          formDataToSend.append(key, JSON.stringify(value));
        } else if (key === "profile_image" && value instanceof File) {
          formDataToSend.append(key, value); // file
        } else if (typeof value !== "undefined" && value !== null) {
          formDataToSend.append(key, value as string);
        }
      });

      // Debug
      // for (let [key, value] of formDataToSend.entries()) {
      //   console.log(key, value);
      // }

      const data = await request(formDataToSend);

      if (data) {
        toast.success("Influencer added.");
        navigate(`/influencers/${formData.handle}`);
      } else if (errorMessage) {
        toast.error(errorMessage);
      }
    }
  };

  // const socialPlatforms = [
  //   {
  //     platform_icon_url: "",
  //     platform_id: "",
  //     platform_profile_link: "",
  //     follower_count: 0,
  //   },
  // ];

  return (
    <InfluencerManagementWrapper>
      <div className="flex flex-col gap-3 md:gap-4">
        <div className="border border-gray-200 rounded-xl overflow-hidden">
          <AddInfluencerBanner addInfluencer={handleFormSubmit} />

          <div className="relative flex gap-3 md:gap-4 w-full p-14 pt-24 rounded-b-2xl">
            <AddInfluencerPrimaryInfo
              influencerPrimaryInfo={formData}
              onInputChange={handleInputChange}
            />

            <div className="flex-1 flex flex-col gap-3 md:gap-4 justify-between">
              <div className="flex flex-col gap-3 md:gap-4">
                <AddInfluencerSocialList
                  socialPlatforms={socialPlatforms}
                  setSocialPlatforms={setSocialPlatforms}
                />
                <AddInfluencerCategoryList
                  categories={categories}
                  setCategories={setCategories}
                  style="flex"
                />
              </div>

              <div>
                <Button
                  onClick={handleFormSubmit}
                  className="w-[fit-content] float-end shadow-2xl"
                >
                  Add Influencer
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* <div className="w-full flex flex-col md:flex-row gap-3 md:gap-4">
          <div className="w-full md:w-2/3 flex flex-col gap-3 md:gap-4">
            <AddInfluencerSocialList
              socialPlatforms={socialPlatforms}
              setSocialPlatforms={setSocialPlatforms}
            />
          </div>

          <div className="w-full md:w-1/3 flex flex-col gap-4">
            <AddInfluencerCategoryList
              categories={categories}
              setCategories={setCategories}
              style="flex"
            />
          </div>
        </div> */}
      </div>
    </InfluencerManagementWrapper>
  );
}

export default AddInfluencerPage;
