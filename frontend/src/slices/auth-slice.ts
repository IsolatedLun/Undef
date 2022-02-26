import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { JWT_Tokens, refreshTokens, updateTokens } from "../components/funcs/authFuncs";
import { API_URL } from "../consts";
import { AuthApi } from "../services/authApi";

export interface UserState {
    isLogged: boolean;
    user: {
        id: number;
        username: string;
        profile: string;
        channel_id: number;
    }
}

export interface LoginResponse {
    tokens: JWT_Tokens;
    user: UserState;
}

const initialState: UserState = Object.freeze({
    isLogged: false,
    user: {
        id: -1,
        username: '',
        profile: '',
        channel_id: -1
    }
})

const fetchUser = createAsyncThunk(
    'fetchUser',
    async() => {
        const res = await fetch(API_URL + '/users/credentials')
    }
)

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout(state) {
            state.isLogged = false;
            state.user = initialState.user;
            localStorage.removeItem('access');
            localStorage.removeItem('refresh');
        }
    },
    extraReducers: (builder) => {
        builder.addMatcher(AuthApi.endpoints.login.matchFulfilled, (state, action) => {
            updateTokens(action.payload.tokens);
            state.isLogged = true;
            state.user = action.payload.user as any;
        }),

        builder.addMatcher(AuthApi.endpoints.authenticate.matchFulfilled, (state, action) => {
            state.isLogged = true;
            state.user = action.payload.data as any;
        }),

        builder.addMatcher(AuthApi.endpoints.authenticate.matchRejected, () => {
            async() => {
                await refreshTokens();
                AuthApi.endpoints.authenticate.useMutation();
            }
        })
    }
})

export const { logout } = authSlice.actions;
export default authSlice.reducer;