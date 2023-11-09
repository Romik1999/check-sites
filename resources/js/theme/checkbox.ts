import {Components} from "@mui/material";
import THEME from "./index";

const checkbox: Components[`MuiFormControlLabel`] = {
    styleOverrides: {
        root: (theme) => {
            const {palette} = THEME
            return {
                padding: '0',
                margin: '0 !important',
                display: 'flex',
                alignItems: "center",
                columnGap: '10px',
                transition: '0.2s',
                width: 'fit-content',

                '& .MuiCheckbox-root': {
                    padding: '0',
                    margin: '0',
                    width: '20px',
                    minWidth: '20px',
                    height: '20px',
                    color: '#CCD1D2',

                    '& svg': {
                        width: '20px',
                        minWidth: '20px',
                        height: '20px',
                    },
                    '&.Mui-checked': {
                        color: `${palette.primary.main}`
                    }
                },
                '& .MuiTypography-root': {
                    color: '#00171F',
                    fontSize: '14px',
                    fontWeight: '500',
                    lineHeight: '140%',
                }
            }
        }
    }
}

export default checkbox