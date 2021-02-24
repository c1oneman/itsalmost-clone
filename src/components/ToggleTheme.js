import React, { Component, useState, useContext, useEffect } from 'react';
import sun from '../assets/sun.svg';
import moon from '../assets/moon.svg';
import { ThemeContext } from '../contexts/ThemeContext';

const ToggleTheme = () => {
    const { toggleTheme, lightTheme } = useContext(ThemeContext);
      return (
        <div className="toggle__box">
          <span>
            {!lightTheme ? (
              <img src={sun} className="sun-icon" />
            ) : (
              <img src={moon} className="moon-icon" />
            )}
          </span>
          <div className="toggle__btn" onClick={toggleTheme}>
            <input type="checkbox" checked={!lightTheme} className="checkbox" />
            <div className="circle"></div>
            <div className="layer"></div>
          </div>
        </div>
      );
}

export default ToggleTheme;
