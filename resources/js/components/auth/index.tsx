import React, {useState} from 'react';
import {useLocation, useNavigate} from "react-router-dom";
import LoginPage from "./login";
import RegisterPage from "./register";
import {Box} from "@mui/material";
import {instance} from "../../utils/axios";
import {useAppDispatch} from "../../utils/hook";
import {login} from "../../store/slice/auth";

const AuthRootComponent: React.FC = (): JSX.Element => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [repeatPassword, setRepeatPassword] = useState('')
    const [firstName, setFirstName] = useState('')
    const [userName, setUserName] = useState('')
    const location = useLocation()
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault()
        if (location.pathname === '/login') {
            try {
                const userData = {
                    email,
                    password
                }
                const user = await instance.post('login', userData)
                await dispatch(login(user.data))
                navigate('/')
            } catch (e) {
                return e
            }
        } else {
            if (password === repeatPassword) {
                const userData = {
                    firstName,
                    userName,
                    email,
                    password
                }
                const newUser = await instance.post('register', userData)
                console.log(newUser);
            } else {
                throw new Error('У вас не совпадают пароли')
            }
        }
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
                    {
                        location.pathname === '/login'
                            ? <LoginPage setEmail={setEmail}
                                         setPassword={setPassword}/> : location.pathname === '/register'
                                ? <RegisterPage
                                    setEmail={setEmail}
                                    setPassword={setPassword}
                                    setRepeatPassword={setRepeatPassword}
                                    setFirstName={setFirstName}
                                    setUserName={setUserName}
                                />
                                : null
                    }
                </form>
            </Box>
        </Box>
    );
};

export default AuthRootComponent;
