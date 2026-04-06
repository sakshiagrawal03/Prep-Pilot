import { createContext,useState} from "react";

export const AuthContext =createContext()

export const AuthProvider=({children})=>{

     const [user,setUser]=useState(null)
     const [loading,setLoading]=useState(true)  //when user profile reloads 

     


     return (
          <AuthContext.Provider value={{user,setUser,loading,setLoading}}>
               {children}
          </AuthContext.Provider>
     )
}


//AuthProvider: Holds the user state and methods like login() and logout()

//AuthContext:The "pipe" that transports the data.