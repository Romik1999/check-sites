import React, {SyntheticEvent, useState} from 'react';
import SitesList from "./list";
import {Box, Button, Stack, Switch, TextField, Typography} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import MyModal from "../UI/MyModal";
import {ModalForm} from "./styled";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {SitesService} from "../../services/sites.service";

const Sites = () => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [createSite, setCreateSite] = useState({
        url: '',
        active: true
    })

    const queryClient = useQueryClient();

    const createMutation = useMutation({
        mutationKey: ['sites'],
        mutationFn: (obj) => SitesService.createSite(obj.url, obj.active),
        onSettled: () => {
            queryClient.invalidateQueries(['sites'])
            setCreateSite({
                url: '',
                active: true
            })
            handleClose()
        },
    })

    const onSiteCreate = async (e: SyntheticEvent) => {
        e.preventDefault()
        createMutation.mutate({url: createSite.url, active: createSite.active})
    }

    return (
        <>
            <Box
                display="flex"
                columnGap="20px"
                alignItems="center"
            >
                <h1>Сайты</h1>
                <Button
                    variant="icon"
                    onClick={() => handleOpen()}
                >
                    <AddIcon/>
                </Button>
            </Box>
            <SitesList/>

            <MyModal
                modalTitle="Создать сайт"
                handleClose={handleClose}
                handleOpen={handleOpen}
                onClose={handleClose}
                open={open}
            >
                <ModalForm onSubmit={onSiteCreate}>
                    <TextField
                        label="Домен сайта" variant="outlined" placeholder="Укажите домен сайта"
                        value={createSite.url}
                        onChange={(e) => setCreateSite({...createSite, url: e.target.value})}
                        fullWidth
                    />
                    <Stack direction="column" spacing={0.5}>
                        <Typography>Проверять сайт:</Typography>
                        <Stack direction="row" spacing={1} alignItems="center">
                            <Typography>Выкл</Typography>
                            <Switch
                                checked={createSite.active}
                                onChange={(e) => setCreateSite({...createSite, active: e.target.checked})}
                            />
                            <Typography>Вкл</Typography>
                        </Stack>
                    </Stack>
                    <Button
                        color="success"
                        variant="contained"
                        type="submit"
                        fullWidth
                    >
                        Создать новый сайт
                    </Button>
                </ModalForm>
            </MyModal>
        </>
    );
};

export default Sites;
