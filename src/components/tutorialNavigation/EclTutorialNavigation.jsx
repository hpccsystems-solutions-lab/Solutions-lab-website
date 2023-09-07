import React, { useState, useRef, useEffect } from "react";
import { useStaticQuery, graphql } from "gatsby";
import { navigate } from "gatsby";
import { Input, Modal, Result } from "antd";
import { SearchOutlined } from "@ant-design/icons";

import "./eclTutorialNav.css";
import { useTheme } from "../../context/themes";

// const { Search } = Input;

function EclTutorialNavigation() {
  const { darkMode, selectedTutorial, setSelectedTutorial } = useTheme();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const inputRef = useRef(null);

  // On navigation item clicked
  const handleNavigationLinkClick = (slug) => {
    setSelectedTutorial(slug);
    navigate(slug);
  };

  // when search is clicked
  const handleSearchIntention = () => {
    setIsModalOpen(true);
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [isModalOpen]);

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
      <div
        className="eclTutorialNavigation__search"
        onClick={handleSearchIntention}
      >
        <div className="eclTutorialNavigation__search_placeholder">
          Search docs
        </div>
        <SearchOutlined />
      </div>
      {navItems.map((item, index) => {
        return (
          <ul
            key={index}
            className={`eclTutorialNavigation__item ${
              selectedTutorial == item.value
                ? "eclTutorialNavigation__selectedItem"
                : null
            }`}
            onClick={() => {
              handleNavigationLinkClick(item.value);
            }}
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
      <Modal
        className="searchModal"
        open={isModalOpen}
        closable={false}
        footer={null}
        maskClosable={true}
        mask={true}
        onCancel={() => {
          setIsModalOpen(false);
        }}
      >
        <div className="searchModal__input">
          <Input suffix={<SearchOutlined />} ref={inputRef} />
        </div>
        <div style={{ textAlign: "center", marginTop: "30px", color: "gray" }}>
          This feature is currently under development{" "}
        </div>
      </Modal>
    </div>
  );
}

export default EclTutorialNavigation;
