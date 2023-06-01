import React, { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";

import ChartBarIcon from "@heroicons/react/24/outline/ChartBarIcon";
import ClipBoardIcon from "@heroicons/react/24/outline/ClipboardIcon";
import UsersIcon from "@heroicons/react/24/outline/UsersIcon";
import UserSolidIcon from "@heroicons/react/24/solid/UserCircleIcon";
import ArrowLeftOnRectangle from "@heroicons/react/24/outline/ArrowLeftOnRectangleIcon";
import PlusIcon from "@heroicons/react/24/solid/PlusIcon";

import KollabLogo from "../assets/KoallabLogoLight.png";

const Sidebar = ({ children }) => {

  var token = sessionStorage.getItem("AuthToken")

  const [projectResponse, setProjectResponse] = useState([]);
  const [groupResponse, setGroupResponse] = useState([]);

  const [userId, setUserId] = useState(null)

  const [projects, setProjects] = useState([]);
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    getUserId();
  }, []);

  useEffect(() => {
    if (userId) {
      getDataFrom(`/getMyParticipatedProjectList?userid=${userId}&token=${token}`);
      getDataFrom(`/getMyCreatedGroupList?userid=${userId}&token=${token}`);
    }
  }, [userId]);


  useEffect(() => {
    setProjects(projectResponse.map(item => item.projectname));
  }, [projectResponse]);

  useEffect(() => {
    setGroups(groupResponse.map(item => item.groupname));
  }, [groupResponse]);

  const getUserId = () => {
    const options = {
      mode: 'cors',
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Origin": "http://localhost:3000"
      },
    }
    fetch(`http://127.0.0.1:3000/getUserid?token=${token}`, options)
      .then(async (res) => {

        let data = await res.json();
        data = JSON.parse(data);

        return { ...data, ok: res.ok }
      })
      .then((res) => {
        if (res.ok) {
          setUserId(res.token)
        } else {
          // Convert this to toast

        }
      })
  }

  const getDataFrom = (url) => {
    const options = {
      mode: 'cors',
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Origin": "http://localhost:3000"
      },
    }
    fetch(`http://127.0.0.1:3000${url}`, options)
      .then(async (res) => {

        let data = await res.json();
        data = JSON.parse(data);

        return { ...data, ok: res.ok }
      })
      .then((res) => {
        if (res.ok) {
          if (url.includes("Group")) {
            setGroupResponse(res.data);
          } else if (url.includes("Project")) {
            setProjectResponse(res.data);
          }
        } else {
          // Convert this to toast

        }
      })
  }

  // TODO Logout function for eaton
  const logoutFunction = () => {
    console.log("Logged out");
  };

  const addGroup = () => {
    console.log('Added Group');
  }

  const addProject = () => {
    console.log('Added new project')
  }

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
        <NavLink to="/home" className="link" activeclassName="active">
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
          <div className="icon" onClick={() => addProject()} style={{ cursor: 'pointer' }}>
            <PlusIcon width={"20px"} style={{ marginLeft: '20px' }} />
          </div>
        </div>

        {/* Maps all projects under the user to a link */}
        {projectResponse.map((projectItem) => (
          
          <NavLink
            to={`project/${projectItem.projectid}`}
            className="link"
            activeclassName="active"
            style={{ marginLeft: "35px" }}
          >
            <div style={{ display: "block" }} className="link_text">
              {projectItem.projectname}
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
          <div className="icon" onClick={() => addGroup()} style={{ cursor: 'pointer' }}>
            <PlusIcon width={"20px"} style={{ marginLeft: '20px' }} />
          </div>
        </div>

        {/* Maps all user groups as clickable links */}
        {groupResponse.map((groupItem) => (
          <NavLink
            to={`/group/${groupItem.groupid}`}
            className="link"
            activeclassName="active"
            style={{ marginLeft: "35px" }}
          >
            <div style={{ display: "block" }} className="link_text">
              {groupItem.groupname}
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