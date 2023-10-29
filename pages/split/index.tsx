import type { NextPage, GetStaticProps } from "next";
import { loadCatalog } from "@/utils/i18n";
import React  from "react";
import {PAGE_DESCRIPTION, PAGE_TITLE, path} from "@/routes";
import {MAIN_APP_URL} from "@/config/config";
import dynamic from "next/dynamic";
import FullLoader from "@/components/tools/FullLoader";

const SplitPage = dynamic(() => import('@/components/tools/SplitPage'), {
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
      description : PAGE_DESCRIPTION[path.split],
      title : PAGE_TITLE[path.split],
      canonicalUrl: `${MAIN_APP_URL}${path.split}`,
      imageUrl: "/8be5c292-3c30-4ef1-8960-5ce8b2f78900/public"
    },
  };
};


const ToolsSplit: NextPage = () => {
  
  return (
    <SplitPage/>
  );
};

export default ToolsSplit;