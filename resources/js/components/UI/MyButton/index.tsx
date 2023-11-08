import React from 'react';
import {Button} from "@mui/material";

const MyButton = (props: any) => {
    const {name, ...rest} = props
    return (
        <Button variant="contained" name={name} {...rest}/>
    );
};

export default MyButton;
