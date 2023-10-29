import type { NextPage, GetStaticProps } from "next";
import { loadCatalog } from "@/utils/i18n";
import React, { useRef } from "react";
import {PAGE_DESCRIPTION, PAGE_TITLE, path} from "@/routes";
import {MAIN_APP_URL} from "@/config/config";
import dynamic from "next/dynamic";
import FullLoader from "@/components/tools/FullLoader";

const MergePage = dynamic(() => import('@/components/tools/MergePage'), {
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
      description: PAGE_DESCRIPTION[path.merge],
      title: PAGE_TITLE[path.merge],
      canonicalUrl: `${MAIN_APP_URL}${path.merge}`,
      imageUrl : "/f7e8f296-465a-49c6-54a7-799c95d8a300/public"
    },
  };
};



const ToolsMerge: NextPage = () => {
  
  return (
    <MergePage/>
  );
};

export default ToolsMerge;
