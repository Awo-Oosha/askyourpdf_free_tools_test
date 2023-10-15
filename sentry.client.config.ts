// This file configures the initialization of Sentry on the client.
// The config you add here will be used whenever a users loads a page in their browser.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

// import * as Sentry from "@sentry/nextjs";
//
// Sentry.init({
//   dsn: "https://1b1563f02648395adfe0fcf25d0464db@o4505201232773120.ingest.sentry.io/4505889011269632",
//
//   // Adjust this value in production, or use tracesSampler for greater control
//   tracesSampleRate: 1,
//
//   // Setting this option to true will print useful information to the console while you're setting up Sentry.
//   debug: false,
//
//   replaysOnErrorSampleRate: 1.0,
//
//   // This sets the sample rate to be 10%. You may want this to be 100% while
//   // in development and sample at a lower rate in production
//   replaysSessionSampleRate: 0.1,
//
//   ignoreErrors: ["TypeError: Failed to fetch"],
//
//   // You can remove this option if you're not planning to use the Sentry Session Replay feature:
//   integrations: [
//     new Sentry.Replay({
//       // Additional Replay configuration goes in here, for example:
//       networkDetailAllowUrls: [
//         window.location.origin,
//         /^https?:\/\/.*\.askyourpdf\.com/
//       ],
//       networkRequestHeaders: ["Cache-Control"],
//       networkResponseHeaders: ["Referrer-Policy"],
//       maskAllText: false,
//       blockAllMedia: true,
//     }),
//   ],
// });
