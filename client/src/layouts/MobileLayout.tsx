import React, { PropsWithChildren, Suspense } from 'react';
import { ErrorBoundary } from '../components/ErrorBoundary';
import LoadingSpinner from '../components/Loader/Loader';

function MobileLayout(props: PropsWithChildren<any>) {
    return (
        <>
            <ErrorBoundary>
                <Suspense fallback={<LoadingSpinner withcoverbg="true" position="center" />}>{props.children}</Suspense>
            </ErrorBoundary>
        </>
    );
}
export default MobileLayout;
