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
            console.log(2222);
            console.log(queryClient.invalidateQueries(['sites']));
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

export default ModalCreate;
