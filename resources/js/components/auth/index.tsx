import React, {useState} from 'react';
import {useLocation, useNavigate} from "react-router-dom";
import LoginPage from "./login";
import RegisterPage from "./register";
import {Box} from "@mui/material";
import {instance} from "../../utils/axios";
import {useAppDispatch} from "../../utils/hook";
import {login} from "../../store/slice/auth";
import {AppErrors} from "../../common/errors";
import loginLogo from "../../assets/img/login-logo.svg"
import loginImage from "../../assets/img/login-image.svg"

import {
    Auth, AuthForm, AuthFormInner, AuthInfo,
} from "./styled";

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
                throw new Error(AppErrors.PasswordDoNotMatch)
            }
        }
    }

    return (
        <Auth>
            <AuthInfo>
                <img className="auth__logo" src={loginLogo} alt="logo"/>
                <img className="auth__img" src={loginImage} alt="logo"/>
            </AuthInfo>
            <AuthForm>
                <AuthFormInner>
                    <form onSubmit={handleSubmit}>
                        {
                            location.pathname === '/login'
                                ? <LoginPage
                                    setEmail={setEmail}
                                    setPassword={setPassword}
                                    navigate={navigate}
                                /> : location.pathname === '/register'
                                    ? <RegisterPage
                                        setEmail={setEmail}
                                        setPassword={setPassword}
                                        setRepeatPassword={setRepeatPassword}
                                        setFirstName={setFirstName}
                                        setUserName={setUserName}
                                        navigate={navigate}
                                    />
                                    : null
                        }
                    </form>
                </AuthFormInner>
            </AuthForm>
        </Auth>
    );
};

export default AuthRootComponent;
