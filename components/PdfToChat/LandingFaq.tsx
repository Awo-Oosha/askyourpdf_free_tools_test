import React, { useState, useEffect, useRef } from "react";
import {Col} from "antd";
import {MinusCircle, PlusCircle} from '@phosphor-icons/react/dist/ssr';
import {UploadRow, UploadSection, CollapseStyle, PanelStyle} from '@/styles/faq'
import {faqArrays} from '@/utils/faqData';
import styled from "styled-components";
import {useLingui} from '@lingui/react';
import {
  SectionHead,
  LandingSection,
  LandingFlexCol
} from "@/styles/landing";
import { Container } from "@/styles/styles";
import {MessageDescriptor} from '@/types/localization';
import { motion, useAnimation, useInView } from "framer-motion";
import { Trans } from "@lingui/macro";

import {GetStaticProps} from 'next';
import {loadCatalog} from '@/utils/i18n';
import {PAGE_DESCRIPTION, path} from "@/routes";
import {MAIN_APP_URL} from "@/config/config";

export const SVGContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 7.5px;
  height: 100%;
  background: rgba(255, 255, 255, 0.06);
`;

interface Question {
    id: number;
    Question: MessageDescriptor;
    answer: MessageDescriptor;
    customRender?: React.ReactNode
}

export const getStaticProps: GetStaticProps = async (ctx) => {
    const translation = await loadCatalog(ctx.locale!);
    return {
        props: {
            translation,
            description : PAGE_DESCRIPTION[path.FAQs],
            canonicalUrl: `${MAIN_APP_URL}${path.FAQs}`,
        },
    };
};

function LandingFAQ() {
  const [filteredSections, setFilteredSections] = useState<Question[][]>(faqArrays);
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

    const {i18n} = useLingui();
    return (
        <LandingSection ref={ref}>
          <Container>
            <LandingFlexCol>
              <SectionHead
                variants={textVariant}
                initial="hidden"
                animate={control}
                style={{marginTop: "64px", marginBottom: "32px"}}
              >
                <motion.h1 variants={textVariant}>
                  <Trans>
                    Frequently Asked Questions               
                  </Trans>
                </motion.h1>
                <motion.p variants={textVariant}>
                  <Trans>
                    Need help? Look through our FAQs for quick answers!
                  </Trans>
                </motion.p>
              </SectionHead>
              <UploadSection>
                <UploadRow justify={"space-between"} gutter={4}>
                            {filteredSections.map((section, index) => (
                                <Col lg={11} xs={22} key={index}>
                                    <CollapseStyle
                                        bordered={false}
                                        defaultActiveKey={['1']}
                                        expandIconPosition="end"
                                        expandIcon={({isActive}: any) =>
                                            isActive ? (
                                                <MinusCircle size={20} color="#98A2B3"/>
                                            ) : (
                                                <PlusCircle size={20} color="#98A2B3"/>
                                            )
                                        }
                                    >
                                        {section.map((item) => (
                                            <PanelStyle header={i18n._(item.Question)} key={item.id.toString()}>
                                                <p>{item.customRender ? item.customRender : i18n._(item.answer)}</p>
                                            </PanelStyle>
                                        ))}
                                    </CollapseStyle>
                                </Col>
                            ))}
                </UploadRow>
              </UploadSection>
            </LandingFlexCol>
          </Container>
        </LandingSection>
    )
}

export default LandingFAQ

