import React, { useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../modules/actions/auth';
import { isAuthLoading } from '../../modules/selectors/auth';
import { ErrorBoundary } from '../../components/ErrorBoundary';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

const Login = () => {
    const [enteredEmail, setEnteredEmail] = useState('');
    const [enteredPassword, setEnteredPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [rememberMe, setRememberMe] = useState(false);

    const isLoading = useSelector(isAuthLoading);

    const dispatch = useDispatch();

    const passwordChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEnteredPassword(event.target.value);
    };

    const emailChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEnteredEmail(event.target.value);
    };

    const rememberMeChangeHandler = () => {
        setRememberMe((prev) => !prev);
    };

    const formValidateHandler = (email: string, password: string): boolean => {
        let passwordErr = '';
        let emailErr = '';

        if (!password) {
            passwordErr = 'Password is required';
            setPasswordError(passwordErr);
        } else {
            if (password.length < 8) {
                passwordErr = 'Password must contain atleast 8 characters';
                setPasswordError(passwordErr);
            } else {
                passwordErr = '';
                setPasswordError(passwordErr);
            }
        }

        if (!email) {
            emailErr = 'Email is required';
            setEmailError(emailErr);
        } else {
            const emailRegex =
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if (!emailRegex.test(email.trim())) {
                emailErr = 'Please enter a valid email address';
                setEmailError(emailErr);
            } else {
                emailErr = '';
                setEmailError(emailErr);
            }
        }

        return !emailErr && !passwordErr;
    };

    const formSubmitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (formValidateHandler(enteredEmail, enteredPassword)) {
            try {
                await dispatch(login(enteredEmail, enteredPassword, rememberMe));
            } catch (err: any) {
                toast(err, {
                    type: 'error',
                    position: 'top-right',
                    autoClose: 3000,
                    pauseOnFocusLoss: true,
                    closeOnClick: true,
                    pauseOnHover: false,
                });
            }
        }
    };

    return (
        <div>
            
        </div>
    );
};

export default Login;
