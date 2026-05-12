import { createBrowserRouter } from "react-router";
import Root from "../Layouts/Root";
import Home from "../Pages/HomePage/Home";
import Dashboard from "../Layouts/Dashboard";
import AddLesson from "../Pages/Dashboard/User Dashboard/AddLesson";
import MyLesson from "../Pages/Dashboard/User Dashboard/MyLesson";
import PublicLesson from "../Pages/PublicLesson/PublicLesson";
import Pricing from "../Pages/Pricing/Pricing";
import Login from "../Pages/Authentication/Login";
import Register from "../Pages/Authentication/Register";
import PaymentSuccess from "../Pages/Dashboard/User Dashboard/PaymentSuccess";
import PaymentCenceld from "../Pages/Dashboard/User Dashboard/PaymentCenceld";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "/public-lessons",
        Component: PublicLesson,
      },
      {
        path: "/upgrade",
        Component: Pricing,
      },
      {
        path: "/login",
        Component: Login,
      },
      {
        path: "/register",
        Component: Register,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <Dashboard></Dashboard>,
    children: [
      {
        path: "add-lesson",
        Component: AddLesson,
      },
      {
        path: "my-lessons",
        Component: MyLesson,
      },
      {
        path: "payment-success",
        element: <PaymentSuccess></PaymentSuccess>,
      },
      {
           path:'payment-cancel',
           element:<PaymentCenceld></PaymentCenceld>
      }
    ],
  },
]);
