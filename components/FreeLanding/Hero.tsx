import React, { useRef, Fragment, useEffect } from "react";
import { Container } from "../../styles/styles";
import styled from "styled-components";
import HeroImage from "../../img/Hero.webp";
import { LandingFlexCol } from "../../styles/landing";
import { Trans } from "@lingui/macro";
import Image from "next/image";
import { useMedia } from "react-use";
import { Select } from "antd";
import useGenerateInput from "@/hooks/useGenerator";
import { alerts } from "@/utils/alerts";
import { useMutation } from "react-query";
import { useRouter } from "next/router";
import Spinner from "../Spinner";



const HeroContainer = styled.section<{ $backgroundImage?: string }>`
  background-color: #141314;
  background-image: url(${(props) => props.$backgroundImage});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  padding-block: 50px;
  position: relative;
  overflow: hidden;
  z-index: 1;
  min-height: 100%;
  .heroImage {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: -1;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  @media (min-width: 576px) {
    padding-block: 100px;
    background-color: #0a0a0a;
  }

  @media (min-width: 1200px) {
    .heroImage {
      animation: animatedHero 7s linear infinite alternate;      
    }

    @keyframes animatedHero {
      0% {
        transform: translate(-50%, -50%) scale(0.8);
      }

      50% {
        transform: translate(-50%, -50%) scale(1);
      }

      100% {
        transform: translate(-50%, -50%) scale(0.8);
      }
    }
  }
`;

const Wrapper = styled(LandingFlexCol)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 21px;
  width: 100%;
`;

const HeroText = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;

  h1 {
    margin: 0;
    color: #ffffff;
    font-family: var(--font-eudoxus);
    font-style: normal;
    font-weight: 700;
    font-size: 38px;
    line-height: 48px;
    max-width: 368px;
  }

  h1:nth-of-type(2) {
    margin-bottom: 24px;
  }

  p {
    margin: 0 auto;
    max-width: 588px;
    color: #ffffff;
    font-family: var(--font-satoshi);
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 28px;
  }

  @media (min-width: 390px) {
    h1 {
      font-size: 41px;
    }
  }

  @media (min-width: 576px) {
    text-align: center;

    h1 {
      font-size: 38px;
      line-height: 68px;
      max-width: unset;
    }
  }

  @media (min-width: 992px) {
    h1 {
      font-size: 50px;
    }
  }
`;

const ParametersContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: center;
  align-items: center;
  gap: 40px;

  .select {
    border-radius: 8px;
    border: 2px solid #EDB01A;
    color: #EDB01A;
    background: transparent;
    min-width: 100%;
    box-shadow: 0px 1px 2px 0px rgba(16, 24, 40, 0.05);
    font-family: var(--font-satoshi);


    &:hover,
    &:focus {
      border-color: #EDB01A; // Set the border color on hover or focus
      box-shadow: none; // Remove box shadow on hover or focus
    }

    .ant-select-selector {
      background: transparent;
      color: #EDB01A !important;
      border: none;
      font-size: 14px !important;
    }

    .ant-select-selection-search,
    .ant-select-selection-search-input,
    .ant-select-selection-placeholder {
      color: #EDB01A !important;
    }

    .ant-select-arrow {
      .anticon {
        svg {
          fill: #EDB01A;
        }
      }
    }
  }
  @media (min-width: 992px) {
    flex-direction: row;

    .select {
      min-width: 200px;
    }
  }
`;


const ParametersTitle = styled.div``

const HeroHeadImage = styled.div`
  width: 60px;
  height: 60px;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  @media (min-width: 992px) {
    width: 100px;
    height: 100px;
  }
`;

const Input = styled.textarea`
  width: 100%;
  height: 74px;
  border-radius: 10px;
  border: 1.902px solid #E8ECEF;
  background: #000;
  padding: 11px 12px;
  resize: none;
  color: #fff;
  font-family: var(--font-satoshi);

  &::placeholder {
    color: #667085;
    font-family: var(--font-satoshi);
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 20px;
  }
  @media (min-width: 992px) {
    width: 80%;
  }
`;

const InputContainer = styled.div`
  width: 100%;
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  align-items: center;
`;

const CTA = styled.button`
  cursor: ${(props) => props.disabled ? 'not-allowed' : 'pointer'};
  border: none;
  border-radius: 12px;
  background: ${(props) => props.disabled ? '#000' : '#EDB01A'};
  box-shadow: 0px -1px 0px 0px rgba(47, 43, 67, 0.10) inset, 0px 1px 3px 0px rgba(47, 43, 67, 0.10);
  color: ${(props) => props.disabled ? '#FFF' : '#000'};
  text-align: center;
  font-family: var(--font-satoshi);
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  line-height: 24px; /* 150% */
  letter-spacing: -0.16px;
  padding: 12px 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  transition: all 0.5s ease;
`;


export default function Hero(
  {
  generator, 
  title, 
  desc, 
  img, 
  params, 
  placeholder,
  routerPath,
  CtaTitle
}:{
    generator: string,
    title: string,
    desc: string,
    img: any,
    params: any,
    placeholder: string,
    routerPath: any,
    CtaTitle: string,
  }) {

  const ref = useRef(null);

  const isSmallScreen = useMedia('(min-width: 576px)', false);

  const { 
    generateInput, 
    setGenerateInput, 
    generateParameters, 
    setGenerateParameters, 
    GenerateCall, 
    generatedResult} = useGenerateInput();
  
  const router = useRouter()

  // Grabs Select Parameters for request
  const handleParameterChange = (type: string, generateParameter: any) => {
    setGenerateParameters((prevState: any) => ({
      ...prevState,
      [type]: generateParameter,
    }));
  };

  
  // Api request
  const { mutate, isLoading } = useMutation(
    'generateDocument',
    async () => {

      if (!generateInput) {
        alerts.error('Generate Failed', 'The text field cannot be empty. Please try again.');

        // throw new Error('generateInput and generateParameters cannot be empty');

      }
      await GenerateCall( generator, generateInput, generateParameters);
      
      setGenerateInput("");
      
    },
    {
      onError: (error) => {
        console.error('Error in GenerateCall:', error);
        alerts.error('Generate Failed', 'Unable to generate document. Please try again.');
      },
    }
  );

// Grabs Index response

  useEffect(() => {
    if (generatedResult !== "" && generatedResult !== undefined && generatedResult !== null) {
      router.push({
        pathname: routerPath,
        query: { data: JSON.stringify(generatedResult) },
      });
    }
  }, [generatedResult, router])


  // Handles Hero CTA Click
  const handleGenerateClick = () => {
    mutate()
    // Trigger the mutation
  };

  return (
      <HeroContainer ref={ref}>
          <div className="heroImage">
              {isSmallScreen && (
                  <Image
                      src={HeroImage}
                      alt="Hero"
                      priority={true}
                      sizes="100vw"
                  />
              )}
          </div>
          <Container>
              <Wrapper>
                  
                  <HeroText>
                    <HeroHeadImage>
                      <Image src={img} alt="" />
                    </HeroHeadImage>
                      
                      <h1>
                        {title}
                      </h1>
                      <p>
                        {desc}
                      </p>
                  </HeroText>

                  <InputContainer>
                    <Input
                      placeholder={placeholder}
                      value={generateInput}
                      onChange={(e) => setGenerateInput(e.target.value)}
                    />
                  </InputContainer>

                  <ParametersContainer>
                    {params === null ? (
                      <></>
                    ) : (
                      <>
                        {params.map((item: any, key: any) => (
                          <Fragment key={key}>
                            {/* <ParameterTitle>{item.place_holder}</ParameterTitle> */}
                            <Select
                              key={key}
                              placeholder={item.place_holder}
                              value={generateParameters[item.type]}
                              size="large"
                              onChange={(generateParameter) => handleParameterChange(item.type, generateParameter)}
                              options={item.options}
                              className='select'
                            />
                          </Fragment>
                        ))}
                      </>
                    )}
                  </ParametersContainer>
                  
                  <CTA onClick={handleGenerateClick} disabled={isLoading}>
                    {CtaTitle}
                    {isLoading ? (<Spinner style={{width: '20px', height: '20px'}} />) : null}
                   </CTA>
              </Wrapper>
          </Container>
      </HeroContainer>
  );
}
