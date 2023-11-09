import {Components} from "@mui/material";
import THEME from "./index";

const textfield: Components[`MuiTextField`] = {
    styleOverrides: {
        root: (theme) => {
            const {palette} = THEME
            return {
                '&:before, &:after': {
                    display: 'none'
                },
                '& .MuiInputBase-root': {
                    border: 'none',
                    borderRadius: '0',
                },
                '& .MuiOutlinedInput-notchedOutline':{
                    border: 'none',
                    borderRadius: '0',
                },
                '& .MuiInputBase-input': {
                    height: '50px',
                    padding: `10px 20px`,
                    borderRadius: '8px',
                    boxSizing: "border-box",
                    border: `1px solid ${palette.grey.main}`,
                    color: `${palette.black.main}`,
                    transition: `0.2s`,

                    '&:focus': {
                        border: `1px solid ${palette.primary.main}`,
                        outline: 'none',
                    },
                    '&:placeholder': {
                        fontSize: `14px`,
                        fontWeight: '500',
                        lineHeight: '140%'
                    }
                },
                '& .MuiFormLabel-root': {
                    transform: 'translate(20px, 16px) scale(1)',
                    color: `1px solid ${palette.grey}`,
                    fontSize: '14px',
                    lineHeight: '120%',

                    '&.MuiInputLabel-shrink':{
                        transform: 'translate(20px, -6px) scale(0.75)',
                        color: `${palette.primary.main}`,
                        background: `${palette.white}`
                    }
                }
            }
        }
    }
}

export default textfield
