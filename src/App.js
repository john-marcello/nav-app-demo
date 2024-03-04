import React from "react";

import StylesInline from "./components/demos/StylesInline";
import StylesSheet from "./components/demos/StylesSheet";

import "./App.css";
import StylesModule from "./components/demos/StylesModule";
import StylesComponent from "./components/demos/StylesComponent";

export default function App() {
  return (
    <div className="App">
      <StylesInline />
      <StylesSheet />
      <StylesModule />
      <StylesComponent />
    </div>
  );
}
