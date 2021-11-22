import Sidebar from "./components/sidebar/Sidebar";
import Topbar from "./components/topbar/Topbar";
import Home from "./pages/home/Home";
import './app.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Transaction from "./pages/transaction/Transaction";

function App() {
  return (
    <Router>
      <Topbar/>
      <div className="container">
        <Sidebar/>
        <Switch>
          <Route exact path="/">
            <Home/>
          </Route>
          <Route exact path="/transaction">
            <Transaction/>
          </Route>
          {/* <Route path="/user/:userId">
            <User/>
          </Route>
          <Route path="/newUser">
            <NewUser/>
          </Route> */}
        </Switch>
      </div>
    </Router>
  );
}

export default App;
