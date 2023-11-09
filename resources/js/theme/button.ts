import {Components} from "@mui/material";
import THEME from "./index";

const button: Components[`MuiButton`] = {
    styleOverrides: {
        root: {
            height: '50px',
            padding: `10px 20px`,
            borderRadius: '8px',
            boxSizing: "border-box",
            whiteSpace: 'nowrap',
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
        }
    ]
}

export default button
