import React from "react";
import {  useEffect } from "react";
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
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
    <Sidebar>
    <Routes>
      <Route path="/login" element={<Login/>}/>
      <Route path="/" element={<Homepage/>}/>
      <Route path="/group" element={<Group/>}/>
      <Route path="/project" element={<Project/>}/>
      <Route path="/userProfile" element={<UserProfile/>}/>
      <Route path="/signup" element={<SignUp/>}/>
    </Routes>
    </Sidebar>
    </BrowserRouter>
  )
}

export default App
