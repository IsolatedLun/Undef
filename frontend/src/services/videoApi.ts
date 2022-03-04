import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { getAccess } from "../components/funcs/authFuncs";
import { VideoData } from "../components/main/video/VideoTab";
import { INF_Video } from "../components/modules/Video";
import { API_URL } from "../consts";

export const VideoApi = createApi({
    reducerPath: 'VideoApi',
    baseQuery: fetchBaseQuery({
        baseUrl: API_URL + '/api/videos', 
        prepareHeaders: (headers, { getState }) => {
            if((getState() as any).auth.isLogged)
                headers.append('authorization', `Bearer ${getAccess()!}`);

            return headers;
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
                method: 'GET',
            })
        }),

        rateVideo: builder.mutation<any, any>({
            query: ({ video_id, type }) => ({
                url: `/video/${video_id}/rate`,
                method: 'POST',
                body: {
                    'type': type
                },
            })
        })

    })
})

export const { useGetVideosQuery, useGetVideoQuery, useRateVideoMutation } = VideoApi;