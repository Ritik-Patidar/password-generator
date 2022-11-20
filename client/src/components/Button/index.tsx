import React from 'react';
import { styled } from '@mui/material/styles';
import Button, { ButtonProps } from '@mui/material/Button';
import googleIcon from '../../assets/icons/googleIcon.svg';

export const CustomizedButton = styled(Button)<ButtonProps>(({ theme }) => ({
    color: '#FFF',
    backgroundColor: '#355BC0',
    '&:hover': {
        backgroundColor: '#355BC0',
    },
}));

// const CustomizedButton = ({text,color}:any) => {

//     const CustomButton = styled(Button)<ButtonProps>(() => ({
//         color: color,
//     }));

//     return(
//         <CustomButton>{text}</CustomButton>
//     )
// }

// export const GoogleButton = styled((props) => (
//     <Button {...props} startIcon={<img src={googleIcon} />}>
//         Sign in with Google
//     </Button>
// ))<ButtonProps>(({ theme }) => ({
//     color: '#FFF',
//     backgroundColor: '#355BC0',
//     '&:hover': {
//         backgroundColor: '#355BC0',
//     },
// }));

// export const GoogleButton = () => {

//     <Button variant="outlined" startIcon={<DeleteIcon />}>
//   Delete
// </Button>
// }
