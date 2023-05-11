import React, { useState, useEffect } from "react";
export const ImportantTaskCard = ({ projectID, groupID }) => {
    const [importantTasks, setImportantTasks] = useState([]);

    useEffect(() => {
        // Retrieve the list of important tasks from the database using an API call or database query
        // For example, you can use the SQL query I provided earlier and pass in the appropriate projectID and groupID
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
        <div className="ImportantTaskCard_container">
            <div className="ImportantTaskCard_title">Important Tasks</div>
            {importantTasks.map((task) => (
                <div className="ImportantTaskCard_task" key={task.taskid}>
                    <div className="ImportantTaskCard_taskTitle">{task.tasktitle}</div>
                    <div className="ImportantTaskCard_taskDescription">
                        {task.taskdescription}
                    </div>
                    <div className="ImportantTaskCard_taskDueDate">
                        Due Date: {task.duedate}
                    </div>
                </div>
            ))}
        </div>
    );
};
