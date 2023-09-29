import {  Navigate } from "react-router-dom";
import { useAuth } from "../hooks";
import { Outlet } from "react-router-dom";        
const PrivateRoute=()=>{
            const auth = useAuth();
            
        return (
            auth.user?<Outlet/>:<Navigate to='/login'/>

        )
    }


export default PrivateRoute;