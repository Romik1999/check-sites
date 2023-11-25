import {createSlice} from "@reduxjs/toolkit";
import {IAuthState} from "../../../common/types/auth";
import Cookies from "js-cookie"

const initialState: IAuthState = {
    user: {
        name: '',
        token: '',
    },
    isLogged: false
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login(state, action) {
            state.user = action.payload
            // поставить в токен - токен который приходит с бека
            state.isLogged = true
        }
    }
})

export const {login} = authSlice.actions
export default authSlice.reducer
