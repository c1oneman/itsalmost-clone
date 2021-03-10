import React, {useContext, useState} from "react";
import {useHistory} from "react-router-dom";
import Divider from "./Divider";
import TextTransition, {presets} from "react-text-transition";
import axios from "axios";
import {ThemeContext} from "../contexts/ThemeContext";
const func_url = process.env.REACT_APP_FUNC_URL;
//const func_url = "http://localhost:63389/.netlify/functions";

const getContent = (id) => {
  return document.getElementById(id).textContent;
};
const getNumber = (id) => {
  return parseInt(document.getElementById(id).textContent);
};

const MainBody = () => {
  const {lightTheme} = useContext(ThemeContext);
  const theme = !lightTheme ? " darkmode" : "";
  const [isAM, setAM] = useState(true);
  const [isLoading, setLoading] = useState(false);
  var now = new Date();
  const {push} = useHistory();
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Disable submit button
    setLoading(true);
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
      if (object.hour === 12) {
        object.hour = 12;
      } else {
        object.hour = object.hour + 12;
      }
    } else {
      if (object.hour === 12) {
        object.hour = "0";
      }
    }

    // Create future date object to get expire time from
    const future = new Date(
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

    // Check that title has changed
    if (object.title == "___________") {
      console.log("Title is untouched.");
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
    // call function to create timer

    var config = {
      method: "post",
      url: `${func_url}/post-timer`,
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      data: JSON.stringify(timerObject),
    };
    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        // Redirect
        push("/" + response.data.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  function select() {
    document.execCommand("selectAll", false, null);
  }

  return (
    <div className={"container " + theme}>
      <div className="item"></div>
      <div className="main-body">
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
              <span contentEditable={true} id="month" onClick={select} className="input">
                {now.getUTCMonth() + 1}
              </span>
              <Divider filltext="&nbsp;/&nbsp;" />
              <span contentEditable={true} id="day" onClick={select} className="input">
                {now.getUTCDate()}
              </span>
              <Divider filltext="&nbsp;/&nbsp;" />
              <span contentEditable={true} id="year" onClick={select} className="input">
                {now.getUTCFullYear()}
              </span>
              <Divider filltext="&nbsp;" />
            </h2>
            <h2>
              <p className="label">at</p>
              <Divider filltext="&nbsp;" />
              <span onClick={select} contentEditable={true} id="hour" className="input">
                12
              </span>
              <Divider filltext=":" />
              <span onClick={select} contentEditable={true} id="minute" className="input">
                {(now.toLocaleString("en-US", {
                  minute: "2-digit",
                }) < 10
                  ? "0"
                  : "") +
                  now.toLocaleString("en-US", {
                    minute: "2-digit",
                  })}
              </span>
              <Divider filltext="&nbsp;" />

              <span
                className="pointer"
                onClick={() => {
                  setAM(!isAM);
                }}
              >
                <TextTransition
                  text={isAM ? "AM" : "PM"}
                  springConfig={presets.wobbly}
                  direction={isAM ? "down" : "up"}
                />
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
      <div className="item"></div>
    </div>
  );
};

export default MainBody;
