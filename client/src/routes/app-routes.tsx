import { Route, Routes } from "react-router-dom";
import MainLayout from "@/layouts/main-layout";
import Home from "@/pages/home";
import InfluencerDetails from "@/pages/influencer-details";
import SearchPage from "@/pages/search";
import JoinInfluencrInPage from "@/pages/join-influencrin";
import LoginPage from "@/pages/login";

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
    </Routes>
  );
};

export default AppRoutes;
