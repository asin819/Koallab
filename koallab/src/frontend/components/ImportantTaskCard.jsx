import React, { useState, useEffect } from "react";
export const ImportantTaskCard = ({ allTasks, groupID }) => {


    const [importantTasks, setImportantTasks] = useState([...allTasks]);

    useEffect(() => {
        console.log(allTasks)
        setImportantTasks(...allTasks)

    }, [allTasks]);
    if(importantTasks){
        return (
            <div className="ImportantTaskCard_container">
                <div className="ImportantTaskCard_title">Important Tasks</div>
                {/* {importantTasks.map((importantTask) => (
                    <div className="ImportantTaskCard_task" key={importantTask.taskid}>
                        <div className="ImportantTaskCard_taskTitle">{importantTask.taskTitle}</div>
                        <div className="ImportantTaskCard_taskDescription">
                            {importantTask.taskDescription}
                        </div>
                        <div className="ImportantTaskCard_taskDueDate">
                            Due Date: {importantTask.estimatedTime}
                        </div>
                    </div>
                ))} */}
                {/* {
              Object.entries({importantTasks}).map((importantTask) => (
                <div className="ImportantTaskCard_task" key={importantTask.taskId}>
                <div className="ImportantTaskCard_taskTitle">{importantTask.taskTitle}</div>
                <div className="ImportantTaskCard_taskDescription">
                    {importantTask.taskDescription}
                </div>
                <div className="ImportantTaskCard_taskDueDate">
                    Due Date: {importantTask.estimatedTime}
                </div>
            </div>
              ))
              } */}
            </div>
        );
    }
};
