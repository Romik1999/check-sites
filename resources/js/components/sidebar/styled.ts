import {styled} from "@mui/material";
import palette from "../../theme/palette";

export const Sidebar = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    width: '250px',
    background: `linear-gradient(180deg, #005EB0 0%, #002F58 100%);`,
    borderTopRightRadius: '20px',
    borderBottomRightRadius: '20px',
    rowGap: '50px',
    boxSizing: 'border-box',

    '& button':{
        marginTop: 'auto',
        marginBottom: 0,
    }

})

export const SidebarLogo = styled('div')({
    display: 'flex',
    columnGap: '15px',
    alignItems: 'center',
    paddingTop: '30px',
    paddingLeft: '15px',
    paddingRight: '15px',

    '& .auth__logo':{
        width: '70px',
    },
})

export const SidebarMenu = styled('div')({
    padding: '0 15px',

    '& .auth__logo':{
        width: '70px',
    },
})

export const SidebarBottom = styled('div')({
    padding: '15px 20px',
    marginTop: 'auto',
    marginBottom: 0,
})
