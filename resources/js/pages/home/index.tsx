import React, {useState} from 'react';
import {useQuery} from "@tanstack/react-query";
import {queryKey} from "../../const";
import {SitesService} from "../../services/sites.service";
import {Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import SettingsIcon from '@mui/icons-material/Settings';

const Home = () => {

    const {isLoading, error, data} = useQuery({
        queryKey: [queryKey.product.cards],
        queryFn: () => SitesService.getAll(),
        select: ({data}) => data
    })

    if (isLoading) return "Loading...";
    if (error) return "An error has occurred: " + error.message;

    return (
        <div className="home">
            <h1>Sites</h1>
            <TableContainer component={Paper}>
                <Table sx={{minWidth: 650}} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">id</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Url</TableCell>
                            <TableCell>Active</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.item.data.map((row) => (
                            <TableRow
                                key={row.name}
                                sx={{'&:last-child td, &:last-child th': {border: 0}}}
                            >
                                <TableCell align="center">{row.id}</TableCell>
                                <TableCell component="th" scope="row">
                                    {row.name}
                                </TableCell>
                                <TableCell><a href={row.url}>{row.url}</a></TableCell>
                                <TableCell>{row.active}</TableCell>
                                <TableCell>
                                    <Button color="secondary"><DeleteIcon/></Button>
                                    <Button color="secondary"><SettingsIcon/></Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default Home;
