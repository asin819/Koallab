import { Container, Box, IconButton } from "@mui/material";
import PencilIcon from '@heroicons/react/24/solid/PencilIcon';


function UserInfoCard() {
return(

    <Container>
        <Box
            sx={{
            boxShadow: 3,
            borderRadius: 2,
            padding: 2,
            marginTop: 2,
            backgroundColor: 'primary.light',
            display: "flex",
            flexDirection: "column",
          
        }}
        >
            <Box
                sx={{
                padding: 1,
                backgroundColor: 'primary.light',
                display: "flex",
                flexDirection: "row",
                gap: 1,
                }}
            >
                    <h3>Username: </h3>
                    <p> username </p>
            </Box>
            <Box
                sx={{
                padding: 1,
                backgroundColor: 'primary.light',
                display: "flex",
                flexDirection: "row",
                gap: 1
                }}
            >
                    <h3>Email: </h3>
                    <p>email </p>
                    <PencilIcon colour="white" size="small"/>
            </Box>
        </Box>
    </Container>

);
}

export default UserInfoCard;