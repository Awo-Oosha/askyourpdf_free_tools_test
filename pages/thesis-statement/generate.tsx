import React, { useEffect, useState, useLayoutEffect } from 'react';
import dynamic from 'next/dynamic';
import useGenerateInput from '@/hooks/useGenerator';
import { GENERATOR_PARAMETERS } from '@/config/config';
import { alerts } from '@/utils/alerts';
import { useMutation } from 'react-query';
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
    setGenerateAction("THESIS_STATEMENT")
  }, [setGenerateAction])
  
  return (
    <Generator
      header={t`AI Thesis Statement Generator`}
      subheader={t`Thesis Statement Generator`}
      desc={t`Fill in the field (s) below to generate your thesis`}
      mainBarDesc={t`Generate thesis statement`}
      inputValue={generateInput}
      setInputValue={(e: React.ChangeEvent<HTMLInputElement>) => setGenerateInput(e.target.value)}
      params={generateParameters}
      setparams={setGenerateParameters}
      generatorOptions={GENERATOR_PARAMETERS.thesis_generator}
      generateClick={handleGenerateClick}
      paramsChange={handleParameterChange}
      generateResult={generatedResult}
      pdfTitle={t`Thesis`}
      isLoading={isLoading}
      lang={setLanguage}
      cta_title={t`Generate Thesis`}
      placeholder={t`Theme / Topic`}
    />
  );
};

export default Index;
