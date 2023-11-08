import {styled} from "@mui/material";
import theme from "../../theme";
import {blue, green, red} from "@mui/material/colors";

export const Auth = styled('section')({
    display: 'flex',
    width: '100%',
})
export const AuthInfo = styled('div')(({theme}) => ({
    width: '50%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: "center",
    padding: '20px',
    background: 'linear-gradient(90deg, #955DF4 0.2%, #5E61EE 100%)',
    [theme.breakpoints.down('sm')]: {
        display: 'none'
    },

    '& .auth__img': {
        width: '100%',
        margin: 'auto'
    },
}))
export const AuthForm = styled('div')(({theme}) => ({
    display: 'flex',
    width: '50%',
    padding: '20px',
    flexDirection: 'column',
    alignItems: "center",
    [theme.breakpoints.down('sm')]: {
        width: '100%',
    },
}))

export const AuthFormInner = styled('div')({
    maxWidth: "570px",
    width: "100%",
    margin: "auto",
    border: '1px solid rgba(219, 219, 219, 1)',
    borderRadius: '10px',
    paddingTop: '100px',
    paddingLeft: '70px',
    paddingRight: '70px',
    paddingBottom: '22px',
    boxSizing: 'border-box'
})
