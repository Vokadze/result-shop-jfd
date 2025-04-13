import { createAction, createSlice } from "@reduxjs/toolkit";
import basketService from "../service/basket.service";

const basketsSlice = createSlice({
    name: "baskets",
    initialState: {
        entities: null,
        isLoading: true,
        error: null,
        value: 0
    },
    reducers: {
        basketsRequested: (state) => {
            state.isLoading = true;
        },
        basketsReceved: (state, action) => {
            state.entities = action.payload;
            state.isLoading = false;
        },
        basketsRequestFiled: (state, action) => {
            state.error = action.payload._id;
            state.isLoading = false;
        },
        basketsUpdateSuccessed: (state, action) => {
            state.entities[
                state.entities.findIndex((p) => p._id === action.payload._id)
            ] = action.payload;
        },
        basketsCreated: (state, action) => {
            if (!Array.isArray(state.entities)) {
                state.entities = [];
            }
            state.entities.push(action.payload._id);
        },
        removeBaskets: (state, action) => {
            state.entities = state.entities.filter(
                (p) => p._id !== action.payload
            );
        },
        increment: (state) => {
            state.entities.value += 1;
        },
        decrement: (state) => {
            state.entities.value -= 1;
        },
        // countRequestFiled: (state, action) => {
        //     state.entities.error = action.payload._id;
        //     state.entities.isLoading = false;
        // },
        countUpdateSuccessed: (state, action) => {
            state.entities.value = action.payload;
        }
    }
});

const { reducer: basketsReducer, actions } = basketsSlice;
const {
    basketsRequested,
    basketsReceved,
    basketsRequestFiled,
    basketsUpdateSuccessed,
    basketsCreated,
    removeBaskets,
    increment,
    decrement,
    countUpdateSuccessed
} = actions;

const basketUpdateRequested = createAction("baskets/basketUpdateRequested");
const basketUpdateFailed = createAction("baskets/basketUpdateFailed");
const addNewBasketRequested = createAction("baskets/addNewBasketRequested");
const countIncUpdateRequested = createAction("baskets/countIncUpdateRequested");
const countDecUpdateRequested = createAction("baskets/countDecUpdateRequested");
const countUpdateRequested = createAction("baskets/countUpdateRequested");
const removeBasketRequested = createAction("baskets/removeBasketRequested");

export const loadBasketsList = () => async (dispatch) => {
    dispatch(basketsRequested());
    try {
        const { content } = await basketService.fetchAll();
        dispatch(basketsReceved(content));
    } catch (error) {
        dispatch(basketsRequestFiled(error.message));
    }
};

export const getBasketById = (prodId) => (state) => {
    if (state.baskets.entities) {
        return state.baskets.entities.find((p) => p._id === prodId);
    }
};

export const getBaskets = () => (state) => state.baskets.entities;
export const getBasketsLoadingStatus = () => (state) => state.baskets.isLoading;

export const getBasketChangeIds = (id) => (state) => {
    if (state.baskets.entities) {
        return state.baskets.entities.filter((p) => p._id === id);
    }
};

export const getBasketDeleteIds = (id) => async (dispatch) => {
    dispatch(removeBasketRequested());
    try {
        const { content } = await basketService.delete(id);
        if (!content) {
            dispatch(removeBaskets(id));
        }
    } catch (error) {
        dispatch(basketsRequestFiled(error.message));
    }
};

export const createBasket =
    ({ _id, ...data }) =>
    async (dispatch) => {
        dispatch(addNewBasketRequested());
        try {
            if (!_id) {
                const { content } = await basketService.create(_id, data);
                dispatch(basketsCreated(content));
            }
        } catch (error) {
            dispatch(basketUpdateFailed(error.message));
        }
    };

export const getCountInc =
    ({ _id, counter, count, ...data }) =>
    async (dispatch) => {
        dispatch(countIncUpdateRequested());
        try {
            if (count === null) {
                const { content } = await basketService.incCount(
                    _id,
                    count,
                    counter,
                    data
                );
                dispatch(increment(content));
            }
            // }
        } catch (error) {
            dispatch(basketsRequestFiled(error.message));
            // console.log(error.message);
        }
    };

export const getCountDec =
    ({ _id, counter, count }) =>
    async (dispatch) => {
        dispatch(countDecUpdateRequested());
        try {
            if (count === null) {
                const { content } = await basketService.decCount(
                    _id,
                    counter,
                    count
                );
                dispatch(decrement(content));
            }
        } catch (error) {
            dispatch(basketsRequestFiled(error.message));
            // console.log(error.message);
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
            dispatch(basketsRequestFiled(error.message));
        }
    };

export const getBasketUpdateContent =
    ({ _id, ...data }) =>
    async (dispatch, state) => {
        dispatch(basketUpdateRequested());
        try {
            const { content } = await basketService.getBasket(_id, data);
            dispatch(basketsUpdateSuccessed(content));
        } catch (error) {
            dispatch(basketsRequestFiled(error.message));
        }
    };

export default basketsReducer;
