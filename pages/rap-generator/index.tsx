import React from "react";
import LyricsGen from "@/img/AI-Rap-Generator.png";
import { t, Trans } from "@lingui/macro";
import { msg } from "@lingui/macro";
import { useLingui } from "@lingui/react";
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
            description: PAGE_DESCRIPTION[path.rap],
            canonicalUrl: `${MAIN_APP_URL}${path.rap}`,
            title: PAGE_TITLE[path.rap],
            imageUrl: "/6201447e-3545-4eb4-334d-cadf31496100/public"
        },
    };
};


const RapGenerator = () => {
    const { _ } = useLingui();

    return (
        <div>
            <Navbar />
            <Hero
                generator="RAP_GENERATOR"
                params={GENERATOR_PARAMETERS.rap_generator}
                title={_(msg`AI Rap Generator`)}
                desc={_(msg`Rap Generator`)}
                img={LyricsGen}
                placeholder={_(msg`Input some line here to begin `)}
                routerPath={'rap-generator/generate'}
                CtaTitle = {_(msg`Generate Rap`)}
            />
            <LandingFAQ />
            <Footer />
        </div>    
    );
};

export default RapGenerator;