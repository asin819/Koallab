import React from "react";
import './styles/GroupHolder.css'
import { GroupUserCard } from "./groupUserCard";
import { GroupProjectCard } from "./GroupProjectCard";

export const GroupHolder = ({UserName, ProjectData}) => {
    const ProjData = ProjectData;
    return (
        <div className="GroupHolder_container">
            <div className="GroupHolder_user">
            <GroupUserCard Username={UserName}/>
            </div>
            
            <div className="GroupHolder_projects">
                {
                Object.entries({ProjectData}).map((item) => (
                    <GroupProjectCard 
                        ProjectName={item.Name} 
                        Progress={item.progress}/>
                ))
                }

                <GroupProjectCard ProjectName={"Hello"} Progress="50"/>
                <GroupProjectCard ProjectName={"Hello"} Progress="50"/>
                <GroupProjectCard ProjectName={"Hello"} Progress="50"/>
                <GroupProjectCard ProjectName={"Hello"} Progress="50"/>
                <GroupProjectCard ProjectName={"Hello"} Progress="50"/>

            </div>
        </div>
    )
}