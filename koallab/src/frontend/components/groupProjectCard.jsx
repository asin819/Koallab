import React from "react";
import './styles/GroupProjectCard.css'

export const GroupProjectCard = ({ProjectName, Progress}) => {

    return (
        <div className="GroupProjectCard_container">
            <div className="GroupProjectCard_title">
            {ProjectName}
            </div>
            
            <div className="GroupProjectCard_progressBar">
                <div className="GroupProjectCard_progressBar_fill" style={{
                    width: `${Progress}%`
                }}/>
            </div>
        </div>
    )

    
}