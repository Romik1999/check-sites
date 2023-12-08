import React, {useState} from 'react';
import {
    Button,
    Paper, Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
} from "@mui/material";
import {SitesService} from "../../services/sites.service";
import ModalConfirm from "./modal/modalConfirm";
import MySwitch from "../UI/MySwitch";
import Loader from "../loader";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from '@mui/icons-material/Edit';
import ModalUpdate from "./modal/modalUpdate";

type Site = {
    id: string,
    url: string,
    active: boolean,
}

const SitesList = () => {
    const [open, setOpen] = useState(false);
    const [openUpdate, setOpenUpdate] = useState(false);

    const [editingSite, setEditingSite] = useState<Site|null>(null)
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleOpenUpdate = (data:{id: any, url: any, active: boolean}) => {
        setEditingSite(data)
        setOpenUpdate(true)
    }
    const handleCloseUpdate = () => {
        setOpenUpdate(false)
        setEditingSite(null)
    }

    const {isLoading, error, data} = useQuery({
        queryKey: ['sites'],
        queryFn: () => SitesService.getAll(),
        select: ({data}) => data
    })
    const queryClient = useQueryClient();

    const updateMutation = useMutation({
        mutationFn: ({id, url, active}:{id: any, url: any, active: any}) => SitesService.updateSite(id, url, active),
        onSettled: () => {
            queryClient.invalidateQueries(['sites'])
        },
    })

    if (isLoading) return (<Loader/>);
    if (error) return "An error has occurred: " + error.message;

    const onToggle =(id: any, url: any, active: any)=>{
        updateMutation.mutate({id, url, active})
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
                                                    handleOpenUpdate({id:row.id, url:row.url, active:row.active})
                                                }
                                            }
                                        >
                                            <EditIcon/>
                                        </Button>
                                        <Button
                                            variant="icon"
                                            onClick={
                                                () => {
                                                    handleOpen()
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
            <ModalConfirm
                handleClose={handleClose}
                handleOpen={handleOpen}
                onClose={handleClose}
                open={open}
            />
            <ModalUpdate
                handleClose={handleCloseUpdate}
                handleOpen={handleOpenUpdate}
                onClose={handleCloseUpdate}
                open={openUpdate}
                siteUrl={editingSite.url}
                siteId={editingSite.id}
                active={editingSite.active}
                onSwitch={onToggle}
            />
        </>
    );
};

export default SitesList;
