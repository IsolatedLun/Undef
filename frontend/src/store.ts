import { configureStore } from "@reduxjs/toolkit";
import { videosSlice } from "./slices/videos-slice";
import { VideoApi } from './services/videoApi'
import { ChannelApi } from "./services/channelApi";
import { AuthApi } from "./services/authApi";
import { authSlice } from "./slices/auth-slice";
import { modalSlice } from "./slices/modal-slice";
import { channelSlice } from "./slices/channel-slice";

export const store = configureStore({
    reducer: {
        videos: videosSlice.reducer,
        auth: authSlice.reducer,
        modal: modalSlice.reducer,
        channel: channelSlice.reducer,

        [VideoApi.reducerPath]: VideoApi.reducer,
        [ChannelApi.reducerPath]: ChannelApi.reducer,
        [AuthApi.reducerPath]: AuthApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(VideoApi.middleware, ChannelApi.middleware, AuthApi.middleware,)
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch