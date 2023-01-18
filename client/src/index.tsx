import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './modules/store';
import './scss/style.scss';
import RenderLayout from './layouts/RenderLayout';
import { ErrorBoundary } from './components/ErrorBoundary';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { interceptor } from './utils/interceptor';
import { Router } from 'react-router-dom';
import browserHistory from './utils/history';

export const Loading = () => (
    <div className="pt-3 text-center">
        <div className="spinner-grow" role="status">
            <span className="sr-only">Loading...</span>
        </div>
    </div>
);
const root = ReactDOM.createRoot(document.getElementById('root') as Element);
const App = () => {
    interceptor();
    return (
        <Provider store={store}>
            <Router history={browserHistory} >
                <Suspense fallback={<Loading />}>
                    <ErrorBoundary>
                        <ToastContainer />
                        <RenderLayout />
                    </ErrorBoundary>
                </Suspense>
            </Router>
        </Provider>
    );
};

root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
);
