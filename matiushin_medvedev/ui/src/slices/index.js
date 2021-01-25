import studentsReducer from './students';
import {combineReducers} from 'redux';
import {configureStore} from '@reduxjs/toolkit';

const rootReducer = combineReducers({
    students: studentsReducer,
});

const store = configureStore({
    reducer: rootReducer,
});

export default store;
