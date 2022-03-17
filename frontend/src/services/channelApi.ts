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
            if((getState() as any).auth.isLogged)
                headers.append('authorization', `Bearer ${localStorage.getItem('access')}`);

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
                url: `/channel/upload/${channel_id}`,
                method: 'POST',
                body: videoData,
            })
        }),

        editVideo: builder.mutation<ExtraResponse, any>({
            query: ({ editedData, channel_id, video_id}) => ({
                url: `/channel/${channel_id}/edit/${video_id}`,
                method: 'POST',
                body: editedData,
            })
        }),

        editChannelDetails: builder.mutation<ExtraResponse, any>({
            query: ({ channel_id, updatedDetails }) => ({
                url: `/channel/${channel_id}/edit/details`,
                method: 'POST',
                body: updatedDetails,
            })
        }),

        subscrible: builder.mutation<SubscribtionResponse, any>({
            query: (channel_id) => ({
                url: `/channel/subscribe/${channel_id}`,
                method: 'POST',
            })
        }),

        search: builder.mutation<ExtraResponse, any>({
            query: ({ query, searchType }) => ({
                url: `/search`,
                method: 'POST',
                body: { 'data': query, 'type': searchType }
            })
        }),
    })
})

export const { useGetChannelQuery, useUploadVideoMutation, useSubscribleMutation,
useEditVideoMutation, useEditChannelDetailsMutation, useSearchMutation } = ChannelApi;