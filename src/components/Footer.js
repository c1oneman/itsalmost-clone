import React, {useContext} from "react";
import {Link} from "react-router-dom";
import ToggleTheme from "./ToggleTheme";
import {useDispatch, useSelector} from "react-redux";
import {selectDarkmode} from "../features/darkmode/darkmodeSlice";
const Navbar = () => {
  const darkmode = useSelector(selectDarkmode);
  const theme = darkmode ? " darkmode" : "";
  return (
    <div className={"navbar" + theme}>
      <div className={"footer"}>
        <p>Made with ❤ in Nebraska | </p>
        <p>
          <Link to="/browse">Browse</Link>
        </p>
      </div>
    </div>
  );
};

export default Navbar;
