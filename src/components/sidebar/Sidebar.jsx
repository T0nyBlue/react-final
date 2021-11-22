import './sidebar.css';
import { LineStyle, Timeline, TrendingUp, PermIdentity, Storefront, AttachMoney, BarChart, MailOutline, DynamicFeed, ChatBubbleOutline, ErrorOutline, Computer } from "@material-ui/icons";
import { Link } from 'react-router-dom';

export default function Sidebar() {
    return (
        <div className="sidebar">
            <div className="sidebarWrapper">
                <div className="sidebarMenu">
                    <h3 className="sidebarTitle">Dashboard</h3>
                    <ul className="sidebarList">
                        <li className="sidebarListItem active">
                            <LineStyle className="sidebarIcon"/>
                            Employee Manager
                        </li>
                        <li className="sidebarListItem">
                            <Timeline className="sidebarIcon"/>
                            Room Manager
                        </li>
                        <li className="sidebarListItem">
                            <TrendingUp className="sidebarIcon"/>
                            Transaction Manager
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}
