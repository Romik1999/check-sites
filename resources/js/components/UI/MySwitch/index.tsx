import React, {useState} from 'react';
import {FormControlLabel, Stack, Switch, Typography} from "@mui/material";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {SitesService} from "../../../services/sites.service";

const MySwitch = (props: any) => {
    const {active, id, url} = props
    const [checked, setChecked] = useState(active);
    const queryClient = useQueryClient();

    const updateMutation = useMutation({
        mutationFn: () => SitesService.updateSite(id, url, checked),
        onSettled: () => {
            queryClient.invalidateQueries(['sites'])
        },
    })

    const toggleChecked = (event) => {
        setChecked(event.target.checked);
        updateMutation.mutate(id, url, checked)
    };

    return (
        <Stack direction="row" spacing={1} alignItems="center">
            <Typography>Off</Typography>
            <Switch checked={checked} onChange={toggleChecked}/>
            <Typography>On</Typography>
        </Stack>
    );
};

export default MySwitch;
