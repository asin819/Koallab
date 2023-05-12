import React, { useState, useEffect } from "react";
export const ImportantTaskCard = ({ allTasks, groupID }) => {

    var token = sessionStorage.getItem("AuthToken")
    const [userId, setUserId] = useState([])
    const [taskResponse, settaskResponse] = useState([]);
    const [tasks, settasks] = useState([]);
    useEffect(() => {
        getUserId();
    }, []);

    useEffect(() => {
        if (userId) {
            getImportantTasks(`http://127.0.0.1:3000/getTaskListByUserid?token=${token}&userid=${userId}`);

        }
    }, [userId]);

    useEffect(() => {
        // settasks(taskResponse.map(item => item.taskid ));
    }, [taskResponse]);

    const getUserId = () => {
        const options = {
            mode: 'cors',
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Origin": "http://localhost:3000"
            },
        }
        fetch(`http://127.0.0.1:3000/getUserid?token=${token}`, options)
            .then(async (res) => {

                let data = await res.json();
                data = JSON.parse(data);

                return { ...data, ok: res.ok }
            })
            .then((res) => {
                if (res.ok) {
                    setUserId(res.token)
                } else {

                }
            })
    }
    const getImportantTasks = (url) => {
        const options = {
            mode: 'cors',
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Origin": "http://localhost:3000"
            },
        }
        fetch(url, options)
            .then(async (res) => {

                let data = await res.json();
                data = JSON.parse(data);

                return { ...data, ok: res.ok }
            })
            .then((res) => {
                if (res.ok) {
                    console.log(res.data)
                    settaskResponse(res.data)

                }

                //    let arr = [];
                //    Object.keys(tasks).forEach(function(key) {
                //        arr.push(tasks[key]);
                //    });
                //    let important = [];
                //    arr.forEach((task,index) => {
                //        if(task.importance === "Important"){
                //            important.push(task);
                //        }
                //    });
            })
    }


    return (
        <div className="ImportantTaskCard_container">
            <div className="ImportantTaskCard_title">Important Tasks</div>
            {tasks.map((importantTask) => (
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

};
