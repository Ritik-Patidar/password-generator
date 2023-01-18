import React, { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { signUp, SignUpType } from '../../modules/reducers/authReducer';
import loginImg from '../../assets/images/loginImg.svg';
import { CustomizedButton } from '../../components/Button';
import { RoutePaths } from '../../modules/consts/enum';
import StyledInput from '../../components/StyledInput';

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
    const [showCPassword, setShowCPassword] = useState<boolean>(false);

    const handleClickShowPassword = useCallback(() => {
        setShowPassword(!showPassword);
    }, [showPassword]);

    const handleClickShowCPassword = useCallback(() => {
        setShowCPassword(!showCPassword);
    }, [showCPassword]);

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
                                <StyledInput
                                    name={NAME}
                                    value={values[NAME]}
                                    onChange={handleInputChange}
                                    label="Name"
                                    type="text"
                                />
                                <StyledInput
                                    name={EMAIL}
                                    value={values[EMAIL]}
                                    onChange={handleInputChange}
                                    label="Email"
                                    type="email"
                                />
                                <StyledInput
                                    name={PASSWORD}
                                    value={values[PASSWORD]}
                                    onChange={handleInputChange}
                                    label="New Password"
                                    type="password"
                                />
                                <StyledInput
                                    name={CONFIRM_PASSWORD}
                                    value={confirmPassword}
                                    onChange={handleInputChange}
                                    label="Confirm Password"
                                    type="password"
                                />
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
