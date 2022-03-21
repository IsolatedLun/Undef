import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { Comment } from "../components/combines/VideoComments";
import { getAccess } from "../components/funcs/authFuncs";
import { ExtraResponse } from "../components/funcs/utilFuncs";
import { VideoData } from "../components/main/video/VideoTab";
import { INF_Video } from "../components/modules/Video";
import { API_URL } from "../consts";

export const VideoApi = createApi({
    reducerPath: 'VideoApi',
    baseQuery: fetchBaseQuery({
        baseUrl: API_URL + '/api/videos', 
        prepareHeaders: (headers, { getState }) => {
            if((getState() as any).auth.isLogged || getAccess()) {
                headers.append('Authorization', `Bearer ${getAccess()!}`);
            }

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

        getVideo: builder.query<VideoData, any>({
            query: ({ video_id, type }) => ({
                url: `/video/${video_id}`,
                method: 'POST',
                body: { 'type': type }
            })
        }),

        getVideoComments: builder.query<Comment[], any>({
            query: ({ video_id }) => ({
                url: `/video/${video_id}/comments`,
                method: 'GET',
            })
        }),

        commentVideo: builder.mutation<ExtraResponse, any>({
            query: ({ video_id, text }) => ({
                url: `/video/${video_id}/comments`,
                method: 'POST',
                body: { 'text': text }
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
        }),

        deleteVideo: builder.mutation<ExtraResponse, any>({
            query: (video_id) => ({
                url: `/video/${video_id}/delete`,
                method: 'POST',
            })
        }),

        reportVideo: builder.mutation<ExtraResponse, any>({
            query: (video_id) => ({
                url: `/video/${video_id}/report`,
                method: 'POST',
            })
        }),

        deleteVideoComment: builder.mutation<ExtraResponse, any>({
            query: (comment_id) => ({
                url: `/comment/${comment_id}/delete`,
                method: 'POST',
            })
        })

    })
})

export const { useGetVideosQuery, useGetVideoQuery, useRateVideoMutation,
    useDeleteVideoMutation, useGetVideoCommentsQuery, useCommentVideoMutation,
    useDeleteVideoCommentMutation, useReportVideoMutation } = VideoApi;