import { RouterProvider } from "react-router";
import "./App.css";
import { routes } from "./app-route/route";
import { Provider } from "react-redux";
import store from "./store/root-reducer";

function App() {
  return (
    <>
      <Provider store={store}>
        <RouterProvider router={routes} />
      </Provider>
    </>
  );
}

export default App;
