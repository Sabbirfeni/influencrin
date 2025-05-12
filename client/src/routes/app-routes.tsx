import { createBrowserRouter } from "react-router-dom";
import Home from "@/pages/home";
import PublicLayout from "@/layouts/public-layout";
import InfluencerDetailsPage from "@/pages/influencer-details";
import SearchPage from "@/pages/search";
import JoinInfluencrInPage from "@/pages/join-influencrin";
import LoginPage from "@/pages/login";
import InfluencerManagementLayout from "@/layouts/influencer-management-layout";
import MyAccountPage from "@/pages/my-account";
import ManageInfluencersPage from "@/pages/manage-influencers";
import AddInfluencerPage from "@/pages/add-influencer";
import PrivateRoute from "./private-route";
import MainLayout from "@/layouts/main-layout";
import SuperAdminRoute from "./super-admin-route";
import AnalyticsPage from "@/pages/analytics";

export const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      // All public routes
      {
        element: <PublicLayout />,
        children: [
          {
            path: "/",
            element: <Home />,
          },
          {
            path: "/influencers/:handle",
            element: <InfluencerDetailsPage />,
          },
          {
            path: "/search",
            element: <SearchPage />,
          },
          {
            path: "/join-influencrin",
            element: <JoinInfluencrInPage />,
          },
          {
            path: "/login",
            element: <LoginPage />,
          },
        ],
      },
      // All private routes
      {
        element: (
          <PrivateRoute>
            <InfluencerManagementLayout />
          </PrivateRoute>
        ),
        children: [
          {
            path: "/my-account",
            element: <MyAccountPage />,
          },
          {
            element: <SuperAdminRoute />,
            children: [
              { path: "/analytics", element: <AnalyticsPage /> },
              {
                path: "/add-influencer",
                element: <AddInfluencerPage />,
              },
              {
                path: "/manage-influencers",
                element: <ManageInfluencersPage />,
              },
            ],
          },
        ],
      },
    ],
  },
]);
