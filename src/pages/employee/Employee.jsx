import { CalendarToday, LocationSearching, MailOutline, PermIdentity, PhoneAndroid, Publish } from '@material-ui/icons';
import { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from "axios";
import './employee.css';

export default function Employee() {
    const history = useHistory();
    const [data, setData] = useState([]);
    const [error, setError] = useState(false);

    const getUserInfor = async (id) => {
        try {
            const res = await axios.get(`/api/manage/getone/${id}`);
            return res;
        } catch (err) {
            setError(true);
            console.log(err);
        }
    };

    useEffect(() => {
        if(localStorage['user']){
            const user = JSON.parse(localStorage['user']);
            if(user.UserType === 'Admin') {
                // Get the current path first
                var dafile = window.location.pathname;

                // You can extract the current path, then strip out all the folders
                dafile = dafile.substring(dafile.lastIndexOf('/')+1);

                // Or use regular expression to strip the folders out
                dafile = dafile.replace(/^.*[\\\/]/, '');

                console.log(dafile);
                getUserInfor(dafile).then((res)=>{
                    setData(res.data);
                })

            } else {
                history.push('/rooms');
            }
        }else{
            history.push('/login');
        }
    },[localStorage['user']]);

    return (
        <div className="user">
            <div className="userTitleContainer">
                <h1 className="userTitle">EDIT EMPLOYEE</h1>
            </div>
            <div className="userContainer">
                <div className="userShow">
                    <div className="userShowTop">
                        <img src="https://th.bing.com/th/id/R.671ad41c4dee19bf2634551bd6b10297?rik=THGL4iCpBjKMpQ&riu=http%3a%2f%2fwww.nzasianleaders.com%2fwp-content%2fuploads%2fdefault-avatar.jpg&ehk=lmPQ78hkERVbp7zfg5vN7g1qf3jMZ%2feDS5UeyJ%2bk4Cw%3d&risl=&pid=ImgRaw&r=0" alt="" className="userShowImg" />
                        <div className="userShowTopTitle">
                            <span className="userShowUserName">Bao Nam</span>
                            <span className="userShowUserTitle">Manager</span>
                        </div>
                    </div>
                    <div className="userShowBottom">
                        <div className="accountDetail">
                            <span className="userShowTitle">Account Details</span>
                            <div className="userShowInfo">
                                <label>Username:</label>
                                <span className="userShowInfoTitle">tonyblue1123</span>
                            </div>
                            <div className="userShowInfo">
                                <label>Date of Birth:</label>
                                <span className="userShowInfoTitle">03.01.2000</span>
                            </div>
                            <div className="userShowInfo">
                                <label>Gender:</label>
                                <span className="userShowInfoTitle">Male</span>
                            </div>
                        </div>
                        <div className="contactDetail">
                            <span className="userShowTitle">Contact Details</span>
                            <div className="userShowInfo">
                                <PhoneAndroid className="userShowIcon"/>
                                <span className="userShowInfoTitle">+84 0969 066 865</span>
                            </div>
                            <div className="userShowInfo">
                                <MailOutline className="userShowIcon"/>
                                <span className="userShowInfoTitle">18521123@gm.uit.edu.vn</span>
                            </div>
                            <div className="userShowInfo">
                                <LocationSearching className="userShowIcon"/>
                                <span className="userShowInfoTitle">HCM City</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="userUpdate">
                    <span className="userUpdateTitle">Edit</span>
                    <form className="userUpdateForm">
                        <div className="userUpdateLeft">
                            <div className="userUpdateItem">
                                <label>Full Name</label>
                                <input type="text" placeholder="Tony Blue" className="userUpdateInput"/>
                            </div>
                            <div className="userUpdateItem">
                                <label>Email</label>
                                <input type="text" placeholder="18521123@gm.uit.edu.vn" className="userUpdateInput"/>
                            </div>
                            <div className="userUpdateItem">
                                <label>Phone</label>
                                <input type="text" placeholder="+84 0969 066 865" className="userUpdateInput"/>
                            </div>
                            <div className="userUpdateItem">
                                <label>Address</label>
                                <input type="text" placeholder="HCM City" className="userUpdateInput"/>
                            </div>
                            <div className="userUpdateItem">
                                <label>Position</label>
                                <select name="position" id="position" className="userUpdateInput">
                                    <option value="employee">Employee</option>
                                    <option value="manager">Manager</option>
                                </select>
                            </div>
                            <button className="userUpdateButton">Update</button>
                        </div>
                        <div className="userUpdateRight">
                            {/* <div className="userUpdateUpload">
                                <img className="userUpdateImg" src="https://th.bing.com/th/id/OIP.FhcKm_rcW6xAK8TW56HOVQHaG6?pid=ImgDet&rs=1" alt="" />
                                <label htmlFor="file">
                                    <Publish className="userUpdateIcon" />
                                </label>
                                <input type="file" id = "file" style = {{ display: "none"}}/>
                            </div> */}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
