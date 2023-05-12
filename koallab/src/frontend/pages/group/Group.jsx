import React, { useEffect, useState, useContext } from "react";
import "./Group.css";
import WrenchIcon from "@heroicons/react/24/solid/WrenchIcon";
import PencilSquareIcon from "@heroicons/react/24/outline/PencilSquareIcon";
import { SvgIcon } from "@mui/material";
import { GroupHolder } from "../../components/GroupHolder";
import GroupInfoCard from "../../components/GroupInfoCard";


const Group = () => {
  var token = sessionStorage.getItem("AuthToken")
  var groupname = "Back-end Group"
  const [openModal, setModal] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [userId, setUserId] = useState([])

  useEffect(() => {
    if (token === null) {
      Logout()
    } else {
      getUserId()
    }
  }, [])

  useEffect(() => {

  }, [])

  const checkAdmin = (groupId, userId) => {

    const options = {
      mode: 'cors',
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Origin": "http://localhost:3000"
      },
    }
    fetch(`http://127.0.0.1:3000/getUserRoleInGroup?token=${token}&userid=${userId}&groupid=${groupId}`, options)
      .then(async (res) => {

        let data = await res.json();
        data = JSON.parse(data);
        return { ...data, ok: res.ok }
      })
      .then((res) => {
        if (res.ok) {
          if (res.token == "administrator") {
            setIsAdmin(true);
          }
          // setUserId(res.token)
        } else {
          // Convert this to toast
          toast.error(res.ErrorMessage, ToastOptions)
        }
      })
  }

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
          getGroupId(res.token)
        } else {
          // Convert this to toast
          toast.error(res.ErrorMessage, ToastOptions)
        }
      })
  }

  const getGroupId = (userId) => {
    const options = {
      mode: 'cors',
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Origin": "http://localhost:3000"
      },
    }
    fetch(`http://127.0.0.1:3000/getGroupId?token=${token}&groupname=${groupname}`, options)
      .then(async (res) => {

        let data = await res.json();
        data = JSON.parse(data);

        return { ...data, ok: res.ok }
      })
      .then((res) => {
        if (res.ok) {
          checkAdmin(res.token, userId)
        } else {
          // Convert this to toast
          toast.error(res.ErrorMessage, ToastOptions)
        }
      })
  }

  const handlePencilClick = () => {
    setIsEditing(!isEditing);
  };
  const mockData = {
    UserName: 'Test User',
    ProjectData: [
      {
        Name: 'Project 1',
        progress: 50
      },
      {
        Name: 'Project 2',
        progress: 75
      }
    ],
    editingState: true,
  };


  return (
    <div className="group_container">
      {openModal &&
        <GroupInfoCard
          GroupId={'123'}
          GroupName={'Koallas'}
          CreatorID={'456'}
          CreationTime={'Something'}
          GroupStatus={'Active'}
          ModalStateFunction={setModal}
        />}
      <div className="top_section_group">
        <h1 className="group_title">Group Name</h1>
        {isAdmin &&
          <div className="wrenchIcon" onClick={() => setModal(true)}>
            <WrenchIcon height={'24px'} width={'24px'} />

          </div>
        }
      </div>
      <div className="group_info">
        <p>Lorem Ipsum</p>
      </div>
      <hr />
      <div className="middle_section_group">
        <h2 className="group_user_title"> Users</h2>
        {isAdmin &&
          <div className="pencilIcon" onClick={() => handlePencilClick()}>
            <PencilSquareIcon height={'24px'} />
          </div>
        }
      </div>
      <div className="group_user_cards">


        {/* <GroupHolder UserName={"User 1"} editingState = {isEditing}/>
        <GroupHolder UserName={"User 1"} editingState = {isEditing}/>
        {
          Object.entries({userAndProjects}).map((item) => (
              <GroupHolder 
              UserName={item.Name} 
              editingState={item.isEditing}
              ProjectData={item.Projects}/>
          ))
          } */}
        <GroupHolder UserName={"User 1"} ProjectData={mockData.ProjectData} editingState={isEditing} />
      </div>
    </div>
  );
};

export default Group;
