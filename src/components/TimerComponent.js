import React, {useContext, useState, useEffect} from "react";
import {useParams} from "react-router-dom";
import {ThemeContext} from "../contexts/ThemeContext";
import Countdown from "react-countdown";
import axios from "axios";
import TimeDetailModule from "./TimeDetailModule";
import useWindowSize from "react-use/lib/useWindowSize";
import Confetti from "react-confetti";
const func_url = process.env.REACT_APP_FUNC_URL;

//const func_url = "http://localhost:63389/.netlify/functions";
const Timer = () => {
  const {lightTheme} = useContext(ThemeContext);
  const [title, setTitle] = useState();
  const [doConfetti, toggleConfetti] = useState(false);
  const [finishTime, setFinishTime] = useState();
  const {width, height} = useWindowSize();
  const theme = !lightTheme ? " darkmode" : "";
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
        //set state
        setFinishTime(response.data.expires);
        setTitle(response.data.title);
        document.title = "It's almost " + response.data.title;
        // Easter egg
        if (
          response.data.lowercased.title.includes("party") ||
          response.data.title.includes("birthday")
        ) {
          toggleConfetti(true);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [id]);
  return (
    <div class="row content">
      <div className={"main-body " + theme}>
        {/* <TimeDetailModule val="1" plural="days" singular="day" /> */}
        {title ? <h1>It's almost {title}</h1> : <></>}

        {finishTime ? (
          <Countdown
            date={finishTime}
            intervalDelay={100}
            precision={3}
            renderer={(data) => (
              <>
                <div className="timerarea">
                  <p>{data.completed && "now."}</p>
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

        {doConfetti ? <Confetti width={width} height={height}></Confetti> : <></>}
      </div>
    </div>
  );
};

export default Timer;
