import { RouterProvider } from "react-router"
import { router } from "./app.routes.jsx"
import { AuthProvider } from "./features/auth/auth.context.jsx"
import { InterviewProvider } from "./features/interview/interview.context.jsx"


function App() {
  return (
    //wrapping whole application inside authprovider
    <AuthProvider> 
      <InterviewProvider>
       <RouterProvider router={router}/>
      </InterviewProvider>
    </AuthProvider>
   
  )
}

export default App
