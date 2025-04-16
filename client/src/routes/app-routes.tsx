import { Route, Routes } from "react-router-dom";
import MainLayout from "@/layouts/main-layout";
import Home from "@/pages/home";
import InfluencerDetails from "@/pages/influencer-details";

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/influencers/:handle" element={<InfluencerDetails />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
