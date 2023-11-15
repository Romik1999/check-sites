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

    '& button': {
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

    '& .auth__logo': {
        width: '70px',
    },
    '& .logo__name':{
        fontSize: '22px',
        fontWeight: 500,
        color: palette.white
    },
    '& .logo__text':{
        fontSize: '17px',
        fontWeight: 500,
        color: palette.white
    },
})

export const SidebarMenu = styled('div')({
    paddingLeft: '15px',

    '& ul': {
        padding: 0,
        margin: 0,
        display: 'flex',
        flexDirection: 'column',
        rowGap: '10px',
    },
    '& li': {
        cursor: 'pointer',
        transition: '0.2s',
        position: 'relative',
        padding: '8px 12px',
        display: 'flex',
        alignItems: 'center',
        columnGap: '15px',

        '&:before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            width: '5%',
            height: '100%',
            background: 'linear-gradient(90deg, #00549E 0%, #DBE7EE 100%)',
            transition: '0.2s',
            display: 'block',
            borderTopLeftRadius: '10px',
            borderBottomLeftRadius: '10px',
            opacity: 0,
            zIndex: 1,
        },
        '&:hover': {
            background: 'transparent',

            '&:before': {
                width: '100%',
                opacity: 1,
            }
        },
        '& .MuiListItemIcon-root': {
            minWidth: '24px',
            position: 'relative',
            zIndex: 2,

            '& svg': {
                fill: palette.white,
            }
        },
        '& span': {
            position: 'relative',
            zIndex: 2,
            fontSize: '18px',
            color: palette.white
        },
    },
    '& .MuiTouchRipple-root': {
        display: 'none'
    }
})

export const SidebarBottom = styled('div')({
    padding: '15px 20px',
    marginTop: 'auto',
    marginBottom: 0,

    '& button':{
        background: palette.white,
        border: `1px solid ${palette.white}`,
        color: palette.black.main,

        '&:hover':{
            background: 'transparent',
            color: palette.white,
        }
    }
})
