import React from "react";
import "./styles/TaskCompact.css";

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
    <div className="TaskCompact">
      <h2>{TaskTitle}</h2>
      <p>Due: </p>
      <p className={textColor}>{TaskImportance}</p>
    </div>
  );
};

export default TaskCompact;
