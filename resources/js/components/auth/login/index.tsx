import React, {useState} from 'react';
import {Button, TextField, Typography} from "@mui/material";
import {IPropsLogin} from "../../../common/types/auth";

const LoginPage: React.FC<IPropsLogin> = (props: IPropsLogin): JSX.Element => {
    const {setPassword, setEmail} = props

    const [type, setType] = useState('password')

    return (
        <>
            <Typography variant="h6" textAlign="center">Войдите в свой аккаунт</Typography>
            <TextField
                label="Email" variant="outlined" placeholder="Введите ваш email"
                onChange={(e) => setEmail(e.target.value)}
                fullWidth
            />
            <TextField
                label="Пароль" type="password" variant="outlined" placeholder="Введите ваш пароль"
                onChange={(e) => setPassword(e.target.value)}
                fullWidth
            />
            <Button
                variant="contained"
                type="submit"
                fullWidth
            >
                Войти
            </Button>
        </>
    );
};

export default LoginPage;
