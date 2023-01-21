import React, { useState, useCallback } from 'react';
import FilledInput from '@mui/material/FilledInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';

interface StyledInputProps {
    name: string;
    type?: string;
    label: string;
    value: any;
    disabled?: boolean;
    readOnly?: boolean;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
const inputTheme = {
    backgroundColor: '#FFF',
    borderRadius: '10px',
    borderBottom: 'none',
    '& .MuiInputBase-root , .MuiFilledInput-root': {
        backgroundColor: '#FFF',
        borderRadius: '10px',
        borderBottom: 'none',
        border: 'none',
        '& fieldset': {
            borderColor: 'red',
            border: 'none',
        },
    },
    '& .MuiFilledInput-input:-webkit-autofill': {
        borderRadius: 'inherit !important',
    },
    '& .MuiFilledInput-underline': {
        borderBottom: '0px solid white !important',
    },
    '&:hover': {
        backgroundColor: '#FFF',
        borderBottom: 'none',
    },
    '&.Mui-focused': {
        backgroundColor: '#FFF',
        borderBottom: 'none',
    },
};

const StyledInput = ({
    name,
    type = 'text',
    label,
    value,
    onChange,
    disabled = false,
    readOnly = false,
}: StyledInputProps) => {
    const [showPassword, setShowPassword] = useState<boolean>(false);

    const handleClickShowPassword = useCallback(() => {
        setShowPassword(!showPassword);
    }, [showPassword]);
    const handleMouseDownPassword = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    }, []);

    const getInputField = ({ type, name, value, onChange }: any) => {
        switch (type) {
            case 'email':
                return (
                    <FilledInput
                        id="outlined-basic"
                        type={type}
                        name={name}
                        value={value}
                        onChange={onChange}
                        sx={inputTheme}
                        disableUnderline={true}
                        inputProps={{
                            autoComplete: 'off',
                        }}
                        endAdornment={<InputAdornment position="end">@</InputAdornment>}
                        disabled={disabled}
                        readOnly={readOnly}
                    />
                );

            case 'website':
                return (
                    <FilledInput
                        id="outlined-basic"
                        type="text"
                        name={name}
                        value={value}
                        onChange={onChange}
                        sx={inputTheme}
                        autoComplete="off"
                        disableUnderline={true}
                        endAdornment={<InputAdornment position="end">.com</InputAdornment>}
                        disabled={disabled}
                        readOnly={readOnly}
                    />
                );
            case 'password':
                return (
                    <FilledInput
                        id="outlined-basic"
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        value={value}
                        onChange={onChange}
                        sx={inputTheme}
                        disableUnderline={true}
                        autoComplete="off"
                        disabled={disabled}
                        readOnly={readOnly}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                );

            default:
                return (
                    <FilledInput
                        id="outlined-basic"
                        type="text"
                        name={name}
                        value={value}
                        onChange={onChange}
                        sx={inputTheme}
                        autoComplete="off"
                        disableUnderline={true}
                        endAdornment={<InputAdornment position="end">Aa</InputAdornment>}
                        disabled={disabled}
                        readOnly={readOnly}
                    />
                );
        }
    };

    return (
        <>
            <FormControl sx={{ my: 1 }} variant="filled">
                <InputLabel>{label}</InputLabel>
                {getInputField({ type, name, value, onChange })}
            </FormControl>
        </>
    );
};

export default StyledInput;
