import React from 'react';
import {Button, TextField, Typography} from "@mui/material";

const RegisterPage = () => {
    return (
        <>
            <Typography variant="h2" textAlign="center">Регистрация</Typography>
            <TextField fullWidth label="Имя" variant="outlined" placeholder="Введите ваше имя" />
            <TextField fullWidth label="username" variant="outlined" placeholder="Введите ваш username" />
            <TextField fullWidth label="Email" variant="outlined" placeholder="Введите ваш email" />
            <TextField fullWidth label="Password" variant="outlined" placeholder="Введите ваш пароль" />
            <TextField fullWidth label="Password" variant="outlined" placeholder="Повторите ваш пароль" />
            <Button variant="contained">Зарегистрироваться</Button>
        </>
    );
};

export default RegisterPage;
