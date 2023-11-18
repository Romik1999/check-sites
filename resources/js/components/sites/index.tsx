import React from 'react';
import SitesCreate from "./create";
import SitesList from "./list";
import ModalConfirm from "./modal/modalConfirm";
import ModalCreate from "./modal/modalCreate";
import {Box, Button} from "@mui/material";
import Loader from "../loader";

const Sites = () => {

    return (
        <>
            <Box
                display="flex"
                columnGap="20px"
                alignItems="center"
            >
                <h1>Sites</h1>
                <ModalCreate/>
            </Box>
            <SitesList/>
            {/*<ModalConfirm/>*/}
        </>
    );
};

export default Sites;
