import React from 'react';
import {AppBar, Box, Button, Grid, IconButton, Toolbar, Typography} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';

const TopBarComponent = () => {
    const user = {
        name: 'Roman'
    }

    return (
        <AppBar position="static">
            <Box><Grid>Welcome {user.name}</Grid></Box>
            <Toolbar>
                <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    sx={{ mr: 2 }}
                >
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    News
                </Typography>
                <Button color="inherit">Login</Button>
            </Toolbar>
        </AppBar>
    );
};

export default TopBarComponent;
