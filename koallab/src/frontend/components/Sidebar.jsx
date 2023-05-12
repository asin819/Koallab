import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

import ChartBarIcon from '@heroicons/react/24/outline/ChartBarIcon';
import ClipBoardIcon from '@heroicons/react/24/outline/ClipboardIcon';
import UsersIcon from '@heroicons/react/24/outline/UsersIcon';
import UserSolidIcon from '@heroicons/react/24/solid/UserCircleIcon';
import ArrowLeftOnRectangle from '@heroicons/react/24/outline/ArrowLeftOnRectangleIcon';
import Bars3 from '@heroicons/react/24/outline/Bars3Icon';
import { SvgIcon } from '@mui/material';
import KollabLogo from "../assets/KoallabLogoLight.png"

const Sidebar = ({children}) => {
    const[isOpen ,setIsOpen] = useState(false);
    const toggle = () => setIsOpen (!isOpen);
    const menuItemTop=[
        {
            path:"/",
            name:"Home",
            icon:<SvgIcon >
                <ChartBarIcon/>
            </SvgIcon>

        },
        {
            path:"/project",
            name:"Projects",
            icon:<SvgIcon>
                <ClipBoardIcon/>
            </SvgIcon>

        },
        {
            path:"/group",
            name:"Groups",
            icon:<SvgIcon>
                <UsersIcon/>
            </SvgIcon>
        }

    ]

    const menuItemBottom = [
        {
            path:"/userProfile",
            name:"Profile",
            icon:<SvgIcon>
                <UserSolidIcon/>
            </SvgIcon>
        },
        {
            path:"/login",
            name:"Logout",
            icon:<SvgIcon>
                <ArrowLeftOnRectangle/>
            </SvgIcon>
        }
    ]

    const location = useLocation();

    if (location.pathname === '/login') {
        return <main>{children}</main>;
    }

    return (
        <div className="container">
            <div style={{width: "200px"}} className="sidebar">
                <div className="top_section">
                    <img src={KollabLogo} style={{width: "150px"}}/>
                </div>
                {
                    menuItemTop.map((item, index)=>(
                        <NavLink to={item.path} key={index} className="link" activeclassName="active">
                            <div className="icon">{item.icon}</div>
                            <div style={{display: "block"}} className="link_text">{item.name}</div>
                        </NavLink>
                    ))
                }
                <div className='bottom_section'>
                    {
                        menuItemBottom.map((item, index)=>(
                            <NavLink to={item.path} key={index} className="link" activeclassName="active">
                                <div className="icon">{item.icon}</div>
                                <div style={{display: "block"}} className="link_text">{item.name}</div>
                            </NavLink>
                        ))
                    }

                </div>
            </div>
            <main>{children}</main>
        </div>
    );
};

export default Sidebar;
