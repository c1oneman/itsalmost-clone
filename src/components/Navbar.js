import React, {useContext} from "react";
import {Link, useHistory} from "react-router-dom";
import ToggleTheme from "./ToggleTheme";
import {useDispatch, useSelector} from "react-redux";
import {setTimer} from "../features/timer/timerSlice";
import {selectDarkmode} from "../features/darkmode/darkmodeSlice";
const Navbar = () => {
  const darkmode = useSelector(selectDarkmode);
  const theme = darkmode ? " darkmode" : "";
  const dispatch = useDispatch();
  const history = useHistory();
  function handleClick(e) {
    e.preventDefault();
    dispatch(setTimer(""));
    history.push(`/`);
  }
  return (
    <div className={"navbar" + theme}>
      <div>
        <h1>
          <Link to="/" onClick={handleClick}>
            itsalmo.st
          </Link>
          &nbsp;clone
        </h1>
        <a target="_blank" rel="noreferrer" href="https://loneman.dev">
          <p>
            by Clayton Loneman<span className="dev">.dev</span>
          </p>
        </a>
      </div>
      <ToggleTheme />
    </div>
  );
};

export default Navbar;
