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
import { useState } from 'react'; 

export default function SignIn() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
  };

  const navigate = useNavigate()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  
  const login = (url) => {
    console.log(`login with: ${email} : ${password}`)
    const options = {
      mode: 'cors',
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Origin": "http://localhost:3000"
      },
      body: JSON.stringify({ 
        email: email, 
        password: password }),
    }
    fetch(url, options)
    .then(async (res) => {
      const data = await res.json()
      return { ...data, ok: res.ok }
      })
      .then((res) => {
        console.log(res)
        if (res.ok) {
          sessionStorage.setItem("AuthToken", res.token )
          navigate("/home")
        } else {
          // Convert this to toast
          toast.error(res.ErrorMessage, ToastOptions)
        }
      })
  }

  return (
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
            onChange={(e) => setEmail(e.target.value)}
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
            onChange={(e) => setPassword(e.target.value)}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2, 
                backgroundColor: '#293038',
                "&:hover": { backgroundColor: 'a7aeb6'},
            }}
            onClick={() => login("http://127.0.0.1:3000/login")}
          >
            Sign In
          </Button>
          {/* <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                {"Forgot password?"}
              </Link>
            </Grid>
            <Grid item>
              <Link href="#" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid> */}
        </Box>
      </Box>
    </Container>
    
  );
}