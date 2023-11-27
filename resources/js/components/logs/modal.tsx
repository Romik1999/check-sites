import React from 'react';
import MyModal from "../UI/MyModal";
import {Button, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableRow} from "@mui/material";
import {useQuery} from "@tanstack/react-query";
import {LogsService} from "../../services/logs.service";
import Loader from "../loader";

const Modal = (props) => {
    const {handleClose, handleOpen, open, logId} = props

    if (open) {
        const {isLoading, error, data} = useQuery({
            queryKey: ['log'],
            queryFn: () => LogsService.getById(logId),
            select: ({data}) => data
        })

        if (isLoading) return (<Loader/>);
        if (error) return "An error has occurred: " + error.message;

        return (
            <>
                <MyModal
                    handleClose={handleClose}
                    handleOpen={handleOpen}
                    onClose={handleClose}
                    open={open}
                    modalTitle="Log info"
                >
                    <Stack>
                        <TableContainer component={Paper}>
                            <Table sx={{minWidth: 300}} aria-label="simple table">
                                <TableBody>
                                    <TableRow>
                                        <TableCell>Id</TableCell>
                                        <TableCell>{data.logs.id}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Site</TableCell>
                                        <TableCell>
                                            <a href={data.logs.site.url} target="_blank">{data.logs.site.url}</a>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>response_code</TableCell>
                                        <TableCell>{data.logs.response_code}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>created_at</TableCell>
                                        <TableCell>{data.logs.created_at}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>response_header</TableCell>
                                        <TableCell>
                                            <pre>{data.logs.response_header}</pre>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>response_body</TableCell>
                                        <TableCell>
                                            <pre>{data.logs.response_body}</pre>
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Stack>
                </MyModal>
            </>
        );
    }
};

export default Modal;
