import { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import "./roomDetail.css";

export default function RoomDetail() {
  const history = useHistory();
  const [data, setData] = useState([]);
  const [Name, setName] = useState("");
  const [pricePerHour, setPricePerHour] = useState(null);
  const [pricePerNight, setPricePerNight] = useState(null);
  const [pricePerDay, setPricePerDay] = useState(null);
  const [id, setId] = useState("");
  const [error, setError] = useState(false);

  const getUserInfor = async (id) => {
    try {
      const res = await axios.get(`/api/room/getone/${id}`, {
        headers: {
          authorization:
            "Bearer " + JSON.parse(localStorage["user"]).accessToken,
        },
      });
      return res;
    } catch (err) {
      setError(true);
      console.log(err);
    }
  };

  const updateRoomDetailInfor = async (e) => {
    try {
      const res = await axios.patch(
        "/api/room",
        {
          id,
          Room_Name: Name,
          Price_per_Hour: pricePerHour,
          Price_per_Night: pricePerNight,
          Price_per_Day: pricePerDay,
        },
        {
          headers: {
            authorization:
              "Bearer " + JSON.parse(localStorage["user"]).accessToken,
          },
        }
      );
      console.log(res);
    } catch (err) {
      setError(true);
      console.log(error);
    }
  };

  useEffect(() => {
    if (localStorage["user"]) {
      if (JSON.parse(localStorage["user"]).UserType === "Admin") {
        // Get the current path first
        let dafile = window.location.pathname;

        // You can extract the current path, then strip out all the folders
        dafile = dafile.substring(dafile.lastIndexOf("/") + 1);

        // Or use regular expression to strip the folders out
        dafile = dafile.replace(/^.*[\\\/]/, "");

        getUserInfor(dafile).then((res) => {
          setData(res.data);
          setId(res.data.id);
        });
      } else {
        history.push("/rooms");
      }
    } else {
      history.push("/login");
    }
  }, [data]);

  return (
    <div className="user">
      <div className="roomDetailTitleContainer">
        <h1 className="userTitle">EDIT ROOM</h1>
      </div>
      <div className="roomDetailContainer">
        <div className="roomDetailShow">
          <span className="roomDetailUpdateTitle">Room Detail</span>
          <div className="roomDetailShowBottom">
            <div className="roomDetail">
              <span className="roomDetailShowTitle">Room Information</span>
              <div className="roomDetailShowInfo">
                <label>Room ID:</label>
                <span className="roomDetailShowInfoTitle">{data.id}</span>
              </div>
              <div className="roomDetailShowInfo">
                <label>Room Name:</label>
                <span className="roomDetailShowInfoTitle">
                  {data.Room_Name}
                </span>
              </div>
              <div className="roomDetailShowInfo">
                <label>Create By:</label>
                <span className="roomDetailShowInfoTitle">
                  {data.Create_By}
                </span>
              </div>
            </div>
            <div className="priceDetail">
              <span className="userShowTitle">Price Detail</span>
              <div className="roomDetailShowInfo">
                <label>Price / Hour:</label>
                <span className="roomDetailShowInfoTitle">
                  ${data.Price_per_Hour}
                </span>
              </div>
              <div className="roomDetailShowInfo">
                <label>Price / Night:</label>
                <span className="roomDetailShowInfoTitle">
                  ${data.Price_per_Night}
                </span>
              </div>
              <div className="roomDetailShowInfo">
                <label>Price / Day:</label>
                <span className="roomDetailShowInfoTitle">
                  ${data.Price_per_Day}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="roomDetailUpdate">
          <span className="roomDetailUpdateTitle">Edit</span>
          <form
            onSubmit={updateRoomDetailInfor}
            className="roomDetailUpdateForm"
          >
            <div className="roomDetailUpdateLeft">
              <div className="roomDetailUpdateItem">
                <label>Room Name</label>
                <input
                  type="text"
                  placeholder=""
                  className="roomDetailUpdateInput"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="roomDetailUpdateItem">
                <label>Price / Hour</label>
                <input
                  type="text"
                  placeholder=""
                  className="roomDetailUpdateInput"
                  onChange={(e) => setPricePerHour(e.target.value)}
                />
              </div>
              <div className="roomDetailUpdateItem">
                <label>Price / Night</label>
                <input
                  type="text"
                  placeholder=""
                  className="roomDetailUpdateInput"
                  onChange={(e) => setPricePerNight(e.target.value)}
                />
              </div>
              <div className="roomDetailUpdateItem">
                <label>Price / Day</label>
                <input
                  type="text"
                  placeholder=""
                  className="roomDetailUpdateInput"
                  onChange={(e) => setPricePerDay(e.target.value)}
                />
              </div>
              <button type="submit" className="roomDetailUpdateButton">
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
