import { RouterProvider } from "react-router";
import "./App.css";
import { routes } from "./app-route/route";

function App() {
  return (
    <>
      <RouterProvider router={routes} />
    </>
  );
}

export default App;
