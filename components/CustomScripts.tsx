import Script from "next/script";
import React from "react";

export default function CustomScripts() {
  return (
    <>
      <Script
        strategy="afterInteractive"
        src="https://www.googletagmanager.com/gtag/js?id=AW-11303803798"
      />
      <Script id="google-tag-manager" strategy="lazyOnload">
        {` 
            window.dataLayer = window.dataLayer || [];
            function gtag() {
            dataLayer.push(arguments);
            }
            gtag("js", new Date());

            gtag("config", "AW-11303803798");
        `}
      </Script>
      <Script id="facebook" strategy="afterInteractive">
        {`!function(f,b,e,v,n,t,s)
                {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                    n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                    if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                    n.queue=[];t=b.createElement(e);t.async=!0;
                    t.src=v;s=b.getElementsByTagName(e)[0];
                    s.parentNode.insertBefore(t,s)}(window, document,'script',
                'https://connect.facebook.net/en_US/fbevents.js');
                fbq('init', '259151090278142');
                fbq('track', 'PageView');`}
      </Script>
      <script
        dangerouslySetInnerHTML={{
          __html: `(function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
    })(window, document, "clarity", "script", "j6c1sq1uct");`,
        }}
      />
    </>
  );
}

export function ChurnKeyScripts() {
  return (
    <Script id="churn" strategy="afterInteractive">
      {`!(function () {
            if (!window.churnkey || !window.churnkey.created) {
                window.churnkey = { created: true };
                const a = document.createElement("script");
                a.src =
                "https://assets.churnkey.co/js/app.js?appId=c1v2373yz";
                a.async = true;
                const b = document.getElementsByTagName("script")[0];
                b.parentNode.insertBefore(a, b);
            }
        })();`}
    </Script>
  );
}

export function LCDScript() {
  return {
    __html: `{
  "@context": "https://schema.org/",
  "@type": "Organization",
  "name": "AskYourPDF",
  "alternateName": "AskYourPDF",
  "url": "https://askyourpdf.com/",
  "logo": "https://res.cloudinary.com/dmvok0i3j/image/upload/t_logo/logo_1_zla3cw.jpg?auto=compress,format&w=219&dpr=2",
  "sameAs": [
    "https://instagram.com/_askyourpdf",
    "https://twitter.com/askyourpdf"
  ]
}`,
  };
}

export function LCDScript2() {
  return {
    __html: `{
  "@context": "https://schema.org/",
  "@type": "WebSite",
  "name": "AskYourPDF",
  "url": "https://askyourpdf.com/"
}`,
  };
}
