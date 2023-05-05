import { useState } from 'react'
import Task from './frontend/components/Task.jsx'
import TaskCompact from './frontend/components/TaskCompact.jsx'
import TeamCard from './frontend/components/TeamCard.jsx'
import Navbar from './frontend/components/Navbar.jsx'
import Homepage from './frontend/pages/homepage/homepage.jsx'
import Login from './frontend/pages/login/Login.jsx'

import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    
    <div>
      
      {/* <Homepage/> */}
      <Login/>
{/*       
       <Task
        TaskTitle="Make a task card"
        description="Make a component that will be used for the task as a card, refer to the DB provided to make sure you have all the information you need and put that in."
        username="abc"
        TaskStatus="new"
        TaskImportance="Important"
      />

      <TaskCompact
        TaskTitle="Make a task card"
        TaskImportance="Important"
      />

      <TeamCard
        TeamName="Khaki Koallas"
      /> */}
     </div>
    
  )
}

export default App
