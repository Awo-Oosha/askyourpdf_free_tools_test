import { useState } from "react";
import { TOOLS_GEN_URL } from "@/config/config";



function useGenerateInput() {
  const [generateInput, setGenerateInput] = useState<any>(null);
  const [generateParameters, setGenerateParameters] = useState<any>({});
  const [generatedResult, setGeneratedResult] = useState<string>("")
  


async function GenerateCall(
  action: string,
  text: string,
  parameters: {},
  language?: string
) {
  const data = {
    action: action,
    text: text,
    parameters: parameters,
    model_temperature: 1,
    language: language,
  };

  try {
    const response = await fetch(`${TOOLS_GEN_URL}/generate`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const responseData = await response.text();
    // console.log(responseData)
    setGeneratedResult(responseData)
    // console.log('POST request successful:', responseData);
  } catch (error) {
    console.error('Error in generateCall:', (error as Error).message);
  }
}


  return {
    generateInput,
    setGenerateInput,
    generateParameters,
    setGenerateParameters,
    GenerateCall,
    generatedResult,
    setGeneratedResult
  };
}

export default useGenerateInput;
