import React, {useState} from 'react';
import {Button, Stack, Switch, TextField, Typography} from "@mui/material";
import {useQuery} from "@tanstack/react-query";
import Loader from "../../components/loader";
import {SettingsService} from "../../services/settings.service";
import {useMutation, useQueryClient} from "@tanstack/react-query";

const Settings = () => {

    const [telegram_token, setTelegramToken] = useState('')
    const [telegram_chat_id, setTelegramChatId] = useState('')
    const [check_enabled, setCheckEnabled] = useState('')
    const [telegram_enabled, setTelegramEnabled] = useState('')
    const queryClient = useQueryClient();

    const {isLoading, error, data} = useQuery({
        queryKey: ['settings'],
        queryFn: () => SettingsService.getAll(),
        select: ({data}) => data
    })

    if (isLoading) return (<Loader/>);
    if (error) return "An error has occurred: " + error.message;

    const updateMutation = useMutation({
        mutationKey: ['settings'],
        mutationFn: (obj) => SettingsService.updateSettings(obj.telegram_token, obj.telegram_chat_id, obj.check_enabled, obj.telegram_enabled),
        onSettled: () => {
            queryClient.invalidateQueries(['settings'])
        },
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        updateMutation.mutate(telegram_token, telegram_chat_id, check_enabled, telegram_enabled)
    }

    return (
        <div>
            <h1>Settings</h1>
            <form onSubmit={handleSubmit}>
                <Stack direction="row" spacing={1} alignItems="center">
                    <Typography>Service active</Typography>
                    <Stack direction="row" spacing={1} alignItems="center">
                        <Typography>Off</Typography>
                        <Switch
                            checked={check_enabled}
                            onChange={(e) => setCheckEnabled(e.target.checked)}
                        />
                        <Typography>On</Typography>
                    </Stack>
                    {check_enabled}
                </Stack>
                <Stack direction="row" spacing={1} alignItems="center">
                    <Typography>Telegram alert active</Typography>
                    <Stack direction="row" spacing={1} alignItems="center">
                        <Typography>Off</Typography>
                        <Switch
                            checked={telegram_enabled}
                            onChange={(e) => setTelegramEnabled(e.target.checked)}
                        />
                        <Typography>On</Typography>
                    </Stack>
                    {telegram_enabled}
                </Stack>
                <TextField
                    label="telegram_token" variant="outlined" placeholder="Введите telegram_token"
                    onChange={(e) => setTelegramToken(e.target.value)}
                    fullWidth
                />
                <TextField
                    label="telegram_chat_id" variant="outlined" placeholder="Введите telegram_chat_id"
                    onChange={(e) => setTelegramChatId(e.target.value)}
                    fullWidth
                />
                <Button type="submit" color="success">{data ? 'Save' : 'Update'}</Button>
            </form>
        </div>
    );
};

export default Settings;
