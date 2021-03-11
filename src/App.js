import React from "react";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Navbar from "./components/Navbar";
import MainBody from "./components/MainBody";
import Timer from "./components/TimerComponent";

function App() {
  return (
    <div className="App">
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
    </div>
  );
}

export default App;
