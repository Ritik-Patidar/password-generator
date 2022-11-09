import React from 'react';
import { RoutePaths } from '../../modules/consts/enum';
import { useSelector } from 'react-redux';
import { getIsAuth } from '../../modules/selectors/auth';

const Page404 = () => {
    const isAuth = useSelector(getIsAuth);

    return (
        <div className="c-app c-default-layout flex-row align-items-center">
            <div>
                <div className="justify-content-center">
                    <div>
                        <div className="clearfix">
                            <h1 className="float-left display-3 mr-4">404</h1>
                            <h4 className="pt-3">Oops! You{"'"}re lost.</h4>
                            <p className="text-muted float-left">The page you are looking for was not found.</p>
                        </div>

                        <div>
                            <a href="/" className="btn-custom btn-primary btn-md">
                                {isAuth ? 'Go to Home' : 'Go to Sign in'}
                            </a>
                            {/* <CButton
                                to={isAuth ? RoutePaths.Dashboard : RoutePaths.Login}
                                className="btn-custom btn-primary btn-md"
                            >
                                {isAuth ? 'Go to Home' : 'Go to Sign in'}
                            </CButton> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Page404;
