import { createAction, createSlice } from "@reduxjs/toolkit";
import basketService from "../service/basket.service";

const counterSlice = createSlice({
    name: "counter",
    initialState: {
        value: 0,
        isLoading: true,
        error: null
    },
    reducers: {
        increment: (state, payload) => {
            state.value += 1;
            // state.value = payload.type.countPay;
        },
        decrement: (state) => {
            state.value -= 1;
        },
        countRequestFiled: (state, action) => {
            state.error = action.payload._id;
            state.isLoading = false;
        },
        countUpdateSuccessed: (state, action) => {
            state.value = action.payload.countPay;
            // state.entities[
            //     state.entities.findIndex((p) => p._id === action.payload._id)
            // ] = action.payload;
        }
    }
});

const { reducer: counterReducer, actions } = counterSlice;
const { increment, countRequestFiled, countUpdateSuccessed } = actions;

const countIncUpdateRequested = createAction("counter/countIncUpdateRequested");
const countUpdateRequested = createAction("counter/countUpdateRequested");

export const selectCount = (state) => state.counter.value;

export const getCountInc =
    ({ _id, counter, ...data }) =>
    async (dispatch, state) => {
        console.log("getCountInc _id", _id);
        console.log("getCountInc counter", counter);
        console.log("getCountInc data", data);
        dispatch(countIncUpdateRequested());
        try {
            // if (state.counter.value) {
            const { content } = await basketService.incCount(_id, counter);
            console.log(content);
            dispatch(increment(content));
            // }
        } catch (error) {
            console.log(error.message);
        }
    };

export const getUpdateCount =
    ({ _id, ...data }) =>
    async (dispatch) => {
        console.log({ _id });
        console.log({ data });
        dispatch(countUpdateRequested());
        try {
            const { content } = await basketService.updateCount(_id, data);
            dispatch(countUpdateSuccessed(content));
        } catch (error) {
            dispatch(countRequestFiled(error.message));
        }
    };

export default counterReducer;
