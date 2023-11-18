import React, {useState} from 'react';
import {FormControlLabel, Switch} from "@mui/material";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {SitesService} from "../../../services/sites.service";

const MySwitch = (props: any) => {
    const {active, id} = props
    const [checked, setChecked] = useState(active);
    const queryClient = useQueryClient();

    const updateMutation = useMutation({
        mutationFn: () => SitesService.updateSite(id, checked),
        onSettled: () => {
            queryClient.invalidateQueries(['sites'])
        },
    })

    const toggleChecked = (event) => {
        setChecked(event.target.checked);
        updateMutation.mutate(id, checked)
    };

    return (
        <Switch checked={checked} onChange={toggleChecked} />
    );
};

export default MySwitch;
