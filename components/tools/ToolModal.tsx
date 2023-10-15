import React, { RefObject, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Image from "next/image";
import DoneIcon from "@/img/tools/Done.svg?url";

const ModalBody = styled.div`
width:100%;
height:100%;
position:fixed;
top:0;
left:0;
background: rgba(0, 0, 0, 0.60);
backdrop-filter: blur(8px);
display:flex;
align-items:center;
justify-content:center;
z-index:13;
transition:200ms;
.minner{
    border-radius: 12px;
    background: #FFF;
    box-shadow: 0px 8px 8px -4px rgba(16, 24, 40, 0.03), 0px 20px 24px -4px rgba(16, 24, 40, 0.08);   
    width: 400px;
padding: 24px;
display: flex;
flex-direction: column;
align-items: center;
gap: 32px;
transition:200ms;
animation: grow 0.2s ease-in-out; /* Animation applied on display */
transform-origin: center center;
.content{
    color: #101828;
text-align: center;
font-size: 18px;
font-style: normal;
font-weight: 700;
line-height: 8px;
}
@keyframes grow {
    0% {
      transform: scale(0); /* Start with no scale (hidden) */
    }
    100% {
      transform: scale(1); /* Scale up to 100% (normal size) */
    }
  }
}
`;
const ToolButton= styled.button`
border-radius: 8px;
border: 1px solid #000;
background: #000;
box-shadow: 0px 1px 2px 0px rgba(16, 24, 40, 0.05);
width:100%;
display: flex;
padding: 10px 18px;
justify-content: center;
align-items: center;
color:white;
font-family:inherit;
font-size:15px;
font-weight:500;
`;
const ToolModal = ({
    content,
    click,
    buttonText="Download to files",
    show = false,
}:{
content:String,
click:()=>any,
show:boolean,
buttonText:String,
}) =>{
useEffect(()=>{
    if(show==true){
        document.body.style.overflow = 'hidden';
    }else{
        document.body.style.overflow = 'auto';  
    }
},[show])
return (
show===true?(
    <ModalBody>
    <div className="minner">
    <Image src={DoneIcon} alt="" style={{width:"80px"}} />
    <div className="content">{content}</div>
    <ToolButton onClick={click}>{buttonText}</ToolButton>
    </div>
</ModalBody>
):(<></>)
);
}
export default ToolModal;