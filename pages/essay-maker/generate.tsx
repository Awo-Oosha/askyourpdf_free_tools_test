import React, { useEffect, useState, useLayoutEffect } from 'react';
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
    setLanguage,
    handleParameterChange,
    isLoading,
    handleGenerateClick,
    setGenerateAction

  } = useGenerateInput();

  useLayoutEffect(() => {
    setGenerateAction("ESSAY_WRITER")
  }, [setGenerateAction])


  return (
    <Generator
      header={t`AI Essay Maker`}
      subheader={t`Essay Maker`}
      desc={t`Fill in the field (s) below to generate your Essay`}
      mainBarDesc={t`Essay Maker`}
      inputValue={generateInput}
      setInputValue={(e: React.ChangeEvent<HTMLInputElement>) => setGenerateInput(e.target.value)}
      params={generateParameters}
      setparams={setGenerateParameters}
      generatorOptions={GENERATOR_PARAMETERS.essay_maker}
      generateClick={handleGenerateClick}
      paramsChange={handleParameterChange}
      generateResult={generatedResult}
      pdfTitle={t`Essay`}
      isLoading={isLoading}
      lang = {setLanguage}
      cta_title={t`Generate Essay`}
      placeholder={t`Title or Topic`}      
    />
  );
};

export default Index;
