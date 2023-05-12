import React from "react";
import './styles/GroupInfoCard.css'
import { Button} from "@mui/material";

const GroupInfoCard = (
    {
        GroupId,
        GroupName,
        CreatorId,
        CreationTime,
        GroupStatus,
        ModalStateFunction
    }
) => {


    return (
        <div className="GroupInfoCard_modal">
        <div className="GroupInfoCard_container">
            <div>
            <h2>{GroupName}</h2>
            <Button>Disband</Button>

            </div>
            <hr/>
            <p>ID: {GroupId}</p>
            <p>Creator ID: {CreatorId}</p>
            <p>Created at: {CreationTime}</p>
            <p>Status: {GroupStatus}</p>
            <div className="GroupInfoCard_buttons">
            <Button onClick={() => ModalStateFunction(false)}>Close</Button>

        </div>
        </div>
        
        </div>
        

    )
}

export default GroupInfoCard