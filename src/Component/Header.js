import React from "react";
import {Box,Toolbar,AppBar} from "@mui/material";
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

const Header = () => {
 

    return (
        <AppBar position="static" style={{ background: "#26292D" }}>
            <Toolbar sx={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap" }}>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                    <img
                        src="Images/Black_Book.png"
                        alt="Logo"
                        style={{ height: 40, marginRight: 16 }}
                    />
                </Box>

               
        
                <iconbutton>
                    <ExitToAppIcon />
                </iconbutton>
            </Toolbar>
        </AppBar>
    );
};

export default Header;
