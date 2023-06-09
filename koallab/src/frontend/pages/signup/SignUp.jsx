import Button from "@mui/material/Button"; 
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import KollabLogo from "../../assets/KoallabLogoDark.png"
import { red } from "@mui/material/colors";
import { useNavigate } from 'react-router-dom';

export default function SignUp() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
  };

  const navigate = useNavigate()

  const SignupFunction= () => {
    navigate('/')
  }
  return (
    <div className="Signup_container" style={{
      diplay: 'flex',
      width: '100vw',
      height: '100vh',
      marginTop: '50px',
      justifyContent: 'center',
      alignContent: 'center',
    }}>
<Container component="main" maxWidth="sm">
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
        <img src={KollabLogo} alt="logo"  style={{width: '80%'}}/>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <Button 
            variant="contained"
            component="label"
            sx={{ mt: 3, mb: 2, 
              backgroundColor: '#293038',
              marginLeft: '175px',
              "&:hover": { backgroundColor: 'a7aeb6'},
            }}
          >
              Upload Photo
              <input 
                hidden 
                accept="image/*" 
                multiple type="file" 
              />
          </Button>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2, 
                backgroundColor: '#293038',
                "&:hover": { backgroundColor: 'a7aeb6'},
            }}
            onClick={() => SignupFunction()}
          >
            Sign Up
          </Button>
        </Box>
      </Box>
    </Container>
    </div>
  );
}