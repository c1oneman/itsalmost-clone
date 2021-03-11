import React, {useContext} from "react";
import {useSelector} from "react-redux";

import {ThemeContext} from "../contexts/ThemeContext";
import {selectDarkmode} from "../features/darkmode/darkmodeSlice";
const Divider = ({filltext}) => {
  const darkmode = useSelector(selectDarkmode);
  const theme = darkmode ? " darkmode" : "";
  return (
    <div className={"divider" + theme}>
      <span>{filltext}</span>
    </div>
  );
};

export default Divider;
