import React from 'react';
import {Button, TextField, Typography} from "@mui/material";
import {IPropsRegister} from "../../../common/types/auth";

const RegisterPage:React.FC<IPropsRegister> = (props: IPropsRegister):JSX.Element => {
    const {setEmail, setPassword, setRepeatPassword, setFirstName, setUserName, navigate} = props
    return (
        <>
            <Typography variant="h2" textAlign="center">Регистрация</Typography>
            <TextField fullWidth label="Имя" variant="outlined" placeholder="Введите ваше имя" onChange={(e)=>setFirstName(e.target.value)}/>
            <TextField fullWidth label="username" variant="outlined" placeholder="Введите ваш username" onChange={(e)=>setUserName(e.target.value)} />
            <TextField fullWidth label="Email" variant="outlined" placeholder="Введите ваш email" onChange={(e)=>setEmail(e.target.value)} />
            <TextField fullWidth label="Password" variant="outlined" placeholder="Введите ваш пароль" onChange={(e)=>setPassword(e.target.value)} />
            <TextField fullWidth label="Password" variant="outlined" placeholder="Повторите ваш пароль" onChange={(e)=>setRepeatPassword(e.target.value)} />
            <Button type="submit" variant="contained">Зарегистрироваться</Button>
            <Typography onClick={() => navigate('/login')}>Авторизация</Typography>
        </>
    );
};

export default RegisterPage;
