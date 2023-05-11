import React from "react";
import './Project.css'
import { Box, Container, Divider } from "@mui/material";
import TaskCompact from "../../components/old/TaskCompact";

const Project = () => {
return(
<Container>
    <Box
    classname = "headerBox"
    sx={{
        backgroundColor: "primary.light"
    }}>
        <h1> Project Title </h1>
        <p> Project Info</p>

    </Box>

    <Box
    classname = "completenessBox"
    sx={{
        backgroundColor: "primary.light"
    }}>
        <h3> x% Complete </h3>
    </Box>

    <Divider />

    <Box
    classname = "memberBox"
    sx={{
        backgroundColor: "primary.light"
    }}>
        <h2> Members </h2>

        <Box
        classname = "taskLists"
        sx={{
            display: "flex",
            flexDirection: "row"
        }}>
            Insert list of members
        </Box>
    </Box>

    <Box
    classname = "tasks"
    sx={{
        backgroundColor: "primary.light"
    }}>
        <h2>Tasks</h2>
        <Box
        classname = "taskLists"
        sx={{
            display: "flex",
            flexDirection: "row"
        }}>

          <Box
            classname = "toDoTasks"
            sx={{
                backgroundColor: "secondary.light"
            }}>
                <h3>To Do</h3>
                <TaskCompact TaskTitle="To Do" TaskImportance="Important"></TaskCompact>
            </Box>
            <Box
            classname = "inProgressTasks"
            sx={{
                backgroundColor: "secondary.light"
            }}>
                <h3>In Progress</h3>
                <TaskCompact TaskTitle="In Progress" TaskImportance="Important"></TaskCompact>
            </Box>
            <Box
            classname = "completedTasks"
            sx={{
                backgroundColor: "secondary.light",
            }}>
                <h3>Completed</h3>
                <TaskCompact TaskTitle="Completed" TaskImportance="Important"></TaskCompact>
            </Box>  
        </Box>
        

    </Box>
    

</Container>

)

};

export default Project;