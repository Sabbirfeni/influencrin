import InfluencerManagementSidebar from "@/components/influencer/influencer-management/influencer-management-sidebar/influencer-management-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

export default function InfluencerManagementLayout({
  children,
}: {
  children?: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <InfluencerManagementSidebar />
      <main>
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  );
}
