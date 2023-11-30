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

        const date = new Date(data.logs.created_at)
        const year = date.getFullYear()
        const month = date.getMonth()
        const day = date.getDay()
        const hours = date.getHours()
        const minutes = date.getMinutes()

        const currentDate = `${day}.${month}.${year}`
        const currentTime = `${hours}:${minutes}`

        return (
            <>
                <MyModal
                    handleClose={handleClose}
                    handleOpen={handleOpen}
                    onClose={handleClose}
                    open={open}
                    modalTitle="Информация о логе"
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
                                        <TableCell>Домен</TableCell>
                                        <TableCell>
                                            <a href={data.logs.site.url} target="_blank">{data.logs.site.url}</a>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Код ответа</TableCell>
                                        <TableCell>{data.logs.response_code}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Дата время</TableCell>
                                        <TableCell>{currentDate} - {currentTime}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Заголовки ответа</TableCell>
                                        <TableCell>
                                            <pre>{data.logs.response_header}</pre>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Тело ответа</TableCell>
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
