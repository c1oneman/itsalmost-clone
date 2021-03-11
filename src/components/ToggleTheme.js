import React, {useContext, useEffect} from "react";
import sun from "../assets/sun.svg";
import moon from "../assets/moon.svg";
import {useSelector, useDispatch} from "react-redux";
import {
  toggle,
  selectDarkmode,
  loadLocalSetting,
} from "../features/darkmode/darkmodeSlice";
const ToggleTheme = () => {
  const darkmode = useSelector(selectDarkmode);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadLocalSetting);
  }, []);
  useEffect(() => {
    localStorage.setItem("preferDark", `${darkmode}`);
  }, [darkmode]);
  return (
    <div className="toggle__box">
      <span>
        {darkmode ? (
          <img src={sun} alt="toggle darkmode" className="sun-icon" />
        ) : (
          <img src={moon} alt="toggle darkmode" className="moon-icon" />
        )}
      </span>
      <div
        className="toggle__btn"
        onClick={() => dispatch(toggle())}
        role="checkbox"
        aria-checked={darkmode}
        tabIndex={0}
      >
        <input type="checkbox" checked={darkmode} className="checkbox" />
        <div className="circle"></div>
        <div className="layer"></div>
      </div>
    </div>
  );
};

export default ToggleTheme;
