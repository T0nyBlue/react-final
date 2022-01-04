import "./newRoom.css";
import { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";

export default function NewRoom() {
  const history = useHistory();
  const [roomId, setRoomId] = useState(null);
  const [roomName, setRoomName] = useState("");
  const [pricePerHour, setPricePerHour] = useState(null);
  const [pricePerNight, setPricePerNight] = useState(null);
  const [pricePerDay, setPricePerDay] = useState(null);
  const [error, setError] = useState(false);

  const createNewRoom = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "https://backend-apidoc.herokuapp.com/api/room",
        {
          id: roomId,
          Room_Name: roomName,
          Price_per_Hour: pricePerHour,
          Price_per_Night: pricePerNight,
          Price_per_Day: pricePerDay,
          Status: "",
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
        alert("Successful!");
        history.push("/rooms");
      } else {
        setError(true);
        alert("Error!");
      }
    } catch (err) {
      setError(true);
      console.log(err);
      alert("Error!");
    }
  };

  useEffect(() => {
    if (!localStorage["user"]) {
      history.push("/login");
    }
  }, []);

  return (
    <div className="newRoom">
      <h1 className="newRoomTitle">NEW ROOM</h1>
      <form
        onSubmit={createNewRoom}
        id="createNewRoomForm"
        className="newRoomForm"
      >
        <div className="newRoomItem">
          <label>Room ID</label>
          <input
            type="text"
            placeholder=""
            onChange={(e) => setRoomId(e.target.value)}
          />
        </div>
        <div className="newRoomItem">
          <label>Room Name</label>
          <input
            type="text"
            placeholder=""
            onChange={(e) => setRoomName(e.target.value)}
          />
        </div>
        <div className="newRoomItem">
          <label>Price / Hour</label>
          <input
            type="text"
            placeholder=""
            onChange={(e) => setPricePerHour(e.target.value)}
          />
        </div>
        <div className="newRoomItem">
          <label>Price / Night</label>
          <input
            type="text"
            placeholder=""
            onChange={(e) => setPricePerNight(e.target.value)}
          />
        </div>
        <div className="newRoomItem">
          <label>Price / Day</label>
          <input
            type="text"
            placeholder=""
            onChange={(e) => setPricePerDay(e.target.value)}
          />
        </div>
      </form>
      <button type="submit" className="newRoomButton" form="createNewRoomForm">
        Create
      </button>
    </div>
  );
}
