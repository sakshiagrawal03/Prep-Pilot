import { createBrowserRouter } from "react-router";
import Home from "./features/interview/pages/Home.jsx";
import Login from "./features/auth/pages/Login";
import Register from "./features/auth/pages/Register.jsx";
import Protected from "./features/auth/components/Protected.jsx";
import Interview from "./features/interview/pages/interview.jsx";
import Privacy from "./features/interview/pages/Privacy.jsx";
import Terms from "./features/interview/pages/Terms.jsx";

export const router=createBrowserRouter([
   
     {
          path:"/login",
          element:<Login />
     },
     {
          path:"/register",
          element:<Register />
     },
     {
          path:"/privacy",
          element:<Privacy />
     },
     {
          path:"/terms",
          element:<Terms />
     },
    
     {
          path:"/",
          element:<Protected><Home/></Protected>
     },
     {
          path:"/interview/:interviewId",
          element:<Protected><Interview/></Protected>
     }


])




