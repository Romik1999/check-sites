import React, {SyntheticEvent, useState} from 'react';
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {SitesService} from "../../../services/sites.service";
import {Button, Checkbox, TextField} from "@mui/material";

const ModalCreate = () => {
    const [name, setName] = useState('')
    const [url, setUrl] = useState('')
    const [active, setActive] = useState(false)
    const queryClient = useQueryClient();

    const createMutation = useMutation({
        mutationKey: ['sites'],
        mutationFn: (obj) => SitesService.createSite(obj.name, obj.url, obj.active),
        onSettled: () => {
            queryClient.invalidateQueries(['sites'])
            setName('')
            setUrl('')
            setActive(false)
        },
    })

    const onSiteCreate = async (e: SyntheticEvent) => {
        e.preventDefault()
        createMutation.mutate({name, url, active})
    }

    return (
        <>
            <h2>Modal Create</h2>
            <form onSubmit={onSiteCreate}>
                <TextField
                    label="Site name" variant="outlined" placeholder="Set siteName"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    fullWidth
                />
                <TextField
                    label="Site url" variant="outlined" placeholder="Set siteUrl"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    fullWidth
                />
                <Checkbox
                    label="Site name" variant="outlined" placeholder="Set siteName"
                    checked={active}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setActive(e.target.checked)}
                    fullWidth
                />
                <Button
                    variant="contained"
                    type="submit"
                    fullWidth
                >
                    Add new Site
                </Button>
            </form>
        </>
    );
};

export default ModalCreate;
