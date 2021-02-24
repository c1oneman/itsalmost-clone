import React, { Component, useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";
import TextTransition, { presets } from "react-text-transition";

const TimeDetailModule = ({ val, plural, singular, hideAt0, total }) => {
  const { lightTheme } = useContext(ThemeContext);
  const theme = !lightTheme ? " darkmode" : "";
  return (
    <div className={"timebox" + theme}>
      {((val == 0 && hideAt0) || total == 0) ? (
        <></>
      ) : (
        <>
          <h1>
            <TextTransition
              noOverflow={true}
              inline={true}
              direction="down"
              text={val}
            />
          </h1>
          <h2>{val > 1 ? plural : singular}</h2>
        </>
      )}
    </div>
  );
};

export default TimeDetailModule;
