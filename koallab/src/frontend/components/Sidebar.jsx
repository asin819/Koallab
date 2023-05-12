import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";

import ChartBarIcon from "@heroicons/react/24/outline/ChartBarIcon";
import ClipBoardIcon from "@heroicons/react/24/outline/ClipboardIcon";
import UsersIcon from "@heroicons/react/24/outline/UsersIcon";
import UserSolidIcon from "@heroicons/react/24/solid/UserCircleIcon";
import ArrowLeftOnRectangle from "@heroicons/react/24/outline/ArrowLeftOnRectangleIcon";
import Bars3 from "@heroicons/react/24/outline/Bars3Icon";
import { SvgIcon } from "@mui/material";
import KollabLogo from "../assets/KoallabLogoLight.png";

const Sidebar = ({ children }) => {
  // TODO Eaton fill these up
  const groups = ["abc", "def", "xyz"];
  const projects = ["koallab", "p4p", "701"];

  // TODO Logout function for eaton
  const logoutFunction = () => {
    console.log("Logged out");
  };

  const location = useLocation();

  if (location.pathname === "/login") {
    return <main>{children}</main>;
  }

  return (
    <div className="container">
      <div style={{ width: "200px" }} className="sidebar">
        <div className="top_section">
          <img src={KollabLogo} style={{ width: "150px" }} />
        </div>

        {/* Adds Home Button */}
        <NavLink to="/" className="link" activeclassName="active">
          <div className="icon">
            <ChartBarIcon width={"24px"} />
          </div>
          <div style={{ display: "block" }} className="link_text">
            Home
          </div>
        </NavLink>

        {/* Adds project header */}
        <div className="link" activeclassName="active">
          <div className="icon">
            <ClipBoardIcon width={"24px"} />
          </div>
          <div style={{ display: "block" }} className="link_text">
            Projects
          </div>
        </div>

        {/* Maps all projects under the user to a link */}
        {projects.map((projectItem) => (
          <NavLink
            to="/project"
            className="link"
            activeclassName="active"
            style={{ marginLeft: "35px" }}
          >
            <div style={{ display: "block" }} className="link_text">
              {projectItem}
            </div>
          </NavLink>
        ))}

        {/* Adds Group header */}
        <div className="link" activeclassName="active">
          <div className="icon">
            <UsersIcon width={"24px"} />
          </div>
          <div style={{ display: "block" }} className="link_text">
            Groups
          </div>
        </div>

        {/* Maps all user groups as clickable links */}
        {groups.map((groupItem) => (
          <NavLink
            to="/group"
            className="link"
            activeclassName="active"
            style={{ marginLeft: "35px" }}
          >
            <div style={{ display: "block" }} className="link_text">
              {groupItem}
            </div>
          </NavLink>
        ))}

        {/* Adds the button profile and logout */}
        <div className="bottom_section">
          <NavLink to="/userProfile" className="link" activeclassName="active">
            <div className="icon">
              <UserSolidIcon width={"24px"} />
            </div>
            <div style={{ display: "block" }} className="link_text">
              Profile
            </div>
          </NavLink>

          <NavLink
            to="/login"
            className="link"
            activeclassName="active"
            onClick={() => logoutFunction()}
          >
            <div className="icon">
              <ArrowLeftOnRectangle width={"24px"} />
            </div>
            <div style={{ display: "block" }} className="link_text">
              Logout
            </div>
          </NavLink>
        </div>
      </div>
      <main>{children}</main>
    </div>
  );
};

export default Sidebar;
