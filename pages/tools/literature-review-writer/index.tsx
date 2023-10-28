import FullLoader from "@/components/tools/FullLoader";
import dynamic from "next/dynamic";
import React from "react";
const Content = dynamic(() => import('@/components/literature-review/MainContent'), {
  ssr: false,
  loading:()=>{
    return(<FullLoader/>);
  }
});

const LiteratureHome = ()=>{
  return(
      <Content/>
  )
}
export default LiteratureHome