import React from "react";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import MainBody from "./components/MainBody";
import Timer from "./components/TimerComponent";
import TimerList from "./components/TimerList";
function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />

        <Switch>
          <Route exact path="/browse">
            <TimerList />
          </Route>
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
  );
}

export default App;
