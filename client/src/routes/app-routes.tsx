import { createBrowserRouter } from "react-router-dom";
import MainLayout from "@/layouts/main-layout";
import Home from "@/pages/home";

import InfluencerDetailsPage from "@/pages/influencer-details";
import SearchPage from "@/pages/search";
import JoinInfluencrInPage from "@/pages/join-influencrin";
import LoginPage from "@/pages/login";
import InfluencerManagementLayout from "@/layouts/influencer-management-layout";
import MyAccountPage from "@/pages/my-account";
import ManageInfluencersPage from "@/pages/manage-influencers";
import AddInfluencerPage from "@/pages/add-influencer";
import AuthProvider from "@/providers/auth-provider";
import PrivateRoute from "./private-route";

export const router = createBrowserRouter([
  {
    element: (
      <AuthProvider>
        <MainLayout />
      </AuthProvider>
    ),
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
  {
    element: (
      <AuthProvider>
        <PrivateRoute>
          <InfluencerManagementLayout />
        </PrivateRoute>
      </AuthProvider>
    ),
    children: [
      {
        path: "/my-account",
        element: <MyAccountPage />,
      },
      {
        path: "/manage-influencers",
        element: <ManageInfluencersPage />,
      },
      {
        path: "/add-influencer",
        element: <AddInfluencerPage />,
      },
    ],
  },
]);
