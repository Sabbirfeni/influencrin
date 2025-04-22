import { Toaster } from "@/components/ui/sonner";
import { Outlet } from "react-router-dom";

import Header from "@/components/ui/header/header";
import Footer from "@/components/ui/footer/footer";

const MainLayout = () => {
  return (
    <div>
      <header>
        <Header />
      </header>
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
