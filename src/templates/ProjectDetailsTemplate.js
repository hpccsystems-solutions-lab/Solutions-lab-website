import React from "react";
import Layout from "../components/layout/Layout";
import "./templates.css";
import { graphql } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";

function ProjectDetailsTemplate({ data, pageContext }) {
  const imageData = data.allFile.edges[0].node;

  return (
    <Layout>
      <>
        <div>
          <GatsbyImage image={getImage(imageData)} alt={pageContext.imgName} />
        </div>
        <div className="projectDetailsTemplate__projectTitle">
          <h1>{pageContext.projectTitle}</h1>
        </div>
        <div>
          <div dangerouslySetInnerHTML={{ __html: pageContext.fullText }}></div>
        </div>
      </>
    </Layout>
  );
}

export default ProjectDetailsTemplate;

export const getProjectHeroImages = graphql`
  query MyQuery($imgName: String) {
    allFile(
      filter: {
        sourceInstanceName: { eq: "project-images" }
        name: { eq: $imgName }
      }
    ) {
      edges {
        node {
          name
          ext
          childImageSharp {
            id
            gatsbyImageData(width: 1600, height: 500)
          }
        }
      }
    }
  }
`;
