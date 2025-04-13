import React, { useEffect } from "react";
import PropTypes from "prop-types";
import BasketCartList from "../../page/basketPageList/basketCartList/basketCartList";
import BasketOrder from "../../page/basketPageList/basketCartList/basketOrder";
import { useDispatch, useSelector } from "react-redux";
import {
    getBasketDeleteIds,
    getBaskets,
    loadBasketsList
} from "../../../store/baskets";

const BasketForm = () => {
    const dispatch = useDispatch();
    const productsItem = useSelector(getBaskets());

    useEffect(() => {
        dispatch(loadBasketsList());
    }, []);

    const handleDelete = (prodId) => {
        dispatch(getBasketDeleteIds(prodId));
    };

    const itemPrice = () => {
        const newOrderPay = productsItem
            .reduce((a, c) => a + c.countPay * c.price, 0)
            .toFixed(2);
        return newOrderPay;
    };

    const handleClick = () => {
        console.log("click");
    };
    if (productsItem) {
        return (
            <div className="d-flex justify-content-center">
                <div className="d-flex flex-column w-100">
                    <h1>Корзина</h1>
                    <div>
                        <div className="d-flex flex-row">
                            <div className="col">
                                {productsItem.map((product) => (
                                    <BasketCartList
                                        product={product}
                                        prodId={product._id}
                                        key={product._id}
                                        productsItem={productsItem}
                                        handleDelete={handleDelete}
                                        {...product}
                                    />
                                ))}
                            </div>
                            <div>
                                <BasketOrder
                                    itemPrice={itemPrice}
                                    productsItem={productsItem}
                                    handleClick={handleClick}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    } else {
        return (
            <>
                <h1>Корзина пуста</h1>
            </>
        );
    }
};

BasketForm.propTypes = {
    onAddProduct: PropTypes.func
};

export default BasketForm;
