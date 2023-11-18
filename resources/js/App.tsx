import React, {useEffect} from 'react';
import {useNavigate} from "react-router-dom";
import Layout from "./components/layout";
import {ThemeProvider} from "@mui/material/styles";
import THEME from "./theme";
import {CssBaseline} from "@mui/material";
import {instance} from "./utils/axios";
import {login} from "./store/slice/auth";
import Cookies from "js-cookie";
import {useAppDispatch} from "./utils/hook";
import Router from "./router";

function App() {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    // useEffect(() => {
    //     const auth = async () => {
    //         try {
    //             const token = Cookies.get("token")
    //             if (token) {
    //                 const user = await instance.post('check-token', token)
    //                 dispatch(login(user.data))
    //                 navigate('/')
    //             }
    //         } catch (e) {
    //
    //         }
    //     }
    //     auth()
    // }, [])


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
