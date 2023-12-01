import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider, createBrowserRouter} from "react-router-dom";
import MainPage from "./Pages/MainPage";
import UncontrolledForm from "./Pages/UncontrolledForm";
import ReactHookForm from "./Pages/ReactHookForm";

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

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
);
