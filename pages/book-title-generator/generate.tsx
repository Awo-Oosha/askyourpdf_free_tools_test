import React, { useLayoutEffect } from 'react';
import dynamic from 'next/dynamic';
import useGenerateInput from '@/hooks/useGenerator';
import { GENERATOR_PARAMETERS } from '@/config/config';
import { msg } from '@lingui/macro';
import { useLingui } from '@lingui/react';


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
    setGenerateAction("BOOK_TITLE_GENERATOR")
  },[setGenerateAction])

  const { _ } = useLingui();

  return (
    <Generator
      header={_(msg`AI Book Title Generator`)}
      subheader={_(msg`Book Title Generator`)}
      desc={_(msg`Fill in the field (s) below to generate your book title`)}
      mainBarDesc={_(msg`Book Title Generator`)}
      inputValue={generateInput}
      setInputValue={(e: React.ChangeEvent<HTMLInputElement>) => setGenerateInput(e.target.value)}
      params={generateParameters}
      setparams={setGenerateParameters}
      generatorOptions={GENERATOR_PARAMETERS.book_title_generator}
      generateClick={handleGenerateClick}
      paramsChange={handleParameterChange}
      generateResult={generatedResult}
      pdfTitle={_(msg`Book Title`)}
      isLoading={isLoading}
      lang = {setLanguage}
      cta_title={_(msg`Generate Book Title`)}
      placeholder ={_(msg`Theme / Topic`)}
    />
  );
};

export default Index;
