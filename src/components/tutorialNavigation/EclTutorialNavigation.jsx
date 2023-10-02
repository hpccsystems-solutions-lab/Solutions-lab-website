import React, { useEffect } from "react";
import { useStaticQuery, graphql } from "gatsby";
import { navigate } from "gatsby";
// import { Input } from "antd";
// import { SearchOutlined } from "@ant-design/icons";

import "./eclTutorialNav.css";
import { useTheme } from "../../context/themes";

// const { Search } = Input;

function EclTutorialNavigation() {
  const { darkMode, selectedTutorial, setSelectedTutorial } = useTheme();

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

  // scroll to currently active page
  useEffect(() => {
    const anchor = document.querySelector(
      ".eclTutorialNavigation__selectedItem"
    );
    if (anchor) {
      anchor.scrollIntoView({ behavior: "auto", block: "center" });
    }
  }, []);

  return (
    <div className="eclTutorialNavigation">
      {/* <div className="eclTutorialNavigation__search">
        <div className="eclTutorialNavigation__search_placeholder">
          Search docs
        </div>
        <SearchOutlined />
      </div> */}
      {navItems.map((item, index) => {
        return (
          <ul
            key={index}
            className={`eclTutorialNavigation__item ${
              selectedTutorial === item.value
                ? "eclTutorialNavigation__selectedItem"
                : null
            }`}
          >
            <button
              className={darkMode ? "menuButton" : "menuButtonLight"}
              onClick={() => {
                handleNavigationLinkClick(item.value);
              }}
            >
              {item.label}
            </button>
          </ul>
        );
      })}
    </div>
  );
}

export default EclTutorialNavigation;
