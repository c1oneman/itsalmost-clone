import React, {useContext} from "react";
import {Link} from "react-router-dom";
import ToggleTheme from "./ToggleTheme";
import {useDispatch, useSelector} from "react-redux";
import {selectDarkmode} from "../features/darkmode/darkmodeSlice";
const Navbar = () => {
  const darkmode = useSelector(selectDarkmode);
  const theme = darkmode ? " darkmode" : "";
  return (
    <div className={"footer " + theme}>
      <p>
        Made with <span className="heart">❤</span> in Florida |{" "}
      </p>
      <p>
        <Link to="/browse">Browse timers</Link>
      </p>
    </div>
  );
};

export default Navbar;
