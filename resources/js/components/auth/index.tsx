import React, {useState} from 'react';
import {useLocation, useNavigate} from "react-router-dom";
import LoginPage from "./login";
import {instance} from "../../utils/axios";
import {useAppDispatch} from "../../utils/hook";
import {login} from "../../store/slice/auth";
import loginLogo from "../../assets/img/login-logo.svg"
import loginImage from "../../assets/img/login-image.svg"
import {
    Auth, AuthForm, AuthFormForm, AuthFormInner, AuthInfo,
} from "./styled";

const AuthRootComponent: React.FC = (): JSX.Element => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
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
        }
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
