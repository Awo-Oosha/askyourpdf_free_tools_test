import type { NextPage, GetStaticProps } from "next";
import { loadCatalog } from "@/utils/i18n";
import React, { useRef } from "react";
import {PAGE_DESCRIPTION, path} from "@/routes";
import {MAIN_APP_URL} from "@/config/config";
import dynamic from "next/dynamic";
import FullLoader from "@/components/tools/FullLoader";

const OcrPage = dynamic(() => import('@/components/tools/OcrPage'), {
  ssr: false,
  loading:()=>{
    return (<FullLoader/>);
  }
}); 


export const getStaticProps: GetStaticProps = async (ctx) => {
  const translation = await loadCatalog(ctx.locale!);
  return {
    props: {
      translation,
      description : PAGE_DESCRIPTION[path.tools],
      canonicalUrl: `${MAIN_APP_URL}/`,
    },
  };
};



const ToolsOcr: NextPage = () => {
  
  return (
    <OcrPage/>
  );
};

export default ToolsOcr;
