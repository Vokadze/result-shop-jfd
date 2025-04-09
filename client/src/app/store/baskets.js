import { createAction, createSlice } from "@reduxjs/toolkit";
import basketService from "../service/basket.service";
// import isOutdated from "../utils/isOutdated";

const basketsSlice = createSlice({
    name: "baskets",
    initialState: {
        entities: null,
        isLoading: true,
        error: null
        // lastFetch: null
    },
    reducers: {
        basketsRequested: (state) => {
            state.isLoading = true;
        },
        basketsReceved: (state, action) => {
            state.entities = action.payload;
            // state.lastFetch = Date.now();
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
    removeBaskets
} = actions;

const basketUpdateRequested = createAction("baskets/basketUpdateRequested");
const basketUpdateFailed = createAction("baskets/basketUpdateFailed");
const addNewBasketRequested = createAction("baskets/addNewBasketRequested");
const removeBasketRequested = createAction("baskets/removeBasketRequested");

export const loadBasketsList = () => async (dispatch) => {
    // const { lastFetch } = getState().products;
    // if (isOutdated(lastFetch)) {
    dispatch(basketsRequested());
    try {
        const { content } = await basketService.fetchAll();
        console.log(content);
        dispatch(basketsReceved(content));
    } catch (error) {
        dispatch(basketsRequestFiled(error.message));
    }
    // }
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
                console.log(content);
                dispatch(basketsCreated(content));
            }
        } catch (error) {
            dispatch(basketUpdateFailed(error.message));
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
