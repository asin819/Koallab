import React from "react";
import './Project.css';
import UserIcon from '@heroicons/react/24/solid/UserIcon';

const Project = () => {
return(
<Container>
    <Box
        sx={{
          boxShadow: 3,
          borderRadius: 2,
          px: 4,
          py: 6,
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
    >
        <UserIcon/> 
    </Box>

</Container>

)

};

export default Project;