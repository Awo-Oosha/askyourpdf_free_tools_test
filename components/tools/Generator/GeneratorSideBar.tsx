import React from 'react';
import styled from 'styled-components';
import Parameters from './Parameters';
import GenerateCTA from './GenerateCTA';

const Container = styled.div`
  border-radius: 20px;
  border: 1px solid #E4E7EC;
  background: #FFF;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  gap: 26px;

  @media (min-width: 992px) {
    width: 30%;
  }
`;

const Desc = styled.h4`
  color: #000;
  font-family: var(--font-satoshi);
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  line-height: 20px;
  width: 100%;
  margin-bottom: 20px;
`;

const Input = styled.textarea`
  width: 100%;
  height: 74px;
  border-radius: 10px;
  border: 1.902px solid #E8ECEF;
  background: #FFF;
  padding: 11px 12px;
  resize: none;
  font-family: var(--font-satoshi);

  &::placeholder {
    color: #667085;
    font-family: var(--font-satoshi);
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 20px;
  }
`;

const InputContainer = styled.div`
  width: 100%;
  display: flex;
  flex-flow: row wrap;
`;

const InnerContainer = styled.div`
  padding: 26px 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 90%;
`;

const SideBar = ({ 
  desc, 
  inputValue, 
  setInputValue, 
  generatorOptions, 
  generateClick, 
  paramsChange, 
  isLoading,
  cta_title 
}: any) => {
  
  return (
    <Container>
      <InnerContainer className='innerContainer'>
        <Desc>{desc}</Desc>

        <InputContainer>
          <Input
            placeholder='Topic / Theme'
            value={inputValue}
            onChange={setInputValue}
          />
        </InputContainer>

        <Parameters
          generatorOptions={generatorOptions}
          paramsChange={paramsChange}
        />

        <GenerateCTA
          handleGenerateClick={generateClick}
          isLoading={isLoading}
          cta_title={cta_title}
        />
      </InnerContainer>
    </Container>
  );
};

export default SideBar;
