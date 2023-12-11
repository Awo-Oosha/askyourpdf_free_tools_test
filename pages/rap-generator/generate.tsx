import React, { useEffect, useState, useLayoutEffect } from 'react';
import dynamic from 'next/dynamic';
import useGenerateInput from '@/hooks/useGenerator';
import { GENERATOR_PARAMETERS } from '@/config/config';
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
    setLanguage,
    handleParameterChange,
    isLoading,
    handleGenerateClick,
    setGenerateAction

  } = useGenerateInput();

  useLayoutEffect(() => {
    setGenerateAction("RAP_GENERATOR")
  }, [setGenerateAction])

  return (
    <Generator
      header={t`AI Rap Generator`}
      subheader={t`Rap Generator`}
      desc={t`Fill in the field (s) below to generate your Rap`}
      mainBarDesc = {t`Generate Rap`}
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
