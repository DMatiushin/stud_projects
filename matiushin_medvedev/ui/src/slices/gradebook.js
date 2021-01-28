import {createSlice} from '@reduxjs/toolkit';


const initialState = {
    loaded: [],
};

const gradebooksSlice = createSlice({
    name: 'gradebooks',
    initialState,
    reducers: {
        setGradebooks(state, action) {
            state.loaded = action.payload;
        }
    }
})

export const {setGradebooks} = gradebooksSlice.actions;
const gradebooksReducer = gradebooksSlice.reducer;
export default gradebooksReducer;
