import React from 'react';
import {Input, InputProps, Typography} from "@mui/material";

interface IMyInputProps extends InputProps {
    border?: 'square' | 'round',
    errorMassage?: string
}

const MyInput = (props: IMyInputProps) => {
    const {name, placeholder, border , errorMassage, ...rest} = props
    return (
        <>
            <Input
                name={name}
                placeholder={placeholder}
                {...rest}
            />
            {errorMassage && <Typography>{errorMassage}</Typography> }
        </>
    );
};

export default MyInput;
