import { createTheme } from '@mui/material/styles';
import checkbox from "./checkbox";
import palette from "./palette";
import input from "./input";
import textfield from "./textfield";
import button from "./button";
import {typography} from "./typography";

const THEME = createTheme({
    palette,
    typography,
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
