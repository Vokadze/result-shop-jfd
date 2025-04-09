import { createAction, createSlice } from "@reduxjs/toolkit";
import basketService from "../service/basket.service";

const counterSlice = createSlice({
    name: "counter",
    initialState: {
        value: 0
    },
    reducers: {
        increment: (state) => {
            state.value += 1;
        },
        decrement: (state) => {
            state.value -= 1;
        }
    }
});

const { reducer: counterReducer, actions } = counterSlice;
const { increment } = actions;

const countIncUpdateRequested = createAction("counter/countIncUpdateRequested");

export const getCountInc =
    ({ _id, counter }) =>
    async (dispatch, state) => {
        console.log("getCountInc _id", _id);
        console.log("getCountInc counter", counter);
        dispatch(countIncUpdateRequested());
        try {
            if (state.counter.value) {
                const { content } = await basketService.incCount(_id, counter);
                console.log(content);
                dispatch(increment(content));
            }
        } catch (error) {
            console.log(error.message);
        }
    };

export const selectCount = (state) => state.counter.value;

export default counterReducer;
