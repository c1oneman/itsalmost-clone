import React, { useContext, useState, useRef } from "react";
import {Redirect} from 'react-router-dom'
import Divider from './Divider'
import axios from 'axios'
import { ThemeContext } from "../contexts/ThemeContext";
const func_url = process.env.REACT_APP_FUNC_URL;
//const func_url = "http://localhost:63389/.netlify/functions";

const getContent = (id) => {
  return document.getElementById(id).textContent;
}
const getNumber = (id) => {
  return parseInt(document.getElementById(id).textContent);
};
async function postData(url = "", data) {
  // Default options are marked with *
  const raw = JSON.stringify(data)
  fetch(url, {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    // manual, *follow, error
    body: raw, // body data type must match "Content-Type" header
  }).then((res) => {
    console.log(res);
  });
  return true; // parses JSON response into native JavaScript objects
}


const MainBody = () => {
  const { lightTheme } = useContext(ThemeContext);
  const theme = !lightTheme ? " darkmode" : "";
  const [isAM, setAM] = useState(true)
  const [isLoading, setLoading] = useState(false)
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Disable submit button
    setLoading(false);
    // Create an object of all 'form' data
    const object = {
      title: getContent("title"),
      day: getNumber("day"),
      month: getNumber("month"),
      year: getNumber("year"),
      hour: getNumber("hour"),
      minute: getNumber("minute"),
      am: isAM,
    };
    // Check if user defined PM, add 12 hours if true (24 hour time)
    if (!object.am) {
      object.hour = object.hour + 12;
    }
    // Create future date object to get expire time from
    var future = new Date(
      object.year,
      object.month - 1,
      object.day,
      object.hour,
      object.minute,
      0,
      0
    );

    // Check that date is in future
    if (future < new Date()) {
      console.log("Date is in past.");
      setLoading(false);
      return;
    }

    // Get unix time from future date
    const unix = future.getTime() / 1000;
    // create object for api call
    const timerObject = {
      title: object.title,
      expires: unix,
    };
    // Output data for API
    console.log(object.title);
    console.log(unix);
    console.log(JSON.stringify(timerObject));
    // call api function

    //http://localhost:53109/.netlify/functions/create
    var config = {
      method: "post",
      url: `${func_url}/create`,
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      data: JSON.stringify(timerObject),
    };
    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        const redir = "/" + response.data.data
        window.location = redir;
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  function select() {
    document.execCommand("selectAll", false, null);
  }
  return (
    <div class="row content">
      <div className={"main-body " + theme}>
        <form onSubmit={handleSubmit}>
          <div className="input-row">
            <h1>
              It's almost&nbsp;
              <Divider filltext="" />
              <span class="input-wrap">
                <span
                  onClick={select}
                  contentEditable={true}
                  id="title"
                  className="input pointer"
                >
                  ___________
                </span>
              </span>
            </h1>
          </div>
          <div className="input-row">
            <h2>
              <p className="label">on</p>
              <Divider filltext="&nbsp;" />
              <span
                contentEditable={true}
                id="month"
                onClick={select}
                className="input"
              >
                2
              </span>
              <Divider filltext="&nbsp;/&nbsp;" />
              <span
                contentEditable={true}
                id="day"
                onClick={select}
                className="input"
              >
                25
              </span>
              <Divider filltext="&nbsp;/&nbsp;" />
              <span
                contentEditable={true}
                id="year"
                onClick={select}
                className="input"
              >
                2021
              </span>
              <Divider filltext="&nbsp;" />
            </h2>
            <h2>
              <p className="label">at</p>
              <Divider filltext="&nbsp;" />
              <span
                onClick={select}
                contentEditable={true}
                id="hour"
                className="input"
              >
                10
              </span>
              <Divider filltext=":" />
              <span
                onClick={select}
                contentEditable={true}
                id="minute"
                className="input"
              >
                23
              </span>
              <Divider filltext="&nbsp;" />

              <span
                className="pointer"
                onClick={() => {
                  setAM(!isAM);
                }}
              >
                {isAM ? "AM" : "PM"}
              </span>
            </h2>
          </div>
          <div className="input-row">
            <button type="submit" disabled={isLoading} title="create countdown">
              Create Countdown
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MainBody;
