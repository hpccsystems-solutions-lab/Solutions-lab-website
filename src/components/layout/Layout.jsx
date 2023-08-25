import React from "react";
import { Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import { useTheme } from "../../context/themes";
import Header from "../header/Header";
import Footer from "../footer/Footer";
import "./layout.css";
import PageBody from "../body/PageBody";

function Layout({ children }) {
  const { darkMode } = useTheme();

  return (
    <div className={`layout  ${darkMode ? "darkTheme" : "lightTheme"}`}>
      <Container className="layout__container" fluid>
        <div className="layout__header">
          <Header />
        </div>
        <div className="layout__body">
          <PageBody>{children}</PageBody>
        </div>
        <div className="layout__footer">
          <Footer />
        </div>
      </Container>
    </div>
  );
}

export default Layout;
