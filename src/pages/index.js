import * as React from "react";
import { graphql, navigate } from "gatsby";
import { Button } from "antd";

import Layout from "../components/layout/Layout";
import { StaticImage } from "gatsby-plugin-image";
import ProjectCards from "../components/projects/ProjectCards";
import "./index.css";

const IndexPage = ({ data }) => {
  const htmlData = {}
  const edges = data.allFile.edges;

  edges.forEach(item =>{
    const title = item.node.childMarkdownRemark.frontmatter.title;
    const html = item.node.childMarkdownRemark.html;
    htmlData[title] = html;
  })


  //JSX
  return (
    <Layout>
      <>
        <StaticImage src="../images/water-cycle.jpg" alt="hpcc-image" className="Index__heroImage"/>
        <div className="homeSection1">
          <div
            className="homeSection1__first"
            dangerouslySetInnerHTML={{ __html: htmlData["hpcc-intro"] }}
          />
          <div className="homeSection1__second" style={{ textAlign: "center" }}>
            <div 
            dangerouslySetInnerHTML={{ __html: htmlData["learn-ecl-intro"] }}
            />
            <Button type="primary" size="large" className="homeSection1__second-actionBtn" onClick={() =>{navigate("/learn-ecl/introduction/");}}>Start Learning ECL </Button>
          </div>
        </div>
        <ProjectCards />
      </>
    </Layout>
  );
};

export default IndexPage;

export const Head = () => <title>Home</title>;

export const getHomePageTextQuery = graphql`
  query getHomePageText {
    allFile(filter: { sourceInstanceName: { eq: "website-static-content" } }) {
      edges {
        node {
          childMarkdownRemark {
            html
            frontmatter {
              title
              slug
            }
          }
        }
      }
    }
  }
`;
