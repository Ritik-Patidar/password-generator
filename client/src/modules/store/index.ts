import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import rootReducer from '../reducers';

const customizedMiddleware = getDefaultMiddleware({
    serializableCheck: false,
});

export const store = configureStore(
    {
        reducer: rootReducer,
        devTools: true,
        middleware: customizedMiddleware,
    },
    //composeWithDevTools()
);

export type AppDispatch = typeof store.dispatch;
