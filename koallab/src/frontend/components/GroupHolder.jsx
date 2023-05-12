import React from "react";
import './styles/GroupHolder.css'
import { GroupUserCard } from "./GroupUserCard";
import { GroupProjectCard } from "./GroupProjectCard";

export const GroupHolder = ({ UserName, ProjectData, editingState }) => {

    return (
        <div className="GroupHolder_container">
            <div className="GroupHolder_user">
                <GroupUserCard Username={UserName} editingState={editingState} />
            </div>

            <div className="GroupHolder_projects">
                <div title="project layout" className="GroupHolder_projects">
                    {
                        ProjectData.map((item) => (
                            <GroupProjectCard
                                key={item.id}
                                ProjectName={item.Name}
                                Progress={item.progress}
                            />
                        ))
                    }
                </div>
            </div >
        </div >

    )
};