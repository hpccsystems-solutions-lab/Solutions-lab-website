import React from "react";
import { ThemeProvider } from "./src/context/themes"; // Update the import path based on your project structure

export const wrapRootElement = ({ element }) => (
  <ThemeProvider>{element}</ThemeProvider>
);
