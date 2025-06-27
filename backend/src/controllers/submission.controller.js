import { db } from "../libs/db.js";

export const getAllSubmissions = async (req, res) => {
    try{
           const userId=req.user.id;

           const submission=await db.submission.findMany({
            where:{userId:userId}});

            res.status(200).json({
                success:true,
                message:"Submissions fetched successfully",
                submission
            })

    }
    catch(error){
         console.error ("fetch Submission Error:",error);
         res.status(500).json({message:"failed to fetch submissions"})   
    }
};

export const getSubmissionsForProblem = async (req, res) => {;
       
     try{
           const userId=req.user.id;

           const submission=await db.submission.findMany({
            where:{userId:userId,problemId:problemId}});

            res.status(200).json({
                success:true,
                message:"Submissions fetched successfully",
                submission
            })

    }
    catch(error){
         console.error ("fetch Submission Error:",error);
         res.status(500).json({message:"failed to fetch submissions"})   
    }

};


export const getAllSubmissionsForProblem = async (req, res) => {
   try{
           const userId=req.user.id;

           const submission=await db.submission.count({
            where:{problemId:problemId}});

            res.status(200).json({
                success:true,
                message:"Submissions fetched successfully",
                count:submission
            })

    }
    catch(error){
         console.error ("fetch Submission Error:",error);
         res.status(500).json({message:"failed to fetch submissions"})   
    }
};
