import {createSlice} from "@reduxjs/toolkit";
import {IAuthState} from "../../../common/types/auth";
import Cookies from "js-cookie"

const initialState: IAuthState = {
    user: {
        id: null,
        firstName: '',
        userName: '',
        email: '',
        createdAt: '',
        updateAt: '',
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
            Cookies.set("token")
            state.isLogged = true
        }
    }
})

export const {login} = authSlice.actions
export default authSlice.reducer
