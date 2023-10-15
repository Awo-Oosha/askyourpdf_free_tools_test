import React from "react";
import styled from "styled-components";

const ToastContainer = styled.div`
margin-left: 38px;
  h1,
  p {
    font-family: var(--font-satoshi);
    font-size: 14px;
    font-style: normal;
    line-height: 20px;
  }

  h1 {
    color: #101828;
    font-weight: 700;
    margin-bottom: 4px;
  }

  p {
    color: #475467;
    font-weight: 400;
  }
`;

export default function AppToast({
  heading,
  body,
}: {
  heading: React.ReactNode;
  body: React.ReactNode;
}) {
  return (
    <ToastContainer>
      <h1>{heading}</h1>
      <p>{body}</p>
    </ToastContainer>
  );
}
