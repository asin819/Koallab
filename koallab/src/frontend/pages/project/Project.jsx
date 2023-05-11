import React, {useState} from "react";

import './Project.css';
import WrenchIcon from "@heroicons/react/24/solid/WrenchIcon.js";
import ProjectInfoCard from "../../components/ProjectInfoCard.jsx";
import PencilSquareIcon from "@heroicons/react/24/outline/PencilSquareIcon.js";
import {ProjectMemberCard} from "../../components/ProjectMemberCard.jsx";
import {ProjectTask} from "../../components/ProjectTask.jsx";
import PlusIcon from "@heroicons/react/24/outline/PlusIcon.js";

export const Project = () => {

    const [openModal, setModal] = useState(false);

    const isAdmin = true;

    const [isEditing, setIsEditing] = useState(false)

    const handlePencilClick = () => {
        setIsEditing(!isEditing);
    };

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
                <h1 className="project_title">Project Name</h1>
                {isAdmin &&
                    <div className="wrenchIcon" onClick={()=>setModal(true)}>
                        <WrenchIcon height={'24px'} width={'24px'}/>
                    </div>
                }
            </div>
            <div className="project_info">
                <p>Lorem Ipsum</p>
            </div>
            <div className="view_resources">
                <p>% Complete</p>
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
                <ProjectMemberCard Username={"User 1"} editingState={isEditing}/>
                <ProjectMemberCard Username={"User 2"} editingState={isEditing}/>
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
                        <button className="add_button" onClick={() => console.log('Add button clicked for To-do')}>
                            <PlusIcon className="plus_icon" />
                        </button>
                    </div>
                    <div className="todo_container">
                        <div className="todo_task">
                            <ProjectTask projectID="yourProjectID" groupID="yourGroupID"/>
                        </div>
                    </div>
                </div>

                <div className="column_container">
                    <div className="task_section_header">
                        <h2 className="progress">
                            <strong>In Progress</strong>
                        </h2>
                        <button className="add_button" onClick={() => console.log('Add button clicked for In Progress')}>
                            <PlusIcon className="plus_icon" />
                        </button>
                    </div>
                    <div className="progress_container">
                        <div className="progress_task">
                            <ProjectTask projectID="yourProjectID" groupID="yourGroupID"/>
                        </div>
                    </div>
                </div>

                <div className="column_container">
                    <div className="task_section_header">
                        <h2 className="completed">
                        <strong>Completed</strong>
                    </h2>
                    <button className="add_button" onClick={() => console.log('Add button clicked forCompleted')}>
                        <PlusIcon className="plus_icon" />
                    </button>
                </div>
                <div className="progress_container">
                    <div className="progress_task">
                        <ProjectTask projectID="yourProjectID" groupID="yourGroupID"/>
                    </div>
                </div>
            </div>
        </div>
        </div>

    );
};
export default Project;
