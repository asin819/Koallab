import React from "react";
import './Group.css';
import WrenchIcon from '@heroicons/react/24/solid/WrenchIcon';
import PencilSquareIcon from '@heroicons/react/24/outline/PencilSquareIcon';
import { SvgIcon } from "@mui/material";
import { GroupHolder } from "../../components/GroupHolder";
const Group = () => {


    const projects=[
        
    ]
return(
<div className="group_container">
    <div className="top_section_group">
        <h1 className="group_title">Group Name</h1>
        <SvgIcon className="wrenchIcon">
            <WrenchIcon />
        </SvgIcon>
    </div>
    <div className="group_info">
        <p>Lorem Ipsum</p>
    </div>
    <hr/>
    <div className="middle_section_group">
        <h2 className="group_user_title"> Users</h2>
        <SvgIcon className="pencilIcon">
            <PencilSquareIcon/>
        </SvgIcon>
    </div>
    <div className="group_user_cards">
        <GroupHolder UserName={'User 1'} ProjectData={projects}/>
        <GroupHolder UserName={'User 1'} ProjectData={projects}/>
    </div>
    
</div>
)

};

export default Group;