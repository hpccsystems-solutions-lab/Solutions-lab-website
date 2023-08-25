import React from "react";
import { useStaticQuery, graphql } from "gatsby";
import { navigate } from "gatsby";
import { Input, Space } from "antd";
import { SearchOutlined } from "@ant-design/icons";

import "./eclTutorialNav.css";
import { useTheme } from "../../context/themes";

const { Search } = Input;

function EclTutorialNavigation() {
  const { selectedTutorial, setSelectedTutorial } = useTheme();

  // On navigation item clicked
  const handleNavigationLinkClick = (slug) => {
    setSelectedTutorial(slug);
    navigate(slug);
  };

  // Get social Links
  const result = useStaticQuery(graphql`
    query {
      allFile(filter: { sourceInstanceName: { eq: "learnEcl" } }) {
        edges {
          node {
            childMarkdownRemark {
              frontmatter {
                slug
                title
              }
            }
            name
          }
        }
      }
    }
  `);

  const edges = result.allFile.edges;

  // Sort with file name, the gatsby file system does not guarantee  order
  edges.sort((a, b) => {
    const numA = a.node.name;
    const numB = b.node.name;

    if (!isNaN(numA) && !isNaN(numB, 10)) {
      return numA - numB;
    }
    return a.node.name.localeCompare(b.node.name);
  });

  let navItems = [];
  edges.forEach((item) => {
    const label = item.node.childMarkdownRemark.frontmatter.title;
    const value = `/learn-ecl/${item.node.childMarkdownRemark.frontmatter.slug}`;
    navItems.push({ label, value });
  });

  return (
    <div className="eclTutorialNavigation">
      <div className="eclTutorialNavigation__search">
        <div className="eclTutorialNavigation__search_placeholder">Search docs</div>
        <SearchOutlined />
      </div>
      {navItems.map((item, index) => {
        return (
          <ul
            key={index}
            className={`eclTutorialNavigation__item ${selectedTutorial == item.value ? "eclTutorialNavigation__selectedItem" : null}`}
            onClick={() => {
              handleNavigationLinkClick(item.value);
            }}
          >
            {item.label}
          </ul>
        );
      })}
    </div>
  );
}

export default EclTutorialNavigation;
