import React from "react";
import { AppBar, Toolbar, Grid, Icon, Box } from "@mui/material";
import LogoImage from "../assets/KoallabLogoLight.png";

const Navbar = () => {
  return (
    <header>
      <AppBar
        style={{
          backgroundColor: "#252525",
        }}
      >
        <Toolbar
          style={{
            justifyContent: 'center'
          }}
        >
          <Box component="img" sx={{ height: 25 }} alt="Logo" src={LogoImage} />
        </Toolbar>
      </AppBar>
    </header>
  );
};

export default Navbar;
