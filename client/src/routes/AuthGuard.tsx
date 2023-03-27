import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { RoutePaths } from '../modules/consts/enum';
import { getIsAuth } from '../modules/selectors/auth';

const AuthGuard = ({ children }: { children: JSX.Element }) => {
    const isAuth = useSelector(getIsAuth);

    return isAuth ? <Redirect to={RoutePaths.PasswordGenerator} /> : children;
};

export default AuthGuard;
