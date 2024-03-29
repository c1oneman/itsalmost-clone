import {useState} from "react";
import {useHistory} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import Divider from "./Divider";
import TextTransition, {presets} from "react-text-transition";
import {createTimerAsync, selectTimer, setLoading} from "../features/timer/timerSlice";
import {selectDarkmode} from "../features/darkmode/darkmodeSlice";
import {TimerFormSchema} from "../app/schema";
import Error from "../styled-components/error-box";

const getContent = (id) => {
  return document.getElementById(id).textContent;
};
const getNumber = (id) => {
  return parseInt(document.getElementById(id).textContent);
};

const FormBody = () => {
  let history = useHistory();
  const {push} = useHistory();

  const dispatch = useDispatch();
  const timer = useSelector(selectTimer);
  const darkmode = useSelector(selectDarkmode);
  const theme = darkmode ? " darkmode" : "";
  const [isAM, setAM] = useState(true);
  const [errors, setErrors] = useState([]);
  var now = new Date();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Create an object of all 'form' data
    setErrors([]);
    const newTimer = {
      title: getContent("title"),
      day: getNumber("day"),
      month: getNumber("month"),
      year: getNumber("year"),
      hour: getNumber("hour"),
      minute: getNumber("minute"),
      am: isAM,
    };
    TimerFormSchema.validate(newTimer)
      .then(function (result) {
        setLoading(true);

        console.log("Valid?: ", result); // => true
        // Check if user defined PM, add 12 hours if true (24 hour time)
        if (!newTimer.am) {
          if (newTimer.hour !== 12) {
            newTimer.hour = newTimer.hour + 12;
          }
        } else if (newTimer.hour === 12) {
          newTimer.hour = 0;
        }

        // Create future date object to get expire time from
        const future = new Date(
          newTimer.year,
          newTimer.month - 1,
          newTimer.day,
          newTimer.hour,
          newTimer.minute
        );

        // Check that date is in future
        if (future < new Date()) {
          console.log("Date is in past.");
          setErrors(["Date is in the past."]);
          return;
        }

        // Get unix time from future date
        const unix = future.getTime();
        // create object for api call
        const timerObject = {
          title: newTimer.title,
          expires: unix,
        };

        // Output data for API
        // console.log(object.title);
        // console.log(unix);
        // console.log(JSON.stringify(timerObject));

        // create timer
        dispatch(createTimerAsync(timerObject));
      })
      .catch(function (err) {
        setErrors(err.errors);
        console.log(err.errors);
        return;
      });
  };

  // Used to highlight spans when clicked on
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
                00
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
              {timer.value != "" ? history.push(`/${timer.value}`) : ""}
            </h2>
          </div>
          <div className="input-row">
            <button type="submit" disabled={timer.loading} title="create countdown">
              Create Countdown
            </button>
          </div>
          <div className="input-row">{errors.length > 0 && <Error>{errors}</Error>}</div>
        </form>
      </div>
      <div className="item"></div>
    </div>
  );
};

export default FormBody;
