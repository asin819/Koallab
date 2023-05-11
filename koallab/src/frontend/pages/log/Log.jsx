import React from "react";
import './Log.css';

const Log = () => {
    return (
        <div className="log-modal">
            <h2>Task Log</h2>
            <ul className="log-list">
                <li className="log-item">
                    <div className="log-meta">
                        <span className="log-date">May 11, 2023</span>
                        <span className="log-author">John Doe</span>
                    </div>
                    <div className="log-content">
                        <p>Created new task: Back-end development task division</p>
                    </div>
                </li>
                <li className="log-item">
                    <div className="log-meta">
                        <span className="log-date">May 10, 2023</span>
                        <span className="log-author">Jane Smith</span>
                    </div>
                    <div className="log-content">
                        <p>Updated task status to executing</p>
                    </div>
                </li>
                <li className="log-item">
                    <div className="log-meta">
                        <span className="log-date">May 9, 2023</span>
                        <span className="log-author">Bob Johnson</span>
                    </div>
                    <div className="log-content">
                        <p>Added label "backend" to task</p>
                    </div>
                </li>
            </ul>
        </div>
    );
};

export default Log;