import studentsReducer from './students';
import curriculumReducer from './curriculums';
import {combineReducers} from 'redux';
import {configureStore} from '@reduxjs/toolkit';

const rootReducer = combineReducers({
    students: studentsReducer,
    curriculums: curriculumReducer
});

const store = configureStore({
    reducer: rootReducer,
});

export default store;
