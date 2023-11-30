import React, {useState} from 'react';
import {
    Button,
    Paper,
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
import {useQuery} from "@tanstack/react-query";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from '@mui/icons-material/Edit';
import ModalUpdate from "./modal/modalUpdate";

const SitesList = () => {
    const [open, setOpen] = useState(false);
    const [openUpdate, setOpenUpdate] = useState(false);
    const [siteId, setSiteId] = useState(null);
    const [siteUrl, setSiteUrl] = useState('');
    const [siteActive, setSiteActive] = useState(true);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleOpenUpdate = () => setOpenUpdate(true);
    const handleCloseUpdate = () => setOpenUpdate(false);
    const handleChangeSiteId = (siteId: number) => setSiteId(siteId)

    const handleChangeForUpdate = (siteUrl: string, siteActive: boolean) => {
        setSiteUrl(siteUrl)
        setSiteActive(siteActive)
    }


    const {isLoading, error, data} = useQuery({
        queryKey: ['sites'],
        queryFn: () => SitesService.getAll(),
        select: ({data}) => data
    })

    if (isLoading) return (<Loader/>);
    if (error) return "An error has occurred: " + error.message;

    return (
        <>
            <TableContainer component={Paper}>
                <Table sx={{minWidth: 650}} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">id</TableCell>
                            <TableCell>Url</TableCell>
                            <TableCell>Active</TableCell>
                            <TableCell>Actions</TableCell>
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
                                    <MySwitch active={row.active} url={row.url} id={row.id}/>
                                </TableCell>
                                <TableCell>
                                    <Button
                                        color="secondary"
                                        onClick={
                                            () => {
                                                handleOpenUpdate()
                                                handleChangeForUpdate(row.url, row.active)
                                                handleChangeSiteId(row.id)
                                            }
                                        }
                                    >
                                        <EditIcon/>
                                    </Button>
                                    <Button
                                        color="secondary"
                                        onClick={
                                            () => {
                                                handleOpen()
                                                handleChangeSiteId(row.id)
                                            }
                                        }
                                    >
                                        <DeleteIcon/>
                                    </Button>
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
                siteId={siteId}
            />
            <ModalUpdate
                handleClose={handleCloseUpdate}
                handleOpen={handleOpenUpdate}
                onClose={handleCloseUpdate}
                open={openUpdate}
                siteUrl={siteUrl}
                siteActive={siteActive}
                setSiteUrl={setSiteUrl}
                setSiteActive={setSiteActive}
                siteId={siteId}
            />
        </>
    );
};

export default SitesList;
