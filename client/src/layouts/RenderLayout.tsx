import React, { lazy, Suspense } from 'react';
import { ErrorBoundary } from '../components/ErrorBoundary';
import LoadingSpinner from '../components/Loader/Loader';
import { isMobileOnly, withOrientationChange } from 'react-device-detect';
import PrepareRoutes from '../routes/PrepareRoutes';
import { useSelector } from 'react-redux';
import { getIsAuth } from '../modules/selectors/auth';

const Layout = lazy(() => import('./Layout'));
const MobileLayout = lazy(() => import('./MobileLayout'));

const RenderLayout = () => {
    const isLoggedIn = useSelector(getIsAuth);

    return (
        <React.Fragment>
            <Suspense fallback={<LoadingSpinner withcoverbg="true" position="center" />}>
                <ErrorBoundary>
                    <div style={{ background: '#1E1E1E' }}>
                        <div style={{ background: 'linear-gradient(180deg, #001329 0%, rgba(34, 34, 80, 0) 100%)' }}>
                            {isLoggedIn ? (
                                isMobileOnly ? (
                                    <MobileLayout>
                                        <PrepareRoutes />
                                    </MobileLayout>
                                ) : (
                                    <Layout>
                                        <PrepareRoutes />
                                    </Layout>
                                )
                            ) : (
                                <PrepareRoutes />
                            )}
                        </div>
                    </div>
                </ErrorBoundary>
            </Suspense>
        </React.Fragment>
    );
};
export default withOrientationChange(RenderLayout);
