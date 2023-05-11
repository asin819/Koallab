import React from "react";
import "./Homepage.css";
import { ImportantTaskCard } from "../../components/ImportantTaskCard.jsx";
import { OtherTaskCard } from "../../components/OtherTaskCard.jsx";

const Homepage = () => {
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

    const koalaClass = hour >= 20 || hour < 6 ? "sleepy" : "awake"; // Change Koala image based on time

    return (
        <div className="homepage" id="content">
            <div id="koala" className={koalaClass}></div>
            <h2 className="greet">{greeting}</h2>
            <p className="important_tasks">
                <strong>Important Tasks</strong>
            </p>
            <div className="important-tasks-container">
                <ImportantTaskCard projectID="yourProjectID" groupID="yourGroupID" />
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




