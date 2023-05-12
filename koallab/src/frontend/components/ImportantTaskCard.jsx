import React, { useState, useEffect } from "react";
export const ImportantTaskCard = ({ userId, groupID }) => {

    var token = sessionStorage.getItem("AuthToken")

    const [importantTasks, setImportantTasks] = useState([]);

    useEffect(() => {
        if (token === null) {
            Logout()
        }else {
            getImportantTasks()
        }          
    }, [userId, groupID]);

    const getImportantTasks = async () => {
        console.log(token)
        console.log(userId)
        await fetch(`http://127.0.0.1:3000/tasks/user?token=${token}&userId=${userId}`)
            .then((res) => res.json())
            .then((res) => findImportantTasks(res))
    }
    const Logout = () => {
        sessionStorage.removeItem("AuthToken")
    }
    const findImportantTasks = (allTasks) => {
        console.log(allTasks.tasks);
        var arr = [];
        Object.keys(allTasks).forEach(function(key) {
            arr.push(allTasks[key]);
        });
        var important = [];
        arr.forEach((task,index) => {
            if(task.importance === "Important"){
                important.push(task);
                console.log("here11")
            }
            console.log("here")
        });
    } 
    
           

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
