import { PostDetails, PostsFeed } from "@/pages";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <PostsFeed />,
  },
  {
    path: "/:id",
    element: <PostDetails />,
  },
]);
