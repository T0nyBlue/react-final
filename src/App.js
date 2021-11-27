import React from 'react';
import './app.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Topbar from "./components/topbar/Topbar";
import Home from "./pages/home/Home";
import Transaction from "./pages/transaction/Transaction";
import Sidebar from "./components/sidebar/Sidebar";
import EmployeeList from "./pages/employeeList/EmployeeList";
import NewEmployee from "./pages/newEmployee/NewEmployee";
import Employee from "./pages/employee/Employee";
import TransactionDetail from "./pages/transactionDetail/TransactionDetail";
import RoomList from "./pages/roomList/RoomList";
import Login from "./pages/login/Login";

function App() {
  // const [data, setData] = useState(null);

  // useEffect(() => {
  //   if(data.success == true) {
  //     localStorage.setItem('success', data.success);
  //     localStorage.setItem('accessToken', data.accessToken);
  //     localStorage.setItem('UserType', data.UserType);
  //   }
  // },[data])

  return (
    <div className="mainContainer">
      <Router>
        <Route exact path = "/login">
          <Login/>
        </Route>
        <Topbar/>
        <div className="container">
          <Sidebar />
          <Switch>
            <Route exact path="/">
              <Home/>
            </Route>
            <Route exact path="/transactions">
              <Transaction/>
            </Route>
            <Route exact path="/transaction/:transactionId">
              <TransactionDetail/>
            </Route>
            <Route exact path="/employees">
              <EmployeeList />
            </Route>
            <Route exact path="/employee/:employeeId">
              <Employee/>
            </Route>
            <Route exact path="/newEmployee">
              <NewEmployee/>
            </Route>
            <Route exact path="/rooms">
              <RoomList />
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
