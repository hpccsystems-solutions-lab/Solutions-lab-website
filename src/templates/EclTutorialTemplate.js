import React from "react";
import { MDXProvider } from "@mdx-js/react";

import Layout from "../components/layout/Layout";
import EclCode from "../components/eclCodeBlock/EclCode.jsx";
import EclTutorialNavigation from "../components/tutorialNavigation/EclTutorialNavigation";
import NextAndPrevBtns from "../components/prevAndNextBtns/NextAndPrevBtns";

const shortcodes = {
  EclCode,
  table: (props) => <table className="eclTutorialTemplate_table" {...props} />,
  h2: (props) => (
    <h2 {...props} className="eclTutorialTemplate_h2">
      {props.children}
    </h2>
  ),
  h3: (props) => (
    <h3 {...props} className="eclTutorialTemplate_h3">
      {props.children}
    </h3>
  ),
};

function EclTutorialTemplate({ children, pageContext }) {
  const { nextSlug, prevSlug } = pageContext;

  return (
    <Layout>
      <div className="learnEclTutorialTemplate">
        <div className="eclTutorialTemplate__navigation">
          <EclTutorialNavigation />
        </div>
        <div className="eclTutorialTemplate__content">
          <MDXProvider components={shortcodes}>{children}</MDXProvider>
          <NextAndPrevBtns nextSlug={nextSlug} prevSlug={prevSlug} />
        </div>
      </div>
    </Layout>
  );
}

export default EclTutorialTemplate;
