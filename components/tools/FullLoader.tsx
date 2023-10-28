import React, {useRef} from "react";
import {styled} from "styled-components";
import  Spinner  from "@/components/Spinner";

const PageLoader = styled.div`
position:fixed;
top:0;
left:0;
width:100%;
height:100%;
background:white;
display:flex;
align-items:center;
justify-content:center;
z-index:10;
`;

const FullLoader =()=>{
    return(<PageLoader>
  <Spinner/>
    </PageLoader>);
}
export default FullLoader;