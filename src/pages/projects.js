import React from 'react'
import { graphql } from 'gatsby'

import Layout from "../components/layout/Layout";
import ProjectCard from '../components/projects/ProjectCard';
import "./index.css"


function projects({data}) {
      let projects = data.allFile.edges;
  return (
    <Layout>
      <div className='projects'>
        {projects.map((item, index) => {
          return <ProjectCard project={item} itemId={index} key={item.node.childMarkdownRemark.frontmatter.title} />;
        })}
      </div>
    </Layout>
  );
}

export default projects;

export const getProjects = graphql`
  query getProjectDetails {
    allFile(filter: { sourceInstanceName: { eq: "project-md-files" } }) {
      edges {
        node {
          childMarkdownRemark {
            frontmatter {
              gitHubRepo
              imageName
              link
              title
              shortDescription
            }
          }
        }
      }
    }
  }
`;