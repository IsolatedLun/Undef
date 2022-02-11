import { configureStore } from "@reduxjs/toolkit";
import { videosSlice } from "./slices/videos-slice";
import { VideoApi } from './services/videoApi'

export const store = configureStore({
    reducer: {
        videos: videosSlice.reducer,

        [VideoApi.reducerPath]: VideoApi.reducer
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(VideoApi.middleware)
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch