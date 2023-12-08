import React, {useState} from 'react';
import {FormControlLabel, Stack, Switch, Typography} from "@mui/material";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {SitesService} from "../../../services/sites.service";

const MySwitch = (props: any) => {
    const {defaultActive, active, setActive, id, url, onSwitch} = props


    const toggleChecked = (event) => {
        console.log(11111111);
        if (onSwitch){
            onSwitch(id, url, !active)
        }
    };

    return (
        <Stack direction="row" spacing={1} alignItems="center">
            <Typography>Выкл</Typography>
            <Switch checked={active} onChange={toggleChecked}/>
            <Typography>Вкл</Typography>
        </Stack>
    );
};

export default MySwitch;
