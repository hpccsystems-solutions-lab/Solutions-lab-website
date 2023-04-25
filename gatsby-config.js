'use strict';

const isNil = require('lodash.isnil');
const truncate = require('lodash.truncate');
const removeMarkdown = require('remove-markdown');

require('dotenv').config();

const siteUrl = 'https://hpccsystems-solutions-lab.github.io/';

module.exports = {
  pathPrefix: `/hpccsystems-solutions-lab.github.io`,
  siteMetadata: {
    title: 'HPCCSystems Solutions Lab',
    sidebarTitle: 'HPCCSystems Solutions Lab',
    sidebarSubtext: 'Documentation',
    siteLastUpdated: new Date().toISOString(),
    description:
      'HPCC Systems is a mature platform that has been heavily used in commercial applications for almost two decades, predating the development of Hadoop. Created by LexisNexis Risk Solutions, an innovative pioneer in big data processing, and open source for nearly a decade now, HPCC Systems features a vibrant development community that continues to push the boundaries of big data.',
    version: '3.5.5',
    siteUrl,
    keywords: 'hpcc, hpccsystems, ecl',
    author: {
      name: 'HPCCSystems.com',
      url: 'https://hpccsystems.com',
      email: 'info@hpccsystems.com'
    },
    socials: [
      {
        name: 'ContactUS',
        imgpath: 'icon-contact.svg',
        url: 'mailto:hpcc-solutions-lab@lexisnexisrisk.com'
      },
      {
        name: 'Twitter',
        imgpath: 'icon-twitter.svg',
        url: 'https://twitter.com/hpccsystems'
      },
      {
        name: 'GitHub',
        imgpath: 'icon-github.svg',
        url: 'https://github.com/hpcc-systems'
      },
      {
        name: 'LinkedIn',
        imgpath: 'icon-linkedin.svg',
        url: 'https://www.linkedin.com/company/hpcc-systems'
      }
    ]
  },
  plugins: [
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'docs',
        path: `${__dirname}/docs`
      }
    },
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              // It's important to specify the maxWidth (in pixels) of
              // the content container as this plugin uses this as the
              // base for generating different widths of each image.
              maxWidth: 1200,
            },
          },
          {
            resolve: 'gatsby-remark-responsive-iframe',
            options: {
              wrapperStyle: 'margin-bottom: 1rem'
            }
          },
          'gatsby-remark-prismjs',
          'gatsby-remark-autolink-headers',
          'gatsby-remark-smartypants'
        ]
      }
    },
    'gatsby-transformer-json',
    {
      resolve: 'gatsby-plugin-lunr',
      options: {
        languages: [
          {
            name: 'en',
            // A function for filtering nodes. () => true by default
            filterNodes: node => !isNil(node.frontmatter)
          }
        ],
        fields: [
          { name: 'title', store: true, attributes: { boost: 20 } },
          { name: 'content' },
          { name: 'excerpt', store: true },
          { name: 'url', store: true }
        ],
        resolvers: {
          MarkdownRemark: {
            title: node => node.frontmatter.title,
            content: node => node.rawMarkdownBody,
            excerpt: node => {
              // remove the hella dirty markdown body and return just plain string
              return truncate(removeMarkdown(node.rawMarkdownBody).replace(/\n/g, ' '), {
                length: 150
              });
            },
            url: node => node.fields.slug
          }
        }
      }
    },
    /*{
      resolve: 'gatsby-plugin-canonical-urls',
      options: {
        siteUrl: 'https://docs.kata.ai'
      }
    },*/
    'gatsby-plugin-styled-components',
    'gatsby-plugin-resolve-src',
    'gatsby-plugin-typescript',
    'gatsby-plugin-sharp',
    'gatsby-plugin-catch-links',
    'gatsby-transformer-sharp',
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-plugin-nprogress',
      options: {
        color: '#006fe6', // kata-blue
        showSpinner: false
      }
    },    
    'gatsby-plugin-netlify-cache',
    'gatsby-plugin-netlify',
    {
      resolve: `gatsby-source-git`,
      options: {
        name: `master`,
        remote: `https://github.com/hpccsystems-solutions-lab/Learn-ECL.git`,
        // Optionally supply a branch. If none supplied, you'll get the default branch.
        branch: `master`,
        // Tailor which files get imported eg. import the docs folder from a codebase.
        patterns: `*.md`,
        local: `${__dirname}/docs/hpcc`
      }
    },{
      resolve: `gatsby-plugin-google-gtag`,
      options: {
        // You can add multiple tracking ids and a pageview event will be fired for all of them.
        trackingIds: [
          "G-4SSWFC1PB0", // Google Analytics 
        ],
        // This object gets passed directly to the gtag config command
        // This config will be shared across all trackingIds
        gtagConfig: {
          optimize_id: "OPT_CONTAINER_ID",
          anonymize_ip: true,
          cookie_expires: 0,
        },
        // This object is used for configuration specific to this plugin
        pluginConfig: {
          // Puts tracking script in the head instead of the body
          head: false,
          // Setting this parameter is also optional
          respectDNT: true,
          // Avoids sending pageview hits from custom paths
          exclude: ["/preview/**", "/do-not-track/me/too/"],
          // Defaults to https://www.googletagmanager.com
          origin: "YOUR_SELF_HOSTED_ORIGIN",
          // Delays processing pageview events on route update (in milliseconds)
          delayOnRouteUpdate: 0,
        },
      },
    }      
/*    {
      resolve: `gatsby-source-git`,
      options: {
        name: `CodeDay`,
        remote: `https://github.com/hpccsystems-solutions-lab/CodeDay_May2020.git`,
        // Optionally supply a branch. If none supplied, you'll get the default branch.
        branch: `master`,
        // Tailor which files get imported eg. import the docs folder from a codebase.
        patterns: `*.md`,
        local: `${__dirname}/docs/codeday`
      }
    } */

  ]
};


