import React, {useState} from 'react';
import {Button, TextField, Typography} from "@mui/material";
import {IPropsLogin} from "../../../common/types/auth";

const LoginPage: React.FC<IPropsLogin> = (props: IPropsLogin): JSX.Element => {
    const {setPassword, setEmail} = props

    const [type, setType] = useState('password')

    return (
        <>
            <Typography variant="h6" textAlign="center">Sign in to your account</Typography>
            <TextField
                label="Email" variant="outlined" placeholder="Введите ваш email"
                onChange={(e) => setEmail(e.target.value)}
                fullWidth
            />
            <TextField
                label="Password" type="password" variant="outlined" placeholder="Введите ваш пароль"
                onChange={(e) => setPassword(e.target.value)}
                fullWidth
            />
            <Button
                variant="contained"
                type="submit"
                fullWidth
            >
                Sign In
            </Button>
        </>
    );
};

export default LoginPage;
