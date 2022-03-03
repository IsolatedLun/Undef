import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { ExtraResponse } from "../components/funcs/utilFuncs";
import { ChannelData } from "../components/main/channel/ChannelRouter";
import { INF_Video } from "../components/modules/Video";
import { API_URL } from "../consts";


interface ExtraResponseAndChannelData extends ExtraResponse, ChannelData {}
interface SubscribtionResponse {
    data: {
        subscribed: boolean;
        subscribers: number;
    }
}

export const ChannelApi = createApi({
    reducerPath: 'ChannelApi',
    baseQuery: fetchBaseQuery({
        baseUrl: API_URL + '/api/channels', 
        prepareHeaders: (headers, { getState }) => {
            return headers
        }
    }),
    endpoints: (builder) => ({
        getVideos: builder.query<INF_Video[], void>({
            query: () => ({
                url: '',
                method: 'GET'
            })
        }),

        getChannel: builder.query<ExtraResponseAndChannelData, any>({
            query: ({ channel_id, user_id }) => ({
                url: `/channel/${channel_id}/${user_id}`,
                method: 'GET',
            })
        }),

        uploadVideo: builder.mutation<ExtraResponse, any>({
            query: ({ videoData, channel_id }) => ({
                url: `/channel/${channel_id}/upload`,
                method: 'POST',
                body: videoData,
                headers: {
                    'authorization': `Bearer ${localStorage.getItem('access')}`
                }
            })
        }),

        subscrible: builder.mutation<SubscribtionResponse, any>({
            query: (channel_id) => ({
                url: `/channel/${channel_id}/subscribe`,
                method: 'POST',
                headers: {
                    'authorization': `Bearer ${localStorage.getItem('access')}`
                }
            })
        }),
    })
})

export const { useGetChannelQuery, useUploadVideoMutation, useSubscribleMutation } = ChannelApi;