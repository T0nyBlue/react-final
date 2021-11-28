import { CalendarToday, LocationSearching, MailOutline, PermIdentity, PhoneAndroid, Publish } from '@material-ui/icons';
import { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from "axios";
import './employee.css';

export default function Employee() {
    const history = useHistory();
    const [data, setData] = useState([]);
    const [Name, setName] = useState('');
    const [Email, setEmail] = useState('');
    const [Address, setAddress] = useState('');
    const [Phone, setPhone] = useState('');
    const [Type, setType] = useState('Employee');
    const [id, setId] = useState('');
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

    const updateUserInfor = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.patch("/api/manage", {id, Name, Email, Address, Phone, Type },{headers: { authorization: "Bearer " + JSON.parse(localStorage['user']).accessToken}});
            console.log(res);
        }catch (err) {
            setError(true);
            console.log(error);
        }
    };

    useEffect(() => {
        if(localStorage['user']){
            if(JSON.parse(localStorage['user']).UserType === 'Admin') {
                // Get the current path first
                let dafile = window.location.pathname;

                // You can extract the current path, then strip out all the folders
                dafile = dafile.substring(dafile.lastIndexOf('/')+1);

                // Or use regular expression to strip the folders out
                dafile = dafile.replace(/^.*[\\\/]/, '');

                getUserInfor(dafile).then((res)=>{
                    setData(res.data);
                    setId(res.data.id);
                    console.log(id);
                })
            } else {
                history.push('/rooms');
            }
        }else{
            history.push('/login');
        }
    },[history]);

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
                                <PhoneAndroid className="userShowIcon"/>
                                <span className="userShowInfoTitle">{data.Phone}</span>
                            </div>
                            <div className="userShowInfo">
                                <MailOutline className="userShowIcon"/>
                                <span className="userShowInfoTitle">{data.Email}</span>
                            </div>
                            <div className="userShowInfo">
                                <LocationSearching className="userShowIcon"/>
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
                                <input type="text" placeholder="Tony Blue" className="userUpdateInput" onChange={(e) => setName(e.target.value)}/>
                            </div>
                            <div className="userUpdateItem">
                                <label>Email</label>
                                <input type="text" placeholder="18521123@gm.uit.edu.vn" className="userUpdateInput" onChange={(e) => setEmail(e.target.value)}/>
                            </div>
                            <div className="userUpdateItem">
                                <label>Phone</label>
                                <input type="text" placeholder="+84 0969 066 865" className="userUpdateInput" onChange={(e) => setPhone(e.target.value)}/>
                            </div>
                            <div className="userUpdateItem">
                                <label>Address</label>
                                <input type="text" placeholder="HCM City" className="userUpdateInput" onChange={(e) => setAddress(e.target.value)}/>
                            </div>
                            <div className="userUpdateItem">
                                <label>Position</label>
                                <select name="position" id="position" className="userUpdateInput"  onChange={(e) => setType(e.target.value)}>
                                    <option value="Employee" >Employee</option>
                                    <option value="Admin">Admin</option>
                                </select>
                            </div>
                            <button type="submit" className="userUpdateButton">Update</button>
                        </div>
                        {/* <div className="userUpdateRight">
                            <div className="userUpdateUpload">
                                <img className="userUpdateImg" src="https://th.bing.com/th/id/OIP.FhcKm_rcW6xAK8TW56HOVQHaG6?pid=ImgDet&rs=1" alt="" />
                                <label htmlFor="file">
                                    <Publish className="userUpdateIcon" />
                                </label>
                                <input type="file" id = "file" style = {{ display: "none"}}/>
                            </div>
                        </div> */}
                    </form>
                </div>
            </div>
        </div>
    )
}
