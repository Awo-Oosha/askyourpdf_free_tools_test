import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import {
  LandingSection,
  LandingFlexCol,
  SectionHead,
} from "@/styles/landing";
import { motion, useAnimation, useInView } from "framer-motion";
import { Trans } from "@lingui/macro";
import CompaniesImagesAnimation from "./UniversitiesImagesAnimation";


const SectionImages = styled.div`
  margin-top: 22px;

  display: flex;
  padding: 40px 40px;
  flex-direction: row;
  justify-content: space-evenly;
  width: 850px;
  animation: animatedImages 30s linear infinite alternate;

  @keyframes animatedImages {
    from {
      transform: translate(0);
    }
    to {
      transform: translate(-60%);
    }
  }

  @media (min-width: 768px) and (max-width: 2400px) {
    padding: 70px 55px;
    width: 2970px !important;

      @keyframes animatedImages {
      from {
        transform: translate(30%);
      }
      to {
        transform: translate(-28%);
      }
    }
  }

  @media (min-width: 2500px) {
    width: 100% !important;
    animation: animatedImages 10s linear infinite alternate;
    @keyframes animatedImages {
      from {
        transform: translate(10%);
      }
      to {
        transform: translate(-10%);
      }
  }
`;

// million-ignore
export default function Universities() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const control = useAnimation();

  const textVariant = {
    visible: {
      opacity: 1,
      y: 0,
      transition: { when: "beforeChildren", staggerChildren: 0.3 },
    },
    hidden: { opacity: 0, y: 30 },
  };

  useEffect(() => {
    if (isInView) {
      control.start("visible");
    } else {
      control.start("hidden");
    }
  }, [control, isInView]);

  return (
    <LandingSection ref={ref} style={{background: "#F8F9FF", paddingTop: "50px", marginTop: "0"}}>
        <LandingFlexCol style={{overflow: "hidden"}}>
          <SectionHead
            variants={textVariant}
            initial="hidden"
            animate={control}
            style={{  padding: "0 1rem"}}
          >
            <motion.h1 variants={textVariant}>
              <Trans>
                Trusted By <span> Leading Universities </span>
              </Trans>
            </motion.h1>
          </SectionHead>
                <SectionImages>
                  <CompaniesImagesAnimation />
                </SectionImages>
        </LandingFlexCol>
    </LandingSection>
  );
}

