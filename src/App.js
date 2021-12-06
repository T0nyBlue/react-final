import React, { useState } from "react";
import "./app.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
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
import BookingRoom from "./pages/bookingRoom/BookingRoom";
import NewSideBar from "./components/newSideBar/NewSideBar.jsx";
import Empty from "./components/empty/Empty";
import NewTopbar from "./components/newTopbar/NewTopbar";
import PaymentList from "./pages/paymentList/PaymentList";
import PaymentDetail from "./pages/paymentDetail/PaymentDetail";
import RoomDetail from "./pages/roomDetail/RoomDetail";
import Profile from "./pages/profile/Profile";
import NewRoom from "./pages/newRoom/NewRoom";

function App() {
  return (
    <div className="mainContainer">
      <Router>
        <Route exact path="/login">
          <Login />
        </Route>
        {/* <Topbar/> */}
        <NewTopbar />
        <div className="container">
          {/* <Sidebar/> */}
          <NewSideBar />
          {/* <Empty/> */}
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/transactions">
              <Transaction />
            </Route>
            <Route
              exact
              path="/transaction/:transactionId"
              component={TransactionDetail}
            >
              <TransactionDetail />
            </Route>
            <Route exact path="/employees">
              <EmployeeList />
            </Route>
            <Route exact path="/employee/:employeeId">
              <Employee />
            </Route>
            <Route exact path="/newEmployee">
              <NewEmployee />
            </Route>
            <Route exact path="/rooms">
              <RoomList />
            </Route>
            <Route exact path="/room/newRoom">
              <NewRoom />
            </Route>
            <Route exact path="/room/update/:roomId">
              <RoomDetail />
            </Route>
            <Route
              exact
              path="/room/:roomId/:startDate/:endDate"
              component={BookingRoom}
            >
              <BookingRoom />
            </Route>
            <Route exact path="/payments">
              <PaymentList />
            </Route>
            <Route exact path="/payment/:paymentId">
              <PaymentDetail />
            </Route>
            <Route exact path="/profile">
              <Profile />
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
