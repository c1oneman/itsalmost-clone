import React, {useContext, useState, useEffect} from "react";
import {useParams} from "react-router-dom";
import Countdown from "react-countdown";
import axios from "axios";
import TimeDetailModule from "./TimeDetailModule";
import useWindowSize from "react-use/lib/useWindowSize";
import Confetti from "react-confetti";
import {useSelector} from "react-redux";
import {selectDarkmode} from "../features/darkmode/darkmodeSlice";
import Loader from "react-loader-spinner";
//import {convertToObject} from "typescript";

const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;

const Timer = () => {
  const darkmode = useSelector(selectDarkmode);
  const [isLoading, toggleLoading] = useState(true);
  const [title, setTitle] = useState();
  const [doConfetti, toggleConfetti] = useState(false);
  const [prefix, setPrefix] = useState("");
  const [finishTime, setFinishTime] = useState();
  const {width, height} = useWindowSize();
  const theme = darkmode ? " darkmode" : "";
  let {id} = useParams();

  useEffect(() => {
    // Update the document title using the browser API
    var config = {
      method: "get",
      url: `${API_ENDPOINT}/api/timers/${id}`,
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
    };
    console.log(config.url);
    axios(config)
      .then(async function (response) {
        setPrefix("It's almost");
        const result = response.data;
        console.log(JSON.stringify(result));
        const title = result.title;
        //set state
        setFinishTime(result.expires);
        setTitle(title);
        document.title = prefix + title;
        // Easter egg
        if (title.includes("party") || title.includes("birthday")) {
          console.log(`toggle true`);
          toggleConfetti(true);
        }
        toggleLoading(false);
      })
      .catch(function (error) {
        toggleLoading(false);
        setTitle("404 | Countdown not found.");
        console.log(error.message);
      });
  }, [id]);
  return (
    <div class={"container " + theme}>
      <div className="item"></div>
      <div className="main-body">
        {isLoading ? (
          <Loader
            type="ThreeDots"
            color={theme ? "#fff" : "#000"}
            height={100}
            width={100}
            timeout={3000} //3 secs
          />
        ) : (
          <h1>
            {prefix} {title}
          </h1>
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
            numberOfPieces={100}
            recycle={false}
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
