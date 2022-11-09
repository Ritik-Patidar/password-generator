import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './authReducer';
import slideShowReducer from './slideShowReducer';

const reducer = combineReducers({
    auth: authReducer,
    slideShow: slideShowReducer,
});

export type RootState = ReturnType<typeof reducer>;

export default reducer;
