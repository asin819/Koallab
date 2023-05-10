import React from "react";
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Login from './frontend/pages/login/Login.jsx';
import Homepage from './frontend/pages/homepage/Homepage.jsx';
import Group from './frontend/pages/group/Group.jsx'
import Project from './frontend/pages/project/Project.jsx'
import UserProfile from './frontend/pages/userProfile/UserProfile.jsx'
import {Provider} from 'react-redux';
import configureStore from './frontend/middleware/ConfigureStore'
import './App.css'

const store = configureStore()

function App() {

  return (
    <BrowserRouter>
    <Routes>
      <Route path="/login" element={<Login/>}/>
      <Route path="/" element={<Homepage/>}/>
      <Route path="/group" element={<Group/>}/>
      <Route path="/project" element={<Project/>}/>
      <Route path="/userProfile" element={<UserProfile/>}/>
    </Routes>
    </BrowserRouter>
  )
}

export default App
