import { db } from "../libs/db.js";
import {  getJudge0LanguageId,
  pollBatchResults,
  submitBatch,} from "../libs/judge0.lib.js";

export const createProblem = async (req, res) => {
    const {title,description, difficulty , tags, examples, constraints, testcases, codesnippets, referenceSolutions,} = req.body  


     const validDifficulties = ["EASY", "MEDIUM", "HARD"];
  if (!validDifficulties.includes(difficulty.toUpperCase())) {
    return res.status(400).json({ error: "Invalid difficulty level. Use EASY, MEDIUM, or HARD." });
  }


    if (!req.user || req.user.role !== "ADMIN"){
        return res.status(404).json({message:"access denied-Admins only"})}

try{
     for (const [language, solutionCode] of Object.entries(referenceSolutions)) {
  const lang = String(language).toUpperCase();
  const languageId = getJudge0LanguageId(lang);

  if (!languageId) {
    return res.status(400).json({ error: `language ${language} is not supported` });
  }

  const submission = testcases.map(({ input, output }) => ({
    source_code: solutionCode,
    language_id: languageId,
    stdin: input,
    expected_output: output
  }));

  const submissionResults = await submitBatch(submission);
  const tokens = submissionResults.map((r) => r.token);
  const results = await pollBatchResults(tokens);

  for (let i = 0; i < results.length; i++) {
    const result = results[i];
    if (result.status.id !== 3) {
      return res.status(400).json({ error: `Testcase ${i + 1} failed for language ${language}` });
    }
  }
}

// ✅ This goes AFTER all loops and validations
const newProblem = await db.problem.create({
  data: {
    title,
    description,
    difficulty:difficulty.toUpperCase(),
    tags,
    examples,
    constraints,
    testcases,
    codesnippets,
    referenceSolutions,
    userId: req.user.id,
  },
});

return res.status(200).json(newProblem);

    

}
catch (error) {
  console.error("❌ Error in createProblem:", error);
  return res.status(500).json({
    message: "Error creating problem",
    error: error?.message || JSON.stringify(error) || "Unknown error",
  });
}


}

export const getAllProblems = async (req, res) => {
   try{
    const problems=await db.problem.findMany()
    
    if(!problems){
        return res.status(404).json({message:"No problems found"})
    } 
    res.status(200).json({
        success:true,
        message:"Problems fetched successfully",
        problems
    })
    
   }
   catch(error){
      console.log(error)   
      return res.status(500).json({message:"Error fetching problems"})  
   }
};

export const getProblemById = async (req, res) => {
   const {id}=req.params

   try{
      const problem=await db.problem.findUnique({
        where:{id:parseInt(id)}
      })
      return res.status(200).json(problem)

   }
   catch(error){
      console.log(error)   
      return res.status(500).json({message:"Error fetching problem"})  
   }
};   

export const updateProblem = async (req, res) => {};

export const deleteProblem = async (req, res) => {
   const {id}=req.params;
    try{
      const problem=await db.problem.findUnique({
    where:{id}
   })
   if(!problem){
    return res.status(404).json({error:"Problem not found"})
   }
   await db.problem.delete({
    where:{id}
   })
   res.status(200).json({
      success:true,
      message:"Problem deleted successfully"
   
   
   });

    }catch(error){
      console.log(error)   
      return res.status(500).json({message:"Error deleting problem"})  
   }

   

};

export const getAllProblemsSolvedByUser = async (req, res) => {
  try{
       const problems=await db.problem.findmany({
        where:{
          solvedBy:{
            some:{
              userId:req.user.id
            }
          }
        },
        include:{
          solvedBy:{
            where:{
              userId:req.user.id
            }
          }
        }
       })
       res.status(200).json({
        success:true,
        message:"Problems fetched successfully",
        problems
    })
  }
  catch(error){
      console.log(error)   
      return res.status(500).json({message:"Error fetching problems"})  
   }
};