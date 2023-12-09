import type { NextPage, GetStaticProps } from "next";
import { loadCatalog } from "@/utils/i18n";
import React, { useRef } from "react";
import {PAGE_DESCRIPTION, PAGE_TITLE, path} from "@/routes";
import {MAIN_APP_URL} from "@/config/config";
import dynamic from "next/dynamic";
import FullLoader from "@/components/tools/FullLoader";

const OcrPage = dynamic(() => import('@/components/tools/OcrPage'), {
  ssr: false,
  loading:()=>{
    return null;
  }
});


export const getStaticProps: GetStaticProps = async (ctx) => {
  const translation = await loadCatalog(ctx.locale!);
  return {
    props: {
      translation,
      description: PAGE_DESCRIPTION[path.ocr],
      title: PAGE_TITLE[path.ocr],
      canonicalUrl: `${MAIN_APP_URL}${path.ocr}`,
      imageUrl : "/49ed616b-fb91-4bb1-2029-ba662f5c9c00/public"
    },
  };
};



const ToolsOcr: NextPage = () => {
  
  return (
    <OcrPage/>
  );
};

export default ToolsOcr;
