// import { Link, useNavigate } from "react-router-dom";
// import "../admin.css";
// const AdminHeader = () => {
//     return <>
//     {/* <div className="adminhead">

//         <div >
//             Products
//         </div>
//         <div>
//             Customers
//         </div>
//         <div>
//             Shops
//         </div>
//         <div>
//             users
//         </div>
//         <div>
//             orders
//         </div>
//     </div> */}
//      </>;
// }

// export default AdminHeader;





import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import { Link } from 'react-router-dom';
import Typography from '@mui/material/Typography';

import Toolbar from '@mui/material/Toolbar';

import {

    Tab,
    Tabs,


} from "@mui/material";

interface Props {
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window?: () => Window;
}

const drawerWidth = 500;
const navItems = ['Home', 'About', 'Contact'];

export default function DrawerAppBar(props: Props) {
    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen((prevState) => !prevState);
    };



    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <Box sx={{ marginLeft: "300px", display: 'flex' }}>
            <CssBaseline />
            <AppBar sx={{ backgroundColor: "#09212E" }} component="nav">
                

                <Tabs
                    sx={{ marginLeft: "300px" }}
                    indicatorColor="secondary"
                    textColor="inherit"


                >
                    {/* <Link to="/admin/userstable">
                        users
                    </Link> */}
                    {/* <Link to="categories">
                        <Typography>users</Typography>
                    </Link> */}
                    <Link style={{color:"white"}} to="userstable"> <Tab label="Users"></Tab></Link>
                    <Link style={{color:"white"}} to="producttable"> <Tab label="Products"></Tab></Link>
                    <Link style={{color:"white"}} to="orderstable"> <Tab label="Orders"></Tab></Link>
                    <Link style={{color:"white"}} to="shopstable"> <Tab label="Shops"></Tab></Link>
                    <Link style={{color:"white"}} to="customerstable"> <Tab label="Customers"></Tab></Link>
                    
                   
                   
                    

                </Tabs>
            </AppBar>


            <Box component="main" sx={{ p: 3 }}>
                <Toolbar />

            </Box>
        </Box>
    );
}