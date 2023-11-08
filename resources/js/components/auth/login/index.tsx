import React from 'react';
import {Button, TextField, Typography} from "@mui/material";
import {IPropsLogin} from "../../../common/types/auth";

const LoginPage: React.FC<IPropsLogin> = (props: IPropsLogin): JSX.Element => {
    const {setPassword, setEmail, navigate} = props
    return (
        <>
            <Typography variant="h2" textAlign="center">Авторизация</Typography>
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
            >
                Войти
            </Button>
            <Typography onClick={() => navigate('/register')}>Регистрация</Typography>
        </>
    );
};

export default LoginPage;
