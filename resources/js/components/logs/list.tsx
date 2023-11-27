import React, {useState} from 'react';
import {useQuery} from "@tanstack/react-query";
import Loader from "../loader";
import {LogsService} from "../../services/logs.service";
import {Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import VisibilityIcon from '@mui/icons-material/Visibility';
import Modal from "./modal";

const List = () => {
    const [open, setOpen] = useState(false);
    const [logId, setLogId] = useState(null);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const {isLoading, error, data} = useQuery({
        queryKey: ['logs'],
        queryFn: () => LogsService.getAll(),
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
                            <TableCell>response_code</TableCell>
                            <TableCell>created_at</TableCell>
                            <TableCell>Active</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.data.map((row) => (
                            <TableRow
                                key={row.id}
                                sx={{'&:last-child td, &:last-child th': {border: 0}}}
                            >
                                <TableCell align="center">{row.id}</TableCell>
                                <TableCell component="th" scope="row"><a href={row.site.url}
                                                                         target="_blank">{row.site.url}</a></TableCell>
                                <TableCell>{row.response_code}</TableCell>
                                <TableCell>{row.created_at}</TableCell>
                                <TableCell>
                                    <Button
                                        color="secondary"
                                        onClick={
                                            () => {
                                                handleOpen()
                                                setLogId(row.id)
                                            }
                                        }
                                    >
                                        <VisibilityIcon/>
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Modal
                handleClose={handleClose}
                handleOpen={handleOpen}
                onClose={handleClose}
                open={open}
                logId={logId}
            />
        </>
    );
};

export default List;
