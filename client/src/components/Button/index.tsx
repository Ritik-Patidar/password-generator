import React from 'react';
import { styled } from '@mui/material/styles';
import Button, { ButtonProps } from '@mui/material/Button';
import googleIcon from '../../assets/icons/googleIcon.svg';
import { ButtonBase } from '@mui/material';

interface StyledButtonProps {
    label: string;
    type?: string;
    onClick: () => void;
}
const defaultBtn = {
    backgroundColor: '#355BC0',
    border: '1px solid #355BC0',
    borderRadius: '10px',
    padding: '0.375rem 0.75rem',
    color: '#fff',
};
const CancelBtn = {
    backgroundColor: '#5B5B5B',
    border: '1px solid #355BC0',
    borderRadius: '10px',
    padding: '0.375rem 0.75rem',
    color: '#fff',
};

export const CustomizedButton = styled(Button)<ButtonProps>(({ theme }) => ({
    color: '#FFF',
    backgroundColor: '#355BC0',
    '&:hover': {
        backgroundColor: '#355BC0',
    },
}));

export const StyledButton = ({ label, type = 'default', onClick }: StyledButtonProps) => {
    const btnType = (type: string) => {
        switch (type) {
            case 'cancel':
                return CancelBtn;
            case 'submit':
                return defaultBtn;
            default:
                return defaultBtn;
        }
    };
    return (
        <>
            <ButtonBase onClick={onClick} sx={btnType(type)}>
                {label}
            </ButtonBase>
        </>
    );
};
