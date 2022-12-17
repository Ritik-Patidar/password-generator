import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './authReducer';

const reducer = combineReducers({
    auth: authReducer,
});

export type RootState = ReturnType<typeof reducer>;

export default reducer;
