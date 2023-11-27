import React, {SyntheticEvent, useState} from 'react';
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {SitesService} from "../../../services/sites.service";
import {Button, Fade, Stack, Switch, TextField, Typography} from "@mui/material";
import {
    ModalForm,
    ModalWrapper

} from "./styled";
import MyModal from "../../UI/MyModal";

const ModalCreate = (props) => {
    const {handleClose, handleOpen, open, ...rest} = props

    const [url, setUrl] = useState('')
    const [active, setActive] = useState(true)
    const queryClient = useQueryClient();

    const createMutation = useMutation({
        mutationKey: ['sites'],
        mutationFn: (obj) => SitesService.createSite(obj.url, obj.active),
        onSettled: () => {
            queryClient.invalidateQueries(['sites'])
            setUrl('')
            setActive(true)
            handleClose()
        },
    })

    const onSiteCreate = async (e: SyntheticEvent) => {
        e.preventDefault()
        createMutation.mutate({url, active})
    }

    return (
        <>
            <MyModal
                modalTitle="Create site"
                handleClose={handleClose}
                handleOpen={handleOpen}
                onClose={handleClose}
                open={open}
            >
                <Fade in={open}>
                    <ModalWrapper>
                        <ModalForm onSubmit={onSiteCreate}>
                            <TextField
                                label="Site url" variant="outlined" placeholder="Set siteUrl"
                                value={url}
                                onChange={(e) => setUrl(e.target.value)}
                                fullWidth
                            />
                            <Stack direction="column" spacing={0.5}>
                                <Typography>Check site:</Typography>
                                <Stack direction="row" spacing={1} alignItems="center">
                                    <Typography>Off</Typography>
                                    <Switch
                                        checked={active}
                                        defaultChecked
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setActive(e.target.checked)}
                                    />
                                    <Typography>On</Typography>
                                </Stack>
                            </Stack>
                            <Button
                                variant="contained"
                                type="submit"
                                fullWidth
                            >
                                Create new site
                            </Button>
                        </ModalForm>
                    </ModalWrapper>
                </Fade>
            </MyModal>
        </>
    );
};

export default ModalCreate;
