import {db} from "../libs/db.js";
import {getLanguage,pollBatchResults,submitBatch} from "../libs/judge0.lib.js";


export const executeCode = async (req, res) => {
   try{
     
const {source_code,language_id,stdin,expected_output,problemId}=req.body;

const userId=req.user.id;
   
if(
   !Array.isArray(stdin)||
   stdin.length===0||
   !Array.isArray(expected_output)||
   expected_output.length!==stdin.length
)
{

   return res.status(400).json({error:"Invalid or Missing test cases"});
}

const submissions =stdin.map((input)=>({
   source_code,
   language_id,
   stdin:input,
   base64_encoded:false,
   wait:false,



}));

const submitResponse=await submitBatch(submissions);

const tokens=submitResponse.map((result)=>result.token);

const results=await pollBatchResults(tokens);

console.log('Results-------');
console.log(results);

let allPassed=true;
const detailedResults=results.map((result,i)=>{
   const stdout=result.stdout?.trim();
   const expected=expected_output[i].trim();
   const passed=stdout===expected_output;

   if(!passed)
      allPassed=false;

   return{
      testCase:i+1,
      passed,
      expected:expected_output,
      stderr:result.stderr||null,
      compile_output:result.compile_output||null,
      stdout,
      status:result.status.description,
      time:result.time?`${result.time}s`:undefined,
      memory:result.memory?`${result.memory}kb`:undefined,
   }
   
   
})

console.log(detailedResults);
const submission=await Submission.create({
   data:{
      userId,
      problemId,
      source_code:source_code,
      language:getLanguage(language_id),
      stdin:stdin.join('\n'),
      stdout:json.stringify(detaildResults.map((r)=>r.stdout)),
      stderr:detailedResults.some((r)=>r.stderr)?json.stringify(detailedResults.map((r)=>r.stderr)):null,
      compile_output:detailedResults.some((r)=>r.compile_output)?json.stringify(detailedResults.map((r)=>r.compile_output)):null,
      time:detailedResults.some((r)=>r.time)?json.stringify(detailedResults.map((r)=>r.time)):null,
      memory:detailedResults.some((r)=>r.memory)?json.stringify(detailedResults.map((r)=>r.memory)):null,
      status:allPassed?"Accepted":"wrong answer",

   }
})
if(allPassed)
{
   await db.problemSolved.upsert({
      where:{problemId_userId:{problemId,userId}},
      update:{},
      create:{problemId,userId},
   })
}

const testCasesResults=detailedResults.map((result)=>({

      submissionId:submission.id,
      testCase:result.testCase,
      passed:result.passed,
      stdout:result.stdout,
      expected:result.expected,
      stderr:result.stderr,
      compile_output:result.compile_output,
      status:result.status,
      time:result.time,
      memory:result.memory
   }))

   await db.testCaseResult.createMany({
      data:testCasesResults
   })
   const submissionTestCases=await db.testCaseResult.findMany({
      where:{Id:submission.id},
   include:{testCases:true}
   })



res.status(200).json({
   message:"Code executed successfully",
});









   }

   catch(error){
   }

};