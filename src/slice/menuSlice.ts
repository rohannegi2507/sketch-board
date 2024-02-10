import { createSlice } from "@reduxjs/toolkit";
import {MENU_ITEMS} from './../constant'

const initialState = {
 activeMenuItem: MENU_ITEMS.PENCIL,
 actionMenu:null,

}

export const menuSlice = createSlice({
    name:'menu',
    initialState,
    reducers:{
        menuItemClick:(state, action)=>{
            state.activeMenuItem = action.payload
        },
        actionItemClick:(state,action)=>{
            state.actionMenu = action.payload
        },
    }
})

export const {menuItemClick, actionItemClick}= menuSlice.actions
export default menuSlice.reducer
