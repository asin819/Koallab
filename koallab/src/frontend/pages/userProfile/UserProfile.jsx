import React from "react";
import './UserProfile.css';
import { UserProfileCard } from "../../components/UserProfileCard";

const UserProfile = () => {

    return (
     <div>
        <UserProfileCard UserName={'Testing'} UserEmail={'asb'}/>
     </div>   
    )

// return(

// <Box
//       component="main"
//       sx={{
//         flexGrow: 1,
//         py: 8
//       }}
//     >
//       <Container maxWidth="lg">
//         <Stack spacing={3}>
//           <div>
//             <Typography variant="h4">
//               Account
//             </Typography>
//           </div>
//           <div>
//             <Grid
//               container
//               spacing={3}
//             >
//               <Grid
//                 xs={12}
//                 md={6}
//                 lg={4}
//               >
//                 <UserProfileBasic />
//               </Grid>
//               <Grid
//                 xs={12}
//                 md={6}
//                 lg={8}
//               >
//                 <UserProfileDetails />
//               </Grid>
//             </Grid>
//           </div>
//         </Stack>
//       </Container>
//     </Box>

// )

};

export default UserProfile;