import React from 'react'
import { useAuthStore } from "../store/useAuthStore";
import { Loader } from "lucide-react";

const AdminRoute = () => {
    const {authUser,isCheckingAuth}=useAuthStore();


    if(isCheckingAuth){
        return <div className="flex justify-center items-center h-screen">
        <Loader2 className=" size-10 animate-spin" />  
      </div>
    }
    if(!authUser||authUser.role !== "ADMIN"){
        return <Navigate to=""/>
    }

  return <outlet/>
}

export default AdminRoute