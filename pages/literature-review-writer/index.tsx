import dynamic from "next/dynamic";
import React from "react";
const Content = dynamic(() => import('@/components/literature-review/MainContent'), {
  ssr: false,
});

const LiteratureHome = ()=>{
  return(
   <Content/>
  )
}
export default LiteratureHome