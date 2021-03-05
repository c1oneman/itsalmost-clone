import React, {createContext, useState} from "react";

export const ThemeContext = createContext();

const ThemeContextProvider = (props) => {
  const [lightTheme, setLightTheme] = useState(() => {
    const status = JSON.parse(localStorage.getItem("preferDark") ?? true);
    return status;
  });

  const toggleTheme = () => {
    localStorage.setItem("preferDark", JSON.stringify(!lightTheme));
    setLightTheme(!lightTheme);
  };
  const {children} = props;
  return (
    <ThemeContext.Provider value={{lightTheme, toggleTheme}}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContextProvider;
