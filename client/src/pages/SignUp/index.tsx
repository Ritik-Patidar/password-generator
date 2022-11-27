import React, { useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { signUp } from '../../modules/actions/auth';
import { isAuthLoading } from '../../modules/selectors/auth';
import loginImg from '../../assets/images/loginImg.svg';
import FilledInput from '@mui/material/FilledInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';
import { CustomizedButton } from '../../components/Button';
import { RoutePaths } from '../../modules/consts/enum';

interface SignUpType {
    name: string;
    email: string;
    password: string;
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

const SignUp = () => {
    const isLoading = useSelector(isAuthLoading);
    const dispatch = useDispatch();

    const NAME = 'name';
    const EMAIL = 'email';
    const PASSWORD = 'password';
    const CONFIRM_PASSWORD = 'confirmPassword';

    const initialValue = {
        [NAME]: '',
        [EMAIL]: '',
        [PASSWORD]: '',
    };

    const [values, setValues] = useState<SignUpType>({ ...initialValue });
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [showPassword, setShowPassword] = useState<boolean>(false);

    const handleClickShowPassword = useCallback(() => {
        setShowPassword(!showPassword);
    }, [showPassword]);
    const handleMouseDownPassword = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    }, []);

    const handleInputChange = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            const { name, value } = event.target;
            if (name === CONFIRM_PASSWORD) setConfirmPassword(value);
            else setValues((prevState) => ({ ...prevState, [name]: value }));
        },
        [values, confirmPassword],
    );

    const handleFormSubmit = useCallback(
        (event: any) => {
            event.preventDefault();
            if (values[PASSWORD] === confirmPassword) dispatch(signUp(values));
        },
        [values, confirmPassword],
    );

    return (
        <>
            <div className="h-screen flex justify-center items-center">
                <div className=" w-4/5 lg:w-3/5 h-4/5 flex">
                    <div className="bg-[#030F1B] h-full w-full flex items-center justify-center rounded-l-3xl">
                        <img className="object-contain" src={loginImg} alt="" />
                    </div>
                    <div className="bg-[#D9D9D9] h-full w-full rounded-r-3xl text-black">
                        <div className="h-full w-4/6 flex flex-col justify-around mx-auto">
                            <p className="text-3xl text-center my-6">Sign Up</p>
                            <div className="flex flex-col justify-between">
                                <FormControl sx={{ my: 1 }} variant="filled">
                                    <InputLabel htmlFor="filled-adornment-password">Name</InputLabel>
                                    <FilledInput
                                        id="outlined-basic"
                                        type="text"
                                        name={NAME}
                                        value={values[NAME]}
                                        onChange={handleInputChange}
                                        sx={inputTheme}
                                        endAdornment={<InputAdornment position="end">Aa</InputAdornment>}
                                    />
                                </FormControl>
                                <FormControl sx={{ my: 1 }} variant="filled">
                                    <InputLabel htmlFor="filled-adornment-password">Email</InputLabel>
                                    <FilledInput
                                        id="outlined-basic"
                                        type="email"
                                        name={EMAIL}
                                        value={values[EMAIL]}
                                        onChange={handleInputChange}
                                        sx={inputTheme}
                                        endAdornment={<InputAdornment position="end">@</InputAdornment>}
                                    />
                                </FormControl>
                                <FormControl sx={{ my: 1 }} variant="filled">
                                    <InputLabel htmlFor="filled-adornment-password">New Password</InputLabel>
                                    <FilledInput
                                        id="outlined-basic"
                                        type={showPassword ? 'text' : 'password'}
                                        name={PASSWORD}
                                        value={values[PASSWORD]}
                                        onChange={handleInputChange}
                                        sx={inputTheme}
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
                                </FormControl>
                                <FormControl sx={{ my: 1 }} variant="filled">
                                    <InputLabel htmlFor="filled-adornment-password">Confirm Password</InputLabel>
                                    <FilledInput
                                        id="outlined-basic"
                                        type={showPassword ? 'text' : 'password'}
                                        name={CONFIRM_PASSWORD}
                                        value={confirmPassword}
                                        onChange={handleInputChange}
                                        sx={inputTheme}
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
                                </FormControl>
                                <CustomizedButton
                                    sx={{ py: 1.5, my: 1 }}
                                    variant="contained"
                                    onClick={handleFormSubmit}
                                >
                                    Create Account
                                </CustomizedButton>
                            </div>
                            <p className="text-center text-lg my-4">
                                Have an account?{' '}
                                <Link to={RoutePaths.Login} className="text-[#355BC0] cursor-pointer">
                                    Sign In
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SignUp;
