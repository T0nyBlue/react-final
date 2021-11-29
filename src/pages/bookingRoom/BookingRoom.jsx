import './bookingRoom.css';
import {useParams} from 'react-router-dom';
import React, {useState} from 'react';

export default function BookingRoom() {
    const {roomId, startDate, endDate} = useParams();

    console.log('this is a booking room')
    return (
        <div className="newUser">
            <h1 className="newUserTitle">BOOKING ROOM</h1>
            <form className="newUserForm">
                <div className="newUserItem">
                    <label>Customer Name</label>
                    <input type="text" placeholder="" />
                </div>
                <div className="newUserItem">
                    <label>ID Card Number</label>
                    <input type="text" placeholder="" />
                </div>
                <div className="newUserItem">
                    <label>Phone Number</label>
                    <input type="text" placeholder="" />
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
                        <span className="roomBookingInfor">{startDate.substring(0, 15)}</span>
                    </div>
                </div>
                <div className="newUserItem">
                    <label>End Date</label>
                    <div className="roomBookingInfoBox">
                        <span className="roomBookingInfor">{endDate.substring(0, 15)}</span>
                    </div>
                </div>
                {/* <div className="newUserItem">
                    <label>Address</label>
                    <input type="text" placeholder="HCM City" />
                </div> */}
                {/* <div className="newUserItem">
                    <label>Gender</label>
                    <div className="newUserGender">
                        <input type="radio" name="gender" id="male" value="male"/>
                        <label for="male">Male</label>
                        <input type="radio" name="gender" id="female" value="female"/>
                        <label for="female">Female</label>
                        <input type="radio" name="gender" id="other" value="other"/>
                        <label for="other">Other</label>
                    </div>
                </div> */}
                {/* <div className="newUserItem">
                    <label>Position</label>
                    <select name="position" id="position" className="newUserSelect">
                        <option value="employee">Employee</option>
                        <option value="manager">Manager</option>
                    </select>
                </div> */}
            </form>
            <button className="newUserButton">Book</button>
        </div>
    )
}
