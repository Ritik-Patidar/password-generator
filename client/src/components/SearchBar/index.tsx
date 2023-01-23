import React from 'react';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
interface SearchBarProps{
    className?:string;
}

const SearchBar = ({className=''}:SearchBarProps) => {
    return (
        <TextField
            id="outlined-start-adornment"
            placeholder="Search anything..."
            className={`rounded-xl bg-primary-lighter ${className}`}
            sx={{
                maxWidth: '40ch',
                mt: 2,
                border:"none",
                '& .MuiOutlinedInput-root': {
                    '&:hover fieldset': {
                        border: 'none',
                    },
                    '&.Mui-focused fieldset': {
                        border: 'none',
                    },
                },
            }}
            InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                        <SearchRoundedIcon sx={{color:"black"}} />
                    </InputAdornment>
                ),
            }}
        />
    );
};

export default SearchBar;
