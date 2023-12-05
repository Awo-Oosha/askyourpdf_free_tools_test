import React, { Fragment, useEffect } from 'react';
import styled from 'styled-components';
import GeneratorSideBar from "./GeneratorSideBar";
import GeneratorMainBar from './GeneratorMainBar';
import MobileHeader from '@/components/MobileHeader';


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
  
  h2, p {
    color: #101828;
    font-family: var(--font-satoshi);
    font-size: 40px;
    font-style: normal;
    font-weight: 700;
    line-height: 28px; 
  }

  p {
    font-size: 14px;
    padding: 8px 16px;
    border-radius: 8px;
    border: 1px solid #D0D5DD;
  }
`;

const GeneratorBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 21px;
  margin-top: 20px;
  height: 100%;
  
  @media (min-width: 992px) {
    flex-direction: row;
  }
`;

const Generator = ({
  header, 
  subheader, 
  desc,
  inputValue,
  setInputValue,
  generatorOptions,
  generateClick,
  paramsChange,
  generateResult,
  pdfTitle,
  isLoading 
}:any) => {

  return (
    <Fragment>
      <MobileHeader />
      <Wrapper>
        <Header>
          <h2> {header} </h2>
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
          />
          <GeneratorMainBar
            generateResult={generateResult}
            pdfTitle={pdfTitle}
            isLoading={isLoading}
          />
        </GeneratorBody>
      </Wrapper>
    </Fragment>
  )
}

export default Generator