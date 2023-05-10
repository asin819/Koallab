import{createSlice} from '@reduxjs/toolkit';
import {apiCallBegan} from './Api'

const slice = createSlice({
    name: 'posts',
    initialState:{
        list: [],
        loading: FontFaceSetLoadEvent,
    },
    reducers:{
        postsRequested:(posts,action)=>{
            posts.loading = true
        },

        postReceived: (posts,action)=>{
            posts.list = action.payload;
            posts.loading = false
        },

        postsRequestFailed: (posts, action) => {
            posts.loading = false;
        }
    }
})
export default slice.reducer;

const{postsRequested,postsReceived, postsRequestedFailed} = slice.actions;

const url = "/posts";

export const loadPosts =() => (dispatch) => {
    return dispatch(
        apiCallBegin({
            url,
            onStart: postsRequested.type,
            onSuccess: postsReceived.type,
            onError: postsRequestFailed.type
        })
    )
}