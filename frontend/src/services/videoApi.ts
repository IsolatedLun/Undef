import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { VideoData } from "../components/main/VideoTab";
import { INF_Video } from "../components/modules/Video";
import { API_URL } from "../consts";

export const VideoApi = createApi({
    reducerPath: 'VideoApi',
    baseQuery: fetchBaseQuery({
        baseUrl: API_URL + '/api/videos', 
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

        getVideo: builder.query<VideoData, number>({
            query: (video_id) => ({
                url: `/video/${video_id}`,
                method: 'GET'
            })
        })
    })
})

export const { useGetVideosQuery, useGetVideoQuery } = VideoApi;