import React, {useState} from 'react';
import {Button, Stack, Switch, TextField, Typography} from "@mui/material";
import {useQueryClient, useMutation} from "@tanstack/react-query";
import {SettingsService} from "../../services/settings.service";

const SettingsComponent = (props) => {
    const {data} = props;

    const [check_enabled, setCheckEnabled] = useState(data.check_enabled)
    const [telegram_enabled, setTelegramEnabled] = useState(data.telegram_enabled)
    const [telegram_token, setTelegramToken] = useState(data.telegram_token)
    const [telegram_chat_id, setTelegramChatId] = useState(data.telegram_chat_id)

    const queryClient = useQueryClient();

    const updateMutation = useMutation({
        mutationKey: ['settings'],
        mutationFn: (obj) => SettingsService.updateSettings(obj.check_enabled, obj.telegram_enabled, obj.telegram_token, obj.telegram_chat_id),
        onSettled: () => {
            queryClient.invalidateQueries(['settings'])
        },
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log("check_enabled: ", check_enabled);
        console.log("telegram_enabled: ", telegram_enabled);
        console.log("telegram_token: ", telegram_token);
        console.log("telegram_chat_id: ", telegram_chat_id);
        updateMutation.mutate(check_enabled, telegram_enabled, telegram_token, telegram_chat_id)
    }

    return (
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
    );
};

export default SettingsComponent;
