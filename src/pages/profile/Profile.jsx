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
import "./profile.css";

export default function Profile() {
  const history = useHistory();
  const [data, setData] = useState([]);
  const [Name, setName] = useState("");
  const [Email, setEmail] = useState("");
  const [Address, setAddress] = useState("");
  const [Phone, setPhone] = useState("");
  const [Type, setType] = useState("");
  const [id, setId] = useState("");
  const [error, setError] = useState(false);

  const getUserInfor = async () => {
    try {
      const res = await axios.get("/api/manage/getprofile", {
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

  // const updateUserInfor = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const res = await axios.patch(
  //       "/api/manage",
  //       { id, Name, Email, Address, Phone, Type },
  //       {
  //         headers: {
  //           authorization:
  //             "Bearer " + JSON.parse(localStorage["user"]).accessToken,
  //         },
  //       }
  //     );
  //     console.log(res);
  //   } catch (err) {
  //     setError(true);
  //     console.log(error);
  //   }
  // };

  useEffect(() => {
    if (localStorage["user"]) {
      if (JSON.parse(localStorage["user"]).UserType === "Admin") {
        // // Get the current path first
        // let dafile = window.location.pathname;

        // // You can extract the current path, then strip out all the folders
        // dafile = dafile.substring(dafile.lastIndexOf("/") + 1);

        // // Or use regular expression to strip the folders out
        // dafile = dafile.replace(/^.*[\\\/]/, "");

        getUserInfor().then((res) => {
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
    <div className="profile">
      <div className="profileTitleContainer">
        <h1 className="profileTitle">EDIT EMPLOYEE</h1>
      </div>
      <div className="profileContainer">
        <div className="profileShow">
          <div className="profileShowTop">
            <img
              src="https://th.bing.com/th/id/R.671ad41c4dee19bf2634551bd6b10297?rik=THGL4iCpBjKMpQ&riu=http%3a%2f%2fwww.nzasianleaders.com%2fwp-content%2fuploads%2fdefault-avatar.jpg&ehk=lmPQ78hkERVbp7zfg5vN7g1qf3jMZ%2feDS5UeyJ%2bk4Cw%3d&risl=&pid=ImgRaw&r=0"
              alt=""
              className="profileShowImg"
            />
            <div className="profileShowTopTitle">
              <span className="profileShowUserName">{data.Name}</span>
              <span className="profileShowUserTitle">{data.Type}</span>
            </div>
          </div>
          <div className="profileShowBottom">
            <div className="accountDetail">
              <span className="profileShowTitle">Account Details</span>
              <div className="profileShowInfo">
                <label>Username:</label>
                <span className="profileShowInfoTitle">{data.Account}</span>
              </div>
              <div className="profileShowInfo">
                <label>Date of Birth:</label>
                <span className="profileShowInfoTitle">
                  {data.Date_of_Birth}
                </span>
              </div>
              <div className="profileShowInfo">
                <label>Gender:</label>
                <span className="profileShowInfoTitle">{data.Gender}</span>
              </div>
            </div>
            <div className="contactDetail">
              <span className="profileShowTitle">Contact Details</span>
              <div className="profileShowInfo">
                <PhoneAndroid className="profileShowIcon" />
                <span className="profileShowInfoTitle">{data.Phone}</span>
              </div>
              <div className="profileShowInfo">
                <MailOutline className="profileShowIcon" />
                <span className="profileShowInfoTitle">{data.Email}</span>
              </div>
              <div className="profileShowInfo">
                <LocationSearching className="profileShowIcon" />
                <span className="profileShowInfoTitle">{data.Address}</span>
              </div>
            </div>
          </div>
        </div>
        {/* <div className="userUpdate">
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
        </div> */}
      </div>
    </div>
  );
}