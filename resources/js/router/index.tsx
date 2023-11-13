import React from 'react';
import {useRoutes} from "react-router-dom";
import PrivateRoute from "../utils/router/privateRoute";
import AuthRootComponent from "../components/auth";
import Home from "../pages/home";
import Settings from "../pages/settings";
import Logs from "../pages/logs";
import Users from "../pages/users";

const Router = () => {
    return useRoutes([
        {
            element: <PrivateRoute/>,
            children: [
                {path: "/", element: <Home/>},
                {path: "settings", element: <Settings/>},
                {path: "logs", element: <Logs/>},
                {path: "users", element: <Users/>},
            ],
        },
        {
            element: <AuthRootComponent/>,
            children: [
                {path: "login", element: <AuthRootComponent/>},
                {path: "register", element: <AuthRootComponent/>},
            ],
        },
    ]);
};

export default Router;
