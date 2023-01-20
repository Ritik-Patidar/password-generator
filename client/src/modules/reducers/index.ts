import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './authReducer';
import passwordReducer from './passwordReducer';

const reducer = combineReducers({
    auth: authReducer,
    passwords: passwordReducer
});

export type RootState = ReturnType<typeof reducer>;

export default reducer;
