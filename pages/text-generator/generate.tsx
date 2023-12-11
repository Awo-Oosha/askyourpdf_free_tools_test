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
    setGenerateAction("TEXT_GENERATOR")
  }, [setGenerateAction])

  return (
    <Generator
      header={t`AI Text Generator`}
      subheader={t`Text Generator`}
      desc={t`Fill in the field (s) below to generate your text`}
      mainBarDesc={t`Generate text`}
      inputValue={generateInput}
      setInputValue={(e: React.ChangeEvent<HTMLInputElement>) => setGenerateInput(e.target.value)}
      params={generateParameters}
      setparams={setGenerateParameters}
      generatorOptions={GENERATOR_PARAMETERS.text_generator}
      generateClick={handleGenerateClick}
      paramsChange={handleParameterChange}
      generateResult={generatedResult}
      pdfTitle={t`text`}
      isLoading={isLoading}
      lang={setLanguage}
      cta_title={t`Generate Text`}
      placeholder={t`Theme / Topic`}
    />
  );
};

export default Index;
