import "./login.css";
import axios from "axios";
import { useState } from "react";
import { PermIdentity, Lock } from "@material-ui/icons";

export default function Login() {
    const [user, setUser] = useState(null);
    const [Account, setAccount] = useState("");
    const [Password, setPassword] = useState("");
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("/login", { Account, Password });
            setUser(res.data);
            localStorage.setItem('success', user.success);
            localStorage.setItem('accessToken', user.accessToken);
            localStorage.setItem('UserType', user.UserType);
        } catch (err) {
            console.log(err);
        }
    };
    
    return (
        <div className="loginContainer">
            <div className="loginContainerBackground">
                <img src="https://i1.wp.com/www.hdwallpapers.in/download/beach_resorts-1920x1080.jpg" className = "loginContainerBackgroundPicture" />
                {/* <img src="https://www.bwallpaperhd.com/wp-content/uploads/2021/01/DiamondBeach.jpg" className = "loginContainerBackgroundPicture" /> */}
            </div>
            <div className="login">
                <form onSubmit={handleSubmit}>
                    <span className="formTitleName">Binh An Hotel</span>
                    <div className="loginInput">
                        <div className="loginInputIcon">
                            <PermIdentity className="loginIcon"/>
                        </div>
                        <input
                            type="text"
                            placeholder="Username"
                            onChange={(e) => setAccount(e.target.value)}
                        />
                    </div>
                    <div className="loginInput">
                        <div className="loginInputIcon">
                            <Lock className="loginIcon"/>
                        </div>
                        <input
                            type="password"
                            placeholder="Password"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button type="submit" className="submitButton">
                        Login
                    </button>
                </form>
            </div>
        </div>
    )
}
