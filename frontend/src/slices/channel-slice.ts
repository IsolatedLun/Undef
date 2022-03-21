import { createSlice } from "@reduxjs/toolkit";
import { ChannelApi } from "../services/channelApi";

interface ChannelState {
    isCurrentlySubscribed: boolean | undefined;
}

const initialState: ChannelState = { 
    isCurrentlySubscribed: undefined
 }

export const channelSlice = createSlice({
    name: 'channel',
    initialState,
    reducers: {
        setCurrentlySubscribed(state, action) {
            state.isCurrentlySubscribed = action.payload;
        }
        
    },
    extraReducers: (builder) => {
        builder.addMatcher(ChannelApi.endpoints.subscrible.matchFulfilled, (state, action) => {
            state.isCurrentlySubscribed = action.payload.data['subscribed'];
        })
    }
})

export const { setCurrentlySubscribed } = channelSlice.actions;
export default channelSlice.reducer;