import React from "react";
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Login from './frontend/pages/login/Login.jsx';
import Homepage from './frontend/pages/homepage/Homepage.jsx';
import Group from './frontend/pages/group/Group.jsx'
import Project from './frontend/pages/project/Project.jsx'
import UserProfile from './frontend/pages/userProfile/UserProfile.jsx'
import Sidebar from "./frontend/components/Sidebar.jsx";
import './App.css'

const App = () => {

  return(
    <BrowserRouter>
    <Sidebar>
    <Routes>
      <Route path="/login" element={<Login/>}/>
      <Route path="/" element={<Homepage/>}/>
      <Route path="/group" element={<Group/>}/>
      <Route path="/project" element={<Project/>}/>
      <Route path="/userProfile" element={<UserProfile/>}/>
    </Routes>
    </Sidebar>
    </BrowserRouter>
  )
}

export default App
