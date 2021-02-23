import React, { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ThemeContext } from "../contexts/ThemeContext";
import Countdown from 'react-countdown'
import axios from "axios";
const func_url = process.env.REACT_APP_FUNC_URL;
//const func_url = "http://localhost:63389/.netlify/functions";
const Timer = () => {
  const { lightTheme } = useContext(ThemeContext);
  const [title, setTitle] = useState("loaded..")
  const [finishTime, setFinishTime] = useState(Date)
  const theme = !lightTheme ? " darkmode" : "";
  let { id } = useParams();
  useEffect(() => {
    console.log(func_url);
    // Update the document title using the browser API
    document.title = `View Timer`;
    const data = { id: id };
    var config = {
      method: "post",
      url: `${func_url}/get-timers`,
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      data: JSON.stringify(data),
    };
    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        setFinishTime(response.data.expires);
        setTitle(response.data.title)
      })
      .catch(function (error) {
        console.log(error);
      });
    
  });
 return (
   <div class="row content">
     <div className={"main-body " + theme}>
       <h1>It's almost {title}</h1>
       <h2>
         <Countdown date={finishTime} />
       </h2>
     </div>
   </div>
 );

};

export default Timer;