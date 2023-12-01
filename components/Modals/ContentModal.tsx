
import React, { useState } from "react";
import { Modal, Row, Col, Input, Space } from "antd";
import styled from "styled-components";
import { Trans, t } from "@lingui/macro";
import { Dropdown, Button, Checkbox } from "antd";
import {  CheckOutlined } from "@ant-design/icons";
import CalendarIcon from "@/img/CalendarDate.svg?url";
import Image from "next/image";
import TagsInput from "../keywordInput";
import type { CheckboxChangeEvent } from "antd/es/checkbox";
 
const Body = styled.div`
width:100%;
height:100%;
position:fixed;
background:rgba(0,0,0,0.1);
left:0;
top:0;
display:flex;
justify-content:center;
align-items:center;
z-index:100;
`;
const Dialog = styled.div`
width:400px;
padding:40px;
border-radius:10px;
background:white;
font-family: var(--font-satoshi);
*{
    box-sizing:border-box;
    font-family: var(--font-satoshi);
}
h3{
    font-size:25px;
    color:black;
}
sub{
    font-size:14px;
    color:black;
}
input{
    width:100%;
    border:1px solid grey;
    padding:10px;
    border-radius:6px;
    margin-top:20px;
}
.btlist{
    display:flex;
    gap:12px;
    width:100%;
.buttonClose{
    background:transparent !important;
    color:black;
    border:2px solid black;
    padding:
}
}
button{
    margin-top:15px;
    width:100%;
    padding:14px;
    border-radius:8px;
    background:black;
    color:white;
    font-weight:700;
    border:0;
    
}
`;
export const ContentModal = ({open,setOpen,header,description,returnFunction,cindex,append}:{
    open:any,
    setOpen:any,
    header:any,
    description:any,
    returnFunction:any,
    cindex:any,
    append:any
}) =>{
    const [inputed,setInputed] = useState("");
return(
    open ==true? (
    <Body>
        <Dialog>
            <h3>{header}</h3>
            <div className="sub">{description}</div>
            <input type="text" placeholder="Enter value here" value={inputed} onChange={(e)=>{setInputed(e.target.value)}}  />
            <div className="btlist">
            <button onClick={()=>{
                returnFunction(`${append} ${inputed}`,cindex)
                setOpen(false);
            }}>Continue</button>
             <button className="buttonClose" onClick={()=>{
                setOpen(false);
            }}>Close</button>
            </div>
        </Dialog>
     </Body>)
            :(<></>)
)
}