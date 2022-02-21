import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { JWT_Tokens, updateTokens } from "../components/funcs/authFuncs";
import { API_URL } from "../consts";
import { AuthApi } from "../services/authApi";

interface UserState {
    isLogged: boolean;
    user: {
        id: number;
        username: string;
        profile: string;
    }
}

export interface LoginResponse {
    tokens: JWT_Tokens;
    user: UserState;
}

const initialState: UserState = {
    isLogged: false,
    user: {
        id: -1,
        username: '',
        profile: ''
    }
}

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
        
    },
    extraReducers: (builder) => {
        builder.addMatcher(AuthApi.endpoints.login.matchFulfilled, (state, action) => {
            updateTokens(action.payload.tokens);
            state.user = action.payload.user as any;
        })
    }
})

export const {  } = authSlice.actions;
export default authSlice.reducer;