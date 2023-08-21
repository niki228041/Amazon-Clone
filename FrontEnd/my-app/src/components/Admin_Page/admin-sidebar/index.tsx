// import { Link, useNavigate } from "react-router-dom";
// import "../admin.css";
// import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
// // import { Link } from 'react-router-dom';
// const AdminSidebar = () => {
//     return <>
//         <Sidebar>
//             <Menu
//                 menuItemStyles={{
//                     button: {

//                         [`&.active`]: {
//                             backgroundColor: '#13395e',
//                             color: '#b6c8d9',
//                         },
//                     },
//                 }}
//             >
//                 <MenuItem component={<Link to="/documentation" />}> Documentation</MenuItem>
//                 <MenuItem component={<Link to="/calendar" />}> Calendar</MenuItem>
//                 <MenuItem component={<Link to="/e-commerce" />}> E-commerce</MenuItem>
//             </Menu>
//         </Sidebar>;
//     </>;
// }

// export default AdminSidebar;




import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";

import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

import Toolbar from "@mui/material/Toolbar";

import EqualizerIcon from '@mui/icons-material/Equalizer';

import CategoryIcon from '@mui/icons-material/Category';
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import { Link } from 'react-router-dom';
import InventoryIcon from '@mui/icons-material/Inventory';



const drawWidth = 280;

const AdminSidebar = () => {
    const [mobileViewOpen, setMobileViewOpen] = React.useState(false);

    const handleToggle = () => {
        setMobileViewOpen(!mobileViewOpen);
    };

    const responsiveDrawer = (
        <div style={{
            backgroundColor: "#09212E",
            height: "100%"
        }}>
            <Toolbar />
            <Divider />

            <List sx={{ backgroundColor: "#09212E" }}>
                <Link to="/admin">
                    <ListItemButton sx={{ color: "white" }}>
                        <ListItemIcon sx={{ color: "white" }}>
                            {<EqualizerIcon />}
                        </ListItemIcon>


                        <ListItemText primary={"Overview"} />


                    </ListItemButton>
                </Link>
                <Link to="categories">
                    <ListItemButton sx={{ color: "white" }}>

                        <ListItemIcon sx={{ color: "white" }}>

                            {<CategoryIcon />}
                        </ListItemIcon>
                        <ListItemText primary={"Add Categories"} />


                    </ListItemButton>
                </Link>
                <Link to="products">
                    <ListItemButton sx={{ color: "white" }}>
                        <ListItemIcon sx={{ color: "white" }}>
                            {<InventoryIcon />}
                        </ListItemIcon>
                        <ListItemText primary={"Add Products"} />
                    </ListItemButton>
                </Link>

                <ListItemButton sx={{ color: "white" }}>
                    <ListItemIcon sx={{ color: "white" }}>
                        {<SettingsIcon />}
                    </ListItemIcon>
                    <ListItemText primary={"Settings"} />
                </ListItemButton>
            </List>
            <Divider sx={{ height: "430px" }} />
            <List>
                <ListItemButton sx={{ color: "white" }}>

                    <ListItemText primary={"Help"} />
                </ListItemButton>
                <ListItemButton sx={{ color: "white" }}>

                    <ListItemText primary={"Contact us"} />
                </ListItemButton>
                <ListItemButton sx={{ color: "white" }}>
                    <ListItemIcon sx={{ color: "white" }}>
                        {<LogoutIcon />}
                    </ListItemIcon>
                    <ListItemText primary={"Log Out"} />
                </ListItemButton>

            </List>

        </div>
    );

    return (
        <div>
            <div>
                <Box sx={{ display: "flex" }}>
                    <CssBaseline />
                    <AppBar
                        position="fixed"
                        sx={{
                            width: { sm: `calc(100% - ${drawWidth}px)` },
                            ml: { sm: `${drawWidth}px` },
                            // backgroundColor: "green",
                        }}
                    >

                    </AppBar>
                    <Box
                        component="nav"
                        sx={{
                            width: { sm: drawWidth },
                            flexShrink: { sm: 0 }
                        }}
                    >
                        <Drawer
                            variant="temporary"
                            open={mobileViewOpen}
                            onClose={handleToggle}
                            ModalProps={{
                                keepMounted: true,
                            }}
                            sx={{
                                display: { xs: "block", sm: "none" },
                                "& .MuiDrawer-paper": {
                                    boxSizing: "border-box",
                                    width: drawWidth,
                                },
                            }}
                        >
                            {responsiveDrawer}
                        </Drawer>
                        <Drawer
                            variant="permanent"
                            sx={{
                                display: { xs: "none", sm: "block" },
                                "& .MuiDrawer-paper": {
                                    boxSizing: "border-box",
                                    width: drawWidth,
                                },
                            }}
                            open
                        >
                            {responsiveDrawer}
                        </Drawer>
                    </Box>
                    <Box
                        component="main"
                        sx={{
                            flexGrow: 1,
                            p: 3,
                            width: { sm: `calc(100% - ${drawWidth}px)` },
                        }}
                    >
                        <Toolbar />

                    </Box>
                </Box>
            </div>
        </div>
    );
}

export default AdminSidebar;