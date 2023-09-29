import { createContext } from "react";
import { useProviderAuth } from "../hooks";
const intialState={
    user:null,
    login:()=>{},
    logout:()=>{},
    loading:true,
    signup: () => {},
    updateUser: () => {},
    updateUserFriends: () => {},
}
export const AuthContext=createContext(intialState);
export const AuthProvider=({children})=>{
    const auth=useProviderAuth();
   return <AuthContext.Provider value={auth}>
    {children}
</AuthContext.Provider>
}