import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import useGenerateInput from '@/hooks/useGenerator';
import { GENERATOR_PARAMETERS } from '@/config/config';
import { alerts } from '@/utils/alerts';
import { useMutation } from 'react-query';
import { Trans, t } from '@lingui/macro';
import { ChatLocales } from "@/config/config";


interface IndexProps { }

const Generator = dynamic(() => import('@/components/tools/Generator/Generator'), {
  ssr: false,
  loading: () => null,
});

const Index: React.FC<IndexProps> = () => {
  //  Custom hooks
  const {
    generateInput,
    setGenerateInput,
    generateParameters,
    setGenerateParameters,
    generatedResult, 
    GenerateCall,
    setLanguage

  } = useGenerateInput();

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
    await GenerateCall('LYRICS_GENERATOR', generateInput, generateParameters);

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

  return (
    <Generator
      header="AI Rap Generator"
      subheader="Rap Generator"
      desc="Fill in the field (s) below to generate your Rap"
      mainBarDesc = "Rap Generator"
      inputValue={generateInput}
      setInputValue={(e: React.ChangeEvent<HTMLInputElement>) => setGenerateInput(e.target.value)}
      params={generateParameters}
      setparams={setGenerateParameters}
      generatorOptions={GENERATOR_PARAMETERS.rap_generator}
      generateClick={handleGenerateClick}
      paramsChange={handleParameterChange}
      generateResult={generatedResult}
      pdfTitle={'Rap'}
      isLoading={isLoading}
      lang = {setLanguage}
      cta_title={t`Generate Rap`}      
    />
  );
};

export default Index;
