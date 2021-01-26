import {createSlice} from '@reduxjs/toolkit';


const initialState = {
    loaded: [],
};

const curriculumSlice = createSlice({
    name: 'curriculums',
    initialState,
    reducers: {
        setCurriculums(state, action) {
            state.loaded = action.payload;
        }
    }
})

export const {setCurriculums} = curriculumSlice.actions;
const curriculumReducer = curriculumSlice.reducer;
export default curriculumReducer;
