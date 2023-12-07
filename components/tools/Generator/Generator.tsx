import React, { Fragment, useEffect } from 'react';
import styled from 'styled-components';
import GeneratorSideBar from "./GeneratorSideBar";
import GeneratorMainBar from './GeneratorMainBar';
import MobileHeader from '@/components/MobileHeader';
import LanguageSelect from './LanguageSelect';


const Wrapper = styled.section`
  width: 100%;
  min-height: 100%;
  padding: 50px 15px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;

  @media screen and (min-width:992px){
      padding: 20px 50px;
      height: 100vh;
      padding: 50px;
  }
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  
  h2 {
    color: #101828;
    font-size: 21px;
    font-style: normal;
    font-weight: 700;
    line-height: 28px; 
    font-family: var(--font-satoshi);
  }

  p {
    font-family: var(--font-satoshi);
    font-size: 14px;
    padding: 8px 16px;
    border-radius: 8px;
    border: 1px solid #D0D5DD;
    font-style: normal;
    font-weight: 700;
    line-height: 28px;
    color: #101828;

  }

  div {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }

  @media (min-width: 992px) {
    h2 {
      font-size: 40px;
    }
  }
`;

const GeneratorBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 21px;
  margin-top: 20px;
  height: 100%;
  width: 100%;
    
  @media (min-width: 992px) {
    flex-direction: row;
  }
`;

const Generator = ({
  header, 
  subheader, 
  desc,
  mainBarDesc,
  inputValue,
  setInputValue,
  generatorOptions,
  generateClick,
  paramsChange,
  generateResult,
  pdfTitle,
  isLoading,
  lang,
  cta_title 
}:any) => {

  return (
    <Fragment>
      <MobileHeader />
      <Wrapper>
        <Header>
          <div className='top'>
            <h2> {header} </h2>
            <LanguageSelect lang={lang} />
          </div>
          <p> {subheader} </p>
        </Header>

        <GeneratorBody>
          <GeneratorSideBar
            desc={desc}
            inputValue={inputValue}
            setInputValue={setInputValue}
            generatorOptions={generatorOptions}
            generateClick={generateClick}
            paramsChange={paramsChange}
            isLoading={isLoading}
            cta_title = {cta_title}
          />
          <GeneratorMainBar
            generateResult={generateResult}
            pdfTitle={pdfTitle}
            isLoading={isLoading}
            mainBarDesc={mainBarDesc}
          />
        </GeneratorBody>
      </Wrapper>
    </Fragment>
  )
}

export default Generator