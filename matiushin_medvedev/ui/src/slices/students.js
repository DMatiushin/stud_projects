import {createSlice} from '@reduxjs/toolkit';


const initialState = {
    loaded: [],
    availableClasses: []
};

const studentsSlice = createSlice({
    name: 'students',
    initialState,
    reducers: {
        setStudents(state, action) {
            state.loaded = action.payload;
            state.availableClasses = Array.from(new Set(action.payload.map(s => s.group_num)));
        }
    }
})

export const {setStudents} = studentsSlice.actions;
const studentReducer = studentsSlice.reducer;
export default studentReducer;
