import React from 'react';
import { useDispatch } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router-dom';
import { Guardtypes, RoutePaths } from '../modules/consts/enum';
import { authSuccess } from '../modules/reducers/authReducer';
import AuthGuard from './AuthGuard';
import PrivateGuard from './PrivateGuard';
import routes, { IRouteProps } from './routes';
const PrepareRoutes = () => {
    const dispatch = useDispatch();

    const user = localStorage.getItem('loggedInUserInfo');

    if (user) {
        const loggedInUser = JSON.parse(user);
        dispatch(authSuccess(loggedInUser));
    }

    const genrateComponent = (routeProps: IRouteProps): JSX.Element => {
        switch (routeProps.guard) {
            case Guardtypes.Private:
                return (
                    <PrivateGuard>
                        <routeProps.component />
                    </PrivateGuard>
                );
            case Guardtypes.Auth:
                return (
                    <AuthGuard>
                        <routeProps.component />
                    </AuthGuard>
                );
            case Guardtypes.Public:
                return <routeProps.component />;
            default:
                if (window.location.pathname === '/') return <Redirect to={RoutePaths.PasswordGenerator} />;
                return <routeProps.component />;
        }
    };
    return (
        <Switch>
            {routes.map((route, index) => (
                <Route key={index} path={route.path} exact={route.exact}>
                    {genrateComponent(route)}
                </Route>
            ))}
        </Switch>
    );
};

export default PrepareRoutes;
