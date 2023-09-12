import React from "react";
import { Button } from "antd";
import "./projects.css";
import { Link } from "gatsby";

function ProjectCard({ project }) {
  let { title, shortDescription, link } =
    project.node.childMarkdownRemark.frontmatter;
  shortDescription =
    shortDescription.length > 250
      ? shortDescription.substring(0, 500)
      : shortDescription;

  return (
    <div className="projectCard">
      <div className="projectCard__title">
        <h2>{title}</h2>
      </div>
      <div className="projectCard_Inner">
        <div>{shortDescription}</div>
        <div className="projectCard__learnMoreBtn">
          <Link to={`/projects/${link}`}>
            <Button type="primary">Learn More</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ProjectCard;
