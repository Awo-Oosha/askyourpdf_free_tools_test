import FullLoader from "@/components/tools/FullLoader";
import dynamic from "next/dynamic";
import React from "react";
import {GetStaticProps} from "next";
import {loadCatalog} from "@/utils/i18n";
import {PAGE_DESCRIPTION, PAGE_TITLE, path} from "@/routes";
import {MAIN_APP_URL} from "@/config/config";
const Content = dynamic(() => import('@/components/literature-review/MainContent'), {
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
      description: PAGE_DESCRIPTION[path.literatureReview],
      canonicalUrl: `${MAIN_APP_URL}${path.literatureReview}`,
      title : PAGE_TITLE[path.literatureReview],
      imageUrl : "/5f5921a7-4543-4668-9722-a8724e5e8600/public"
    },
  };
};

const LiteratureHome = ()=>{
  return(
   <Content/>
  )
}
export default LiteratureHome