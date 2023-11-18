import React from 'react';
import {useMutation, useQueryClient} from "@tanstack/react-query";
import DeleteIcon from "@mui/icons-material/Delete";
import {Button, Fade, Modal, Stack, Switch, TextField, Typography} from "@mui/material";
import {SitesService} from "../../../services/sites.service";
import Backdrop from "@mui/material/Backdrop";
import {ModalForm, ModalTop, ModalWrapper} from "./styled";
import CloseIcon from "@mui/icons-material/Close";

const ModalConfirm = (props) => {
    const {id} = props

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const queryClient = useQueryClient();


    const deleteMutation = useMutation({
        mutationFn: (id: number) => SitesService.deleteSite(id),
        onSettled: () => {
            queryClient.invalidateQueries(['sites'])
        },
    })

    const onSiteDelete = (id: number) => {
        deleteMutation.mutate(id)
    }

    return (
        <>
            <Button
                color="secondary"
                onClick={handleOpen}
            >
                <DeleteIcon/>
            </Button>
            <Modal
                className="modal"
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={handleClose}
                closeAfterTransition
                slots={{backdrop: Backdrop}}
                slotProps={{
                    backdrop: {
                        timeout: 500,
                    },
                }}
            >
                <Fade in={open}>
                    <ModalWrapper>
                        <ModalTop>
                            <div className="modal__title">Confirm delete</div>
                            <CloseIcon onClick={() => handleClose()}/>
                        </ModalTop>
                        <Stack direction="row" spacing={2}  justifyContent="center">
                            <Button
                                onClick={() => onSiteDelete(id)}
                                color="success"
                            >
                                Yes
                            </Button>
                            <Button
                                onClick={() => handleClose()}
                                color="error"
                            >
                                No
                            </Button>
                        </Stack>
                    </ModalWrapper>
                </Fade>
            </Modal>
        </>
    );
};

export default ModalConfirm;
