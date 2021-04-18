import React from "react";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import MainBody from "./components/MainBody";
import Timer from "./components/TimerComponent";

function App() {
  return (
    <div className="App">
      <div className="box">
        <Router>
          <Navbar />
          <Switch>
            <Route path="/:id">
              <Timer />
            </Route>
            <Route exact path="/">
              <MainBody />
            </Route>
          </Switch>
          <Footer />
        </Router>
      </div>
    </div>
  );
}

export default App;
