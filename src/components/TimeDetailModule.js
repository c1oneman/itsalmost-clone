import React, {useContext} from "react";
import TextTransition from "react-text-transition";
import {useSelector} from "react-redux";
import {selectDarkmode} from "../features/darkmode/darkmodeSlice";
const TimeDetailModule = ({val, plural, singular, hideAt0, total, ms}) => {
  const darkmode = useSelector(selectDarkmode);
  const theme = darkmode ? " darkmode" : "";
  return (
    <div className={"timebox" + theme}>
      {(val === 0 && hideAt0) || total === 0 ? (
        <></>
      ) : (
        <>
          <h1>
            <TextTransition noOverflow={true} inline={true} direction="down" text={val} />
          </h1>
          <div className="numType">
            <h2>{val !== 1 ? plural : singular}</h2>
            <p>{ms}</p>
          </div>
        </>
      )}
    </div>
  );
};

export default TimeDetailModule;
