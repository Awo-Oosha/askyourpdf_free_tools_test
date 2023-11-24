import React, {ChangeEvent, useEffect, useRef, useState} from "react";
import {Layout} from "antd";
import {Content} from "antd/lib/layout/layout";
import styled from "styled-components";
import LyricsGen from "@/img/AI-Poem-Generator.png";
import {alerts} from "@/utils/alerts";
import {t, Trans} from "@lingui/macro";
import {GetStaticPaths, GetStaticProps} from "next";
import {loadCatalog} from "@/utils/i18n";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import {useMedia} from "react-use";
import HeroImage from "@/img/Mask.svg?url";
import {PAGE_DESCRIPTION, PAGE_TITLE, path} from "@/routes";
import {MAIN_APP_URL} from "@/config/config";
import {SourceContent} from "@/components/source-tools/source-content";
import {SourceResult} from "@/components/source-tools/source-result";
import {useMutation} from "react-query";
import {Filter, getSourceInformation, getSources} from "@/services/tools";
import {useRouter} from "next/router";
import ProgressModal from "@/components/Modals/ProgressModal";
import Link from "next/link";
import dynamic from "next/dynamic";
import {routerData } from "@/services/libtools";

export const getStaticProps: GetStaticProps = async (ctx) => {
    const translation = await loadCatalog(ctx.locale!);
    return {
        props: {
            translation,
            description: PAGE_DESCRIPTION[path.sourceTool],
            canonicalUrl: `${MAIN_APP_URL}${path.sourceTool}`,
            title: PAGE_TITLE[path.sourceTool],
            imageUrl:  "/6201447e-3545-4eb4-334d-cadf31496100/public"
        },
    };
};

const PoemGenerator = () => {
    const router = useRouter();
    const options:any = [
        {name:"Select Style",data:[
            {label:"Sonnet",key:"Sonnet",  onClick:(key:any)=>{}},
            {label:"Haiku",key:"Haiku",onClick:(key:any)=>{}},
            {label:"Limerick",key:"Limerick",onClick:(key:any)=>{}},
            {label:"Free Verse",key:"Free Verse",onClick:(key:any)=>{}},
        ]},
        {name:"Select Mood",data:[
            {label:"Romantic",key:"Romantic",  onClick:(key:any)=>{}},
            {label:"Melancholic",key:"Melancholic",onClick:(key:any)=>{}},
            {label:"Joyful",key:"Joyful",onClick:(key:any)=>{}},
        ]}
        ,
        {name:"Select Themes",data:[
            {label:"Nature",key:"Nature",  onClick:(key:any)=>{}},
            {label:"Love",key:"Love",onClick:(key:any)=>{}},
            {label:"Death",key:"Death",onClick:(key:any)=>{}},
            {label:"Time",key:"Time",onClick:(key:any)=>{}},
        ]}
        ,
        {name:"Rhyming Scheme",data:[
            {label:"ABAB",key:"ABAB",  onClick:(key:any)=>{}},
            {label:"AABB",key:"AABB",onClick:(key:any)=>{}},
           
        ]}

        ,
        {name:"Length",data:[
            {label:"1",key:"1",  onClick:(key:any)=>{}},
            {label:"2",key:"2",onClick:(key:any)=>{}},
            {label:"3",key:"3",onClick:(key:any)=>{}},
        ]}
    ];
    const textfields:any=[
        {placeholder:t`Input some line here to begin`,height:"90px"},
    ];

    const faqs=[
        {question:"Is there a free trial available?",answer:"Yes, you can try us for free for 30 days. If you want, we’ll provide you with a free, personalized 30-minute onboarding call to get you up and running as soon as possible."},
        {question:"Is there a free trial available?",answer:"Yes, you can try us for free for 30 days. If you want, we’ll provide you with a free, personalized 30-minute onboarding call to get you up and running as soon as possible."},
        {question:"Is there a free trial available?",answer:"Yes, you can try us for free for 30 days. If you want, we’ll provide you with a free, personalized 30-minute onboarding call to get you up and running as soon as possible."},
        {question:"Is there a free trial available?",answer:"Yes, you can try us for free for 30 days. If you want, we’ll provide you with a free, personalized 30-minute onboarding call to get you up and running as soon as possible."},
        {question:"Is there a free trial available?",answer:"Yes, you can try us for free for 30 days. If you want, we’ll provide you with a free, personalized 30-minute onboarding call to get you up and running as soon as possible."},
        {question:"Is there a free trial available?",answer:"Yes, you can try us for free for 30 days. If you want, we’ll provide you with a free, personalized 30-minute onboarding call to get you up and running as soon as possible."},
        {question:"Is there a free trial available?",answer:"Yes, you can try us for free for 30 days. If you want, we’ll provide you with a free, personalized 30-minute onboarding call to get you up and running as soon as possible."},
        {question:"Is there a free trial available?",answer:"Yes, you can try us for free for 30 days. If you want, we’ll provide you with a free, personalized 30-minute onboarding call to get you up and running as soon as possible."},
        {question:"Is there a free trial available?",answer:"Yes, you can try us for free for 30 days. If you want, we’ll provide you with a free, personalized 30-minute onboarding call to get you up and running as soon as possible."},
        {question:"Is there a free trial available?",answer:"Yes, you can try us for free for 30 days. If you want, we’ll provide you with a free, personalized 30-minute onboarding call to get you up and running as soon as possible."},
        {question:"Is there a free trial available?",answer:"Yes, you can try us for free for 30 days. If you want, we’ll provide you with a free, personalized 30-minute onboarding call to get you up and running as soon as possible."},
    ]
    return (<div>
        <Navbar/>
        <Hero 
        image={LyricsGen} 
        title={t`AI Poem Generator`} 
        description={t`fill`}
        fields={textfields}
        buttonText={"Generate Poem"}
        buttonFunction={(text:any,items:any)=>{
            routerData(text,items,"./poem-generator/generate");
        }}
        selectOptions={options} 
        />
        <FAQ data={faqs}/>
        <Footer/>

    </div>);
 
};

export default PoemGenerator;