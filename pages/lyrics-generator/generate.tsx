import React, { useEffect, useState, useLayoutEffect } from 'react';
import dynamic from 'next/dynamic';
import useGenerateInput from '@/hooks/useGenerator';
import { GENERATOR_PARAMETERS } from '@/config/config';
import { Trans, t } from '@lingui/macro';

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
    setGenerateAction("LYRICS_GENERATOR")
  }, [setGenerateAction])


  return (
    <Generator
      header={t`AI Lyrics Generator`}
      subheader={t`Your creative companion on your musical journey, create lyrics that tell your unique story`}
      desc={t`Fill in the field (s) below to generate your Lyrics`}
      mainBarDesc={t`Generate Lyrics`}
      inputValue={generateInput}
      setInputValue={(e: React.ChangeEvent<HTMLInputElement>) => setGenerateInput(e.target.value)}
      params={generateParameters}
      setparams={setGenerateParameters}
      generatorOptions={GENERATOR_PARAMETERS.lyrics_generator}
      generateClick={handleGenerateClick}
      paramsChange={handleParameterChange}
      generateResult={generatedResult}
      pdfTitle={t`Lyrics`}
      isLoading={isLoading}
      lang = {setLanguage}
      cta_title={t`Generate Lyrics`}
      placeholder={t`Theme / Topic`}      
    />
  );
};

export default Index;
