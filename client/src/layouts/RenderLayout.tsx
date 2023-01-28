import React, { lazy, Suspense } from 'react';
import { ErrorBoundary } from '../components/ErrorBoundary';
import LoadingSpinner from '../components/Loader/Loader';
import {withOrientationChange } from 'react-device-detect';
import PrepareRoutes from '../routes/PrepareRoutes';
import { useSelector } from 'react-redux';
import { getIsAuth } from '../modules/selectors/auth';

const Layout = lazy(() => import('./Layout'));

const RenderLayout = () => {
    const isLoggedIn = useSelector(getIsAuth);

    return (
        <React.Fragment>
            <Suspense fallback={<LoadingSpinner withcoverbg="true" position="center" />}>
                <ErrorBoundary>
                    <div>
                        {isLoggedIn ? (
                            <Layout>
                                <PrepareRoutes />
                            </Layout>
                        ) : (
                            <PrepareRoutes />
                        )}
                    </div>
                </ErrorBoundary>
            </Suspense>
        </React.Fragment>
    );
};
export default withOrientationChange(RenderLayout);
