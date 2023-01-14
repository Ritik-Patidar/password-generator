import React, { PropsWithChildren, Suspense } from 'react';
import { ErrorBoundary } from '../components/ErrorBoundary';
import LoadingSpinner from '../components/Loader/Loader';
import Header from '../components/Header';
import { useLocation } from 'react-router-dom';

function Layout(props: PropsWithChildren<any>) {
    const location = useLocation();
    return (
        <>
            <ErrorBoundary>
                { location.pathname === '/' ? <></> : <Header /> }
                <Suspense fallback={<LoadingSpinner withcoverbg="true" position="center" />}>
                    {props.children}
                </Suspense>
            </ErrorBoundary>
        </>
    );
}
export default Layout;
