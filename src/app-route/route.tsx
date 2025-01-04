import Home from "@/pages/home/home";
import { createBrowserRouter } from "react-router";
// const HomeScreen = lazy(() => import("@/pages/home/HomeScreen"));
// const Analytics = lazy(() => import("@/pages/analytics/AnalyticsMain"));
// const Settings = lazy(() => import("@/pages/settings/SettingsMain"));
// const Storage = lazy(() => import("@/pages/user-storage/StorageMain"));

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },

  { path: "*", element: <div children="Not Found" /> },
]);
