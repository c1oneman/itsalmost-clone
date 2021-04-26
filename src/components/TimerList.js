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
  const [pageMax, setPageMax] = useState(1);
  const [total, setTotal] = useState(0);
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
        setTimers(response.data.data);
        setPageMax(response.data.maxPages);
        setTotal(response.data.total);
        toggleLoading(false);
      })
      .catch(function (error) {
        toggleLoading(false);
        console.log(error.message);
      });
  }, [page]);
  return (
    <div class={"container" + theme}>
      <div className="item"></div>
      <div className="main-body">
        <div className="center">
          <h2>Browse Timers</h2>
          {isLoading && <p>One moment..</p>}
          {!isLoading && (
            <p>User made timers. {total > 0 && `${total} timers exist globally.`}</p>
          )}
        </div>

        <div className="card-holder">
          {timers.map((timer) => {
            return <TimerPreview className={theme} timer={timer} />;
          })}
        </div>
        {isLoading && (
          <Loader
            type="TailSpin"
            color={theme ? "#fff" : "#000"}
            height={50}
            width={50}
          />
        )}
      </div>

      {!isLoading && (
        <Pager>
          {page > 1 && (
            <div className="back button" onClick={(e) => setPage(page - 1)}>
              <p>Back</p>
            </div>
          )}
          <p className="center">{page}</p>
          {page < pageMax && (
            <div className="next button" onClick={(e) => setPage(page + 1)}>
              <p>Next</p>
            </div>
          )}
        </Pager>
      )}

      <div className="item"></div>
    </div>
  );
};

export default TimerList;
