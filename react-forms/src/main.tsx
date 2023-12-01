import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter} from "react-router-dom";
import MainPage from "./Pages/MainPage";
import UncontrolledForm from "./Pages/UncontrolledForm";
import ReactHookForm from "./Pages/ReactHookForm";
import { setupStore } from "./store/store";
import { Provider } from "react-redux";

const router = createBrowserRouter([
  {
    path:"/",
    element: <MainPage/>,
  },
  {
    path:"/main",
    element: <MainPage/>,
  },
  {
    path:"/UncontrolledForm",
    element: <UncontrolledForm/>,
  },
  {
    path:"/ReactHookForm",
    element: <ReactHookForm/>,
  },
])

const store = setupStore();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
    <RouterProvider router={router}/>
    </Provider>
  </React.StrictMode>,
);
