import React from "react";
import Navbar from "./components/Navbar";
import MainBody from "./components/MainBody";
import ThemeContextProvider from "./contexts/ThemeContext";

function App() {
  return (
    <div className="App">
      <ThemeContextProvider>
        <div class="box">
          <Navbar />
          <MainBody />
        </div>
      </ThemeContextProvider>
    </div>
  );
}

export default App;
