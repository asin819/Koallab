import React, { useState, useContext } from "react";
import "./Group.css";
import WrenchIcon from "@heroicons/react/24/solid/WrenchIcon";
import PencilSquareIcon from "@heroicons/react/24/outline/PencilSquareIcon";
import { SvgIcon } from "@mui/material";
import { GroupHolder } from "../../components/GroupHolder";
import GroupInfoCard from "../../components/GroupInfoCard";


const Group = () => {
  const [openModal, setModal] = useState(false);
//   const {isAdmin} = useContext(AuthContext)

const isAdmin = true;

const [isEditing, setIsEditing] = useState(false)

const handlePencilClick = () => {
    setIsEditing(!isEditing);
};



  return (
    <div className="group_container">
        {openModal &&
        <GroupInfoCard
                GroupId={'123'}
                GroupName={'Koallas'}
                CreatorID={'456'}
                CreationTime={'Something'}
                GroupStatus={'Active'}
                ModalStateFunction={setModal}
            />}
      <div className="top_section_group">
        <h1 className="group_title">Group Name</h1>
        {isAdmin &&
        <div className="wrenchIcon" onClick={()=>setModal(true)}>
              <WrenchIcon height={'24px'} width={'24px'}/>        
            
        </div>
        }
      </div>
      <div className="group_info">
        <p>Lorem Ipsum</p>
      </div>
      <hr />
      <div className="middle_section_group">
        <h2 className="group_user_title"> Users</h2>
        {isAdmin &&
        <div className="pencilIcon" onClick={() => handlePencilClick()}>
          <PencilSquareIcon height={'24px'}/>
        </div>
        }
      </div>
      <div className="group_user_cards">
        <GroupHolder UserName={"User 1"} editingState = {isEditing}/>
        <GroupHolder UserName={"User 1"} editingState = {isEditing}/>
        
      </div>
    </div>
  );
};

export default Group;
