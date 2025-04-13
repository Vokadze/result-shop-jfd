import React from "react";
import PropTypes from "prop-types";

import BasketShopList from "../basketShopList/basketShopList";
import { useDispatch, useSelector } from "react-redux";
import { getProductById } from "../../../../store/products";
import history from "../../../../utils/history";
import {
    createBasket,
    getBasketUpdateContent
} from "../../../../store/baskets";
import basketService from "../../../../service/basket.service";

const BasketShopPage = ({ prodId }) => {
    const dispatch = useDispatch();
    const product = useSelector(getProductById(prodId));

    const onAddProduct = (product) => {
        if (!prodId) {
            dispatch(getBasketUpdateContent(product));
        } else {
            basketService.fetchAll(prodId);
            basketService.create(prodId, product);
            dispatch(createBasket(product));
        }
        history.push(`/basket`);
    };

    if (product) {
        return (
            <div className="d-flex flex-column">
                <input
                    type="text"
                    name="searchQuery"
                    placeholder="Путь к товару"
                    className="mb-4 text-center border border-warning"
                    style={{ background: "#dee2e6" }}
                />

                <BasketShopList product={product} onAddProduct={onAddProduct} />
            </div>
        );
    } else {
        return "loading BasketShopPage.jsx";
    }
};

BasketShopPage.propTypes = {
    prodId: PropTypes.string
};

export default BasketShopPage;
