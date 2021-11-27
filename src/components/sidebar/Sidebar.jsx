import React, { useState, useEffect, useRef } from 'react';
import { LineStyle, Timeline, TrendingUp, PermIdentity, Storefront, AttachMoney, BarChart, MailOutline, DynamicFeed, ChatBubbleOutline, ErrorOutline, Computer } from "@material-ui/icons";
import { Link } from 'react-router-dom';
import './sidebar.css';

export default function Sidebar(props) {
    const { type } = props;
    const [isAdmin, setIsAdmin] = useState(true);

    return (
        <div className="sidebar">
            <div className="sidebarWrapper">
                <div className="sidebarMenu">
                    <h3 className="sidebarTitle">Dashboard</h3>
                    <ul className="sidebarList">
                        {isAdmin && (<Link to="/employees" className="link">
                            <li className="sidebarListItem active">
                                <LineStyle className="sidebarIcon"/>
                                Employee Manager
                            </li>
                        </Link>)}
                        
                        <Link to="/rooms" className="link">
                            <li className="sidebarListItem">
                                <Timeline className="sidebarIcon"/>
                                Room Manager
                            </li>
                        </Link>
                        <Link to="/transactions" className="link">
                            <li className="sidebarListItem">
                                <TrendingUp className="sidebarIcon"/>
                                Transaction Manager
                            </li>
                        </Link>
                    </ul>
                </div>
            </div>
        </div>
    )
}
