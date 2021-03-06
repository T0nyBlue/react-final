import {
  CalendarToday,
  LocationSearching,
  MailOutline,
  PermIdentity,
  PhoneAndroid,
  Publish,
} from "@material-ui/icons";
import { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import "./employee.css";

export default function Employee() {
  const history = useHistory();
  const [data, setData] = useState([]);
  const [Name, setName] = useState("");
  const [Email, setEmail] = useState("");
  const [Address, setAddress] = useState("");
  const [Phone, setPhone] = useState("");
  const [Type, setType] = useState("");
  const [id, setId] = useState("");
  const [error, setError] = useState(false);

  const getUserInfor = async (id) => {
    try {
      const res = await axios.get(
        `https://backend-apidoc.herokuapp.com/api/manage/getone/${id}`,
        {
          headers: {
            authorization:
              "Bearer " + JSON.parse(localStorage["user"]).accessToken,
          },
        }
      );
      return res;
    } catch (err) {
      setError(true);
      console.log(err);
    }
  };

  const updateUserInfor = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.patch(
        "https://backend-apidoc.herokuapp.com/api/manage",
        { id, Name, Email, Address, Phone, Type },
        {
          headers: {
            authorization:
              "Bearer " + JSON.parse(localStorage["user"]).accessToken,
          },
        }
      );
      console.log(res);
      alert("Successful!");
    } catch (err) {
      setError(true);
      console.log(error);
      alert("Error!");
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
      <div className="userTitleContainer">
        <h1 className="userTitle">EDIT EMPLOYEE</h1>
      </div>
      <div className="userContainer">
        <div className="userShow">
          <div className="userShowTop">
            <img src={data.Img} alt="" className="userShowImg" />
            <div className="userShowTopTitle">
              <span className="userShowUserName">{data.Name}</span>
              <span className="userShowUserTitle">{data.Type}</span>
            </div>
          </div>
          <div className="userShowBottom">
            <div className="accountDetail">
              <span className="userShowTitle">Account Details</span>
              <div className="userShowInfo">
                <label>Username:</label>
                <span className="userShowInfoTitle">{data.Account}</span>
              </div>
              <div className="userShowInfo">
                <label>Date of Birth:</label>
                <span className="userShowInfoTitle">{data.Date_of_Birth}</span>
              </div>
              <div className="userShowInfo">
                <label>Gender:</label>
                <span className="userShowInfoTitle">{data.Gender}</span>
              </div>
            </div>
            <div className="contactDetail">
              <span className="userShowTitle">Contact Details</span>
              <div className="userShowInfo">
                <PhoneAndroid className="userShowIcon" />
                <span className="userShowInfoTitle">{data.Phone}</span>
              </div>
              <div className="userShowInfo">
                <MailOutline className="userShowIcon" />
                <span className="userShowInfoTitle">{data.Email}</span>
              </div>
              <div className="userShowInfo">
                <LocationSearching className="userShowIcon" />
                <span className="userShowInfoTitle">{data.Address}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="userUpdate">
          <span className="userUpdateTitle">Edit</span>
          <form onSubmit={updateUserInfor} className="userUpdateForm">
            <div className="userUpdateLeft">
              <div className="userUpdateItem">
                <label>Full Name</label>
                <input
                  type="text"
                  placeholder=""
                  className="userUpdateInput"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="userUpdateItem">
                <label>Email</label>
                <input
                  type="text"
                  placeholder=""
                  className="userUpdateInput"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="userUpdateItem">
                <label>Phone</label>
                <input
                  type="text"
                  placeholder=""
                  className="userUpdateInput"
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
              <div className="userUpdateItem">
                <label>Address</label>
                <input
                  type="text"
                  placeholder=""
                  className="userUpdateInput"
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>
              <div className="userUpdateItem">
                <label>Position</label>
                <select
                  name="position"
                  id="position"
                  className="userUpdateInput"
                  onChange={(e) => setType(e.target.value)}
                >
                  <option value=""></option>
                  <option value="Employee">Employee</option>
                  <option value="Admin">Admin</option>
                </select>
              </div>
              <button type="submit" className="userUpdateButton">
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
