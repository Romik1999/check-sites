import React, {useState} from 'react';
import SitesCreate from "./create";
import SitesList from "./list";
import ModalConfirm from "./modal/modalConfirm";
import ModalCreate from "./modal/modalCreate";
import {Box, Button} from "@mui/material";
import Loader from "../loader";
import AddIcon from "@mui/icons-material/Add";

const Sites = () => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <>
            <Box
                display="flex"
                columnGap="20px"
                alignItems="center"
            >
                <h1>Сайты</h1>
                <Button
                    variant="icon"
                    onClick={() => handleOpen()}
                >
                    <AddIcon/>
                </Button>
            </Box>
            <SitesList/>
            <ModalCreate
                handleClose={handleClose}
                handleOpen={handleOpen}
                onClose={handleClose}
                open={open}
            />
        </>
    );
};

export default Sites;
