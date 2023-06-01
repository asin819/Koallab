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
        <div className="ProjectInfoCard_modal">
            <div className="ProjectInfoCard_container">
                <div className="ProjectInfoCard_buttons">
                    <h2>{ProjectName}</h2>
                    <Button onClick={() => ModalStateFunction(false)} sx={{
                        textTransform: 'none'
                    }}>Close</Button>

                </div>
                <hr/>
                <p>ID: {ProjectId}</p>
                <p>Creator ID: {CreatorId}</p>
                <p>Created at: {CreationTime}</p>
                <p>Status: {ProjectStatus}</p>
                <div >
                    
                    <Button sx={{
                        textTransform: 'none',
                        color: 'red'
                    }}>Disband</Button>

                </div>
            </div>

        </div>


    )
}

export default ProjectInfoCard