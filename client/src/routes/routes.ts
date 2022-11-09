import React from 'react';
import { RouteProps } from 'react-router-dom';
import { Guardtypes, RoutePaths } from '../modules/consts/enum';

const LandingPage = React.lazy(() => import('../pages/LandingPage'));
const Dashboard = React.lazy(() => import('../pages/Dashboard'));
const Login = React.lazy(() => import('../pages/Login'));
const NotFound = React.lazy(() => import('../pages/Page404'));

export interface IRouteProps extends RouteProps {
    guard?: Guardtypes;
    component: React.LazyExoticComponent<() => JSX.Element>;
}

const routes: IRouteProps[] = [
    {
        path: RoutePaths.LandingPage,
        component: LandingPage,
        exact: true,
        guard: Guardtypes.Public,
    },
    {
        path: RoutePaths.Login,
        component: Login,
        exact: true,
        guard: Guardtypes.Auth,
    },
    {
        path: RoutePaths.Dashboard,
        component: Dashboard,
        exact: true,
        guard: Guardtypes.Private,
    },
    {
        path: RoutePaths.NotFound,
        component: NotFound,
    },
];

export default routes;
