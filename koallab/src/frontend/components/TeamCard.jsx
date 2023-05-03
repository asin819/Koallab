import React from "react";
import "./styles/TeamCard.css";

const TeamCard = ({ TeamName, ImgSrc }) => {
  return (
    <div className="TeamCard">
      <div className="TeamImage">
        <img src="../assets/teamSample.png"/>
      </div>
      <div className="TeamTitle">
        <p>{TeamName}</p>
      </div>
    </div>
  );
};

export default TeamCard;
