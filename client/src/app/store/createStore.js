import { combineReducers, configureStore } from "@reduxjs/toolkit";
import categoriesReducer from "./categories";
import productsReducer from "./products";
import usersReducer from "./users";
import basketsReducer from "./baskets";

const rootReducers = combineReducers({
    categories: categoriesReducer,
    products: productsReducer,
    users: usersReducer,
    baskets: basketsReducer
});

export function createStore() {
    return configureStore({
        reducer: rootReducers
    });
}
