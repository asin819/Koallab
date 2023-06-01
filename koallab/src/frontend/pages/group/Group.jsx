import React, { useEffect, useState, useContext } from "react";
import "./Group.css";
import WrenchIcon from "@heroicons/react/24/solid/WrenchIcon";
import PencilSquareIcon from "@heroicons/react/24/outline/PencilSquareIcon";
import { SvgIcon } from "@mui/material";
import { GroupHolder } from "../../components/GroupHolder";
import GroupInfoCard from "../../components/GroupInfoCard";
import { useParams } from "react-router";

const Group = () => {
  var token = sessionStorage.getItem("AuthToken");
  var groupname = "Back-end Group";
  const [openModal, setModal] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [userId, setUserId] = useState([]);

  useEffect(() => {
    if (token === null) {
      Logout();
    } else {
      getUserId();
    }
  }, []);

  useEffect(() => {}, []);

  const checkAdmin = (groupId, userId) => {
    const options = {
      mode: "cors",
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Origin: "http://localhost:3000",
      },
    };
    fetch(
      `http://127.0.0.1:3000/getUserRoleInGroup?token=${token}&userid=${userId}&groupid=${groupId}`,
      options
    )
      .then(async (res) => {
        let data = await res.json();
        data = JSON.parse(data);
        return { ...data, ok: res.ok };
      })
      .then((res) => {
        if (res.ok) {
          if (res.token == "administrator") {
            setIsAdmin(true);
          }
          // setUserId(res.token)
        } else {
          // Convert this to toast
          toast.error(res.ErrorMessage, ToastOptions);
        }
      });
  };

  const getUserId = () => {
    const options = {
      mode: "cors",
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Origin: "http://localhost:3000",
      },
    };
    fetch(`http://127.0.0.1:3000/getUserid?token=${token}`, options)
      .then(async (res) => {
        let data = await res.json();
        data = JSON.parse(data);

        return { ...data, ok: res.ok };
      })
      .then((res) => {
        if (res.ok) {
          setUserId(res.token);
          getGroupId(res.token);
        } else {
          // Convert this to toast
          toast.error(res.ErrorMessage, ToastOptions);
        }
      });
  };

  const getGroupId = (userId) => {
    const options = {
      mode: "cors",
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Origin: "http://localhost:3000",
      },
    };
    fetch(
      `http://127.0.0.1:3000/getGroupId?token=${token}&groupname=${groupname}`,
      options
    )
      .then(async (res) => {
        let data = await res.json();
        data = JSON.parse(data);

        return { ...data, ok: res.ok };
      })
      .then((res) => {
        if (res.ok) {
          checkAdmin(res.token, userId);
        } else {
          // Convert this to toast
          toast.error(res.ErrorMessage, ToastOptions);
        }
      });
  };

  const handlePencilClick = () => {
    setIsEditing(!isEditing);
  };
  const mockData1 = {
    UserName: "Test User",
    ProjectData: [
      {
        Name: "Khaki Koallas",
        progress: 50,
        user: 'John',
      },
      {
        Name: "Capstone Team 2",
        progress: 95,
        user: 'John',
      },
      {
        Name: "Part 4 Project",
        progress: 20,
        user: 'John',
      },
    ],
    editingState: true,
  };

  const mockData2 = {
    UserName: "Test User",
    ProjectData: [
      {
        Name: "Khaki Koallas",
        progress: 50,
        user: 'Wendy',
      },
      {
        Name: "Capstone Team 9",
        progress: 70,
        user: 'Wendy',

      },
      {
        Name: "Part 4 Project",
        progress: 40,
        user: 'Wendy',

      },
    ],
    editingState: true,
  };
  const mockData3 = {
    UserName: "Test User",
    ProjectData: [
      {
        Name: "Khaki Koallas",
        progress: 50,
        user: 'Sanjeev',

      },
      {
        Name: "SOFTENG 701 A6",
        progress: 10,
        user: 'Sanjeev',

      },
      {
        Name: "Part 4 Project",
        progress: 5,
        user: 'Sanjeev',

      },
      {
        Name: 'Case competition',
        progress: 18,
        user: 'Sanjeev',

      }
    ],
    editingState: true,
  };

  const mockData4 = {
    UserName: "Test User",
    ProjectData: [
      {
        Name: "Khaki Koallas",
        progress: 50,
        user: 'Bob',

      },
      {
        Name: "Capstone Team 1",
        progress: 60,
        user: 'Bob',

      },
      {
        Name: "Part 4 Project",
        progress: 20,
        user: 'Bob',

      },
    ],
    editingState: true,
  };

  const mockData5 = {
    UserName: "Test User",
    ProjectData: [
      {
        Name: "Khaki Koallas",
        progress: 50,
        user: 'Steve',

      },
      {
        Name: "Part 4 Project",
        progress: 40,
        user: 'Steve',

      },
      {
        Name: 'Private Project',
        progress: 60,
        user: 'Steve',

      }
    ],
    editingState: true,
  };
  const mockData6 = {
    UserName: "Test User",
    ProjectData: [
      {
        Name: "Khaki Koallas",
        progress: 50,
        user: 'Rakesh',

      },
      {
        Name: "SOFTENG 701 A6",
        progress: 100,
        user: 'Rakesh',

      },
      {
        Name: "Part 4 Project",
        progress: 25,
        user: 'Rakesh',

      },
      {
        Name: 'Case competition',
        progress: 90,
        user: 'Rakesh',

      }
    ],
    editingState: true,
  };

  const params = useParams();

  const renderGroups = () => {
    if (params.id === "000001") {
      return (
        <>
        <GroupHolder
          UserName={"John"}
          ProjectData={mockData1.ProjectData}
          editingState={isEditing}
        />
        <GroupHolder
        UserName={"Wendy"}
        ProjectData={mockData2.ProjectData}
        editingState={isEditing}
      />
      <GroupHolder
        UserName={"Sanjeev"}
        ProjectData={mockData3.ProjectData}
        editingState={isEditing}
      />
      </>
      );
    } else {
      return (
        <>
        <GroupHolder
          UserName={"Bob"}
          ProjectData={mockData4.ProjectData}
          editingState={isEditing}
        />
        <GroupHolder
        UserName={"Steve"}
        ProjectData={mockData5.ProjectData}
        editingState={isEditing}
      />
      <GroupHolder
        UserName={"Rakesh"}
        ProjectData={mockData6.ProjectData}
        editingState={isEditing}
      />
      </>
      )
    }
  };

  return (
    <div className="group_container">
      {openModal && (
        <GroupInfoCard
          GroupId={"123"}
          GroupName={"Koallas"}
          CreatorID={"456"}
          CreationTime={"Something"}
          GroupStatus={"Active"}
          ModalStateFunction={setModal}
        />
      )}
      <div className="top_section_group">
        <h1 className="group_title">{params.id === '000001' ? 'Front-end Group' : 'Back-end Group'}</h1>
        {/* {isAdmin &&
          <div className="wrenchIcon" onClick={() => setModal(true)}>
            <WrenchIcon height={'24px'} width={'24px'} />

          </div>
        } */}
      </div>
      <div className="group_info">
        
      </div>
      <hr />
      <div className="middle_section_group">
        <h2 className="group_user_title"> Users</h2>
        {/* {isAdmin &&
          <div className="pencilIcon" onClick={() => handlePencilClick()}>
            <PencilSquareIcon height={'24px'} />
          </div>
        } */}
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
          {renderGroups()}
      </div>
    </div>
  );
};

export default Group;
