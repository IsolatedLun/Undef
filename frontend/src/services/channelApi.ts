import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { ChannelData } from "../components/main/Channel";
import { VideoData } from "../components/main/VideoTab";
import { INF_Video } from "../components/modules/Video";
import { API_URL } from "../consts";

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

        getChannel: builder.query<ChannelData, number>({
            query: (channel_id) => ({
                url: `/channel/${channel_id}`,
                method: 'GET'
            })
        })
    })
})

export const { useGetChannelQuery } = ChannelApi;