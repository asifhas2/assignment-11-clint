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
import Details from "../Pages/PublicLesson/LessonDetails";
import MyFavorite from "../Pages/Dashboard/User Dashboard/MyFavorite";
import Profile from "../Pages/Dashboard/User Dashboard/Profile";
import UsersManegment from "../Pages/Dashboard/Admin Dashboard/UsersManegment";
import PrivateRoute from "../Pages/PrivateRoute";
import DashBoardHome from "../Pages/Dashboard/DashBoardHome";
import ManageLessons from "../Pages/Dashboard/Admin Dashboard/ManageLessons";
import FlaggedLesson from "../Pages/Dashboard/Admin Dashboard/FlaggedLesson";
import AdminPrivateRout from "../Pages/AdminPrivateRout";
import NotFound from "../Components/NotFound";
import About from "../Components/About ";
import Terms from "../Components/Terms";
import { path } from "framer-motion/client";
import PrivacyPolicy from "../Components/PrivacyPolicy";
import SupportCenter from "../Components/SupportCenter";

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
        path: "/public-lessons/:id",
       element:<Details></Details>
     
      },
      {
        path: "/upgrade",
        element:<PrivateRoute><Pricing></Pricing></PrivateRoute>
      },
      {
        path: "/login",
        Component: Login,
      },
      {
        path: "/register",
        Component: Register,
      },
      {
        path: "/payment-success",
        element: <PaymentSuccess></PaymentSuccess>,
      },
      {
           path:'/payment-cancel',
           element:<PaymentCenceld></PaymentCenceld>
      },
      {
        path:'/about',
        Component:About
      },
      {
        path:'/terms',
        Component:Terms
      },
      {
        path:'/privacy',
        Component:PrivacyPolicy
      },
      {
        path:'/support',
        Component:SupportCenter
      }
    ],
  },
  {
    path: "/dashboard",
    element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
    children: [
      {
        index:true,
        Component:DashBoardHome
      },
      {
        path: "add-lesson",
        Component: AddLesson,
      },
      {
        path: "my-lessons",
        Component: MyLesson,
      },
      {
        path: "my-favorite",
        Component: MyFavorite,
      },
      {
        path: "profile",
        Component: Profile,
      },
      {
           path:'user-management',
           element:<AdminPrivateRout><UsersManegment></UsersManegment></AdminPrivateRout>
      },
      {
           path:'manage-lessons',
           element:<AdminPrivateRout><ManageLessons></ManageLessons></AdminPrivateRout>
      },
      {
           path:'flagged-lesson',
           element:<AdminPrivateRout><FlaggedLesson></FlaggedLesson></AdminPrivateRout>
      },

    ],
  },
   {
    path: "*",
    element: <NotFound />,
  },
]);
