import React, {SyntheticEvent, useState} from 'react';
import {useLocation, useNavigate} from "react-router-dom";
import LoginPage from "./login";
import {useAppDispatch} from "../../utils/hook";
import {login} from "../../store/slice/auth";
import loginLogo from "../../assets/img/login-logo.svg"
import loginImage from "../../assets/img/login-image.svg"
import {
    Auth, AuthForm, AuthFormForm, AuthFormInner, AuthInfo,
} from "./styled";
import {useMutation} from "@tanstack/react-query";
import {UserService} from "../../services/user.service";

const AuthRootComponent: React.FC = (): JSX.Element => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const location = useLocation()
    const dispatch = useAppDispatch()
    const navigate = useNavigate()


    const {mutate, data} = useMutation({
        mutationKey: ['user'],
        mutationFn: (userData) => UserService.login(email, password),
        onSuccess(){
            dispatch(login(data))
            navigate('/')
        }
    })

    const handleSubmit = async (e: SyntheticEvent) => {
        e.preventDefault()
        mutate(email, password)
    }

    return (
        <Auth>
            <AuthInfo>
                <img className="auth__logo" src={loginLogo} alt="logo"/>
                <img className="auth__img" src={loginImage} alt="img"/>
            </AuthInfo>
            <AuthForm>
                <img className="auth__logo" src={loginLogo} alt="logo"/>
                <AuthFormInner>
                    <AuthFormForm onSubmit={handleSubmit}>
                        {
                            location.pathname === '/login'
                                ? <LoginPage
                                    setEmail={setEmail}
                                    setPassword={setPassword}
                                    navigate={navigate}
                                /> : null
                        }
                    </AuthFormForm>
                </AuthFormInner>
            </AuthForm>
        </Auth>
    );
};

export default AuthRootComponent;
