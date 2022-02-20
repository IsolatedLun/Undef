import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { NewUser } from "../components/auth/SignUp";
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
            }),

        })
    })
})

export const { useRegisterMutation } = AuthApi;