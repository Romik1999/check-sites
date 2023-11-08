import React from 'react';
import {Button, TextField, Typography} from "@mui/material";

const LoginPage = (props: any) => {
    const {setPassword, setEmail} = props
    return (
        <>
            <Typography variant="h2" textAlign="center">Авторизация</Typography>
            <TextField
                label="Email" variant="outlined" placeholder="Введите ваш email"
                onChange={(e) => setEmail(e.target.value)}
                fullWidth
            />
            <TextField
                label="Password" variant="outlined" placeholder="Введите ваш пароль"
                onChange={(e) => setPassword(e.target.value)}
                fullWidth
            />
            <Button
                variant="contained"
                type="submit"
            >
                Войти
            </Button>
        </>
    );
};

export default LoginPage;
