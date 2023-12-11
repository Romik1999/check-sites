import React from 'react';
import {Fade, Modal} from "@mui/material";
import Backdrop from "@mui/material/Backdrop";
import {ModalTop, ModalWrapper} from "../../sites/styled";
import CloseIcon from "@mui/icons-material/Close";

const MyModal = (props: any) => {
    const {modalTitle, children, open, onClose, ...rest} = props

    return (
        <>
            <Modal
                className="modal"
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={onClose}
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
                            <CloseIcon onClick={onClose}/>
                        </ModalTop>
                        {children}
                    </ModalWrapper>
                </Fade>
            </Modal>
        </>
    );
};

export default MyModal;
