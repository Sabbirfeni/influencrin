import AddInfluencerForm from "@/components/influencer/add-influencer/add-influencer-form";
import InfluencerManagementWrapper from "@/components/wrappers/influencer-managment-wrapper";
import { useAuth } from "@/hooks/use-auth";

function AddInfluencerPage() {
  const { user } = useAuth();
  return (
    <InfluencerManagementWrapper>
      {user?.role === "super_admin" ? (
        <AddInfluencerForm />
      ) : (
        "AddInfluencerRequestForm"
      )}
    </InfluencerManagementWrapper>
  );
}

export default AddInfluencerPage;
