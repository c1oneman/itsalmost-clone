import React, {useContext} from "react";
import {Link, useHistory} from "react-router-dom";
import ToggleTheme from "./ToggleTheme";
import {useDispatch, useSelector} from "react-redux";
import {setTimer} from "../features/timer/timerSlice";
import {selectDarkmode} from "../features/darkmode/darkmodeSlice";
import Countdown from "react-countdown";
import TimeSimpleModule from "./TimeSimpleModule";
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
      <div className="left">
        <h2>It's almost..</h2>
        <h1>{props.timer.title}</h1>
      </div>
      <div className="right">
        <div className="bubble">
          <p>{props.timer.id}</p>
        </div>

        <Countdown
          date={props.timer.expires}
          intervalDelay={3000}
          precision={1}
          renderer={(data) => (
            <div className="flex">
              <TimeSimpleModule val={data.days} type="d" total={data.total} />
              <TimeSimpleModule val={data.hours} type="h" total={data.total} />
              <TimeSimpleModule val={data.minutes} type="m" total={data.total} />
            </div>
          )}
        />
      </div>
    </div>
  );
};

export default TimerPreview;
