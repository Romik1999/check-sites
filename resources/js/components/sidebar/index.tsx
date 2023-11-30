import React from 'react';
import {Box, Button, List, ListItem, ListItemIcon, MenuItem, MenuList, Typography} from "@mui/material";
import loginLogo from "../../assets/img/login-logo.svg"
import {
    Sidebar, SidebarLogo, SidebarBottom, SidebarMenu

} from "./styled";

import {useNavigate} from "react-router-dom";
import HomeIcon from '@mui/icons-material/Home';
import SettingsIcon from "@mui/icons-material/Settings";
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import LogoutIcon from '@mui/icons-material/Logout';

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
                <MenuList>
                    <MenuItem onClick={() => navigate('/')}>
                        <ListItemIcon>
                            <HomeIcon/>
                        </ListItemIcon>
                        <Typography component="span">Сайты</Typography>
                    </MenuItem>
                    <MenuItem onClick={() => navigate('/settings')}>
                        <ListItemIcon>
                            <SettingsIcon/>
                        </ListItemIcon>
                        <Typography component="span">Настройки</Typography>
                    </MenuItem>
                    <MenuItem onClick={() => navigate('/logs')}>
                        <ListItemIcon>
                            <InsertDriveFileIcon/>
                        </ListItemIcon>
                        <Typography component="span">Логи</Typography>
                    </MenuItem>
                </MenuList>
            </SidebarMenu>
            <SidebarBottom>
                <Button fullWidth>
                    Logout
                    <LogoutIcon/>
                </Button>
            </SidebarBottom>
        </Sidebar>
    );
};

export default SideBarComponent;
