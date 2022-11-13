import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { RoutePaths } from '../modules/consts/enum';
import { getIsAuth } from '../modules/selectors/auth';

const AuthGuard = ({ children }: { children: JSX.Element }) => {
    const isAuth = useSelector(getIsAuth);

    //!  Change landingPage route to the route of home of the application to redirect to home page after login/signup

    return isAuth ? <Redirect to={RoutePaths.LandingPage} /> : children;
};

export default AuthGuard;
