import React from "react";
import './styles/ProjectMemberCard.css';
import TrashIcon from "@heroicons/react/24/outline/TrashIcon";

export const ProjectMemberCard = ({Username, editingState}) => {
    return (
        <div className="ProjectMemberCard_container">
            {Username}

            {editingState &&
                <div className="ProjectMemberCard_trashIcon" style={{
                    marginTop: '5px',
                    marginLeft: '10px'
                }}>
                    <TrashIcon width={'20px'} color="red"/>
                </div>
            }

        </div>
    );
};
