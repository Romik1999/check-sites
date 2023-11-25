import React, {useEffect} from 'react';
import {useNavigate} from "react-router-dom";
import Layout from "./components/layout";
import {ThemeProvider} from "@mui/material/styles";
import THEME from "./theme";
import {CssBaseline} from "@mui/material";
import {login} from "./store/slice/auth";
import {useAppDispatch} from "./utils/hook";
import Router from "./router";
import {UserService} from "./services/user.service";
import {useMutation} from "@tanstack/react-query";

function App() {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const {mutate, data} = useMutation({
        mutationKey: ['user'],
        mutationFn: () => UserService.checkAuth(),
        onSuccess(data){
            dispatch(login(data.data))
            navigate('/')
        }
    })

    useEffect(() => {
        mutate();
    }, []);


    return (
        <ThemeProvider theme={THEME}>
            <Layout>
                <CssBaseline/>
                <Router/>
            </Layout>
        </ThemeProvider>
    );
}

export default App;
