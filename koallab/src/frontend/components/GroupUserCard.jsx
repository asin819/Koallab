import React from "react";
import './styles/GroupUserCard.css';
import TrashIcon from "@heroicons/react/24/outline/TrashIcon";

export const GroupUserCard = ({Username, editingState}) => {

    return (
    <div className="GroupUserCard_container">
        {Username}

        {editingState &&
            <div className="GroupUserCard_minusIcon" style={{
                marginTop: '5px',
                marginLeft: '10px'}}>
                <TrashIcon width={'20px'} color="red"/>
                </div>
        }
        

    </div>
)
};