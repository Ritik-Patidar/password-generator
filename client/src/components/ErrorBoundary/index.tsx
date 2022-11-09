import React, { FunctionComponent, PropsWithChildren } from 'react';
import { ErrorBoundary as ErrorBound, FallbackProps, withErrorBoundary } from 'react-error-boundary';
import * as Sentry from '@sentry/react';

const onError = (error: Error, info: any) => {
    // console.error('error: ', error);
    const componentStack = info.componentStack;
    Sentry.withScope((scope) => {
        scope.setExtras({ componentStack });
        Sentry.captureException(error);
    });
};

export const ErrorBoundary = (props: PropsWithChildren<any>) => {
    return (
        <ErrorBound FallbackComponent={ErrorFallback} onError={onError}>
            {props.children}
        </ErrorBound>
    );
};

const ErrorFallback: FunctionComponent<FallbackProps> = (props: FallbackProps) => {
    const { error, resetErrorBoundary } = props;
    return (
        <div className="card my-5">
            <div className="card-header">
                <p>
                    There was an error in loading this page.{' '}
                    <span style={{ cursor: 'pointer', color: '#0077FF' }} onClick={resetErrorBoundary}>
                        Reload this page
                    </span>{' '}
                </p>
            </div>
            <div className="card-body">
                <details className="error-details">
                    <summary>Click for error details</summary>
                    <pre>{error?.message}</pre>
                </details>
            </div>
        </div>
    );
};

export const WithHandler = (ComponentThatMayError: any) => {
    return withErrorBoundary(ComponentThatMayError, {
        FallbackComponent: ErrorFallback,
        onError,
    });
};
