import axios from "axios";
export const getJudge0LanguageId = (language) => {
    const languageMap = {
       "PYTHON":71,
       "JAVA":72,
       "JAVASCRIPT":63,
    }
    return languageMap[language.toUpperCase()];
}

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const pollBatchResults=async (tokens) =>{
    while(true){
        const {data} =await axios.get(`${process.env.JUDGE0_API_URL}/submissions/batch`,{
            params:{
            tokens:tokens.join(","),
            base64_encoded:false,
            }
        });

        const results=data.submissions;

        const isAllDone=results.every(
            (r)=>r.status.id !== 1 &&  r.status.id !== 2
        )

        
        if(isAllDone)
            return results
            await sleep(1000);
        
    }
}


export const submitBatch = async (submission) => {
  const { data } = await axios.post(
    `${process.env.JUDGE0_URL}/submissions/batch?base64_encoded=false`,
    { submissions: submission }  // <-- This is important!
  );
  return data;
};


export function getLanguage(languageId) {
  const LANGUAGE_NAMES  = {
    71: "PYTHON",
    72: "JAVA",
    63: "JAVASCRIPT",
  };
  return LANGUAGE_NAMES [languageId] ||"unknown";
}