import './newEmployee.css';

export default function NewEmployee() {
    return (
        <div className="newUser">
            <h1 className="newUserTitle">NEW EMPLOYEE</h1>
            <form className="newUserForm">
                <div className="newUserItem">
                    <label>Username</label>
                    <input type="text" placeholder="tony" />
                </div>
                <div className="newUserItem">
                    <label>Full name</label>
                    <input type="text" placeholder="Tony Blue" />
                </div>
                <div className="newUserItem">
                    <label>Date of Birth</label>
                    <input type="date" placeholder="" />
                </div>
                <div className="newUserItem">
                    <label>Password</label>
                    <input type="password" placeholder="@a1357924680" />
                </div>
                <div className="newUserItem">
                    <label>Email</label>
                    <input type="email" placeholder="tonyblue18521123@gmail.com" />
                </div>
                <div className="newUserItem">
                    <label>Phone</label>
                    <input type="text" placeholder="+84 0969 066 865" />
                </div>
                <div className="newUserItem">
                    <label>Address</label>
                    <input type="text" placeholder="HCM City" />
                </div>
                <div className="newUserItem">
                    <label>Gender</label>
                    <div className="newUserGender">
                        <input type="radio" name="gender" id="male" value="male"/>
                        <label for="male">Male</label>
                        <input type="radio" name="gender" id="female" value="female"/>
                        <label for="female">Female</label>
                        <input type="radio" name="gender" id="other" value="other"/>
                        <label for="other">Other</label>
                    </div>
                </div>
                <div className="newUserItem">
                    <label>Position</label>
                    <select name="position" id="position" className="newUserSelect">
                        <option value="employee">Employee</option>
                        <option value="manager">Manager</option>
                    </select>
                </div>
            </form>
            <button className="newUserButton">Create</button>
        </div>
    )
}
