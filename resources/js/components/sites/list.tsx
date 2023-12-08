import React, {useState} from 'react';
import {
    Button,
    Paper,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Typography
} from "@mui/material";
import {SitesService} from "../../services/sites.service";
import MySwitch from "../UI/MySwitch";
import Loader from "../loader";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from '@mui/icons-material/Edit';
import MyModal from "../UI/MyModal";
import {ModalForm} from "./modal/styled";

type Site = {
    id: string,
    url: string,
    active: boolean,
}

const SitesList = () => {
    const [modal, setModal] = useState({
        modalConfirm: false,
        modalUpdate: false
    });
    const [editingSite, setEditingSite] = useState<Site | null>({
        id: '',
        url: '',
        active: false,
    })
    const queryClient = useQueryClient();

    const openModalConfirm = () => setModal({modalConfirm: true});
    const closeModalConfirm = () => setModal({modalConfirm: false});
    const openModalUpdate = () => setModal({modalUpdate: true});
    const closeModalUpdate = () => setModal({modalUpdate: false});

    const handleOpenUpdate = (data: { id: any, url: any, active: boolean }) => {
        setEditingSite(data)
    }
    const handleCloseUpdate = () => {
        setEditingSite(null)
    }

    const {isLoading, error, data} = useQuery({
        queryKey: ['sites'],
        queryFn: () => SitesService.getAll(),
        select: ({data}) => data
    })


    const updateMutation = useMutation({
        mutationFn: ({id, url, active}: { id: any, url: any, active: any }) => SitesService.updateSite(id, url, active),
        onSettled: () => {
            queryClient.invalidateQueries(['sites'])
        },
    })

    const deleteMutation = useMutation({
        mutationFn: (id: number) => SitesService.deleteSite(id),
        onSettled: () => {
            queryClient.invalidateQueries(['sites'])
        },
    })

    if (isLoading) return (<Loader/>);
    if (error) return "An error has occurred: " + error.message;

    const onToggle = (id: any, url: any, active: any) => {
        updateMutation.mutate({id, url, active})
    }


    const onSiteDelete = (id: number) => {
        deleteMutation.mutate(id)
    }

    return (
        <>
            <TableContainer component={Paper}>
                <Table sx={{minWidth: 650}} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">id</TableCell>
                            <TableCell>Домен</TableCell>
                            <TableCell>Проверка</TableCell>
                            <TableCell>Действия</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.item.data.map((row) => (
                            <TableRow
                                key={row.id}
                                sx={{'&:last-child td, &:last-child th': {border: 0}}}
                            >
                                <TableCell align="center">{row.id}</TableCell>
                                <TableCell component="th" scope="row">
                                    <a href={row.url} target="_blank">{row.url}</a>
                                </TableCell>
                                <TableCell>
                                    <MySwitch
                                        active={Boolean(row.active)}
                                        url={row.url}
                                        id={row.id}
                                        onSwitch={onToggle}
                                    />
                                </TableCell>
                                <TableCell>
                                    <Stack direction="row" spacing={1} alignItems="center">
                                        <Button
                                            variant="icon"
                                            onClick={
                                                () => {
                                                    handleOpenUpdate({id: row.id, url: row.url, active: row.active})
                                                    openModalUpdate()
                                                }
                                            }
                                        >
                                            <EditIcon/>
                                        </Button>
                                        <Button
                                            variant="icon"
                                            onClick={
                                                () => {
                                                    handleOpenUpdate({id: row.id})
                                                    openModalConfirm()
                                                }
                                            }
                                        >
                                            <DeleteIcon/>
                                        </Button>
                                    </Stack>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <MyModal
                modalTitle="Вы уверены"
                onClose={closeModalConfirm}
                open={modal.modalConfirm}
            >
                <Stack
                    direction="row"
                    spacing={2}
                    justifyContent="center"
                    sx={{padding: '20px 0'}}

                >
                    <Button
                        variant="contained"
                        color="success"
                        onClick={
                            () => {
                                onSiteDelete(editingSite.id)
                                closeModalConfirm()
                            }
                        }
                    >
                        Да
                    </Button>
                    <Button
                        variant="contained"
                        color="error"
                        onClick={closeModalConfirm}
                    >
                        Нет
                    </Button>
                </Stack>
            </MyModal>

            <MyModal
                modalTitle="Обновить сайт"
                onClose={closeModalUpdate}
                open={modal.modalUpdate}
            >
                <ModalForm>
                    <TextField
                        label="Домен" variant="outlined" placeholder="Введите домен"
                        value={editingSite.url}
                        onChange={(e) => setSiteUrl(e.target.value)}
                        fullWidth
                    />
                    <Stack direction="column" spacing={0.5}>
                        <Typography>Проверка сайта:</Typography>
                        <Stack direction="row" spacing={1} alignItems="center">
                            <Typography>Выкл</Typography>
                            <MySwitch
                                active={Boolean(editingSite.active)}
                                url={editingSite.url}
                                id={editingSite.id}
                            />
                            <Typography>Вкл</Typography>
                        </Stack>
                    </Stack>
                    <Button
                        type="submit"
                        color="success"
                        variant="contained"
                        fullWidth
                    >
                        Обновить сайт
                    </Button>
                </ModalForm>
            </MyModal>


        </>
    );
};

export default SitesList;
