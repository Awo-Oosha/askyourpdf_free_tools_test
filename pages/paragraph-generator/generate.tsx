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
    setGenerateAction("PARAGRAPH_WRITER")
  }, [setGenerateAction])


  return (
    <Generator
      header={t`AI Paragraph Generator`}
      subheader={t`Paragraph Generator`}
      desc={t`Fill in the field (s) below to generate your paragraph`}
      mainBarDesc={t`Generate Paragraph`}
      inputValue={generateInput}
      setInputValue={(e: React.ChangeEvent<HTMLInputElement>) => setGenerateInput(e.target.value)}
      params={generateParameters}
      setparams={setGenerateParameters}
      generatorOptions={GENERATOR_PARAMETERS.paragraph_generator}
      generateClick={handleGenerateClick}
      paramsChange={handleParameterChange}
      generateResult={generatedResult}
      pdfTitle={t`Paragraph`}
      isLoading={isLoading}
      lang={setLanguage}
      cta_title={t`Generate Paragraph`}
      placeholder={t`Main idea/supporting points`}
    />
  );
};

export default Index;
