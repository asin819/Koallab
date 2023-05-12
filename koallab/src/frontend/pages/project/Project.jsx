import React, {useState} from "react";

import './Project.css';
import WrenchIcon from "@heroicons/react/24/solid/WrenchIcon.js";
import ProjectInfoCard from "../../components/ProjectInfoCard.jsx";
import PencilSquareIcon from "@heroicons/react/24/outline/PencilSquareIcon.js";
import {ProjectMemberCard} from "../../components/ProjectMemberCard.jsx";
import {ProjectTask} from "../../components/ProjectTask.jsx";
import PlusIcon from "@heroicons/react/24/outline/PlusIcon.js";

export const Project = () => {

    // TODO for backend, Project %, ProjectName, UserList
    const Progress = 80;
    const ProjectName = '750 Group Project';
    const UserList = [
        'John', 'Bella', 'Sky'
    ];


    const [openModal, setModal] = useState(false);

    const isAdmin = true;

    const [isEditing, setIsEditing] = useState(false)

    const handlePencilClick = () => {
        setIsEditing(!isEditing);
    };

    const openProjectResources = () => {

    }

    const addUserToProject = () => {

    }

    return(
        <div className="project_container">
            {openModal &&
                <ProjectInfoCard
                    ProjectId={'123'}
                    ProjectName={'Khaki-Koalas'}
                    CreatorID={'456'}
                    CreationTime={'Something'}
                    ProjectStatus={'Active'}
                    ModalStateFunction={setModal}
                />}
            <div className="top_section_project">
                <h1 className="project_title">{ProjectName}</h1>
                {isAdmin &&
                    <div className="wrenchIcon" onClick={()=>setModal(true)}>
                        <WrenchIcon height={'24px'} width={'24px'}/>
                    </div>
                }
            </div>
            <div className="view_resources" onClick={() => openProjectResources()}>
                <p>View Resources</p>
            </div>
            <div className="project_progress">
                <div className="project_progress_fill" style={{
                    width:`${Progress}%`

                }}>
                <p style={{
                    marginLeft: `${Progress/2}%`,
                    marginTop: '20px'
                }}>{Progress}% Complete</p>
                </div>
            </div>
            <hr />
            <div className="middle_section_project">
                <h2 className="project_member_title"> Members</h2>
                {isAdmin &&
                    <div className="pencilIcon" onClick={() => handlePencilClick()}>
                        <PencilSquareIcon height={'24px'}/>
                    </div>
                }
            </div>
            <div className="project_member">
                {UserList.map((user) => (
                    <ProjectMemberCard Username={user} editingState={isEditing}/>
                ))}
                {isEditing &&
                    <div className="AddUserToProjectBox" onClick={() => addUserToProject()}> 
                        <PlusIcon width={'30px'} />
                    </div>
                }
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
                        <div className="add_button" onClick={() => console.log('Add button clicked for To-do')}>
                        <PlusIcon width={'20px'} />
                        </div>
                    </div>
                    <div className="todo_container">
                            <ProjectTask projectID="yourProjectID" groupID="yourGroupID"/>
                    </div>
                </div>

                <div className="column_container">
                    <div className="task_section_header">
                        <h2 className="progress">
                            <strong>In Progress</strong>
                        </h2>
                        <div className="add_button" onClick={() => console.log('Add button clicked for In Progress')}>
                            <PlusIcon width={'24px'} />
                        </div>
                    </div>
                    <div className="progress_container">
                            <ProjectTask projectID="yourProjectID" groupID="yourGroupID"/>
                    </div>
                </div>

                <div className="column_container">
                    <div className="task_section_header">
                        <h2 className="completed">
                        <strong>Completed</strong>
                    </h2>
                    <div className="add_button" onClick={() => console.log('Add button clicked for Completed')}>
                    <PlusIcon width={'24px'} />
                    </div>
                </div>
                <div className="progress_container">
                        <ProjectTask projectID="yourProjectID" groupID="yourGroupID"/>
                        <ProjectTask projectID="yourProjectID" groupID="yourGroupID"/>
                </div>
            </div>
        </div>
        </div>

    );

};
export default Project;
