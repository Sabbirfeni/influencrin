import { ChartColumnIncreasing, Plus, User, Users } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

import InfluencerManagmentSidebarHeader from "./influencer-managment-sidebar-header";
import { useLocation, useNavigate } from "react-router-dom";
import InluencerManagementSidebarFooter from "./inluencer-management-sidebar-footer";
import InfluencerAddRequestBtn from "../../add-request/influencer-add-request-btn";
import { useAuth } from "@/hooks/use-auth";

export default function InfluencerManagementSidebar() {
  const { user } = useAuth();

  const isSuperAdmin = user?.role == "super_admin";
  const items = [
    {
      title: "Analytics",
      url: "/analytics",
      icon: ChartColumnIncreasing,
      show: isSuperAdmin,
    },
    {
      title: "Add Influencer",
      url: "/add-influencer",
      icon: Plus,
      show: isSuperAdmin,
    },
    {
      title: "Manage Influencers",
      url: "/manage-influencers",
      icon: Users,
      show: isSuperAdmin,
    },
    {
      title: "My Account",
      url: "/my-account",
      icon: User,
      show: user,
    },
  ];
  const location = useLocation();
  const navigate = useNavigate();
  const getActiveClass = (path: string) => {
    return location.pathname === path ? "bg-gray-100 text-black" : "";
  };
  const isMenuActive = (path: string) => {
    return location.pathname === path;
  };

  const { openMobile, setOpenMobile } = useSidebar();

  const navigateToPage = (url: string) => {
    setOpenMobile(!openMobile);
    navigate(url);
  };

  return (
    <Sidebar collapsible="offcanvas">
      {/* Sidebar header */}
      <InfluencerManagmentSidebarHeader />
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="mb-2">
            Manager Actions
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map(
                (item) =>
                  item.show && (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton
                        asChild
                        className={getActiveClass(item.url)}
                        onClick={() => navigateToPage(item.url)}
                      >
                        {/* <Link to={item.url} className="py-5"> */}
                        <div className="flex items-center py-5 font-medium cursor-pointer">
                          <item.icon
                            className={
                              isMenuActive(item.url) ? "text-primary" : ""
                            }
                            strokeWidth={3}
                          />
                          <span>{item.title}</span>
                        </div>

                        {/* </Link> */}
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  )
              )}
              {!isSuperAdmin && <InfluencerAddRequestBtn className="mt-4" />}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <InluencerManagementSidebarFooter />
    </Sidebar>
  );
}
