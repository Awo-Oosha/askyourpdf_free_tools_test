import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ThemeProvider } from "styled-components";
import { useLocalStorage } from "usehooks-ts";
import { defaultTheme } from "../components/themes/defaultTheme";
import { GlobalStyle } from "../components/themes/GlobalStyle";
import { i18n } from "@lingui/core";
import { I18nProvider } from "@lingui/react";
//import { AuthProvider } from "../providers/AuthProvider";
import { QueryClient, QueryClientProvider } from "react-query";
import { useLinguiInit } from "../utils/i18n";
import CustomScripts from "@/components/CustomScripts";
import ReactGA from "react-ga4";
import { TRACKING_ID } from "@/config/config";
import AppHead from "@/components/AppHead";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import { ReactQueryDevtools } from "react-query/devtools";
import DynamicDescription from "@/components/DynamicDescription";
import React from "react";
import { useEffect } from "react";
import DynamicPageTitle from "@/components/DynamicPageTitle";

ReactGA.initialize(TRACKING_ID);
const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  const [theme] = useLocalStorage("theme", defaultTheme);
  useLinguiInit(pageProps.translation);

  useEffect(() => {
    (function (w: any, r: string) {
      w._rwq = r;
      w[r] =
        w[r] ||
        function () {
          (w[r].q = w[r].q || []).push(arguments);
        };
    })(window, "rewardful");

    let s = document.createElement("script");
    s.async = true;
    s.src = "https://r.wdfl.co/rw.js";
    s.setAttribute("data-rewardful", "86e04a");
    document.head.appendChild(s);
    // optionally remove the tag once you don't need them.
  }, []);

  return (
    <I18nProvider i18n={i18n}>
      <QueryClientProvider client={queryClient}>
        <DynamicPageTitle title={pageProps.title} />
        <AppHead />
        <DynamicDescription
          description={pageProps.description}
          canonicalUrl={pageProps?.canonicalUrl}
        />
        <ThemeProvider theme={theme}>
                    <GlobalStyle />
                    <Component {...pageProps} />
                    <CustomScripts />
                    <ToastContainer
                      position="top-right"
                      className={"app__toast"}
                      bodyClassName={"app__toast__body"}
                      autoClose={5000}
                      hideProgressBar={true}
                      closeOnClick={false}
                      rtl={false}
                      draggable
                      pauseOnFocusLoss
                      theme="light"
                    />
                  </ThemeProvider>
        <ReactQueryDevtools />
      </QueryClientProvider>
    </I18nProvider>
  );
}

export default MyApp;
