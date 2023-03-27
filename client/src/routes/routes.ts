import React from 'react';
import { RouteProps } from 'react-router-dom';
import { Guardtypes, RoutePaths } from '../modules/consts/enum';

const Login = React.lazy(() => import('../pages/Login'));
const SignUp = React.lazy(() => import('../pages/SignUp'));
const NotFound = React.lazy(() => import('../pages/Page404'));
const PasswordGenerator = React.lazy(() => import('../pages/passwordGeneretor'));
const ShowAllPasswords = React.lazy(() => import('../pages/passwordGeneretor/ShowAllPasswords'));


export interface IRouteProps extends RouteProps {
    guard?: Guardtypes;
    component: React.LazyExoticComponent<() => JSX.Element>;
}

const routes: IRouteProps[] = [
    {
        path: RoutePaths.Login,
        component: Login,
        exact: true,
        guard: Guardtypes.Auth,
    },
    {
        path: RoutePaths.SignUp,
        component: SignUp,
        exact: true,
        guard: Guardtypes.Auth,
    },
    {
        path: RoutePaths.PasswordGenerator,
        component: PasswordGenerator,
        exact: true,
        guard: Guardtypes.Private,
    },
    {
        path: RoutePaths.ShowAllPasswords,
        component: ShowAllPasswords,
        exact: true,
        guard: Guardtypes.Private,
    },
    {
        path: RoutePaths.NotFound,
        component: NotFound,
    },
];

export default routes;
