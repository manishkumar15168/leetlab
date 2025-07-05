import {create} from "zustand";
import {axiosInstance} from "../lib/axios";
import toast from "react-hot-toast";
import { ca } from "zod/v4/locales";


export const useProblemStore = create((set) => ({
    problems:[],
    problem:null,
    solvedProblems:[],
    isProblemsLoading:false,
    isProblemLoading:false,


    getAllProblem:async()=>{

      try{
        set({isProblemsLoading:true});
        const res = await axiosInstance.get("/problems"/"get-all problems");
        set({problems:res.data.problems});
        

      }
      catch(error){

        console.log("Error getting problems",error);
        toast.error("Error getting problems");
      
      }
      finally{
        set({isProblemsLoading:false});
      }
    },

    getProblemById:async()=>{
        try{
            set({isProblemLoading:true});

            const res=await axiosInstance.get(`/problems/get-problem/${id}`);
            set({problem:res.data.problem});
            toast.success(res.data.message);
        }catch(error){
            console.log("Error getting problem",error);
            toast.error("Error getting problem");
        }finally{
            set({isProblemLoading:false});
        }
    },
       geSolvedPrblemByUser:async()=>{
        try{
            set({isProblemLoading:true});            

            const res=await axiosInstance.get(`/problems/get-solved-problem`);            
            set({solvedProblems:res.data.solvedProblems});
            toast.success(res.data.message);
        }catch(error){
            console.log("Error getting problem",error);
            toast.error("Error getting problem");
        }finally{
            set({isProblemLoading:false});
        }
    }


}))