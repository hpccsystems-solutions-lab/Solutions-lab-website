import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import { BsMoonStars, BsFillSunFill } from "react-icons/bs";
import { StaticImage } from "gatsby-plugin-image";
import { navigate } from "gatsby";

import { useTheme } from "../../context/themes";
import "./header.css";

const Header = () => {
  const { darkMode, toggleTheme, selectedPage, setSelectedPage } = useTheme();

  //Toggle theme
  const toggleDarkMode = () => {
    toggleTheme(!darkMode);
  };

  //JSX
  return (
    <>
      <Navbar
        bg={darkMode ? "dark" : "light"}
        data-bs-theme={darkMode ? "dark" : "light"}
        fixed="top"
      >
        <Container fluid className="header__container">
          <Navbar.Brand
            onClick={() => {
              setSelectedPage(null);
              navigate("/");
            }}
            className="header__logo"
          >
            {!darkMode ? (
              <StaticImage
                src="../../images/logo-light.png"
                alt="Logo"
                width={128}
                className="d-inline-block align-top"
              />
            ) : null}
            {darkMode ? (
              <StaticImage
                src="../../images/logo-dark.png"
                alt="Logo"
                width={128}
                className="d-inline-block align-top"
              />
            ) : null}
          </Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link
              onClick={() => {
                navigate("/about");
                setSelectedPage("about");
              }}
              className={`header__link ${
                selectedPage === "about" ? "header__link_selected" : ""
              }`}
            >
              About
            </Nav.Link>
            <Nav.Link
              activeClassName="test"
              onClick={() => {
                navigate("/projects");
                setSelectedPage("projects");
              }}
              className={`header__link ${
                selectedPage === "projects" ? "header__link_selected" : ""
              }`}
            >
              Projects
            </Nav.Link>
            <Nav.Link
              activeClassName="test"
              onClick={() => {
                navigate("/learn-ecl/introduction");
                setSelectedPage("learn-ecl");
              }}
              className={`header__link ${
                selectedPage === "learn-ecl" ? "header__link_selected" : ""
              }`}
            >
              Learn ECL
            </Nav.Link>
          </Nav>
          <Nav.Link className="header__themeToggleBtn">
            {darkMode ? (
              <BsFillSunFill
                onClick={toggleDarkMode}
                className="header__themeToggleBtn__sun"
              />
            ) : (
              <BsMoonStars
                onClick={toggleDarkMode}
                className="header__themeToggleBtn__moon"
              />
            )}
          </Nav.Link>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
