import React, {useContext} from "react";
import sun from "../assets/sun.svg";
import moon from "../assets/moon.svg";
import {ThemeContext} from "../contexts/ThemeContext";

const ToggleTheme = () => {
  const {toggleTheme, lightTheme} = useContext(ThemeContext);
  return (
    <div className="toggle__box">
      <span>
        {!lightTheme ? (
          <img src={sun} alt="toggle darkmode" className="sun-icon" />
        ) : (
          <img src={moon} alt="toggle darkmode" className="moon-icon" />
        )}
      </span>
      <div
        className="toggle__btn"
        onClick={toggleTheme}
        role="checkbox"
        aria-checked={!lightTheme}
        onKeyPress={toggleTheme}
        tabIndex={0}
      >
        <input type="checkbox" checked={!lightTheme} className="checkbox" />
        <div className="circle"></div>
        <div className="layer"></div>
      </div>
    </div>
  );
};

export default ToggleTheme;
