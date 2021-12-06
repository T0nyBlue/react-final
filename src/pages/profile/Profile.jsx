import {
  CalendarToday,
  LocationSearching,
  MailOutline,
  PermIdentity,
  PhoneAndroid,
  Publish,
} from "@material-ui/icons";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import { storage } from "../../firebase";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import "./profile.css";

export default function Profile() {
  const history = useHistory();
  const [data, setData] = useState([]);
  const [id, setId] = useState("");
  const [error, setError] = useState(false);
  const [progress, setProgress] = useState(0);
  const [imgURL, setImgURL] = useState("");

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

  const formHandler = (e) => {
    e.preventDefault();
    const file = e.target[0].files[0];
    uploadFiles(file);
  };

  const uploadFiles = (file) => {
    //
    if (!file) return;
    const sotrageRef = ref(storage, `files/${file.name}`);
    const uploadTask = uploadBytesResumable(sotrageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const prog = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(prog);
      },
      (error) => console.log(error),
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImgURL(downloadURL);
          console.log("File available at", downloadURL);
        });
      }
    );
  };

  const updateUserInfor = async () => {
    try {
      const res = await axios.patch(
        "/api/manage",
        {
          id: data.id,
          Name: data.Name,
          Email: data.Email,
          Address: data.Address,
          Phone: data.Phone,
          Type: data.Type,
          Img: imgURL,
        },
        {
          headers: {
            authorization:
              "Bearer " + JSON.parse(localStorage["user"]).accessToken,
          },
        }
      );
      // console.log(res);
    } catch (err) {
      setError(true);
      console.log(error);
    }
  };

  useEffect(() => {
    if (localStorage["user"]) {
      getUserInfor().then((res) => {
        setData(res.data);
        setId(res.data.id);
      });
      updateUserInfor();
    } else {
      history.push("/login");
    }
  }, [data, imgURL]);

  return (
    <div className="profile">
      <div className="profileTitleContainer">
        <h1 className="profileTitle">EDIT EMPLOYEE</h1>
      </div>
      <div className="profileContainer">
        <div className="profileShow">
          <div className="profileShowTop">
            <img src={data.Img} alt="" className="profileShowImg" />
            <div className="profileShowTopTitle">
              <span className="profileShowUserName">{data.Name}</span>
              <span className="profileShowUserTitle">{data.Type}</span>
            </div>
          </div>
          <div className="profileShowBottom">
            <div className="profileShowUploadImg">
              <img src={data.Img} alt="" className="profileShowUpdateImg" />
              <div className="profileShowBox">
                <Box sx={{ width: "80%" }}>
                  <LinearProgress variant="determinate" value={progress} />
                </Box>
              </div>
              <div className="profileUploadImgForm">
                <form
                  onSubmit={formHandler}
                  id="profileUploadImgFireBase"
                  className="profileShowSelectImg"
                >
                  <label for="profilePhoto">Choose Photo</label>
                  <input id="profilePhoto" type="file" className="inputFile" />
                </form>
                <button
                  type="submit"
                  form="profileUploadImgFireBase"
                  className="profileShowUploadbtn"
                >
                  Upload
                </button>
              </div>
            </div>
            <div className="profileShowBottomInf">
              <div className="accountProfileDetail">
                <span className="profileShowTitle">Account Details</span>
                <div className="profileShowInfo">
                  <label>Username:</label>
                  <span className="profileShowInfoTitle">{data.Account}</span>
                </div>
                <div className="profileShowInfo">
                  <label>Name:</label>
                  <span className="profileShowInfoTitle">{data.Name}</span>
                </div>
                <div className="profileShowInfo">
                  <label>Position:</label>
                  <span className="profileShowInfoTitle">{data.Type}</span>
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
              <div className="contactProfileDetail">
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
        </div>
      </div>
    </div>
  );
}
