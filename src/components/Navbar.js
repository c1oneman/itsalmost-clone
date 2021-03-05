import React, {useContext} from "react";
import {Link} from "react-router-dom";
import ToggleTheme from "./ToggleTheme";
import {ThemeContext} from "../contexts/ThemeContext";

const Navbar = () => {
  const {lightTheme} = useContext(ThemeContext);
  const theme = !lightTheme ? " darkmode" : "";
  return (
    <div className={"navbar" + theme}>
      <div>
        <h1>
          <Link to="/">itsalmo.st</Link>&nbsp;clone
        </h1>
        <a target="_blank" rel="noreferrer" href="https://loneman.dev">
          <p>by clayton loneman</p>
        </a>
      </div>

      <ToggleTheme />
    </div>
  );
};

export default Navbar;
