import { createTheme } from '@mui/material/styles';
import checkbox from "./checkbox";
import palette from "./palette";
import input from "./input";
import textfield from "./textfield";
import button from "./button";

const THEME = createTheme({
    palette,
    typography: {
        fontFamily: ['Roboto', 'sans-serif'].join(','),
        fontSize: 14,
    },
    components:{
        MuiFormControlLabel:{
            ...checkbox
        },
        MuiInput:{
            ...input
        },
        MuiTextField:{
            ...textfield
        },
        MuiButton:{
            ...button
        },
    }
});

export default THEME
