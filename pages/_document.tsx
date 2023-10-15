// pages/_document.tsx file
import Document, { DocumentContext } from "next/document";
import { ServerStyleSheet } from "styled-components";
export default class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;
    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            sheet.collectStyles(<App {...props} />), //gets the styles from all the components inside <App>
        });
      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {/*👇 insert the collected styles to the html document*/}
            {sheet.getStyleElement()}
          </>
        ),
      };
    } finally {
      sheet.seal();
    }
  }
}
// import React from "react";
// import { StyleProvider, createCache, extractStyle } from "@ant-design/cssinjs";
// import Document, { Head, Html, Main, NextScript } from "next/document";
// import type { DocumentContext } from "next/document";

// const MyDocument = () => (
//   <Html lang="en">
//     <Head />
//     <body>
//       <Main />
//       <NextScript />
//     </body>
//   </Html>
// );

// MyDocument.getInitialProps = async (ctx: DocumentContext) => {
//   const cache = createCache();
//   const originalRenderPage = ctx.renderPage;
//   ctx.renderPage = () =>
//     originalRenderPage({
//       enhanceApp: (App) => (props) =>
//         (
//           <StyleProvider cache={cache}>
//             <App {...props} />
//           </StyleProvider>
//         ),
//     });

//   const initialProps = await Document.getInitialProps(ctx);
//   const style = extractStyle(cache, true);
//   return {
//     ...initialProps,
//     styles: (
//       <>
//         {initialProps.styles}
//         <style dangerouslySetInnerHTML={{ __html: style }} />
//       </>
//     ),
//   };
// };

// export default MyDocument;
