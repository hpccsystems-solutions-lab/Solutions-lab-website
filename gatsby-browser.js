// gatsby-browser.js
import React from "react";
import { ThemeProvider } from "./src/context/themes";

export const wrapRootElement = ({ element }) => (
  <ThemeProvider>{element}</ThemeProvider>
);
