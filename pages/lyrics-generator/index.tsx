import React, {ChangeEvent, useEffect, useRef, useState} from "react";
import LyricsGen from "@/img/tools/lyricsGen.png";
import { msg } from "@lingui/macro";
import { GetStaticProps } from "next";
import { loadCatalog } from "@/utils/i18n";
import Navbar from "@/components/Navbar";
import Hero from "@/components/FreeLanding/Hero";
import Footer from "@/components/Footer";
import { PAGE_DESCRIPTION, PAGE_TITLE, path } from "@/routes";
import { MAIN_APP_URL } from "@/config/config";
import { GENERATOR_PARAMETERS } from "@/config/config";
import LandingFAQ from "@/components/FreeLanding/ToolsFaq";
import { useLingui } from "@lingui/react";

export const getStaticProps: GetStaticProps = async (ctx) => {
    const translation = await loadCatalog(ctx.locale!);
    return {
        props: {
            translation,
            description: PAGE_DESCRIPTION[path.lyrics],
            canonicalUrl: `${MAIN_APP_URL}${path.lyrics}`,
            title: PAGE_TITLE[path.lyrics],
            imageUrl: "/6201447e-3545-4eb4-334d-cadf31496100/public"
        },
    };
};


const LyricsGenerator = () => {
    const { _ } = useLingui();
    return (
        <div>
            <Navbar />
            <Hero
                generator="LYRICS_GENERATOR"
                params={GENERATOR_PARAMETERS.lyrics_generator}
                title={_(msg`AI Lyrics Generator`)}
                desc={_(msg`Your creative companion on your musical journey, create lyrics that tell your unique story`)}
                img={LyricsGen}
                placeholder={_(msg`Input some line here to begin `)}
                routerPath={'lyrics-generator/generate'}
                CtaTitle={_(msg`Generate Lyrics`)}
            />
            <LandingFAQ />
            <Footer />
        </div>
    );
};

export default LyricsGenerator;