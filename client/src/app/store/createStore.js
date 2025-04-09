import { combineReducers, configureStore } from "@reduxjs/toolkit";
import categoriesReducer from "./categories";
import productsReducer from "./products";
import usersReducer from "./users";
import basketsReducer from "./baskets";
import counterReducer from "./counterSlice";

const rootReducers = combineReducers({
    categories: categoriesReducer,
    products: productsReducer,
    users: usersReducer,
    baskets: basketsReducer,
    counter: counterReducer
});

export function createStore() {
    return configureStore({
        reducer: rootReducers
    });
}
