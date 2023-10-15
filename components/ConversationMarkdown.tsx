import React, { useEffect, useState } from "react";
import { MemoizedReactMarkdown } from "./MemoizedReactMarkdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeMathjax from "rehype-mathjax";
import dynamic from "next/dynamic";
import { covertToItalics } from "@/utils/utils";

const CodeBlock = dynamic(() => import("@/components/CodeBlock"), {
  ssr: false,
});

export default function ConversationMarkdown({ answer, setMessage }: any) {
  const [markdownContent, setMarkdownContent] = useState("");
  useEffect(() => {
    let markdownContent = covertToItalics(answer);
    setMarkdownContent(markdownContent);
  }, [answer]);
  return (
    <MemoizedReactMarkdown
      remarkPlugins={[remarkGfm, remarkMath]}
      rehypePlugins={[rehypeMathjax]}
      components={{
        code({ node, inline, className, children, ...props }) {
          const match = /language-(\w+)/.exec(className || "");
          return !inline ? (
            <CodeBlock
              key={Math.random()}
              language={(match && match[1]) || ""}
              value={String(children).replace(/\n$/, "")}
              {...props}
            />
          ) : (
            <code className={className} {...props}>
              {children}
            </code>
          );
        },
        ol({ children }) {
          return <ol style={{ marginInline: "16px" }}>{children}</ol>;
        },
        ul({ children }) {
          return <ul style={{ marginInline: "16px" }}>{children}</ul>;
        },
        li({ children }) {
          const listItem = children ? children[0] : "";
          const questionRegex = /\?\s*$/;
          const isQuestion = listItem
            ? questionRegex.test(String(listItem))
            : false;

          return setMessage != undefined && isQuestion ? (
            <li
              style={{
                textDecorationStyle: "dotted",
                textDecorationLine: "underline",
                cursor: "pointer",
                wordBreak: "break-word",
              }}
              onClick={() => {
                setMessage(String(listItem));
              }}
            >
              {children}
            </li>
          ) : (
            <li
              style={{
                wordBreak: "break-word",
              }}
            >
              {children}
            </li>
          );
        },
        em({ children }) {
          return <em>{children}</em>;
        },
      }}
    >
      {markdownContent}
    </MemoizedReactMarkdown>
  );
}
