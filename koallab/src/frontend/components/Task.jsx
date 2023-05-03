import React from "react";
import "./Task.css";
import informationIcon from "../assets/info.png";

const Task = ({
  TaskTitle,
  description,
  username,
  TaskStatus,
  TaskImportance,
}) => {
  let textColor = "default";
  if ((TaskImportance = "Non-Important")) {
    textColor = "nonImportant";
  } else if ((TaskImportance = "Important")) {
    textColor = "important";
  }
  return (
    <div className="Task">
      <h2>{TaskTitle}</h2>
      <hr></hr>
      <p>Created at: </p>
      <p>Assigned to: {username}</p>
      <p> Due by: </p>
      
      <h3>{description}</h3>

      <p>Status: {TaskStatus}</p>
      <p className={textColor}>{TaskImportance}</p>
      <p>Estimated time: </p>
      <div className="Labels">
        <p>Task labels here</p>
      </div>

      <div className="InfoButton">
        <button>
          <img
            style={{ width: "30px", height: "30px" }}
            src={informationIcon}
            alt="View all information"
          />
        </button>
      </div>
    </div>
  );
};

export default Task;
