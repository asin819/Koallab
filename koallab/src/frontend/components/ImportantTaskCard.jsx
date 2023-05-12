import React, { useState, useEffect } from "react";
export const ImportantTaskCard = ({ userId, groupID }) => {

    var token = sessionStorage.getItem("AuthToken")
    var important = [];
    const [importantTasks, setImportantTasks] = useState([]);

    useEffect(() => {
        if (token === null) {
            Logout()
        }else {
            getImportantTasks()
        }          
    }, [userId, groupID]);

    const getImportantTasks = async () => {
        await fetch(`http://127.0.0.1:3000/tasks/user?token=${token}&userId=${userId}`)
            .then((res) => res.json())
            .then((res) => findImportantTasks(res))
    }
    const Logout = () => {
        sessionStorage.removeItem("AuthToken")
    }
    const findImportantTasks = (allTasks) => {
        var arr = [];
        Object.keys(allTasks.tasks).forEach(function(key) {
            arr.push(allTasks.tasks[key]);
        });
        arr.forEach((task,index) => {
            if(task.importance === "Important"){
                important.push(task);
            }
        });
        console.log(important)
        setImportantTasks(important)
    } 
   
    
           

    return (
        <div className="ImportantTaskCard_container">
            <div className="ImportantTaskCard_title">Important Tasks</div>
            {importantTasks.map((importantTask) => (
                <div className="ImportantTaskCard_task" key={importantTask.taskid}>
                    <div className="ImportantTaskCard_taskTitle">{importantTask.taskTitle}</div>
                    <div className="ImportantTaskCard_taskDescription">
                        {importantTask.taskDescription}
                    </div>
                    <div className="ImportantTaskCard_taskDueDate">
                        Due Date: {importantTask.estimatedTime}
                    </div>
                </div>
            ))}
        </div>
    );
};
