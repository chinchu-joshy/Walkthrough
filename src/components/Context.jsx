import React,{useState,useEffect,useContext,createContext} from 'react'

const AuthContext=createContext();
function AuthContextProvider({children}) {
    const [logged, setLogged] = useState(true)
   
    return <AuthContext.Provider value={{logged}}>
        {children}
    </AuthContext.Provider>
}

export default AuthContext;
export  {AuthContextProvider};
