if (
  process.env.LD_LIBRARY_PATH == null ||
  !process.env.LD_LIBRARY_PATH.includes(
    `${process.env.PWD}/node_modules/canvas/build/Release:`,
  )
) {
  process.env.LD_LIBRARY_PATH = `${
    process.env.PWD
  }/node_modules/canvas/build/Release:${process.env.LD_LIBRARY_PATH || ''}`;
} 

const linguiConfig = require("./lingui.config");

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: 'build',
  reactStrictMode: false,
  swcMinify: true,
  compiler: {
    styledComponents: true,
  },
  experimental: {
    swcPlugins: [["@lingui/swc-plugin", {}]],
  },
  transpilePackages: ["@lingui"],
  i18n: {
    locales: linguiConfig.locales,
    defaultLocale: "en",
  },
  webpack(config) {
    // Grab the existing rule that handles SVG imports
    const fileLoaderRule = config.module.rules.find((rule) =>
      rule.test?.test?.(".svg")
    );

    config.module.rules.push(
      // Reapply the existing rule, but only for svg imports ending in ?url
      {
        ...fileLoaderRule,
        test: /\.svg$/i,
        resourceQuery: /url/, // *.svg?url
      },
      // Convert all other *.svg imports to React components
      {
        test: /\.svg$/i,
        issuer: /\.[jt]sx?$/,
        resourceQuery: { not: /url/ }, // exclude if *.svg?url
        use: ["@svgr/webpack"],
      }
    );

    // Modify the file loader rule to ignore *.svg, since we have it handled now.
    fileLoaderRule.exclude = /\.svg$/i;

    return config;
  },
  modularizeImports: {
    "@phosphor-icons/react": {
      transform: "@phosphor-icons/react/{{member}}",
    },
  },
  rewrites: () => {
    return {
      beforeFiles: [
        {
          source: "/blog",
          destination: "https://askyourpdf.feather.blog/blog",
        },
        {
          source: "/blog/:path*",
          destination: "https://askyourpdf.feather.blog/blog/:path*",
        },
        {
          source: "/_feather",
          destination: "https://askyourpdf.feather.blog/_feather",
        },
        {
          source: "/_feather/:path*",
          destination: "https://askyourpdf.feather.blog/_feather/:path*",
        },
      ],
    };
  },
  headers: () => {
    return [
      {
        source: "/blog",
        headers: [
          {
            key: "X-Forwarded-Host",
            value: "askyourpdf.com",
          },
        ],
      },
      {
        source: "/blog/:slug*",
        headers: [
          {
            key: "X-Forwarded-Host",
            value: "askyourpdf.com",
          },
        ],
      },
      {
        source: "/_feather",
        headers: [
          {
            key: "X-Forwarded-Host",
            value: "askyourpdf.com",
          },
        ],
      },

      {
        source: "/_feather/:slug*",
        headers: [
          {
            key: "X-Forwarded-Host",
            value: "askyourpdf.com",
          },
        ],
      },
    ];
  },
};
module.exports = withBundleAnalyzer(nextConfig);