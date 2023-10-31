import React from 'react';
import {Route, Routes} from "react-router-dom";
import Home from './pages/home';
import Settings from "./pages/settings";
import Users from "./pages/users";
import Logs from "./pages/logs";

function App() {
    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/settings" element={<Settings/>}/>
                <Route path="/logs" element={<Logs/>}/>
                <Route path="/users" element={<Users/>}/>
            </Routes>
        </div>
    );
}

export default App;
