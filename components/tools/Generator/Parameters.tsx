import React, { Fragment, useEffect, useState } from 'react';
import styled from 'styled-components';
import { Select } from 'antd';
import useGenerateInput from '@/hooks/useGenerator';
import { useLingui } from '@lingui/react';

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 11px 12px;
  gap: 7px;

  .select {
    color: #000;
    font-family: var(--font-satoshi);
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 24px;
    width: 100%;
    margin-bottom: 10px;


    &:hover,
    &:focus {
      box-shadow: none; // Remove box shadow on hover or focus
    }
    .ant-select-selector {
      background: transparent;
      color: #000 !important;
      border: 2px solid #D0D5DD !important;
      font-size: 14px !important;
      font-family: var(--font-satoshi) !important;

      &:hover {
              border: 4px solid #green !important;

      }
    }

    .ant-select-selection-search,
    .ant-select-selection-search-input,
    .ant-select-selection-placeholder {
      color: #000 !important;
      font-size: 14px !important;
    }

    .ant-select-arrow {
      .anticon {
        svg {
          fill: #000;
        }
      }
    }
  }
`;


const ParameterTitle = styled.div`
  text-transform: capitalize;
  color: #000;
  font-family: var(--font-satoshi);
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px;
`;


const Parameters = ({ generatorOptions, paramsChange }: any) => {

  const { generateParameters } = useGenerateInput();
  const { i18n } = useLingui();

  return (
    <Container>
      {generatorOptions === null ? (
        <></>
      ) : (
        <>
            {generatorOptions.map((item: any, key: any) => (
              <Fragment key={key}>
                <ParameterTitle>{i18n._(item.place_holder)}</ParameterTitle>
                <Select
                  key={key}
                  placeholder={i18n._(item.place_holder)}
                  value={generateParameters[item.type]}
                  size="large"
                  onChange={(generateParameter) => paramsChange(item.type, generateParameter)}
                  options={item.options.map((option: any) => ({
                    ...option,
                    label: i18n._(option.label),
                  }))}
                  className='select'
                />
              </Fragment>
            ))}
        </>
      )}
    </Container>
  );
};

export default Parameters;
