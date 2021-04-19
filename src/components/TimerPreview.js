import React, {useContext} from "react";
import {Link, useHistory} from "react-router-dom";
import ToggleTheme from "./ToggleTheme";
import {useDispatch, useSelector} from "react-redux";
import {setTimer} from "../features/timer/timerSlice";
import {selectDarkmode} from "../features/darkmode/darkmodeSlice";
import Countdown from "react-countdown";
import TimeDetailModule from "./TimeDetailModule";
const TimerPreview = (props) => {
  const darkmode = useSelector(selectDarkmode);
  const theme = darkmode ? " darkmode" : "";
  // function handleClick(e) {
  //   e.preventDefault();
  //   dispatch(setTimer(""));
  //   history.push(`/`);
  // }
  return (
    <div className="preview">
      <h2>{props.timer.title}</h2>
      <p>{props.timer.id}</p>
      <Countdown
        date={props.timer.expires}
        intervalDelay={1000}
        precision={1}
        renderer={(data) => (
          <>
            <div className="timerarea">
              <TimeDetailModule
                val={data.minutes}
                plural="minutes"
                singular="minute"
                hideAt0={true}
                total={data.total}
              />
              <TimeDetailModule
                val={data.hours}
                plural="hours"
                singular="hour"
                hideAt0={true}
                total={data.total}
              />
              <TimeDetailModule
                val={data.days}
                plural="days"
                singular="day"
                hideAt0={true}
                total={data.total}
              />
            </div>
          </>
        )}
      />
    </div>
  );
};

export default TimerPreview;
