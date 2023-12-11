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
    setGenerateAction("INSTAGRAM_CAPTION")
  }, [setGenerateAction])


  return (
    <Generator
      header={t`AI Instagram Caption Generator`}
      subheader={t`Instagram Caption Generator`}
      desc={t`Fill in the field (s) below to generate your instagram caption`}
      mainBarDesc={t`Generate Instagram Caption`}
      inputValue={generateInput}
      setInputValue={(e: React.ChangeEvent<HTMLInputElement>) => setGenerateInput(e.target.value)}
      params={generateParameters}
      setparams={setGenerateParameters}
      generatorOptions={GENERATOR_PARAMETERS.instagram_caption}
      generateClick={handleGenerateClick}
      paramsChange={handleParameterChange}
      generateResult={generatedResult}
      pdfTitle={t`Instagram Caption`}
      isLoading={isLoading}
      lang = {setLanguage}
      cta_title={t`Generate Instagram Caption`}
      placeholder={t`Theme / Topic`}      
    />
  );
};

export default Index;
