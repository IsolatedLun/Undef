import { configureStore } from "@reduxjs/toolkit";
import { videosSlice } from "./slices/videos-slice";
import { VideoApi } from './services/videoApi'
import { ChannelApi } from "./services/channelApi";

export const store = configureStore({
    reducer: {
        videos: videosSlice.reducer,

        [VideoApi.reducerPath]: VideoApi.reducer,
        [ChannelApi.reducerPath]: ChannelApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(VideoApi.middleware, ChannelApi.middleware)
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch