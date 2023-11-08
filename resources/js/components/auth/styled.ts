import {styled} from "@mui/material";

export const Auth = styled('section')({
    display: 'flex',
    width: '100%',
})
export const AuthInfo = styled('div')({
    width: '50%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: "center",
    padding: '20px',
    background: 'linear-gradient(90deg, #955DF4 0.2%, #5E61EE 100%)',

    '& .auth__img': {
        width: '100%',
        margin: 'auto'
    }
})
export const AuthForm = styled('div')({
    display: 'flex',
    width: '50%',
    padding: '20px',
    flexDirection: 'column',
    alignItems: "center",
})

export const AuthFormInner = styled('div')({
    maxWidth: "600px",
    width: "100%",
    margin: "auto",
    display: "flex",
    flexDirection: "column",
    rowGap: "15px",
})
