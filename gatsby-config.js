const remarkGfm = require("remark-gfm");

const config = {
  siteMetadata: {
    title: `HPCC Systems Solution Lab`,
    siteUrl: `https://solutionslab.hpccsystems.com/`,
    siteLastUpdated: new Date().toISOString(),
    description:
      "HPCC Systems is a mature platform that has been heavily used in commercial applications for almost two decades, predating the development of Hadoop. Created by LexisNexis Risk Solutions, an innovative pioneer in big data processing, and open source for nearly a decade now, HPCC Systems features a vibrant development community that continues to push the boundaries of big data.",
    keywords: "hpcc, hpccsystems, ecl, learn ECL",
    author: {
      name: "HPCCSystems.com",
      url: "https://hpccsystems.com",
      email: "info@hpccsystems.com",
    },
    socials: [
      {
        name: "ContactUS",
        url: "mailto:hpcc-solutions-lab@lexisnexisrisk.com",
      },
      {
        name: "Instagram",
        url: "https://www.instagram.com/hpcc_systems",
      },
      {
        name: "GitHub",
        url: "https://github.com/hpcc-systems",
      },
      {
        name: "LinkedIn",
        imgpath: "icon-linkedin.svg",
        url: "https://www.linkedin.com/company/hpcc-systems",
      },
    ],
  },
  plugins: [
    "gatsby-plugin-image",
    "gatsby-plugin-sitemap",
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    "gatsby-transformer-remark",
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        extensions: [".md", ".mdx"],
        mdxOptions: {
          remarkPlugins: [remarkGfm],
        },
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        icon: `src/favicon.png`,
      },
    },
    {
      resolve: "gatsby-plugin-google-gtag",
      options: {
        trackingIds: ["G-KX6QXZYE0J"], // TODO move this to secrets
      },
    },
    {
      resolve: `gatsby-source-git`,
      options: {
        name: `database`,
        remote: `https://github.com/hpccsystems-solutions-lab/Solutions-lab-website-content`, // Configure with real repo
        branch: `main`,
        // patterns: `/**/*.md`,
        local: `${__dirname}/database`,
      },
    },
    {
      // Gets images for the site such as logos , hero images etc
      resolve: "gatsby-source-filesystem",
      options: {
        name: "site-images",
        path: `${__dirname}/src/images/`,
      },
      __key: "site-images",
    },
    {
      // Gets html text for home page
      resolve: "gatsby-source-filesystem",
      options: {
        name: "website-static-content",
        path: `${__dirname}/database/solutionsLab/`,
      },
      __key: "website-static-content",
    },
    {
      // Gets all data from project md files
      resolve: "gatsby-source-filesystem",
      options: {
        name: "project-md-files",
        path: `${__dirname}/database/projects`,
      },
      __key: "project-md-files",
    },
    {
      // Gets images for projects
      resolve: "gatsby-source-filesystem",
      options: {
        name: "project-images",
        path: `${__dirname}/database/images`,
      },
      __key: "project-images",
    },
    {
      // Gets learn ecl md files
      resolve: "gatsby-source-filesystem",
      options: {
        name: "learnEcl",
        path: `${__dirname}/database/learnEcl`,
      },
      __key: "learnEcl",
    },
    {
      // Directly add .md or .mdx file inside page directory in src to create pages
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `pages`,
        path: `${__dirname}/src/pages`,
      },
    },
    {
      resolve: `gatsby-plugin-sharp`,
      options: {
        defaults: {},
        failOn: `warning`,
      },
    },
  ],
};

module.exports = config;
