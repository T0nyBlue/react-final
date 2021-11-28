import './home.css';
import { Link, useHistory } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from "axios";

export default function Home() {
    const history = useHistory();

    useEffect(() => {
        if(localStorage['user']){
            const user = JSON.parse(localStorage['user']);
            if(user.UserType !== 'Admin') {
                history.push('/rooms');
            } else {
                history.push('/employees');
            }
        }else{
            history.push('/login');
        }
    },[localStorage['user']]);
    return (
        <div className="home">
            home
        </div>
    )
}
