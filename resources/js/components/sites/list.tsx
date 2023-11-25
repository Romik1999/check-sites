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
import MyModal from "../UI/MyModal";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import DeleteIcon from "@mui/icons-material/Delete";

const SitesList = () => {
    const [open, setOpen] = useState(false);
    const [siteId, setSiteId] = useState(null);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleChangeSiteId = (siteId: number) => setSiteId(siteId)


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
                                    <MySwitch active={row.active} id={row.id}/>
                                </TableCell>
                                <TableCell>
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
        </>
    );
};

export default SitesList;
