import React from "react";
import { BrowserRouter, Routes, Route, Link, redirect } from 'react-router-dom';
import Login from './frontend/pages/login/Login.jsx';
import Homepage from './frontend/pages/homepage/homepage.jsx';
import Group from './frontend/pages/group/Group.jsx'
import Project from './frontend/pages/project/Project.jsx'
import UserProfile from './frontend/pages/userProfile/UserProfile.jsx'
import Sidebar from "./frontend/components/Sidebar.jsx";
import './App.css'
import SignUp from "./frontend/pages/signup/SignUp.jsx";

const App = () => {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/*" element={<AppWithSidebar />} />
      </Routes>
    </BrowserRouter>
  )
}

const AppWithSidebar = () => {
  return (
    <Sidebar>
      <Routes>
        <Route path="/home" element={<Homepage />} />
        <Route path="group/:id" element={<Group />} />
        <Route path="project/:id" element={<Project />} />
        <Route path="userProfile" element={<UserProfile />} />
      </Routes>
    </Sidebar>
  );
}


export default App
