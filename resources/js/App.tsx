import React from 'react';
import {Route, Routes} from "react-router-dom";
import Home from './pages/home';
import Settings from "./pages/settings";
import Users from "./pages/users";
import Logs from "./pages/logs";
import Layout from "./components/layout";
import {ThemeProvider} from "@mui/material/styles";
import PrivateRoute from "./utils/router/privateRoute";
import AuthRootComponent from "./components/auth";
import THEME from "./theme";
import {CssBaseline} from "@mui/material";

function App() {
    return (
        <ThemeProvider theme={THEME}>
            <Layout>
                <CssBaseline/>
                <div className="App">
                    <Routes>
                        <Route element={<PrivateRoute/>}>
                            <Route path="/" element={<Home/>}/>
                            <Route path="settings" element={<Settings/>}/>
                            <Route path="logs" element={<Logs/>}/>
                            <Route path="users" element={<Users/>}/>
                        </Route>
                        <Route path="login" element={<AuthRootComponent/>}/>
                        <Route path="register" element={<AuthRootComponent/>}/>
                    </Routes>
                </div>
            </Layout>
        </ThemeProvider>
    );
}

export default App;
