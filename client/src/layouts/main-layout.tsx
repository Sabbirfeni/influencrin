import { Outlet } from "react-router-dom";

import Header from "@/components/ui/header/header";
import Footer from "@/components/ui/footer/footer";
import { SidebarProvider } from "@/components/ui/sidebar";
const MainLayout = () => {
  return (
    // <SidebarProvider>
    <div>
      <header>
        <Header />
      </header>
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
    // </SidebarProvider>
  );
};

export default MainLayout;
