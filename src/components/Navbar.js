import React, { Component, useContext } from "react";
import ToggleTheme from "./ToggleTheme";
import { ThemeContext } from "../contexts/ThemeContext";




const Navbar = () => {
  const { lightTheme } = useContext(ThemeContext);
  const theme = !lightTheme ? " darkmode" : "";
  return (
    <div className={"navbar" + theme}>
      <div>
        <h1>itsalmo.st clone</h1>
        <p>by clayton loneman</p>
      </div>

      <ToggleTheme />
    </div>
  );
};

export default Navbar;
