import studentsReducer from './students';
import curriculumReducer from './curriculums';
import gradebooksReducer from './gradebook';
import {combineReducers} from 'redux';
import {configureStore} from '@reduxjs/toolkit';

const rootReducer = combineReducers({
    students: studentsReducer,
    curriculums: curriculumReducer,
    gradebookReducer: gradebooksReducer
});

const store = configureStore({
    reducer: rootReducer,
});

export default store;
