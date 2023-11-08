import {styled} from "@mui/material";

export const Login = styled('div')({
   display: 'flex',
    width: "100%",
    height: "100vh",

    '@media (max-width:769)': {
        flexDirection: 'column',
    }
})

export const LoginInfo = styled('div')({
    width: '50%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: "center",
    background: 'linear-gradient(90deg, #955DF4 0.2%, #5E61EE 100%)',
    padding: "20px"
})

export const LoginForm = styled('div')({
    width: '50%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: "center",
    alignItems: "center",
    background: '#FFF',
    padding: "20px"
})

export const LoginFormInner = styled('div')({
    display: "flex",
    flexDirection: "column",
    border: "1px solid #DBDBDB",
    borderRadius: "20px",
    padding: "20px",
    boxSizing: "border-box",
})

export const LoginLogo = styled('div')({
    display: 'flex',
})

export const LoginImage = styled('div')({
    display: 'flex',
    margin: "auto",

    '& img':{
        width: '100%',
        height: 'auto',
    }
})
