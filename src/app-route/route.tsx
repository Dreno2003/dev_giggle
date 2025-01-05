import MainLayout from "@/layout/main-layout";
import Home from "@/pages/home/home";
import { createBrowserRouter } from "react-router";
// const HomeScreen = lazy(() => import("@/pages/home/HomeScreen"));
// const Analytics = lazy(() => import("@/pages/analytics/AnalyticsMain"));
// const Settings = lazy(() => import("@/pages/settings/SettingsMain"));
// const Storage = lazy(() => import("@/pages/user-storage/StorageMain"));

const mainPathRoutes = [
  {
    path: "",
    element: <Home />,
  },
];
export const routes = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: mainPathRoutes.map(({ path, element }) => ({ path, element })),
  },

  { path: "*", element: <div children="Not Found" /> },
]);
