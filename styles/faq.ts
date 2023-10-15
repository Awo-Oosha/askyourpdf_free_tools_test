import styled from "styled-components";
import {Collapse} from "antd";
import {Row} from "antd";
import {Section} from "./styles";

const {Panel} = Collapse;

export const SearchBox = styled.form`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50%;
  border-radius: 8px;
  border: 1px solid rgba(208, 213, 221, 0.06);
  background: rgba(255, 255, 255, 0.06);
  box-shadow: 0px 1px 2px 0px rgba(16, 24, 40, 0.05);
  margin-bottom: -25px;

  input {
    background: inherit;
    border: none;
    width: 100%;
    height: 40px;
    color: rgba(255, 255, 255, 0.60);
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 24px;
  }

  input:focus {
    outline: none;
  }

  input::placeholder {
    font-size: 16px;
  }

  @media (max-width: 757px) {
    width: 90%
  }
`

export const UploadSection = styled(Section)`
  padding: 0;
  position: relative;
  width: 99%;
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`;

export const UploadRow = styled(Row)`
  min-height: 369px;
  background: #FEFDFC;
  border-radius: 20px;
  padding: 10px 10px;
`;

export const CollapseStyle = styled(Collapse)`
  background: inherit;
  border-radius: 0;
  margin: 25px 0;
  border-bottom: 1px solid #d9d9d9;
`;

export const PanelStyle = styled(Panel)`
  padding: 6px 0;

  .ant-collapse-header-text {
    font-weight: 500;
    font-size: 15px;
    line-height: 25px;
  }

  p {
    font-size: 14px;
    line-height: 24px;
    color: #58595A;
  }
`;

export const FaqHeaderContainer = styled.div<{ $imgUrl: string }>`
  background: url(${(props: { $imgUrl: string }) => props.$imgUrl}) no-repeat;
  background-size: cover;
  height: 400px;
  text-align: center;
  padding-top: 25px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 32px;
  color: #ffffff;

  h1 {
    font-size: 52px;
    font-weight: 700;
  }


  @media (max-width: 757px) {
    text-align: start;
    h1 {
      font-size: 40px;
    }

    h1, p {
      width: 90%
    }
  }
`
