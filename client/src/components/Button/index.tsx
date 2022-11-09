import React from 'react';
import { styled } from '@mui/material/styles';
import Button, { ButtonProps } from '@mui/material/Button';


// const ColorButton = styled(Button)<ButtonProps>(({ theme }) => ({
//     color: theme.palette.getContrastText(purple[500]),
//     backgroundColor: purple[500],
//     '&:hover': {
//       backgroundColor: purple[700],
//     },
//   }));

const CustomizedButton = ({text,color}:any) => {

    const CustomButton = styled(Button)<ButtonProps>(() => ({
        color: color,
    }));

    return(
        <CustomButton>{text}</CustomButton>
    )
}

export default CustomizedButton ;