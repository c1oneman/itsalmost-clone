import React, {useContext} from "react";
import {ThemeContext} from "../contexts/ThemeContext";

const Divider = ({filltext}) => {
  const {lightTheme} = useContext(ThemeContext);
  const theme = !lightTheme ? " darkmode" : "";
  return (
    <div className={"divider" + theme}>
      <span>{filltext}</span>
    </div>
  );
};

export default Divider;
