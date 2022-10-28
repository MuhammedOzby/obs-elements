import { createBrowserRouter } from "react-router-dom";
import PageConnection from "./pages/Connection.page";
import PageMain from "./pages/Main.page";
import PageRecord from "./pages/Record.page";
import PageStream from "./pages/Stream.page";

export default createBrowserRouter([
  {
    path: "",
    element: <PageMain />,
    children: [
      {
        path: "",
        element: <PageConnection />,
      },
      {
        path: "record",
        element: <PageRecord />,
      },
      {
        path: "stream",
        element: <PageStream />,
      },
    ],
  },
]);
