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

const func_url = process.env.REACT_APP_FUNC_URL;

const Timer = () => {
  const darkmode = useSelector(selectDarkmode);
  const [isLoading, toggleLoading] = useState(true);
  const theme = darkmode ? " darkmode" : "";

  useEffect(() => {
    console.log(func_url);
    const data = {id: "ubJUxd"};
    // Update the document title using the browser API
    var config = {
      method: "get",
      url: `${func_url}/get-all-timers`,
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      data: JSON.stringify(data),
    };

    axios(config)
      .then(async function (response) {
        console.log(JSON.stringify(response.data));
        toggleLoading(false);
      })
      .catch(function (error) {
        toggleLoading(false);
        console.log(error.message);
      });
  }, []);
  return (
    <div class={"container " + theme}>
      <div className="item"></div>
      <div className="main-body">
        <h4>List all timers function | WIP</h4>
      </div>
      <div className="item"></div>
    </div>
  );
};

export default Timer;
