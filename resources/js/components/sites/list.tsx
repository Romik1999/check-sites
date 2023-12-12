import React, {useState} from 'react';
import {
    Button,
    Paper,
    Stack, Switch,
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
import {ModalForm} from "./styled";
import {Site} from "../../common/types/site";

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
    const [modalError, setModalError] = useState('')
    const queryClient = useQueryClient();

    const openModalConfirm = () => setModal(prev=>({...prev, modalConfirm: true}));
    const closeModalConfirm = () => setModal(prev=>({...prev, modalConfirm: false}));
    const openModalUpdate = () => setModal(prev=>({...prev, modalUpdate: true}));
    const closeModalUpdate = () => setModal(prev=>({...prev, modalUpdate: false}));

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
        mutationFn: (site: Site) => SitesService.updateSite(site),
        onError: (error)=>{
            setModalError(error.message)
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['sites'])
            closeModalUpdate()
            setModalError('')
        },
    })

    const deleteMutation = useMutation({
        mutationFn: (id: number) => SitesService.deleteSite(id),
        onSuccess: () => {
            queryClient.invalidateQueries(['sites'])
            closeModalConfirm()
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

    const onSiteUpdate = (event) => {
        event.preventDefault()
        updateMutation.mutate({id: editingSite.id, url: editingSite.url, active: editingSite.active})
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
                                        onSwitch={(active)=>onToggle(row.id, row.url, active)}
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
                                                    handleOpenUpdate({id: row.id, url: row.url, active: row.active})
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
                        onClick={()=>onSiteDelete(editingSite.id)}
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
                {error}
                <ModalForm onSubmit={onSiteUpdate}>
                    <TextField
                        label="Домен" variant="outlined" placeholder="Введите домен"
                        value={editingSite.url}
                        onChange={(e) => setEditingSite(prev => ({...prev, url: e.target.value}))}
                        fullWidth
                    />
                    <Stack direction="column" spacing={0.5}>
                        <Typography>Проверка сайта:</Typography>
                        <Stack direction="row" spacing={1} alignItems="center">
                            <Typography>Выкл</Typography>
                            <Switch
                                checked={Boolean(editingSite.active)}
                                onChange={(e) => setEditingSite(prev => ({...prev, active: e.target.checked}))}
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
