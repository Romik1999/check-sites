import React from 'react';
import {Stack, Switch, Typography} from "@mui/material";

const MySwitch = (props: any) => {
    const {active, onSwitch} = props

    const toggleChecked = () => {
        if (onSwitch){
            onSwitch(!active)
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
