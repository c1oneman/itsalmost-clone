import React, {useContext, useState, useEffect} from "react";
import {useHistory} from "react-router-dom";
import {useSelector} from "react-redux";
import Countdown from "react-countdown";
import Loader from "react-loader-spinner";
import axios from "axios";
import TimeDetailModule from "./TimeDetailModule";

import {selectDarkmode} from "../features/darkmode/darkmodeSlice";

import TimerPreview from "./TimerPreview";
import {Pager} from "../styled-components/page-chooser";
import {setLoading} from "../features/timer/timerSlice";
const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;

const TimerList = () => {
  const darkmode = useSelector(selectDarkmode);
  const [isLoading, toggleLoading] = useState(true);
  const theme = darkmode ? " darkmode" : "";
  const [page, setPage] = useState(1);
  const [timers, setTimers] = useState([]);

  useEffect(() => {
    toggleLoading(true);
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
        <div>
          <h1>Browse</h1>
          <p>User made timers.</p>
          {isLoading && (
            <Loader
              type="ThreeDots"
              color={theme ? "#fff" : "#000"}
              height={100}
              width={100}
              timeout={3000} //3 secs
            />
          )}
        </div>

        <div className="card-holder">
          {timers.map((timer) => {
            return <TimerPreview timer={timer} />;
          })}
        </div>
      </div>
      {!isLoading && (
        <Pager>
          {page > 1 && (
            <p onClick={(e) => setPage(page - 1)} className="btn">
              -
            </p>
          )}
          <p>Page {page}</p>
          <p className="btn" onClick={(e) => setPage(page + 1)}>
            +
          </p>
        </Pager>
      )}

      <div className="item"></div>
    </div>
  );
};

export default TimerList;
