import React, { Component, useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";

const TimeDetailModule = ({ val, plural, singular }) => {
  const { lightTheme } = useContext(ThemeContext);
  const theme = !lightTheme ? " darkmode" : "";
  return (
    <div className={"timebox" + theme}>
      {val != 0 ? (
        <>
          <h1>{val}</h1>
          <h2>{val > 1 ? plural : singular}</h2>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default TimeDetailModule;
