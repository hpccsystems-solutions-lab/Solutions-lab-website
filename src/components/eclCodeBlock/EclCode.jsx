import React, { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { CopyOutlined } from "@ant-design/icons";
import {
  oneLight,
  oneDark,
} from "react-syntax-highlighter/dist/esm/styles/prism";
import { Button } from "antd";

import "./eclCodeBlock.css";
import { useTheme } from "../../context/themes";

const openEclEditor = ({ eclCode, header = "", files }) => {
  const form = document.createElement("form");
  form.setAttribute("method", "post");
  form.setAttribute("action", "https://hpcc-ecl-web-editor.azurewebsites.net/");
  form.setAttribute("target", "ecl_web_editor");

  const inputCode = document.createElement("input");
  inputCode.type = "hidden";
  inputCode.name = "code";
  inputCode.value = eclCode;
  form.appendChild(inputCode);

  const inputHeader = document.createElement("input");
  inputHeader.type = "hidden";
  inputHeader.name = "header";
  inputHeader.value = header;
  form.appendChild(inputHeader);

  if (files) {
    const inputFile = document.createElement("input");
    inputFile.type = "hidden";
    inputFile.name = "files";
    inputFile.value = files;
    form.appendChild(inputFile);
  }

  document.body.appendChild(form);

  window.open(
    "",
    "ecl_web_editor",
    "width=1400,height=1000,left=100,top=100,resizable=yes,scrollbars=yes"
  );
  form.target = "ecl_web_editor";
  form.submit();

  document.body.removeChild(form);
};

function EclCode(props) {
  const { darkMode } = useTheme();
  const { code, tryMe, id } = props;
  const [copied, setCopied] = useState(false);

  // Handle copy
  const handleCopyClick = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
    } catch (error) {
      console.error("Failed to copy code: ", error, copied);
    }
  };

  //Handle Try me button click
  const handleTryMeClick = () => {
    const allCodeBlockIds = tryMe.split(",");
    let completeCode = "";

    allCodeBlockIds.forEach((id) => {
      const element = document.getElementById(id);
      if (element) {
        const extractedContent = element.textContent;
        completeCode += extractedContent;
      }
    });

    openEclEditor({ eclCode: completeCode });
  };

  return (
    <div className="eclCodeBlock">
      <div className="eclCodeBlock__copyBtn">
        <CopyOutlined onClick={handleCopyClick} />
      </div>
      <div className="eclCodeBlock__codeBlock">
        <SyntaxHighlighter
          language="java"
          style={darkMode ? oneDark : oneLight}
          id={`${id}`}
        >
          {code}
        </SyntaxHighlighter>
      </div>
      {tryMe ? (
        <Button onClick={handleTryMeClick} type="primary">
          Try Me
        </Button>
      ) : null}
    </div>
  );
}

export default EclCode;
