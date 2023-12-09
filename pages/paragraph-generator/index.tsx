import React, {ChangeEvent, useEffect, useRef, useState} from "react";
import ParaGen from "@/img/AI-Paragraph-Generator.png";
import { t, Trans } from "@lingui/macro";
import { GetStaticProps } from "next";
import { loadCatalog } from "@/utils/i18n";
import Navbar from "@/components/Navbar";
import Hero from "@/components/FreeLanding/Hero";
import Footer from "@/components/Footer";
import { PAGE_DESCRIPTION, PAGE_TITLE, path } from "@/routes";
import { MAIN_APP_URL } from "@/config/config";
import { GENERATOR_PARAMETERS } from "@/config/config";
import LandingFAQ from "@/components/FreeLanding/ToolsFaq";

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


const ParagraphGenerator = () => {
    return(
        <div>
            <Navbar />
            <Hero
                generator="PARAGRAPH_WRITER"
                params={GENERATOR_PARAMETERS.paragraph_generator}
                title={t`AI Paragraph Generator`}
                desc={t`Paragraph Generator `}
                img={ParaGen}
                placeholder={t`Input main idea/supporting points`}
                routerPath={'paragraph-generator/generate'}
                CtaTitle={t`Generate Paragraph`}
            />
            <LandingFAQ />
            <Footer />
        </div>
    );
};

export default ParagraphGenerator;