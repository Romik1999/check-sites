import React, {SyntheticEvent, useEffect, useState} from 'react';
import {useQuery, useQueryClient, useMutation} from "@tanstack/react-query";
import {SitesService} from "../../services/sites.service";
import {
    Button, Checkbox,
    Input,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField
} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import SettingsIcon from '@mui/icons-material/Settings';

const Home = () => {
    const [name, setName] = useState('')
    const [url, setUrl] = useState('')
    const [active, setActive] = useState(false)

    const queryClient = useQueryClient();

    const {isLoading, error, data} = useQuery({
        queryKey: ['sites'],
        queryFn: () => SitesService.getAll(),
        select: ({data}) => data
    })

    if (isLoading) return "Loading...";
    if (error) return "An error has occurred: " + error.message;


    const deleteMutation = useMutation({
        mutationFn: (id: number) => SitesService.deleteSite(id),
        onSettled: () => {
            queryClient.invalidateQueries(['sites'])
        },
    })

    const createMutation = useMutation({
        mutationKey: ['sites'],
        mutationFn: (obj) => SitesService.createSite(obj.name, obj.url, obj.active),
        onSettled: () => {
            queryClient.invalidateQueries(['sites'])
            setName('')
            setUrl('')
            setActive(false)
        },
    })

    const onSiteDelete = (id: number) => {
        deleteMutation.mutate(id)
    }

    const onSiteCreate = async (e: SyntheticEvent) => {
        e.preventDefault()
        createMutation.mutate({name, url, active})
    }


    return (
        <div className="home">
            <h1>Sites</h1>

            <form onSubmit={onSiteCreate}>
                <TextField
                    label="Site name" variant="outlined" placeholder="Set siteName"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    fullWidth
                />
                <TextField
                    label="Site url" variant="outlined" placeholder="Set siteUrl"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    fullWidth
                />
                <Checkbox
                    label="Site name" variant="outlined" placeholder="Set siteName"
                    checked={active}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setActive(e.target.checked)}
                    fullWidth
                />
                <Button
                    variant="contained"
                    type="submit"
                    fullWidth
                >
                    Add new Site
                </Button>
            </form>


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
                                <TableCell><a href={row.url} target="_blank">{row.url}</a></TableCell>
                                <TableCell>{row.active}</TableCell>
                                <TableCell>
                                    <Button
                                        color="secondary"
                                        onClick={() => onSiteDelete(row.id)}
                                    ><DeleteIcon/></Button>
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
