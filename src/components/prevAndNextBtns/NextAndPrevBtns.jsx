import React from "react";
import { Button, Divider } from "antd";
import "./nextAndPrevBtns.css";
import { navigate } from "gatsby";
import { useTheme } from "../../context/themes";

function NextAndPrevBtns({ prevSlug, nextSlug }) {
  const { setSelectedTutorial } = useTheme();

  // when Previous btn is clicked
  const handlePreviousBtnClick = () => {
    setSelectedTutorial(`/learn-ecl/${prevSlug}`);
    navigate(`/learn-ecl/${prevSlug}`);
  };

  // when nexy btn is clicked
  const handleNextBtnClick = () => {
    setSelectedTutorial(`/learn-ecl/${nextSlug}`);
    navigate(`/learn-ecl/${nextSlug}`);
  };

  return (
    <div className="nextAndPrevBtns">
      {prevSlug ? (
        <Button type="primary" onClick={handlePreviousBtnClick}>
          Previous
        </Button>
      ) : (
        <div></div>
      )}
      {/* <Divider /> */}
      {nextSlug ? (
        <Button type="primary" onClick={handleNextBtnClick}>
          Next
        </Button>
      ) : (
        <div></div>
      )}
    </div>
  );
}

export default NextAndPrevBtns;
