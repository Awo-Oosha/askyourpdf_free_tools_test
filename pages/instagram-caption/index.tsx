import React, {ChangeEvent, useEffect, useRef, useState} from "react";
import {Layout} from "antd";
import {Content} from "antd/lib/layout/layout";
import styled from "styled-components";
import LyricsGen from "@/img/AI-instagram-caption-generator.png";
import {alerts} from "@/utils/alerts";
import {t, Trans} from "@lingui/macro";
import {GetStaticPaths, GetStaticProps} from "next";
import {loadCatalog} from "@/utils/i18n";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import {PAGE_DESCRIPTION, PAGE_TITLE, path} from "@/routes";
import {FAQDATA, MAIN_APP_URL} from "@/config/config";
import {useRouter} from "next/router";
import {routerData } from "@/services/libtools";


export const getStaticProps: GetStaticProps = async (ctx) => {
    const translation = await loadCatalog(ctx.locale!);
    return {
        props: {
            translation,
            description: PAGE_DESCRIPTION[path.sourceTool],
            canonicalUrl: `${MAIN_APP_URL}${path.sourceTool}`,
            title: PAGE_TITLE[path.sourceTool],
            imageUrl: "/6201447e-3545-4eb4-334d-cadf31496100/public"
        },
    };
};
export const options:any = [
    {name:"Select Type of Post",data:[
        {label:"Travel",key:"Travel",  onClick:(key:any)=>{}},
        {label:"Food",key:"Food",onClick:(key:any)=>{}},
        {label:"Passion",key:"Passion",onClick:(key:any)=>{}},
    ]},
    {name:"Select Mood ",data:[
        {label:"Funny",key:"Funny",  onClick:(key:any)=>{}},
        {label:"Inspirational",key:"Inspirational",onClick:(key:any)=>{}},
        {label:"Casual",key:"Casual",onClick:(key:any)=>{}},
        {label:"Serious",key:"Serious",onClick:(key:any)=>{}},

    ]}
    ,
    {name:"Hashtags Preferences",data:[
        {label:"Include Hashtag or not",key:"Include Hashtag or not",  onClick:(key:any)=>{}},
        {label:"Specific Hashtags",key:"Specific Hashtags",onClick:(key:any)=>{}},
        
    ]}
    ,
    {name:"Mention Preferences",data:[
        {label:"Include Mentions or not",key:"Include Mentions or not",  onClick:(key:any)=>{}},
        {label:" Who to Mention",key:"Who to Mention",onClick:(key:any)=>{}},
        
    ]}
];
const InstagramCaptionGenerator = () => {
    const router = useRouter();
   
    const textfields:any=[
        {placeholder:t`Input some line here to begin`,height:"90px"},
    ];
    const faqs= FAQDATA;
    return (<div>
        <Navbar/>
        <Hero 
        image={LyricsGen} 
        title={t`AI Instagram Caption Generator`} 
        description={t`Instagram Caption Generator`}
        fields={textfields}
        buttonText={"Generate Instagram Caption"}
        buttonFunction={(text:any,items:any)=>{
            if(text[0]==''){
                alerts.error(
                    t`Warning`,
                    "Please enter some text",
                    2000
                  ); 
                return null;
            }
            if(items.length<4){
                alerts.error(
                    t`Warning`,
                    "Please select type,mood,hastag prefrence",
                    2000
                  ); 
                return null;
            }
            routerData(text,items,"./instagram-caption/generate");
        }}
        selectOptions={options} 
        />
        <FAQ data={faqs}/>
        <Footer/>

    </div>);
 
};

export default InstagramCaptionGenerator;