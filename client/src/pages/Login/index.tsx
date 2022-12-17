import React, { useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { login, SignInType } from '../../modules/reducers/authReducer';
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
import googleIcon from '../../assets/icons/googleIcon.svg';
import { RoutePaths } from '../../modules/consts/enum';

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

const GoogleIcon = () => {
    return (
        <div className="bg-white rounded-md m-0">
            <img src={googleIcon} />
        </div>
    );
};

const Login = () => {
    const isLoading = useSelector(isAuthLoading);
    const dispatch = useDispatch();

    const [values, setValues] = useState<SignInType>({
        email: '',
        password: '',
    });
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
            setValues((prevState) => ({
                ...prevState,
                [name]: value,
            }));
        },
        [values],
    );

    const handleFormSubmit = useCallback(
        (event: any) => {
            event.preventDefault();
            dispatch(login(values));
        },
        [values],
    );

    return (
        <div className="h-screen flex justify-center items-center">
            <div className=" w-4/5 lg:w-3/5 h-4/5 flex">
                <div className="bg-[#030F1B] h-full w-full flex items-center justify-center rounded-l-3xl">
                    <img className="object-contain" src={loginImg} alt="" />
                </div>
                <div className="bg-[#D9D9D9] h-full w-full rounded-r-3xl text-black">
                    <div className="h-full w-4/6 flex flex-col justify-around mx-auto">
                        <p className="text-3xl text-center my-6">Hello Again!</p>
                        <div className="flex flex-col justify-between">
                            <FormControl sx={{ my: 1 }} variant="filled">
                                <InputLabel htmlFor="filled-adornment-password">Email</InputLabel>
                                <FilledInput
                                    id="outlined-basic"
                                    type="email"
                                    name="email"
                                    value={values.email}
                                    onChange={handleInputChange}
                                    sx={inputTheme}
                                    endAdornment={<InputAdornment position="end">@</InputAdornment>}
                                />
                            </FormControl>
                            <FormControl sx={{ my: 1 }} variant="filled">
                                <InputLabel htmlFor="filled-adornment-password">Password</InputLabel>
                                <FilledInput
                                    id="outlined-basic"
                                    type={showPassword ? 'text' : 'password'}
                                    name="password"
                                    value={values.password}
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
                                <div>
                                    <span className="float-right text-[#355BC0] mt-2 cursor-pointer">
                                        Forgot Password?
                                    </span>
                                </div>
                            </FormControl>
                            <CustomizedButton sx={{ py: 1.5 }} variant="contained" onClick={handleFormSubmit}>
                                Sign In
                            </CustomizedButton>
                            <p className="text-center text-lg my-2">OR</p>

                            <CustomizedButton sx={{ py: 0.4 }} startIcon={<GoogleIcon />} variant="contained">
                                Sign in with Google
                            </CustomizedButton>
                        </div>
                        <p className="text-center text-lg my-4">
                            Don’t have account yet?{' '}
                            <Link to={RoutePaths.SignUp} className="text-[#355BC0] cursor-pointer">
                                Sign Up
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
