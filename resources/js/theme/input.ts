import {Components} from "@mui/material";
import THEME from "./index";

const input: Components[`MuiInput`] = {
    styleOverrides: {
        root: (theme) => {
            const {palette} = THEME
            return {
                '&:before, &:after':{
                    display: 'none'
                },
                '& .MuiInputBase-input':{
                    height: '48px',
                    padding: `14px 28px`,
                    borderRadius: '8px',
                    boxSizing: "border-box",
                    border: `1px solid ${palette.primary.main}`,
                    color: `${palette.primary.main}`,
                    transition: `0.2s`,
                    '&:focus': {
                        boxShadow: `0px 0px 5px 0px ${palette.primary.main}`,
                    },
                    '&:placeholder':{
                        fontSize: `14px`,
                        fontWeight: '500',
                        lineHeight: '140%'
                    }
                },
            }
        }
    }
}

export default input