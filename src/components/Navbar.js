import React, {useContext} from "react";
import {Link} from "react-router-dom";
import ToggleTheme from "./ToggleTheme";
import {useSelector} from "react-redux";
import {selectDarkmode} from "../features/darkmode/darkmodeSlice";
const Navbar = () => {
  const darkmode = useSelector(selectDarkmode);
  const theme = darkmode ? " darkmode" : "";
  return (
    <div className={"navbar" + theme}>
      <div>
        <h1>
          <Link to="/">itsalmo.st</Link>&nbsp;clone
        </h1>
        <a target="_blank" rel="noreferrer" href="https://loneman.dev">
          <p>
            by Clayton Loneman <span className="dev">-></span>
          </p>
        </a>
      </div>

      <ToggleTheme />
    </div>
  );
};

export default Navbar;
