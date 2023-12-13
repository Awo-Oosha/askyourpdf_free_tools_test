import React, { useEffect, useState, useLayoutEffect } from 'react';
import dynamic from 'next/dynamic';
import useGenerateInput from '@/hooks/useGenerator';
import { GENERATOR_PARAMETERS } from '@/config/config';
import { msg } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import { PAGE_DESCRIPTION, PAGE_TITLE, path } from "@/routes";
import { MAIN_APP_URL } from "@/config/config";
import { GetStaticProps } from "next";
import { loadCatalog } from "@/utils/i18n";


export const getStaticProps: GetStaticProps = async (ctx) => {
  const translation = await loadCatalog(ctx.locale!);
  return {
    props: {
      translation,
      description: PAGE_DESCRIPTION[path.thesis],
      canonicalUrl: `${MAIN_APP_URL}${path.thesis}`,
      title: PAGE_TITLE[path.thesis],
      imageUrl: "/6201447e-3545-4eb4-334d-cadf31496100/public"
    },
  };
};

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

  const { _ } = useLingui()
  return (
    <Generator
      header={_(msg`AI Thesis Statement Generator`)}
      subheader={_(msg`Thesis Statement Generator`)}
      desc={_(msg`Fill in the field (s) below to generate your thesis`)}
      mainBarDesc={_(msg`Generate thesis statement`)}
      inputValue={generateInput}
      setInputValue={(e: React.ChangeEvent<HTMLInputElement>) => setGenerateInput(e.target.value)}
      params={generateParameters}
      setparams={setGenerateParameters}
      generatorOptions={GENERATOR_PARAMETERS.thesis_generator}
      generateClick={handleGenerateClick}
      paramsChange={handleParameterChange}
      generateResult={generatedResult}
      pdfTitle={_(msg`Thesis`)}
      isLoading={isLoading}
      lang={setLanguage}
      cta_title={_(msg`Generate Thesis`)}
      placeholder={_(msg`Theme / Topic`)}
    />
  );
};

export default Index;
