import React from "react";
import './Project.css'
import { Box, Container } from "@mui/material";
import TaskCompact from "../../components/old/TaskCompact";

const Project = () => {
return(
<Container>
    <Box
    classname = "headerBox"
    sx={{
        backgroundColor: "primary.light"
    }}>
        Header Box
    </Box>

    <Box
    classname = "completenessBox"
    sx={{
        backgroundColor: "primary.light"
    }}>
        Completeness Box
    </Box>

    <Box
    classname = "memberBox"
    sx={{
        backgroundColor: "primary.light"
    }}>
        Member Box
    </Box>

    <Box
    classname = "tasks"
    sx={{
        backgroundColor: "primary.light"
    }}>
        Task Box
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
                <TaskCompact TaskTitle="To Do" TaskImportance="Important"></TaskCompact>
            </Box>
            <Box
            classname = "inProgressTasks"
            sx={{
                backgroundColor: "secondary.light"
            }}>
                <TaskCompact TaskTitle="In Progress" TaskImportance="Important"></TaskCompact>
            </Box>
            <Box
            classname = "completedTasks"
            sx={{
                backgroundColor: "secondary.light",
            }}>
                <TaskCompact TaskTitle="Completed" TaskImportance="Important"></TaskCompact>
            </Box>  
        </Box>
        

    </Box>
    

</Container>

)

};

export default Project;