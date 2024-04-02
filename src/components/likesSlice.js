import { createSlice } from '@reduxjs/toolkit';

export const likesSlice = createSlice({
    name: 'likes',
    initialState: {
        likedStudents: 0,
    },
    reducers: {
        addLike: state => {
            state.likedStudents += 1;
        },
        removeLike: state => {
            state.likedStudents = Math.max(0, state.likedStudents - 1);
        },
    },
});

export const { addLike, removeLike } = likesSlice.actions;

export default likesSlice.reducer;
