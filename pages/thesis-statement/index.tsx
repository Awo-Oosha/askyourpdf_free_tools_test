import React, {ChangeEvent, useEffect, useRef, useState} from "react";
import LyricsGen from "@/img/AI-Thesis-statement-generator.png";
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


const ThesisStatementGenerator = () => {
    return (
        <div>
            <Navbar />
            <Hero
                generator="THESIS_STATEMENT"
                params={GENERATOR_PARAMETERS.thesis_generator}
                title={t`AI Thesis Statement Generator`}
                desc={t`Thesis Statement Generator`}
                img={LyricsGen}
                placeholder={t`Input some line here to begin `}
                routerPath={'thesis-statement/generate'}
                CtaTitle={t`Generate Thesis`}
            />
            <LandingFAQ />
            <Footer />
        </div>
    );
 
};

export default ThesisStatementGenerator;