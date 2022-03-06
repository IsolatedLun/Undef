import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { JWT_Tokens, refreshTokens, updateTokens } from "../components/funcs/authFuncs";
import { ExtraResponse } from "../components/funcs/utilFuncs";
import { INF_Modal } from "../components/layouts/Modal";
import { API_URL } from "../consts";
import { AuthApi } from "../services/authApi";

export interface ModalState extends INF_Modal {

}

const initialState: ModalState = Object.freeze({
    text: '',
    cb: () => null
})

export const modalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        toggleModal(state, action) {
            const modal = document.getElementById('modal');

            if(!modal?.classList.contains('active')) {
                modal?.classList.add('active');

                state.text = action.payload['text'];
                state.cb = action.payload['cb'];
            }

            else {
                modal?.classList.remove('active');
                return state;
            }
        }
    },
    extraReducers: (builder) => {

    }
})

export const { toggleModal } = modalSlice.actions;
export default modalSlice.reducer;