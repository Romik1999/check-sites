import React, {useState} from 'react';
import {useQuery} from "@tanstack/react-query";
import Loader from "../loader";
import {LogsService} from "../../services/logs.service";
import {Button, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import VisibilityIcon from '@mui/icons-material/Visibility';
import Modal from "./modal";
import MyModal from "../UI/MyModal";

const List = () => {
    const [open, setOpen] = useState(false);
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
                            <TableCell>Домен</TableCell>
                            <TableCell>Код ответа</TableCell>
                            <TableCell>Дата - Время</TableCell>
                            <TableCell>Действия</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.data.map((row) => {
                            const date = new Date(row.created_at)
                            const year = date.getFullYear()
                            const month = date.getMonth()
                            const day = date.getDay()
                            const hours = date.getHours()
                            const minutes = date.getMinutes()

                            const currentDate = `${day}.${month}.${year}`
                            const currentTime = `${hours}:${minutes}`
                                return (
                                    <TableRow
                                        key={row.id}
                                        sx={{'&:last-child td, &:last-child th': {border: 0}}}
                                    >
                                        <TableCell align="center">{row.id}</TableCell>
                                        <TableCell component="th" scope="row">
                                            <a href={row.site.url} target="_blank">{row.site.url}</a>
                                        </TableCell>
                                        <TableCell>{row.response_code}</TableCell>
                                        <TableCell>{currentDate} - {currentTime}</TableCell>
                                        <TableCell>
                                            <Button
                                                color="secondary"
                                                onClick={
                                                    () => {
                                                        handleOpen()
                                                    }
                                                }
                                            >
                                                <VisibilityIcon/>
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                )
                            }
                        )}
                    </TableBody>
                </Table>
            </TableContainer>

            <MyModal
                modalTitle="Информация о логе"
                onClose={handleOpen}
                open={open}
            >
                {/*<Stack>*/}
                {/*    <TableContainer component={Paper}>*/}
                {/*        <Table sx={{minWidth: 300}} aria-label="simple table">*/}
                {/*            <TableBody>*/}
                {/*                <TableRow>*/}
                {/*                    <TableCell>Id</TableCell>*/}
                {/*                    <TableCell>{data.logs.id}</TableCell>*/}
                {/*                </TableRow>*/}
                {/*                <TableRow>*/}
                {/*                    <TableCell>Домен</TableCell>*/}
                {/*                    <TableCell>*/}
                {/*                        <a href={data.logs.site.url} target="_blank">{data.logs.site.url}</a>*/}
                {/*                    </TableCell>*/}
                {/*                </TableRow>*/}
                {/*                <TableRow>*/}
                {/*                    <TableCell>Код ответа</TableCell>*/}
                {/*                    <TableCell>{data.logs.response_code}</TableCell>*/}
                {/*                </TableRow>*/}
                {/*                <TableRow>*/}
                {/*                    <TableCell>Дата время</TableCell>*/}
                {/*                    <TableCell>{currentDate} - {currentTime}</TableCell>*/}
                {/*                </TableRow>*/}
                {/*                <TableRow>*/}
                {/*                    <TableCell>Заголовки ответа</TableCell>*/}
                {/*                    <TableCell>*/}
                {/*                        <pre>{data.logs.response_header}</pre>*/}
                {/*                    </TableCell>*/}
                {/*                </TableRow>*/}
                {/*                <TableRow>*/}
                {/*                    <TableCell>Тело ответа</TableCell>*/}
                {/*                    <TableCell>*/}
                {/*                        <pre>{data.logs.response_body}</pre>*/}
                {/*                    </TableCell>*/}
                {/*                </TableRow>*/}
                {/*            </TableBody>*/}
                {/*        </Table>*/}
                {/*    </TableContainer>*/}
                {/*</Stack>*/}
            </MyModal>
        </>
    );
};

export default List;
