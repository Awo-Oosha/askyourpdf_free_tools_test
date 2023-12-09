import React from "react";
import LyricsGen from "@/img/AI-Rap-Generator.png";
import { t, Trans } from "@lingui/macro";
import { GetStaticProps } from "next";
import { loadCatalog } from "@/utils/i18n";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { PAGE_DESCRIPTION, PAGE_TITLE, path } from "@/routes";
import { MAIN_APP_URL } from "@/config/config";
import Hero from "@/components/FreeLanding/Hero";
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


const RapGenerator = () => {
    return (
        <div>
            <Navbar />
            <Hero
                generator="LYRICS_GENERATOR"
                params={GENERATOR_PARAMETERS.rap_generator}
                title={t`AI Rap Generator`}
                desc={t`Rap Generator`}
                img={LyricsGen}
                placeholder={t`Input some line here to begin `}
                routerPath={'rap-generator/generate'}
                CtaTitle = {t`Generate Rap`}
            />
            <LandingFAQ />
            <Footer />
        </div>    
    );
};

export default RapGenerator;