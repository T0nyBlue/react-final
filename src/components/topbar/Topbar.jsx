import React from 'react';
import './topbar.css';
import { NotificationsNone, Language, Settings, ExitToApp } from '@material-ui/icons';

export default function Topbar() {
    return (
        <div className="topbar">
            <div className="topbarWrapper">
                <div className="topLeft">
                    <span className="logo">Binh An Hotel</span>
                </div>
                <div className="topRight">
                    <div className="topRightNav">
                        <img src="https://th.bing.com/th/id/OIP.IqYxg3hT5V6GaKUeCisxSQHaHa?pid=ImgDet&rs=1" alt="" className="topAvatar" />
                        <div className="topbarUserName">
                            <span className="topbarUserNameTitle">Tony Blue</span>
                        </div>
                        <div className="topbarIconContainer">
                            <ExitToApp className="topbarLogOutIcon"/>
                            <span className="topbarSubnavTitle">
                                Log Out
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
