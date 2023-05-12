import React, { useState, useEffect } from "react";
import './styles/ProjectTask.css';
export const ProjectTask= ({ projectID, groupID }) => {
    const [importantTasks, setImportantTasks] = useState([]);

    useEffect(() => {
        const query = `SELECT tasktitle, taskdescription, duedate, projectid, groupid
                   FROM tasks
                   WHERE importance = 'Important' AND projectid = '${projectID}' AND groupid = '${groupID}';`;

        fetch("/api/getImportantTasks", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ query }),
        })
            .then((res) => res.json())
            .then((data) => {
                setImportantTasks(data);
            })
            .catch((err) => console.error(err));
    }, [projectID, groupID]);

    return (
        <div className="ProjectTask_container">
            <div className="ProjectTask_title">Task</div>
            {importantTasks.map((task) => (
                <div className="ProjectTaskCard_task" key={task.taskid}>
                    <div className="ProjectTask_taskTitle">{task.tasktitle}</div>
                    <div className="ProjectTask_taskDescription">{task.taskdescription}</div>
                    <div className="ProjectTask_taskDueDate">Due Date: {task.duedate}</div>
                </div>
            ))}
        </div>
    );

};