import React, { PropsWithChildren, Suspense } from 'react';
import { ErrorBoundary } from '../components/ErrorBoundary';
import LoadingSpinner from '../components/Loader/Loader';
import Header from '../components/Header';

function Layout(props: PropsWithChildren<any>) {
    return (
        <>
            <ErrorBoundary>
                <Header />
                <Suspense fallback={<LoadingSpinner withcoverbg="true" position="center" />}>
                    {props.children}
                </Suspense>
            </ErrorBoundary>
        </>
    );
}
export default Layout;
