import React from 'react';
import {Checkbox, CheckboxProps, FormControlLabel, SxProps} from "@mui/material";

interface IMyCheckbox extends CheckboxProps{
    formSX?: SxProps,
    label?: string,
}
const MyCheckbox = (props: IMyCheckbox) => {
    const {formSX, label, ...rest } = props
    return (
        <>
            <FormControlLabel sx={{...formSX}} control={<Checkbox value={label} {...rest}/>} label={label} />
        </>
    );
};

export default MyCheckbox;