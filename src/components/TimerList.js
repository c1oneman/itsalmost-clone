import React, {useContext, useState, useEffect} from "react";
import {useParams} from "react-router-dom";
import Countdown from "react-countdown";
import axios from "axios";
import TimeDetailModule from "./TimeDetailModule";
import {useSelector} from "react-redux";
import {selectDarkmode} from "../features/darkmode/darkmodeSlice";
import Loader from "react-loader-spinner";
import TimerPreview from "./TimerPreview";
const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;

const TimerList = () => {
  const darkmode = useSelector(selectDarkmode);
  const [isLoading, toggleLoading] = useState(true);
  const theme = darkmode ? " darkmode" : "";
  const [page, setPage] = useState(1);
  const [timers, setTimers] = useState([]);
  useEffect(() => {
    var config = {
      method: "get",
      url: `${API_ENDPOINT}/api/timers/list/${page}`,
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
    };

    axios(config)
      .then(async function (response) {
        console.log(JSON.stringify(response.data));
        setTimers(response.data);
        toggleLoading(false);
      })
      .catch(function (error) {
        toggleLoading(false);
        console.log(error.message);
      });
  }, [page]);
  return (
    <div class={"container " + theme}>
      <div className="item"></div>
      <div className="main-body">
        {timers.map((timer) => {
          return <TimerPreview timer={timer} />;
        })}
      </div>
      <div className="page-selector">
        {page > 1 && <p onClick={(e) => setPage(page - 1)}>-</p>}
        <p>Page {page}</p>
        <p onClick={(e) => setPage(page + 1)}>+</p>
      </div>
      <div className="item"></div>
    </div>
  );
};

export default TimerList;
