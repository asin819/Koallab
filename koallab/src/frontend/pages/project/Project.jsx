import React, { useState, useEffect, useRef } from "react";
import { Button, TextField } from "@mui/material";

import "./Project.css";
import WrenchIcon from "@heroicons/react/24/solid/WrenchIcon.js";
import InfoIcon from "@heroicons/react/24/outline/InformationCircleIcon";
import ProjectInfoCard from "../../components/ProjectInfoCard.jsx";
import PencilSquareIcon from "@heroicons/react/24/outline/PencilSquareIcon.js";
import { ProjectMemberCard } from "../../components/ProjectMemberCard.jsx";
import { ProjectTask } from "../../components/ProjectTask.jsx";
import PlusIcon from "@heroicons/react/24/outline/PlusIcon.js";
import ResourceItem from "../../components/ResourceItem";

export const Project = () => {
  // TODO use backend to get ProjectInfo and UserList
  const UserList = ["John", "Wendy", "Sanjeev", "Bob", "Steve", "Rakesh"];

  const projectInfo = {
    ProjectName: "750 Group Project",
    ProjectID: "123",
    CreatorID: "456",
    CreationTime: "3 April 2023",
    ProjectStatus: "Active",
    Progress: 50,
    //end time is new, please add it
    EndTime: "4 April 2023",
  };

  //THIS IS TEMP FOR BACKEND NEED TO KEEP UNTIL MERGED
  var projectid = "00000001";

  //below is getting the data
  var token = sessionStorage.getItem("AuthToken");

  const [userId, setUserId] = useState(null);
  const [projectInfoResponse, setProjectInfoResponse] = useState([]);
  const [tasksResponse, setTasksResponse] = useState([]);
  const [resourceResponse, setResourceResponse] = useState([]);
  const [projectName, setProjectName] = useState();
  const [creatorID, setCreatorID] = useState();
  const [projectStatus, setProjectStatus] = useState();
  const [creationTime, setCreationTime] = useState();
  const [endTime, setEndTime] = useState();
  const [tasks, setTasks] = useState([]);
  const [resources, setResources] = useState([]);

  //dis is the completion %
  const [completion, setCompletion] = useState(0);

  useEffect(() => {
    getUserId();
  }, []);

  useEffect(() => {
    if (userId != null) {
      getDataFrom(`/getProjectInfo?projectid=${projectid}&token=${token}`);
      getDataFrom(
        `/getTaskListFromProject?projectid=${projectid}&token=${token}`
      );
      getDataFrom(
        `/getResourceListFromProject?projectid=${projectid}&token=${token}`
      );
    }
  }, [userId]);

  //all u need for project info
  useEffect(() => {
    setProjectName(projectInfoResponse.projectname);
    setCreatorID(projectInfoResponse.creatorid);
    setProjectStatus(projectInfoResponse.projectstatus);
    setCreationTime(projectInfoResponse.creationtime);
    setEndTime(projectInfoResponse.endtime);
  }, [projectInfoResponse]);

  //getting the list of tasks
  //chuck something like the below in the return

  // <div className="whatever the fuck _container">
  //           {tasks.map((task) => (
  //               <div style={cardStyle}>
  //                   <div style={titleStyle}>{task.tasktitle}</div>
  //                   <div style={descriptionStyle}>{task.taskdescription}</div>
  //                   <div style={dueDateStyle}>Due Date: {task.estimatedtime}</div>
  //               </div>

  //           ))}
  //       </div>
  useEffect(() => {
    setTasks(tasksResponse);
  }, [tasksResponse]);

  useEffect(() => {
    setResources(resourceResponse);
  }, [resourceResponse]);

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
        }
      });
  };

  useEffect(() => {
    var i;
    var completed = 0;
    for (i = 0; i < tasks.length; i++) {
      if (
        tasks[0].status === "obsolete" ||
        tasks[0].status === "accepted" ||
        tasks[0].status === "completed"
      ) {
        completed++;
      }
    }
    if (completed == 0) {
      setCompletion(0);
    } else {
      setCompletion(tasks.length / completed);
    }
    console.log(completion);
  }, [tasks]);

  const getDataFrom = (url) => {
    const options = {
      mode: "cors",
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Origin: "http://localhost:3000",
      },
    };
    fetch(`http://127.0.0.1:3000${url}`, options)
      .then(async (res) => {
        let data = await res.json();
        data = JSON.parse(data);
        return { ...data, ok: res.ok };
      })
      .then((res) => {
        if (res.ok) {
          if (url.includes("getProjectInfo")) {
            setProjectInfoResponse(res.data[0]);
          } else if (url.includes("getTaskListFromProject")) {
            setTasks(res.data);
          } else if (url.includes("getResourceListFromProject")) {
            setResourceResponse(res.data);
          }
        } else {
          // Convert this to toast
        }
      });
  };

  //waiting for shuiling, dont touch
  const updateTasksStatus = (taskId, taskStatus) => {
    const options = {
      mode: "cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Origin: "http://localhost:3000",
      },
      body: JSON.stringify({
        taskstatus: taskStatus,
        taskid: taskId,
      }),
    };
    fetch(`http://127.0.0.1:3000/changeProjectStatus`, options)
      .then(async (res) => {
        let data = await res.json();
        data = JSON.parse(data);
        return { ...data, ok: res.ok };
      })
      .then((res) => {
        if (res.status) {
          // do some ui code here, or may it doesnt need it
        } else {
        }
      });
  };

  //waiting for shuiling
  const addNewTask = (
    tasktitle,
    taskdescription,
    taskstatus,
    estimatedtime,
    importance,
    tasklabel
  ) => {
    const options = {
      mode: "cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Origin: "http://localhost:3000",
      },
      body: JSON.stringify({
        tasktitle: tasktitle,
        taskdescription: taskdescription,
        taskstatus: taskstatus,
        estimatedtime: estimatedtime,
        importance: importance,
        tasklabel: tasklabel,
      }),
    };
    fetch(`http://127.0.0.1:3000/changeProjectStatus`, options)
      .then(async (res) => {
        let data = await res.json();
        data = JSON.parse(data);
        return { ...data, ok: res.ok };
      })
      .then((res) => {
        if (res.status) {
          // do some ui code here, or may it doesnt need it
        } else {
        }
      });
  };

  //waiting for shuiling
  const addTasktoProject = (projectid, taskid) => {
    const options = {
      mode: "cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Origin: "http://localhost:3000",
      },
      body: JSON.stringify({
        projectid: projectid,
        taskid: taskid,
      }),
    };
    fetch(`http://127.0.0.1:3000/addTaskToProject`, options)
      .then(async (res) => {
        let data = await res.json();
        data = JSON.parse(data);
        return { ...data, ok: res.ok };
      })
      .then((res) => {
        if (res.status) {
          // do some ui code here, or may it doesnt need it
        } else {
        }
      });
  };

  //waiting for shuiling
  const removeTasktoProject = (projectid, taskid) => {
    const options = {
      mode: "cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Origin: "http://localhost:3000",
      },
      body: JSON.stringify({
        projectid: projectid,
        taskid: taskid,
      }),
    };
    fetch(`http://127.0.0.1:3000/deleteTaskFromProject`, options)
      .then(async (res) => {
        let data = await res.json();
        data = JSON.parse(data);
        return { ...data, ok: res.ok };
      })
      .then((res) => {
        if (res.status) {
          // do some ui code here, or may it doesnt need it
        } else {
        }
      });
  };

  //waiting for shuiling
  const uploadResource = (projectid, file) => {
    const options = {
      mode: "cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Origin: "http://localhost:3000",
      },
      body: JSON.stringify({
        projectid: projectid,
        file: file,
      }),
    };
    fetch(`http://127.0.0.1:3000/upload`, options)
      .then(async (res) => {
        let data = await res.json();
        data = JSON.parse(data);
        return { ...data, ok: res.ok };
      })
      .then((res) => {
        if (res.status) {
          console.log("sucess");
        } else {
        }
      });
  };

  //end of eaton shit

  const [openInfoModal, setInfoModal] = useState(false);
  const [openResourcesModal, setResourcesModal] = useState(false);
  const [openTaskModal, setOpenTaskModal] = useState(false);
  const [openDeleteUserModal, setOpenDeleteUserModal] = useState(false);
  const [openNewUserModal, setOpenNewUserModal] = useState(false);

  const isAdmin = true;

  const [isEditing, setIsEditing] = useState(false);

  const handlePencilClick = () => {
    setIsEditing(!isEditing);
  };

  const openProjectResources = () => {
    setResourcesModal(true);
  };

  const addUserToProject = () => {};

  const openTask = () => {
    setOpenTaskModal(true);
  };

  const inputFile = useRef(null);
  const onButtonClick = () => {
    // `current` points to the mounted file input element
    inputFile.current.click();
    console.log(inputFile);
    uploadResource(projectid, inputFile);
  };
  const [currUser, setcurrUser] = useState("");

  const checkModals = () => {
    return (
      <>
        {openInfoModal && (
          <ProjectInfoCard
            ProjectId={projectid}
            ProjectName={projectName}
            CreatorID={creatorID}
            CreationTime={creationTime}
            ProjectStatus={projectStatus}
            ModalStateFunction={setInfoModal}
          />
        )}
        {openResourcesModal && (
          <div className="Resources_modal">
            <div className="Resources_container">
              <div className="Resources_title">
                <h2 style={{ color: "#fefefe" }}>Resources</h2>
                <div>
                  <Button
                    sx={{
                      textTransform: "none",
                    }}
                    onClick={onButtonClick}
                  >
                    Add
                    <input
                      type="file"
                      id="file"
                      ref={inputFile}
                      style={{ display: "none" }}
                    />
                  </Button>
                  <Button
                    onClick={() => setResourcesModal(false)}
                    sx={{
                      textTransform: "none",
                    }}
                  >
                    Close
                  </Button>
                </div>
              </div>
              {resourceResponse.map((resource) => (
                <ResourceItem key={resource.resourceid} resource={resource} />
              ))}
            </div>
          </div>
        )}

        {openDeleteUserModal && (
          <div className="DeleteUser_modal">
            <div className="DeleteUser_container">
              <h3 style={{ color: "#fefefe" }}>
                Are you sure you want to remove {currUser} from the group?
              </h3>

              <div className="DeleteUser_buttons">
                <Button
                  sx={{
                    textTransform: "none",
                  }}
                  onClick={onButtonClick}
                >
                  Yes
                  <input
                    type="file"
                    id="file"
                    ref={inputFile}
                    style={{ display: "none" }}
                  />
                </Button>
                <Button
                  onClick={() => setOpenDeleteUserModal(false)}
                  sx={{
                    textTransform: "none",
                  }}
                >
                  No
                </Button>
              </div>
            </div>
          </div>
        )}
        {openNewUserModal && (
          <div className="NewUser_modal">
            <div className="NewUser_container">
            <div className="NewUser_title">

              <h3 style={{ color: "#fefefe" }}>
                Search for a user to add
              </h3>
              <Button onClick={()=>setOpenNewUserModal(false)} sx={{textTransform: "none"}}>Close</Button>
            </div>
            <TextField sx={{
              width: '400px',
              borderRadius: '10px',
              backgroundColor: '#fefefe',
              border: 'none',
              outline: 'none',
              marginTop: '10px'

            }}
            minRows={1}></TextField>
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              marginTop:"10px",
              marginBottom: '10px'
            }}>
            <Button sx={{textTransform: 'none'}}>Add</Button>

            </div>
            </div>

          </div>
        )}
      </>
    );
  };

  const handleDeleteModal = (user) => {
    if (isEditing) {
      setcurrUser(user);
      setOpenDeleteUserModal(true);
    }
  };
  return (
    <div className="project_container">
      {checkModals()}

      <div className="top_section_project">
        <h1 className="project_title">{projectName}</h1>
        {isAdmin && (
          <div className="wrenchIcon" onClick={() => setInfoModal(true)}>
            <InfoIcon height={"24px"} width={"24px"} />
          </div>
        )}
      </div>
      <div className="view_resources" onClick={() => openProjectResources()}>
        <p>View Resources</p>
      </div>
      <div className="project_progress">
        <div
          className="project_progress_fill"
          style={{
            width: `${projectInfo.Progress}%`,
          }}
        >
          <p
            style={{
              marginLeft: `${projectInfo.Progress / 2}%`,
              marginTop: "20px",
            }}
          >
            {projectInfo.Progress}% Complete
          </p>
        </div>
      </div>

      <hr />
      <div className="middle_section_project">
        <h2 className="project_member_title"> Members</h2>
        {isAdmin && (
          <div className="pencilIcon" onClick={() => handlePencilClick()}>
            <PencilSquareIcon height={"24px"} />
          </div>
        )}
      </div>
      <div className="project_member">
        {UserList.map((user) => (
          <div onClick={() => handleDeleteModal(user)}>
            <ProjectMemberCard Username={user} editingState={isEditing} />
          </div>
        ))}
        {isEditing && (
          <div
            className="AddUserToProjectBox"
            onClick={() => setOpenNewUserModal(true)}
            style={{
              cursor: 'pointer'
            }}
          >
            <PlusIcon width={"30px"} />
          </div>
        )}
      </div>
      <h2 className="tasks">
        <strong>Tasks</strong>
      </h2>
      <div className="task_container">
        <div className="column_container">
          <div className="task_section_header">
            <h2 className="todo">
              <strong>To-do</strong>
            </h2>
            <div
              className="add_button"
              onClick={() => console.log("Add button clicked for To-do")}
            >
              <PlusIcon width={"20px"} />
            </div>
          </div>
          <div className="todo_container">
            <div onClick={() => openTask()} style={{ cursor: "pointer" }}>
              <ProjectTask projectID="yourProjectID" groupID="yourGroupID" />
            </div>
          </div>
        </div>

        <div className="column_container">
          <div className="task_section_header">
            <h2 className="progress">
              <strong>In Progress</strong>
            </h2>
            <div
              className="add_button"
              onClick={() => console.log("Add button clicked for In Progress")}
            >
              <PlusIcon width={"24px"} />
            </div>
          </div>
          <div className="progress_container">
            <div onClick={() => openTask()} style={{ cursor: "pointer" }}>
              <ProjectTask projectID="yourProjectID" groupID="yourGroupID" />
            </div>
          </div>
        </div>

        <div className="column_container">
          <div className="task_section_header">
            <h2 className="completed">
              <strong>Completed</strong>
            </h2>
            <div
              className="add_button"
              onClick={() => console.log("Add button clicked for Completed")}
            >
              <PlusIcon width={"24px"} />
            </div>
          </div>
          <div className="progress_container">
            <div onClick={() => openTask()} style={{ cursor: "pointer" }}>
              <ProjectTask projectID="yourProjectID" groupID="yourGroupID" />
            </div>
            <div onClick={() => openTask()} style={{ cursor: "pointer" }}>
              <ProjectTask projectID="yourProjectID" groupID="yourGroupID" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Project;
