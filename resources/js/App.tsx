import React from 'react';
import {Route, Routes} from "react-router-dom";
import Home from './pages/home';
import Settings from "./pages/settings";
import Users from "./pages/users";
import Logs from "./pages/logs";
import Layout from "./components/layout";
import theme from "./theme";
import {ThemeProvider} from "@mui/material/styles";
import Login from "./pages/login";

function App() {
    return (
        <ThemeProvider theme={theme}>
            <Layout>
                <div className="App">
                    <Routes>
                        <Route path="/" element={<Home/>}/>
                        <Route path="/settings" element={<Settings/>}/>
                        <Route path="/logs" element={<Logs/>}/>
                        <Route path="/users" element={<Users/>}/>
                        <Route path="/login" element={<Login/>}/>
                    </Routes>
                </div>
            </Layout>
        </ThemeProvider>
    );
}

export default App;
