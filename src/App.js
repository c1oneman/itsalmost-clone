import React from "react";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Navbar from "./components/Navbar";
import MainBody from "./components/MainBody";
import Timer from "./components/TimerComponent";
import ThemeContextProvider from "./contexts/ThemeContext";

function App() {
  return (
    <div className="App">
      <ThemeContextProvider>
        <div className="box">
          <Router>
            <Switch>
              <Route path="/:id">
                <Navbar />
                <Timer />
              </Route>
              <Route path="/">
                <Navbar />
                <MainBody />
              </Route>
            </Switch>
          </Router>
        </div>
      </ThemeContextProvider>
    </div>
  );
}

export default App;
