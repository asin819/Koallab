import React from "react";
import "./TaskCompact.css";
import informationIcon from "../assets/info.png";

const TaskCompact = ({
  TaskTitle,
  TaskImportance,
}) => {
  let textColor = "";
  if ((TaskImportance = "Non-Important")) {
    textColor = "nonImportant";
  } else if ((TaskImportance = "Important")) {
    textColor = "important";
  }
  console.log({TaskImportance});
  return (
    <div className="Task">
      <h2>{TaskTitle}</h2>
      <p>Due: </p>
      <p className={textColor}>{TaskImportance}</p>
    </div>
  );
};

export default TaskCompact;
