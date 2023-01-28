import React, { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { login, SignInType } from '../../modules/reducers/authReducer';
import loginImg from '../../assets/images/loginImg.svg';
import { CustomizedButton } from '../../components/Button';
import googleIcon from '../../assets/icons/googleIcon.svg';
import { RoutePaths } from '../../modules/consts/enum';
import StyledInput from '../../components/StyledInput';

const GoogleIcon = () => {
    return (
        <div className="bg-white rounded-md m-0">
            <img src={googleIcon} />
        </div>
    );
};

const Login = () => {
    const dispatch = useDispatch();

    const EMAIL = 'email';
    const PASSWORD = 'password';

    const initialValue = {
        [EMAIL]: '',
        [PASSWORD]: '',
    };
    const [values, setValues] = useState<SignInType>(initialValue);

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
            <div className="w-4/5 lg:w-3/5 h-4/5 flex">
                <div className="bg-[#030F1B] h-full w-full hidden md:flex items-center justify-center rounded-l-3xl">
                    <img className="object-contain" src={loginImg} alt="" />
                </div>
                <div className="bg-[#D9D9D9] h-full w-full rounded-3xl md:rounded-l-none md:rounded-r-3xl text-black">
                    <div className="h-full w-11/12 xxs:w-10/12 xs:w-4/6 flex flex-col justify-around mx-auto">
                        <p className="text-3xl text-center my-6">Hello Again!</p>
                        <div className="flex flex-col justify-between">
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
                                label="Password"
                                type="password"
                            />
                            <div className="mb-4">
                                <span className="float-right text-[#355BC0] mt-2 cursor-pointer">Forgot Password?</span>
                            </div>
                            <CustomizedButton sx={{ py: 1.5 }} variant="contained" onClick={handleFormSubmit}>
                                Sign In
                            </CustomizedButton>
                            <p className="text-center text-lg my-2">OR</p>

                            <CustomizedButton sx={{ py: 0.4 }} startIcon={<GoogleIcon />} variant="contained">
                                Sign in with Google
                            </CustomizedButton>
                        </div>
                        <p className="text-center text-base xs:text-lg my-4">
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
