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
                        <img src="https://th.bing.com/th/id/R.671ad41c4dee19bf2634551bd6b10297?rik=THGL4iCpBjKMpQ&riu=http%3a%2f%2fwww.nzasianleaders.com%2fwp-content%2fuploads%2fdefault-avatar.jpg&ehk=lmPQ78hkERVbp7zfg5vN7g1qf3jMZ%2feDS5UeyJ%2bk4Cw%3d&risl=&pid=ImgRaw&r=0" alt="" className="topAvatar" />
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
