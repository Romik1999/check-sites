import React from 'react';
import {useQuery} from "@tanstack/react-query";
import Loader from "../loader";
import {LogsService} from "../../services/logs.service";
import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";

const List = () => {

    const {isLoading, error, data} = useQuery({
        queryKey: ['logs'],
        queryFn: () => LogsService.getAll(),
        select: ({data}) => data
    })

    if (isLoading) return (<Loader/>);
    if (error) return "An error has occurred: " + error.message;

    return (
        <TableContainer component={Paper}>
            <Table sx={{minWidth: 650}} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell align="center">id</TableCell>
                        <TableCell>Url</TableCell>
                        <TableCell>response_code</TableCell>
                        <TableCell>response_body</TableCell>
                        <TableCell>created_at</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.data.map((row) => (
                        <TableRow
                            key={row.name}
                            sx={{'&:last-child td, &:last-child th': {border: 0}}}
                        >
                            <TableCell align="center">{row.id}</TableCell>
                            <TableCell component="th" scope="row"><a href={row.Url} target="_blank">{row.Url}</a></TableCell>
                            <TableCell>{row.response_code}</TableCell>
                            <TableCell>{row.response_body}</TableCell>
                            <TableCell>{row.created_at}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default List;
