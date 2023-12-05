import React, { Fragment, useEffect, useState } from 'react';
import styled from 'styled-components';
import { Select } from 'antd';
import useGenerateInput from '@/hooks/useGenerator';

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 11px 12px;
  gap: 7px;

  .select {
    color: #000;
    font-family: var(--font-inter);
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 24px;
    width: 100%; 
    margin-bottom: 10px;
  }
`;

const ParameterTitle = styled.div`
  text-transform: capitalize;
  color: #000;
  font-family: var(--font-inter);
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px;
`;


const Parameters = ({ generatorOptions, paramsChange }: any) => {

  const { generateParameters } = useGenerateInput();

  return (
    <Container>
      {generatorOptions.map((item: any, key: any) => (
        <Fragment key={key}>
          <ParameterTitle>{item.place_holder}</ParameterTitle>
          <Select
            key={key}
            placeholder={item.place_holder}
            value={generateParameters[item.type]}
            size="large"
            onChange={(generateParameter) => paramsChange(item.type, generateParameter)}
            options={item.options}
            className='select'
          />
        </Fragment>
      ))}
    </Container>
  );
};

export default Parameters;
