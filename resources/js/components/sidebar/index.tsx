import React from 'react';
import {Box, Button, List, ListItem} from "@mui/material";
import loginLogo from "../../assets/img/login-logo.svg"
import {
    Sidebar, SidebarLogo, SidebarBottom, SidebarMenu

} from "./styled";
import {useNavigate} from "react-router-dom";
const SideBarComponent = () => {
    const navigate = useNavigate()

    return (
        <Sidebar>
            <SidebarLogo>
                <img className="auth__logo" src={loginLogo} alt="logo"/>
                <Box>
                    <Box className="logo__name">Site check</Box>
                    <Box className="logo__text">panel</Box>
                </Box>
            </SidebarLogo>
            <SidebarMenu>
                <List>
                    <ListItem onClick={() => navigate('/')}>Home</ListItem>
                    <ListItem onClick={() => navigate('/settings')}>Settings</ListItem>
                    <ListItem onClick={() => navigate('/logs')}>Logs</ListItem>
                    <ListItem onClick={() => navigate('/users')}>Users</ListItem>
                </List>
            </SidebarMenu>
            <SidebarBottom>
                <Button fullWidth color="secondary">Logout</Button>
            </SidebarBottom>
        </Sidebar>
    );
};

export default SideBarComponent;
