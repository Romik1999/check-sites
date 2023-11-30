import React from 'react';
import {Button, Stack, Switch, TextField, Typography} from "@mui/material";
import {ModalForm} from "./styled";
import MyModal from "../../UI/MyModal";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {SitesService} from "../../../services/sites.service";

const ModalUpdate = (props) => {
    const {handleClose, handleOpen, siteId, open, siteUrl, setSiteUrl, active, setActive, ...rest} = props

    const queryClient = useQueryClient();

    const updateMutation = useMutation({
        mutationKey: ['sites'],
        mutationFn: (obj) => SitesService.updateSite(obj.siteId, obj.siteUrl, obj.active),
        onSuccess: () => {
            queryClient.invalidateQueries(['sites'])
            setActive(active)
            handleClose()
        },
    })

    const toggleChecked = (event) => {
        setActive(event.target.checked);
    };
    const onSiteUpdate = (event) => {
        event.preventDefault()
        updateMutation.mutate({siteId, siteUrl, active})
    }

    return (
        <>
            <MyModal
                modalTitle="Update site"
                handleClose={handleClose}
                handleOpen={handleOpen}
                onClose={handleClose}
                open={open}
            >
                <ModalForm onSubmit={onSiteUpdate}>
                    <TextField
                        label="Site url" variant="outlined" placeholder="Set siteUrl"
                        value={siteUrl}
                        onChange={(e) => setSiteUrl(e.target.value)}
                        fullWidth
                    />
                    <Stack direction="column" spacing={0.5}>
                        <Typography>Check site:</Typography>
                        <Stack direction="row" spacing={1} alignItems="center">
                            <Typography>Off</Typography>
                            <Switch
                                checked={active}
                                onChange={toggleChecked}
                            />
                            <Typography>On</Typography>
                        </Stack>
                    </Stack>
                    <Button
                        variant="contained"
                        type="submit"
                        fullWidth
                    >
                        Update site
                    </Button>
                </ModalForm>
            </MyModal>
        </>
    );
};

export default ModalUpdate;
