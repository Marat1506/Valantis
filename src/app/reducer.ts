import { createSlice } from "@reduxjs/toolkit";
import { TypeData } from "../types/type";




const initialState: TypeData = {
    sortPrice: [],
    products: [],
    page: 1,
    id: [],
    filtr: false,
}
export const filmSlice = createSlice({
    name: 'test',
    initialState,
    reducers: {
        getPage: (state, action) => {
            state.page = action.payload.page
        },
        priceSort: (state, action) => {
            state.sortPrice = action.payload.price
        },
        getProducts: (state, action) => {
            state.products = action.payload.products
        },
        stateId: (state, action) => {
            state.id = action.payload.id
        },
        stateFiltr: (state, action) => {
            state.filtr = action.payload.stateFiltr
        }
    }
})

export const { getPage, priceSort, getProducts, stateId, stateFiltr } = filmSlice.actions
export default filmSlice.reducer