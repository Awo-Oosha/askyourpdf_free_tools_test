import React from "react";
import LyricsGen from "@/img/AI-instagram-caption-generator.png";
import { msg } from "@lingui/macro";
import {GetStaticProps} from "next";
import {loadCatalog} from "@/utils/i18n";
import Navbar from "@/components/Navbar";
import Hero from "@/components/FreeLanding/Hero";
import Footer from "@/components/Footer";
import {PAGE_DESCRIPTION, PAGE_TITLE, path} from "@/routes";
import {MAIN_APP_URL} from "@/config/config";
import { GENERATOR_PARAMETERS } from "@/config/config";
import LandingFAQ from "@/components/FreeLanding/ToolsFaq";
import { useLingui } from "@lingui/react";

export const getStaticProps: GetStaticProps = async (ctx) => {
    const translation = await loadCatalog(ctx.locale!);
    return {
        props: {
            translation,
            description: PAGE_DESCRIPTION[path.instagram],
            canonicalUrl: `${MAIN_APP_URL}${path.instagram}`,
            title: PAGE_TITLE[path.instagram],
            imageUrl: "/6201447e-3545-4eb4-334d-cadf31496100/public"
        },
    };
};


const InstagramCaptionGenerator = () => {
    const { _ } = useLingui();
    return (
        <div>
            <Navbar />
            <Hero
                generator="INSTAGRAM_CAPTION"
                params={GENERATOR_PARAMETERS.instagram_caption}
                title={_(msg`AI Instagram Caption Generator`)}
                desc={_(msg`Instagram Caption Generator `)}
                img={LyricsGen}
                placeholder={_(msg`Input some line here to begin `)}
                routerPath={'instagram-caption/generate'}
                CtaTitle={_(msg`Generate Instagram caption`)}
            />
            <LandingFAQ />
            <Footer />
        </div>
    );
};

export default InstagramCaptionGenerator;