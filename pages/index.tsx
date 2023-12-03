import type { NextPage, GetStaticProps } from "next";
import { loadCatalog } from "@/utils/i18n";
import React, { lazy, Suspense } from "react";
import { PAGE_DESCRIPTION, PAGE_TITLE, path } from "@/routes";
import { MAIN_APP_URL } from "@/config/config";
import FullLoader from "@/components/tools/FullLoader";

export const getStaticProps: GetStaticProps = async (ctx) => {
  const translation = await loadCatalog(ctx.locale!);
  return {
    props: {
      translation,
      description: PAGE_DESCRIPTION[path.tools],
      title: PAGE_TITLE[path.tools],
      canonicalUrl: `${MAIN_APP_URL}${path.tools}`,
      imageUrl: "/5f5921a7-4543-4668-9722-a8724e5e8600/public"
    },
  };
}

const LazyMainPage = lazy(() => import("@/components/tools/MainPage"));


const Tools: NextPage = () => {

  return (
    <Suspense fallback={""}>
      <LazyMainPage />
    </Suspense>
  );
};

export default Tools;
