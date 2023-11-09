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
            imageUrl: "/6201447e-3545-4eb4-334d-cadf31496100/public"
        },
    };
};

const InstagramCaptionGenerator = () => {
    const router = useRouter();
    const options:any = [
        {name:"Select Type of Post",data:[
            {label:"Music",key:"muz",  onClick:(key:any)=>{}},
            {label:"Music2",key:"muz1",onClick:(key:any)=>{}},
            {label:"Music3",key:"muz3",onClick:(key:any)=>{}},
        ]},
        {name:"Select Mood ",data:[
            {label:"Music",key:"muz",  onClick:(key:any)=>{}},
            {label:"Music2",key:"muz1",onClick:(key:any)=>{}},
            {label:"Music3",key:"muz3",onClick:(key:any)=>{}},
        ]}
        ,
        {name:"Hashtags Preferences",data:[
            {label:"Music",key:"muz",  onClick:(key:any)=>{}},
            {label:"Music2",key:"muz1",onClick:(key:any)=>{}},
            {label:"Music3",key:"muz3",onClick:(key:any)=>{}},
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
        title={t`AI Instagram Caption Generator`} 
        description={t`fill`}
        fields={textfields}
        buttonText={"Generate Instagram Caption"}
        buttonFunction={(text:any,items:any)=>{
            routerData(text,items,"./instagram-caption/generate");
        }}
        selectOptions={options} 
        />
        <FAQ data={faqs}/>
        <Footer/>

    </div>);
 
};

export default InstagramCaptionGenerator;