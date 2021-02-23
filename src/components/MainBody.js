import React, { useContext, useState, useRef } from "react";
import Divider from './Divider'
import { ThemeContext } from "../contexts/ThemeContext";

const getContent = (id) => {
  return document.getElementById(id).textContent;
}
const getNumber = (id) => {
  return parseInt(document.getElementById(id).textContent);
};

const MainBody = () => {
  const { lightTheme } = useContext(ThemeContext);
  const theme = !lightTheme ? " darkmode" : "";
  const [isAM, setAM] = useState(true)
  const [isLoading, setLoading] = useState(false)
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Disable submit button
    setLoading(true)
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
    if(!object.am) {
      object.hour = object.hour + 12;
    }
    // Create future date object to get expire time from
    var future = new Date(object.year, object.month-1, object.day, object.hour, object.minute, 0, 0);

    // Check that date is in future
    if(future < (new Date())) {
      console.log('Date is in past.')
      setLoading(false)
      return
    }
    
    // Get unix time from future date
    const unix = (future.getTime() / 1000);


    // Output data for API
    console.log(object.title);
    console.log(unix);
    
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
                2
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
