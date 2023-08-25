import React from 'react'
import Layout from '../components/layout/Layout'
import { graphql } from 'gatsby';
import "./index.css"

function about({data}) {

  const rawHtml = data.allFile.edges[0].node.childMarkdownRemark.html
  return (
    <Layout>
      <div className="about">
        <div dangerouslySetInnerHTML={{ __html: rawHtml }}></div>
      </div>
    </Layout>
  );
}

export default about


export const aboutUs = graphql`
  query getAboutUsDetails {
    allFile(
    filter: {sourceInstanceName: {eq: "website-static-content"}, childMarkdownRemark: {frontmatter: {title: {eq: "about"}}}}
  ) {
    edges {
      node {
        childMarkdownRemark {
          html
        }
      }
    }
  }
  }
`;
