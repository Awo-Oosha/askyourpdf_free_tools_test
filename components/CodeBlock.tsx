import { Clipboard } from "@phosphor-icons/react/dist/ssr";
import React from "react";
import CopyToClipboard from "react-copy-to-clipboard";
import { PrismAsync as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/cjs/styles/prism";
import styled from "styled-components";
import { alerts } from "../utils/alerts";

interface Props {
  language: string;
  value: string;
}

const CodeBlockContainer = styled.div`
  border-radius: 8px;
`;

const CodeBlockActions = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-inline: 1rem;
  padding-block: 0.5rem;
  background: #000000;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;

  button {
    display: flex;
    align-items: center;
    gap: 0.1rem;
    background: none;
    border: none;
    color: white;
    font-size: 14px;
    font-family: var(--font-satoshi);
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    letter-spacing: -0.32px;
    cursor: pointer;

    svg {
      display: block;
    }
  }

  p {
    margin: 0;
    color: white;
  }
`;

export default function CodeBlock({ language, value }: Props) {
  return (
    <CodeBlockContainer>
      <CodeBlockActions>
        <p style={{ color: "#ffffff" }}>{language}</p>
        <CopyToClipboard
          text={value}
          onCopy={() => {
            alerts.success("Copied", "Code Copied");
          }}
        >
          <button>
            <Clipboard color="#ffffff" /> Copy
          </button>
        </CopyToClipboard>
      </CodeBlockActions>
      <SyntaxHighlighter
        language={language}
        style={oneDark}
        customStyle={{
          margin: 0,
          borderRadius: 0,
          borderBottomLeftRadius: "8px",
          borderBottomRightRadius: "8px",
        }}
      >
        {value}
      </SyntaxHighlighter>
    </CodeBlockContainer>
  );
}
