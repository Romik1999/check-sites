import React from 'react';
import {useMutation, useQueryClient} from "@tanstack/react-query";
import DeleteIcon from "@mui/icons-material/Delete";
import {Button, Fade, Modal, Stack, Switch, TextField, Typography} from "@mui/material";
import {SitesService} from "../../../services/sites.service";
import Backdrop from "@mui/material/Backdrop";
import {ModalForm, ModalTop, ModalWrapper} from "./styled";
import CloseIcon from "@mui/icons-material/Close";
import MyModal from "../../UI/MyModal";

const ModalConfirm = (props) => {
    const {siteId, handleClose, handleOpen, open, ...rest} = props

    const queryClient = useQueryClient();

    const deleteMutation = useMutation({
        mutationFn: (id: number) => SitesService.deleteSite(id),
        onSettled: () => {
            queryClient.invalidateQueries(['sites'])
        },
    })

    const onSiteDelete = (siteId: number) => {
        deleteMutation.mutate(siteId)
    }

    return (
        <>
            <MyModal
                modalTitle="Confirm delete"
                handleClose={handleClose}
                handleOpen={handleOpen}
                onClose={handleClose}
                open={open}
            >
                <Stack direction="row" spacing={2} justifyContent="center">
                    <Button
                        color="success"
                        onClick={
                            () => {
                                onSiteDelete(siteId)
                                handleClose()
                            }
                        }
                    >
                        Yes
                    </Button>
                    <Button
                        color="error"
                        onClick={() => handleClose()}
                    >
                        No
                    </Button>
                </Stack>
            </MyModal>
        </>
    );
};

export default ModalConfirm;
