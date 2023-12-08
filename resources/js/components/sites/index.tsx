import React, {SyntheticEvent, useState} from 'react';
import SitesCreate from "./create";
import SitesList from "./list";
import ModalConfirm from "./modal/modalConfirm";
import ModalCreate from "./modal/modalCreate";
import {Box, Button, Stack, Switch, TextField, Typography} from "@mui/material";
import Loader from "../loader";
import AddIcon from "@mui/icons-material/Add";
import MyModal from "../UI/MyModal";
import {ModalForm} from "./modal/styled";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {SitesService} from "../../services/sites.service";

const Sites = () => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

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
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        fullWidth
                    />
                    <Stack direction="column" spacing={0.5}>
                        <Typography>Проверять сайт:</Typography>
                        <Stack direction="row" spacing={1} alignItems="center">
                            <Typography>Выкл</Typography>
                            <Switch
                                checked={active}
                                defaultChecked
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setActive(e.target.checked)}
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
