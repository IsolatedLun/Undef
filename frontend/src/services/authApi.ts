import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { LoginUser } from "../components/auth/Login";
import { NewUser } from "../components/auth/SignUp";
import { JWT_Tokens } from "../components/funcs/authFuncs";
import { API_URL } from "../consts";

export const AuthApi = createApi({
    reducerPath: 'AuthApi',
    baseQuery: fetchBaseQuery({
        baseUrl: API_URL + '/api/users', 
        prepareHeaders: (headers, { getState }) => {
            const accessToken = localStorage.getItem('access');
            const refreshToken = localStorage.getItem('refresh');

            headers.set('authorization','Bearer ' + accessToken);
            return headers;
        }
    }),
    endpoints: (builder) => ({
        register: builder.mutation<void, FormData>({
            query: (registerData) => ({
                url: '/register',
                method: 'POST',
                body: registerData,
            })

        }),

        login: builder.mutation<LoginResponse, LoginUser>({
            query: (loginData) => ({
                url: '/token',
                method: 'POST',
                body: loginData
            })
        })
    })
})

export const { useRegisterMutation, useLoginMutation } = AuthApi;