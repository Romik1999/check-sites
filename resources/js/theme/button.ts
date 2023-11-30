import {Components} from "@mui/material";
import THEME from "./index";

const button: Components[`MuiButton`] = {
    styleOverrides: {
        root: {
            borderRadius: '5px',
            boxSizing: "border-box",
            whiteSpace: 'nowrap',
            minWidth: '32px',
        }
    },
    variants: [
        {
            props: {color: 'primary'},
            style: (theme) => {
                const {palette} = THEME
                return {
                    backgroundColor: palette.primary.main,
                    color: palette.white.main,
                    border: `1px solid ${palette.primary.main}`,
                    '&:hover': {
                        backgroundColor: 'transparent',
                        color: palette.primary.main
                    }
                }
            }
        },
        {
            props: {color: 'secondary'},
            style: (theme) => {
                const {palette} = THEME
                return {
                    backgroundColor: 'transparent',
                    color: palette.primary.main,
                    border: `1px solid ${palette.primary.main}`,
                    '&:hover': {
                        backgroundColor: palette.primary.main,
                        color: palette.white.main
                    }
                }
            }
        },
        {
            props: { variant: 'icon' },
            style: (theme) => {
                const {palette} = THEME
                return {
                    backgroundColor: 'transparent',
                    color: palette.primary.main,
                    padding: '6px',

                    '&:hover': {
                        backgroundColor: palette.primary.main,
                        color: palette.white
                    }
                }
            }
        },
    ]
}

export default button
