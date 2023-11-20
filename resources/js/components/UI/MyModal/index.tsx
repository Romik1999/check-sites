import React, {useState, createContext} from 'react';
import {Button, Fade, Modal} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import Backdrop from "@mui/material/Backdrop";
import {ModalTop, ModalWrapper} from "../../sites/modal/styled";
import CloseIcon from "@mui/icons-material/Close";

const MyModal = (props:any) => {
    const { buttonIcon, modalTitle, children, modalState, ...rest} = props

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
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
                            <div className="modal__title">{modalTitle}</div>
                            <CloseIcon onClick={() => handleClose()}/>
                        </ModalTop>
                        {children}
                    </ModalWrapper>
                </Fade>
            </Modal>
        </>
    );
};

export default MyModal;
