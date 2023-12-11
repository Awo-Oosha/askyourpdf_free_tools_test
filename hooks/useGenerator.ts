import { useState, useEffect } from "react";
import { TOOLS_GEN_URL } from "@/config/config";
import { ChatLocales } from "@/config/config";
import { useRouter } from "next/router";
import { useMutation } from 'react-query';
import { alerts } from "@/utils/alerts";



function useGenerateInput() {
  const [generateInput, setGenerateInput] = useState<any>(null);
  const [generateParameters, setGenerateParameters] = useState<any>({});
  const [generatedResult, setGeneratedResult] = useState<string>("");
  const [generateAction, setGenerateAction] = useState<string>("")
  const [language, setLanguage] = useState<any>(null);
  const langValue = ChatLocales[language];

    // Generate Page Parameters
  const handleParameterChange = (type: string, generateParameter: any) => {
    setGenerateParameters((prevState: any) => ({
      ...prevState,
      [type]: generateParameter,
    }));
  };


  const { mutate, isLoading } = useMutation(
    'generateDocument',
    async () => {

      if (!generateInput) {
        alerts.error('Generate Failed', 'The text field cannot be empty. Please try again.');

        throw new Error('generateInput and generateParameters cannot be empty');

      }
      await GenerateCall(generateAction, generateInput, generateParameters);

      setGenerateInput("");
    },
    {
      onError: (error) => {
        console.error('Error in GenerateCall:', error);
        alerts.error('Generate Failed', 'Unable to generate document. Please try again.');
      },
    }
  );


  const handleGenerateClick = () => {
    // Trigger the mutation
    mutate();
  };

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
    language,
    handleParameterChange,
    isLoading,
    handleGenerateClick,
    setGenerateAction
  };
}

export default useGenerateInput;
