import React, {SyntheticEvent, useState} from 'react';
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {SitesService} from "../../../services/sites.service";
import {Button, Checkbox, Fade, Modal, Stack, Switch, TextField, Typography} from "@mui/material";
import Backdrop from '@mui/material/Backdrop';
import {
    ModalForm,
    ModalTop,
    ModalWrapper

} from "./styled";
import CloseIcon from '@mui/icons-material/Close';

const ModalCreate = () => {
    const [name, setName] = useState('')
    const [url, setUrl] = useState('')
    const [active, setActive] = useState(true)
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

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <>
            <Button onClick={handleOpen} color="secondary">Create site</Button>
            <Modal
                className="modal"
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={handleClose}
                closeAfterTransition
                slots={{backdrop: Backdrop}}
                slotProps={{
                    backdrop: {
                        timeout: 500,
                    },
                }}
            >
                <Fade in={open}>
                    <ModalWrapper>
                        <ModalTop>
                            <div className="modal__title">Create site</div>
                            <CloseIcon onClick={() => handleClose()}/>
                        </ModalTop>
                        <ModalForm onSubmit={onSiteCreate}>
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
            </Modal>
        </>
    );
};

export default ModalCreate;
