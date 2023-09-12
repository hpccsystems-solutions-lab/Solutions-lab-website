import React from "react";
import ProjectCard from "./ProjectCard";
import "./projects.css";
import { useStaticQuery, graphql } from "gatsby";
// import { ScrollMenu } from "react-horizontal-scrolling-menu";
import "react-horizontal-scrolling-menu/dist/styles.css";
// import { DoubleRightOutlined, DoubleLeftOutlined } from "@ant-design/icons";

function ProjectCards() {
  // //Left Arrow
  // function LeftArrow() {
  //   const { isFirstItemVisible, scrollPrev } = React.useContext(VisibilityContext);

  //   return (
  //     <div disabled={isFirstItemVisible} onClick={() => scrollPrev()} className="projectCards__leftArrow">
  //       <DoubleLeftOutlined />
  //     </div>
  //   );
  // }

  // //Right Arrow
  // function RightArrow() {
  //   const { isLastItemVisible, scrollNext } = React.useContext(VisibilityContext);

  //   return (
  //     <div disabled={isLastItemVisible} onClick={() => scrollNext()} className="projectCards__rightArrow">
  //       <DoubleRightOutlined />
  //     </div>
  //   );
  // }

  // Get data using graph QL query
  const data = useStaticQuery(graphql`
    query getProjectMeta {
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
  `);

  // const projects = data.allFile.edges;
  const projects = data.allFile.edges;

  return (
    <div className="projectCards ">
      <div className="projectCards__heading ">
        <div className="topic-container">
          <h1 className="topic"> Projects</h1>
        </div>
      </div>
      {/* <ScrollMenu */}
      <div
        // LeftArrow={LeftArrow}
        // RightArrow={RightArrow}
        className="projectCards__projects"
      >
        {projects.map((item, index) => {
          return (
            <ProjectCard
              project={item}
              itemId={index}
              key={item.node.childMarkdownRemark.frontmatter.title}
            />
          );
        })}
        {/* </ScrollMenu> */}
      </div>
    </div>
  );
}

export default ProjectCards;
