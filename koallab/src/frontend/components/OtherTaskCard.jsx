import React, { useState, useEffect } from "react";

export const OtherTaskCard = ({ projectID, groupID }) => {
    const [otherTasks, setOtherTasks] = useState([]);

    useEffect(() => {
        // Retrieve the list of other tasks from the database using an API call or database query
        // For example, you can use the SQL query below and pass in the appropriate projectID and groupID
        const query = `SELECT tasktitle, duedate, projectid, groupid
                       FROM tasks
                       WHERE importance = 'Other' AND projectid = '${projectID}' AND groupid = '${groupID}';`;

        fetch("/api/getOtherTasks", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ query }),
        })
            .then((res) => res.json())
            .then((data) => {
                setOtherTasks(data);
            })
            .catch((err) => console.error(err));
    }, [projectID, groupID]);

    return (
        <div className="OtherTaskCard_container">
            <div className="OtherTaskCard_title">Other Tasks</div>
            {otherTasks.map((task) => (
                <div className="OtherTaskCard_task" key={task.taskid}>
                    <div className="OtherTaskCard_taskTitle">{task.tasktitle}</div>
                    <div className="OtherTaskCard_taskDueDate">
                        Due Date: {task.duedate}
                    </div>
                    <div className="OtherTaskCard_taskProject">
                        Project: {task.projectid}
                    </div>
                </div>
            ))}
        </div>
    );
};
