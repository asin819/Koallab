import { Container, Box } from "@mui/material";
import UserIcon from '@heroicons/react/24/solid/UserIcon';


function IdentityCard() {
return(

    <Container>
        <Box
            sx={{
            boxShadow: 3,
            borderRadius: 2,
            padding: 2,
            backgroundColor: 'primary.light',
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            maxWith: 40,
            }}
        >
            <UserIcon/> // replace with image
            <h3> Username </h3> 
        </Box>
    </Container>

);
}

export default IdentityCard;