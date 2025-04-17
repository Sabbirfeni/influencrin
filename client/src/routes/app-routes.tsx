import { Route, Routes } from "react-router-dom";
import MainLayout from "@/layouts/main-layout";
import Home from "@/pages/home";
import InfluencerDetails from "@/pages/influencer-details";
import SearchPage from "@/pages/search";
import JoinInfluencrInPage from "@/pages/join-influencrin";
import LoginPage from "@/pages/login";

import MyAccountPage from "@/pages/my-account";
import InfluencerManagementLayout from "@/layouts/influencer-management-layout";
import ManageInfluencersPage from "@/pages/manage-influencers";
import AddInfluencerPage from "@/pages/add-influencer";

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/influencers/:handle" element={<InfluencerDetails />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/join-influencrin" element={<JoinInfluencrInPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Route>

      <Route element={<InfluencerManagementLayout />}>
        <Route path="/my-account" element={<MyAccountPage />} />
        <Route path="/manage-influencers" element={<ManageInfluencersPage />} />
        <Route path="/add-influencer" element={<AddInfluencerPage />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
