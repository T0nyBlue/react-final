import './newEmployee.css';
import { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from "axios";

export default function NewEmployee() {
    const history = useHistory();
    const [Account, setAccount] = useState('');
    const [Password, setPassword] = useState('');
    const [Type, setType] = useState('');
    const [Name, setName] = useState('');
    const [Phone, setPhone] = useState('');
    const [Gender, setGender] = useState('');
    const [Date_of_Birth, setDate_of_Birth] = useState('');
    const [Address, setAddress] = useState();
    const [Email, setEmail] = useState();
    const [error, setError] = useState(false);



    const createNewUser = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("/api/manage", { Account, Password, Type, Name, Phone, Gender, Date_of_Birth, Email, Address}, {headers: { authorization: "Bearer " + JSON.parse(localStorage['user']).accessToken}});
            console.log(res);
        } catch (err) {
            setError(true);
            console.log(err);
        }
    };

    useEffect(() => {
        if(!localStorage['user']){
            history.push('/login');
        }
    },[]);

    return (
        <div className="newUser">
            <h1 className="newUserTitle">NEW EMPLOYEE</h1>
            <form onSubmit={createNewUser} id="createNewUserForm" className="newUserForm">
                <div className="newUserItem">
                    <label>Username</label>
                    <input type="text" placeholder="" onChange={(e) => setAccount(e.target.value)}/>
                </div>
                <div className="newUserItem">
                    <label>Full name</label>
                    <input type="text" placeholder="" onChange={(e) => setName(e.target.value)}/>
                </div>
                <div className="newUserItem">
                    <label>Date of Birth</label>
                    <input type="date" placeholder="" onChange={(e) => setDate_of_Birth(String(e.target.value))}/>
                </div>
                <div className="newUserItem">
                    <label>Password</label>
                    <input type="password" placeholder="" onChange={(e) => setPassword(e.target.value)}/>
                </div>
                <div className="newUserItem">
                    <label>Email</label>
                    <input type="email" placeholder="" onChange={(e) => setEmail(e.target.value)}/>
                </div>
                <div className="newUserItem">
                    <label>Phone</label>
                    <input type="text" placeholder="" onChange={(e) => setPhone(e.target.value)}/>
                </div>
                <div className="newUserItem">
                    <label>Address</label>
                    <input type="text" placeholder="" onChange={(e) => setAddress(e.target.value)}/>
                </div>
                <div className="newUserItem">
                    <label>Gender</label>
                    <div className="newUserGender">
                        <input type="radio" name="gender" id="male" value="male" onChange={(e) => setGender(e.target.value)}/>
                        <label for="male">Male</label>
                        <input type="radio" name="gender" id="female" value="female" onChange={(e) => setGender(e.target.value)}/>
                        <label for="female">Female</label>
                        <input type="radio" name="gender" id="other" value="other" onChange={(e) => setGender(e.target.value)}/>
                        <label for="other">Other</label>
                    </div>
                </div>
                <div className="newUserItem">
                    <label>Position</label>
                    <select name="position" id="position" className="newUserSelect"  onChange={(e) => setType(e.target.value)}>
                        <option value="" ></option>
                        <option value="Employee" >Employee</option>
                        <option value="Admin">Admin</option>
                    </select> 
                </div>
            </form>
            <button type="submit" className="newUserButton" form="createNewUserForm">Create</button> 
        </div>
    )
}
