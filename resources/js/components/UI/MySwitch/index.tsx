import React, {useState} from 'react';
import {FormControlLabel, Stack, Switch, Typography} from "@mui/material";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {SitesService} from "../../../services/sites.service";

const MySwitch = (props: any) => {
    const {defaultActive, active, setActive, id, url} = props
    const queryClient = useQueryClient();

    const updateMutation = useMutation({
        mutationFn: () => SitesService.updateSite(id, url, active),
        onSettled: () => {
            queryClient.invalidateQueries(['sites'])
        },
    })

    const toggleChecked = (event) => {
        setActive(event.target.checked);
        updateMutation.mutate(id, url, active)
    };

    return (
        <Stack direction="row" spacing={1} alignItems="center">
            <Typography>Off</Typography>
            <Switch checked={defaultActive} onChange={toggleChecked}/>
            <Typography>On</Typography>
        </Stack>
    );
};

export default MySwitch;
