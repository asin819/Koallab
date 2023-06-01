import React from "react";
import './styles/GroupProjectCard.css'
import { useNavigate } from "react-router-dom";

export const GroupProjectCard = ({ ProjectName, Progress, Username }) => {


    const navigate = useNavigate();

    if (ProjectName == "Khaki Koallas"){
            return (
                <div className="GroupProjectCard_container" onClick={() => navigate('/project/00000001')}>
            <div className="GroupProjectCard_title" style={{
                cursor: 'pointer'
            }} >
                {ProjectName}
            </div>

            <div className="GroupProjectCard_progressBar">
                <div title="progress bar" className="GroupProjectCard_progressBar_fill" style={{
                    width: `${Progress}%`
                }} />
            </div>
        </div>
            )
        
    }
    return (
        <div className="GroupProjectCard_container">
            <div className="GroupProjectCard_title">
                {ProjectName}
            </div>

            <div className="GroupProjectCard_progressBar">
                <div title="progress bar" className="GroupProjectCard_progressBar_fill" style={{
                    width: `${Progress}%`
                }} />
            </div>
        </div>
    )


}