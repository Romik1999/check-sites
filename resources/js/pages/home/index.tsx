import React from 'react';
import {List, ListItem} from "@mui/material";
import {useNavigate} from "react-router-dom";

const Home = () => {
    const navigate = useNavigate()
    return (
        <div>
            <h1>Home</h1>
            <List>
                <ListItem onClick={() => navigate('/')}>Home</ListItem>
                <ListItem onClick={() => navigate('/settings')}>Settings</ListItem>
                <ListItem onClick={() => navigate('/logs')}>Logs</ListItem>
                <ListItem onClick={() => navigate('/users')}>Users</ListItem>
            </List>
        </div>
    );
};

export default Home;
