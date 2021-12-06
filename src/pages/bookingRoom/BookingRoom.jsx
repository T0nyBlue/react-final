import "./bookingRoom.css";
import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";

export default function BookingRoom() {
  const history = useHistory();
  const { roomId, startDate, endDate } = useParams();
  const [Customer_Name, setCustomer_Name] = useState("");
  const [Customer_Id_Card, setCustomer_Id] = useState(null);
  const [Phone_Number, setPhone_Number] = useState("");
  const [Room_Num, setRoom_Num] = useState(roomId);
  const [Start_Date, setStart_Date] = useState(startDate);
  const [End_Date, setEnd_Date] = useState(endDate);
  const [error, setError] = useState(false);

  const createNewTrans = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "https://backend-apidoc.herokuapp.com/api/trans",
        {
          Phone_Number,
          Customer_Id_Card,
          Customer_Name,
          Room_Num,
          Start_Date,
          End_Date,
        },
        {
          headers: {
            authorization:
              "Bearer " + JSON.parse(localStorage["user"]).accessToken,
          },
        }
      );
      if (res.data.success) {
        console.log(res);
        history.push("/rooms");
      } else {
        setError(true);
      }
    } catch (err) {
      setError(true);
      console.log(err);
    }
  };

  useEffect(() => {
    if (!localStorage["user"]) {
      history.push("/login");
    }
  }, []);

  console.log("this is a booking room");
  return (
    <div className="newUser">
      <h1 className="newUserTitle">BOOKING ROOM</h1>
      <form
        onSubmit={createNewTrans}
        id="createNewBookingForm"
        className="newUserForm"
      >
        <div className="newUserItem">
          <label>Customer Name</label>
          <input
            type="text"
            placeholder=""
            onChange={(e) => setCustomer_Name(e.target.value)}
          />
        </div>
        <div className="newUserItem">
          <label>ID Card Number</label>
          <input
            type="text"
            placeholder=""
            onChange={(e) => setCustomer_Id(e.target.value)}
          />
        </div>
        <div className="newUserItem">
          <label>Phone Number</label>
          <input
            type="text"
            placeholder=""
            onChange={(e) => setPhone_Number(e.target.value)}
          />
        </div>
        <div className="newUserItem">
          <label>Room ID</label>
          <div className="roomBookingInfoBox">
            <span className="roomBookingInfor">{roomId}</span>
          </div>
        </div>
        <div className="newUserItem">
          <label>Start Date</label>
          <div className="roomBookingInfoBox">
            <span className="roomBookingInfor">
              {startDate.substring(0, 15)}
            </span>
          </div>
        </div>
        <div className="newUserItem">
          <label>End Date</label>
          <div className="roomBookingInfoBox">
            <span className="roomBookingInfor">{endDate.substring(0, 15)}</span>
          </div>
        </div>
      </form>
      <button
        type="submit"
        className="newUserButton"
        form="createNewBookingForm"
      >
        Book
      </button>
    </div>
  );
}
