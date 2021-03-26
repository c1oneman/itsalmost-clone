import React, {useContext, useState, useEffect} from "react";
import {useParams} from "react-router-dom";
import Countdown from "react-countdown";
import axios from "axios";
import TimeDetailModule from "./TimeDetailModule";
import useWindowSize from "react-use/lib/useWindowSize";
import Confetti from "react-confetti";
import {useSelector} from "react-redux";
import {selectDarkmode} from "../features/darkmode/darkmodeSlice";
const func_url = process.env.REACT_APP_FUNC_URL;

//const func_url = "http://localhost:63389/.netlify/functions";
const Timer = () => {
  const darkmode = useSelector(selectDarkmode);
  const [title, setTitle] = useState();
  const [doConfetti, toggleConfetti] = useState(false);
  const [prefix, setPrefix] = useState("It's almost ");
  const [finishTime, setFinishTime] = useState();
  const {width, height} = useWindowSize();
  const theme = darkmode ? " darkmode" : "";
  let {id} = useParams();

  useEffect(() => {
    console.log(func_url);
    // Update the document title using the browser API
    const data = {id: id};
    var config = {
      method: "post",
      url: `${func_url}/get-timer`,
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      data: JSON.stringify(data),
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        const title = response.data.title;
        //set state
        setFinishTime(response.data.expires);
        setTitle(title);
        document.title = prefix + title;
        // Easter egg
        if (title.includes("party") || title.includes("birthday")) {
          console.log(`toggle true`);
          toggleConfetti(true);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [id]);
  return (
    <div class={"container " + theme}>
      <div className="item"></div>
      <div className="main-body">
        {/* <TimeDetailModule val="1" plural="days" singular="day" /> */}
        {title ? (
          <h1>
            {prefix} {title}
          </h1>
        ) : (
          <></>
        )}

        {finishTime ? (
          <Countdown
            date={finishTime}
            intervalDelay={25}
            precision={3}
            renderer={(data) => (
              <>
                <div className="timerarea">
                  {data.completed ? setPrefix("It is ") : setPrefix("It's almost ")}

                  <TimeDetailModule
                    val={data.seconds}
                    plural="seconds"
                    singular="second"
                    hideAt0={false}
                    total={data.total}
                    ms={data.milliseconds}
                  />
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
        ) : (
          <></>
        )}

        {doConfetti ? (
          <Confetti
            width={width}
            height={height}
            numberOfPieces={50}
            wind={0.025}
          ></Confetti>
        ) : (
          <></>
        )}
      </div>
      <div className="item"></div>
    </div>
  );
};

export default Timer;
