import {styled} from "@mui/material";
import palette from "../../theme/palette";

export const Admin = styled('section')({
    display: 'flex',
    width: '100%',
    background: `${palette.primary.light}`
})

export const Page = styled('div')({
    width: 'calc(100% - 250px)',
    boxSizing: 'border-box',
    padding: '15px',
    display: 'flex',
    flexDirection: 'column',
    rowGap: '15px',
})
export const Content = styled('div')({
    background: `${palette.white}`,
    borderRadius: '15px',
    padding: '30px',
    height: '100%',
})
