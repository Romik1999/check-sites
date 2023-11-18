import {styled} from "@mui/material";
import palette from "../../../theme/palette";


export const ModalWrapper = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '600px',
    width: '100%',
    margin: 'auto',
    zIndex: 2,
    background: palette.white,
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    borderRadius: '10px',
})
export const ModalTop = styled('div')({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    columnGap: '30px',
    borderBottom: `1px solid ${palette.grey.main}`,
    boxSizing: 'border-box',
    padding: '30px 20px',
})

export const ModalForm = styled('form')({
    boxSizing: 'border-box',
    padding: '30px 20px',
    display: 'flex',
    flexDirection: 'column',
    rowGap: '15px',
})
