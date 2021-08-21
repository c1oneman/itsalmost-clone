import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import FormBody from "./components/FormBody";
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
            <FormBody />
          </Route>
        </Switch>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
