import {createSlice} from '@reduxjs/toolkit';


const initialState = {
    loaded: [],
    userIdToDelete: -1,
    userToUpdate: {},
    userToCreate: {}
};

const studentsSlice = createSlice({
    name: 'students',
    initialState,
    reducers: {
        setStudents(state, action) {
            console.log('Receive event');
            state.loaded = action.payload;
        }
    }
})

export const {setStudents} = studentsSlice.actions;
const studentReducer = studentsSlice.reducer;
export default studentReducer;
