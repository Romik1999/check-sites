import React from 'react';
import {useQuery, useQueryClient} from "@tanstack/react-query";
import axios from "axios";

const Home = () => {
    return (
        <div className="home">
            <h1>Home</h1>
            <div>
                <h1>Sites</h1>
            </div>
        </div>
    );
};

export default Home;
