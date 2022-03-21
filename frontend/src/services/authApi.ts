import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { INF_ForgotPassword } from "../components/auth/ForgotPassword";
import { LoginUser } from "../components/auth/Login";
import { NewUser } from "../components/auth/SignUp";
import { JWT_Tokens } from "../components/funcs/authFuncs";
import { ExtraResponse } from "../components/funcs/utilFuncs";
import { API_URL } from "../consts";
import { LoginResponse } from "../slices/auth-slice";

export const AuthApi = createApi({
    reducerPath: 'AuthApi',
    baseQuery: fetchBaseQuery({
        baseUrl: API_URL + '/api/users', 
        prepareHeaders: (headers, { getState }) => {
            return headers;
        }
    }),
    endpoints: (builder) => ({
        register: builder.mutation<ExtraResponse, FormData>({
            query: (registerData) => ({
                url: '/register',
                method: 'POST',
                body: registerData,
                headers: {}
            })

        }),

        login: builder.mutation<LoginResponse, LoginUser>({
            query: (loginData) => ({
                url: '/token',
                method: 'POST',
                body: loginData,
            })
        }),

        authenticate: builder.mutation<any, void>({
            query: () => ({
                url: '/token/get',
                method: 'GET',
                headers: {
                    'authorization': `Bearer ${localStorage.getItem('access')!}`
                }
            })
        }),

        changePassword: builder.mutation<ExtraResponse, INF_ForgotPassword>({
            query: (changePasswordData) => ({
                url: '/change-password',
                method: 'POST',
                body: changePasswordData
            })
        }),

        notifications: builder.query<any, void>({
            query: () => ({
                url: '/notifications',
                method: 'GET',
                headers: {
                    'authorization': `Bearer ${localStorage.getItem('access')!}`
                }
            })
        }),
    })
})

export const { useRegisterMutation, useLoginMutation, useAuthenticateMutation,
    useNotificationsQuery, useChangePasswordMutation } = AuthApi;