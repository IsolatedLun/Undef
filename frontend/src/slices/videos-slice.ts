import { createSlice } from "@reduxjs/toolkit";
import { INF_Video } from "../components/modules/Video";

interface VideosState {
    videos: INF_Video[]
}

const initialState: VideosState = {
    videos: []
}

export const videosSlice = createSlice({
    name: 'music',
    initialState,
    reducers: {
        
    },
    extraReducers: (builder) => {
        
    }
})

export const {  } = videosSlice.actions;
export default videosSlice.reducer;