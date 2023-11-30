import React from 'react';
import {useQuery} from "@tanstack/react-query";
import Loader from "../../components/loader";
import {SettingsService} from "../../services/settings.service";
import SettingsComponent from "../../components/settings";

const Settings = () => {
    const {isLoading, error, data} = useQuery({
        queryKey: ['settings'],
        queryFn: () => SettingsService.getAll(),
        select: ({data}) => data
    })

    if (isLoading) return (<Loader/>);
    if (error) return "An error has occurred: " + error.message;

    return (
        <div>
            <h1>Настройки</h1>
            <SettingsComponent data={data}/>
        </div>
    );
};

export default Settings;
