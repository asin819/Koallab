import React from "react";
import './styles/ProjectInfoCard.css'
import { Button} from "@mui/material";

const ProjectInfoCard = (
    {
        ProjectId,
        ProjectName,
        CreatorId,
        CreationTime,
        ProjectStatus,
        ModalStateFunction
    }
) => {


    return (
        <div className="GroupInfoCard_modal">
            <div className="GroupInfoCard_container">
                <div>
                    <h2>{ProjectName}</h2>
                    <Button>Disband</Button>

                </div>
                <hr/>
                <p>ID: {ProjectId}</p>
                <p>Creator ID: {CreatorId}</p>
                <p>Created at: {CreationTime}</p>
                <p>Status: {ProjectStatus}</p>
                <div className="GroupInfoCard_buttons">
                    <Button onClick={() => ModalStateFunction(false)}>Close</Button>

                </div>
            </div>

        </div>


    )
}

export default ProjectInfoCard