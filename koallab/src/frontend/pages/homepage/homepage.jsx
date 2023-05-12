import React from "react";
import "./Homepage.css";
import { useEffect , useState} from 'react'; 
import { ImportantTaskCard } from "../../components/ImportantTaskCard.jsx";
import { OtherTaskCard } from "../../components/OtherTaskCard.jsx";

const Homepage = () => {
    var token = sessionStorage.getItem("AuthToken")
    
    useEffect(() => {
        if (token === null) {
            Logout()
        }else {
            getUserId()
        }
      }, [])

    const now = new Date();
    const hour = now.getHours();

    let greeting;
    if (hour < 12) {
        greeting = "Good morning!";
    } else if (hour < 18) {
        greeting = "Good afternoon!";
    } else {
        greeting = "Good evening!";
    }

    const [userId, setUserId] = useState([])
    const [allTasks, setallTasks] = useState([])
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
              getImportantTasks(res.token)
            } else {
              // Convert this to toast
              toast.error(res.ErrorMessage, ToastOptions)
            }
          })
      }
      const getImportantTasks =  (userId) => {
        const options = {
            mode: 'cors',
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "Accept": "application/json",
              "Origin": "http://localhost:3000"
            },
          }
        fetch(`http://127.0.0.1:3000/getTaskListByUserid?token=${token}&userid=${userId}`,options)
            .then(async (res) => {
        
            let data = await res.json();
            data = JSON.parse(data);
            
            return { ...data, ok: res.ok }
        })
           .then((res) => {
            let tasks = res.data
          
               let arr = [];
               Object.keys(tasks).forEach(function(key) {
                   arr.push(tasks[key]);
               });
               let important = [];
               arr.forEach((task,index) => {
                   if(task.importance === "Important"){
                       important.push(task);
                   }
               });
               setallTasks(important)
           })
        }
       

    const Logout = () => {
        sessionStorage.removeItem("AuthToken")
    }

    const koalaClass = hour >= 20 || hour < 6 ? "sleepy" : "awake"; // Change Koala image based on time

    return (
        <div className="homepage" id="content">
            <div id="koala" className={koalaClass}></div>
            <h2 className="greet">{greeting}</h2>
            <p className="important_tasks">
                <strong>Important Tasks</strong>
            </p>
            <div className="important-tasks-container">
                <ImportantTaskCard allTasks={allTasks} groupID="yourGroupID" />
            </div>
            <p className="other_tasks">
                <strong>Other Tasks</strong>
            </p>
            <div className="other-tasks-container">
                <OtherTaskCard projectID="yourProjectID" groupID="yourGroupID" />
            </div>
        </div>
    );
};

export default Homepage;




