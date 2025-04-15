import { Route, Routes } from "react-router-dom";
import MainLayout from "@/layouts/main-layout";
import Home from "@/pages/home/home";
import About from "@/pages/about";

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
