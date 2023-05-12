import React, { useState, useEffect } from "react";
export const ImportantTaskCard = ({ allTasks, groupID }) => {

    var token = sessionStorage.getItem("AuthToken")
    const [userId, setUserId] = useState(null)


    const [taskResponse, setTaskResponse] = useState([]);
    const [tasks, settasks] = useState([]);

    useEffect(() => {
        getUserId();
    }, []);

    useEffect(() => {
        if (userId) {
            getDataFrom(`/getTaskListByUserid?token=${token}&userid=${userId}`);
        }
    }, [userId]);

    useEffect(() => {
        console.log(taskResponse);
        settasks(taskResponse)
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

    const getDataFrom = (url) => {
        const options = {
            mode: 'cors',
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Origin": "http://localhost:3000"
            },
        }
        fetch(`http://127.0.0.1:3000${url}`, options)
            .then(async (res) => {

                let data = await res.json();
                data = JSON.parse(data);

                return { ...data, ok: res.ok }
            })
            .then((res) => {
                if (res.ok) {
                    setTaskResponse(res.data);
                } else {
                    // Convert this to toast

                }
            })
    }


    return (
        <div className="ImportantTaskCard_container">
            {tasks.map((task) => (
                <div style={cardStyle}>
                    <div style={titleStyle}>{task.tasktitle}</div>
                    <div style={descriptionStyle}>{task.taskdescription}</div>
                    <div style={dueDateStyle}>Due Date: {task.estimatedtime}</div>
                </div>

            ))}
        </div>
    );

};

const cardStyle = {
    margin: '20px 0',
    padding: '10px',
    border: '1px solid #ddd',
    borderRadius: '10px',
    backgroundColor: '#f9f9f9',
};

const titleStyle = {
    fontSize: '20px',
    fontWeight: 'bold',
};

const descriptionStyle = {
    fontSize: '16px',
    color: '#666',
};

const dueDateStyle = {
    fontSize: '14px',
    color: '#999',
    marginTop: '10px',
};