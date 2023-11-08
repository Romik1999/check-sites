import React, {useState} from 'react';
import {useLocation} from "react-router-dom";
import LoginPage from "./login";
import RegisterPage from "./register";
import {Box} from "@mui/material";
import axios from "axios";

const AuthRootComponent = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const location = useLocation()


    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault()
        const userData = {
            email,
            password
        }
        console.log(userData);
        const user = await axios.post('api/login', userData)
        console.log(user.data);
    }

    return (
        <Box className="auth"
             sx={{
                 display: "flex",
                 width: "100%"
             }}
        >
            <Box
                maxWidth="600px"
                width="100%"
                margin="auto"
                display="flex"
                flexDirection="column"
                rowGap="15px"
            >
                <form onSubmit={handleSubmit}>
                    {location.pathname === '/login' ?
                        <LoginPage setEmail={setEmail} setPassword={setPassword}/> : location.pathname === '/register' ?
                            <RegisterPage/> : null}
                </form>
            </Box>
        </Box>
    );
};

export default AuthRootComponent;
