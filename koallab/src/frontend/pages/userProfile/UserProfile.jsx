import React from "react";
import './UserProfile.css';
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import UserIcon from '@heroicons/react/24/solid/UserIcon';
import { Button } from "@mui/material";
import UserInfoCard from "../../components/userInfoCard";
import IdentityCard from "../../components/IdentityCard";

const UserProfile = () => {
return(
<Container>

    <IdentityCard/>

    <UserInfoCard/>

    <Box
        sx={{
          borderRadius: 2,
          padding: 2,
          marginTop: 2,
          display: "flex",
          flexDirection: "column",
          
        }}
    >
        <Button variant="outlined" color="error">
            Delete User
        </Button>
    </Box>
    
</Container>
)

};

export default UserProfile;