import { useState, useEffect } from "react";
import { TOOLS_GEN_URL } from "@/config/config";
import { ChatLocales } from "@/config/config";
import { useRouter } from "next/router";
import { alerts } from "@/utils/alerts";



function useGenerateInput() {
  const [generateInput, setGenerateInput] = useState<any>(null);
  const [generateParameters, setGenerateParameters] = useState<any>({});
  const [generatedResult, setGeneratedResult] = useState<string>("");
  const [language, setLanguage] = useState<any>(null);
  const langValue = ChatLocales[language];

  useEffect(() => {
    if(language === null || undefined) {
      setLanguage("ENGLISH")
    } 
  }, [language]) 
async function GenerateCall(
  action: any,
  text: string,
  parameters: {},
) {


  const data = {
    action: action,
    text: text,
    parameters: parameters,
    model_temperature: 1,
    language: langValue,
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
    setGeneratedResult(responseData);
    
    return { success: true, data: responseData };
  } catch (error) {
    console.error('Error in GenerateCall:', (error as Error).message);
    alerts.error('Error in Generating', (error as Error).message)
    return { success: false, error: (error as Error).message };
  }
}

  return {
    generateInput,
    setGenerateInput,
    generateParameters,
    setGenerateParameters,
    GenerateCall,
    generatedResult,
    setGeneratedResult,
    setLanguage,
    language
  };
}

export default useGenerateInput;
