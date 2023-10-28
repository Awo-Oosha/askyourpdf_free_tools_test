import React, {useRef} from "react";
import {styled} from "styled-components";
import  Spinner  from "@/components/Spinner";


const FullLoader =()=>{
    return(<div style={{
        position:"fixed",
        top:"0",
        left:"0",
        width:"100%",
        height:"100%",
        background:"white",
        display:"flex",
        alignItems:"center",
        justifyContent:"center",
        zIndex:"10"}}>
  <Spinner/>
    </div>);
}
export default FullLoader;